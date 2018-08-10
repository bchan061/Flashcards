import React from 'react'
import Card from './Card'
import CardControls from './CardControls'
import CardProgress from './CardProgress'
import CardHistory from './CardHistory'
import './../utilities/RandomUtilities'
import RandomUtilities from './../utilities/RandomUtilities'
import StringUtilities from './../utilities/StringUtilities'

/**
 * A list of cards.
 * Rendered onto the app.
 * 
 * Expected properties:
 *   - data: an array containing card data in JSON:
 *     - id: the card ID
 *     - question: the question
 *     - questionNotes: accompanying notes for the question
 *     - answer: the answer
 *     - answerNotes: accompanying notes for the answer
 */
class CardList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCard: 0,
            cardIDList: [],

            showOtherSide: false,
            swapQuestionWithAnswer: false,
            showNotes: true,

            correct: 0,
            incorrect: 0
        }

        this.cardHistory = new CardHistory()

        for (let i = 0; i < this.props.data['items'].length; i++) {
            this.state.cardIDList.push(i)
        } 

        this.skipCard = this.skipCard.bind(this)
        this.nextCard = this.nextCard.bind(this)
        this.checkAnswer = this.checkAnswer.bind(this)
        this.shuffleCardList = this.shuffleCardList.bind(this)
        this.flipCard = this.flipCard.bind(this)
        this.undoCard = this.undoCard.bind(this)
        this.getCurrentCardID = this.getCurrentCardID.bind(this)
        this.getCurrentCardData = this.getCurrentCardData.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.onFailure = this.onFailure.bind(this)
        this.onSwapBoxCheck = this.onSwapBoxCheck.bind(this)
        this.onNotesBoxCheck = this.onNotesBoxCheck.bind(this)

        this.cardControlsRef = React.createRef()

        this.shuffleCardList()
    }

    shuffleCardList() {
        RandomUtilities.shuffleList(this.state.cardIDList)

        this.setState(function(previousState, properties) {
            return {
                cardList: this.state.cardList
            }
        })
    }

    getCurrentCardID() {
        return this.state.cardIDList[this.state.currentCard]
    }
    
    getCurrentCardData() {
        return this.props.data.items[this.getCurrentCardID()]
    }

    skipCard() {
        if (this.state.showOtherSide) {
            /* Skipped the answer, probably a mistype - decrement the incorrect counter, mark as correct */
            this.setState(
                function(previousState, properties) {
                    return {
                        incorrect: previousState.incorrect - 1,
                        correct: previousState.correct + 1
                    }
                }
            )
        }
        this.nextCard()
        this.cardHistory.push(!this.state.showOtherSide, this.state.showOtherSide)
    }

    nextCard() {
        this.setState(function(previousState, properties) {
            return {
                showOtherSide: false,
                currentCard: (previousState.currentCard + 1) % previousState.cardIDList.length
            }
        })
    }

    undoCard() {
        if (this.cardHistory.hasItem()) {
            let previousCard = this.cardHistory.pop()
            let correctDifference = (previousCard.success ? -1 : 0)
            let incorrectDifference = (previousCard.success ? 0 : -1)
            if (previousCard.skipped) {
                correctDifference = 0
                incorrectDifference = 0
            }
            this.setState(
                function(previousState, properties) {
                    return {
                        correct: previousState.correct + correctDifference,
                        incorrect: previousState.incorrect + incorrectDifference,
                        currentCard: (previousState.currentCard - 1) % previousState.cardIDList.length,
                        showOtherSide: false
                    }
                }
            )
        }
    }

    flipCard() {
        this.setState(function(previousState, properties) {
            return {
                showOtherSide: !previousState.showAnswer
            }
        })
    }

    checkAnswer(answer) {
        let currentCardAnswer = this.getCurrentCardData().answer
        if (this.state.swapQuestionWithAnswer) {
            currentCardAnswer = this.getCurrentCardData().question
        }
        
        if (StringUtilities.uniformizeString(currentCardAnswer) === StringUtilities.uniformizeString(answer)) {
            this.onSuccess()
        } else {
            this.onFailure()
        }
    }

    onSuccess() {
        this.cardHistory.push(false, !this.state.showOtherSide)
        this.cardControlsRef.current.clearText()
        if (!this.state.showOtherSide) {
            this.setState(
                function(previousState, properties) {
                    return {
                        correct: previousState.correct + 1
                    }
                }
            )
        }
        this.nextCard()
    }

    onFailure() {
        if (!this.state.showOtherSide) {
            this.flipCard()
            this.setState(
                function(previousState, properties) {
                    return {
                        incorrect: previousState.incorrect + 1
                    }
                }
            )
        }
        this.cardControlsRef.current.clearText()
    }

    onSwapBoxCheck(isChecked) {
        this.setState(
            function (previousState, properties) {
                return {
                    swapQuestionWithAnswer: isChecked
                }
            }
        )
    }

    onNotesBoxCheck(isChecked) {
        this.setState(
            function (previousState, properties) {
                return {
                    showNotes: isChecked
                }
            }
        )
    }

    render() {
        let currentCardData = this.getCurrentCardData()
        /* Swap the question and answer if specified in the state */
        let adjustedCardData = {
            question: (!this.state.swapQuestionWithAnswer) ? currentCardData.question : currentCardData.answer,
            questionNotes: (!this.state.swapQuestionWithAnswer) ? currentCardData.questionNotes : currentCardData.answerNotes,
            answer: (!this.state.swapQuestionWithAnswer) ? currentCardData.answer : currentCardData.question,
            answerNotes: (!this.state.swapQuestionWithAnswer) ? currentCardData.answerNotes : currentCardData.questionNotes
        }

        if (!this.state.showNotes) {
            adjustedCardData.questionNotes = ''
            adjustedCardData.answerNotes = ''
        }

        return (
            <div className="card">
                <Card
                    id={ currentCardData.id }
                    question={ adjustedCardData.question }
                    questionNotes={ adjustedCardData.questionNotes }
                    answer={ adjustedCardData.answer }
                    answerNotes={ adjustedCardData.answerNotes }
                    flipped={ this.state.showOtherSide }
                />
                <CardProgress 
                    correct={ this.state.correct }
                    incorrect={ this.state.incorrect }
                />
                <CardControls
                    onSkip={ this.skipCard }
                    onAnswer={ this.checkAnswer }
                    onSwapCheck={ this.onSwapBoxCheck }
                    onNotesCheck={ this.onNotesBoxCheck }
                    showNotes={ this.state.showNotes }
                    swapQuestionWithAnswer={ this.state.swapQuestionWithAnswer }
                    canUndo={ !this.cardHistory.hasItem() }
                    onUndo={ this.undoCard }
                    ref={ this.cardControlsRef } 
                />
            </div>
        )
    }
}

export default CardList
