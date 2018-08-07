import React from 'react'
import Card from './Card'
import CardControls from './CardControls'
import CardProgress from './CardProgress'
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

            showAnswer: false,

            correct: 0,
            incorrect: 0
        }

        for (let i = 0; i < this.props.data['items'].length; i++) {
            this.state.cardIDList.push(i)
        } 

        this.skipCard = this.skipCard.bind(this)
        this.nextCard = this.nextCard.bind(this)
        this.checkAnswer = this.checkAnswer.bind(this)
        this.shuffleCardList = this.shuffleCardList.bind(this)
        this.flipCard = this.flipCard.bind(this)
        this.getCurrentCardID = this.getCurrentCardID.bind(this)
        this.getCurrentCardData = this.getCurrentCardData.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.onFailure = this.onFailure.bind(this)

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
        return this.props.data['items'][this.getCurrentCardID()]
    }

    skipCard() {
        if (this.state.showAnswer) {
            /* Skipped the answer, probably a mistype - decrement the incorrect counter */
            this.setState(
                function(previousState, properties) {
                    return {
                        incorrect: previousState.incorrect - 1
                    }
                }
            )
        }

        this.nextCard()
    }

    nextCard() {
        this.setState(function(previousState, properties) {
            return {
                showAnswer: false,
                currentCard: (previousState.currentCard + 1) % previousState.cardIDList.length
            }
        })
    }

    flipCard() {
        this.setState(function(previousState, properties) {
            return {
                showAnswer: !previousState.showAnswer
            }
        })
    }

    checkAnswer(answer) {
        let currentCardAnswer = this.getCurrentCardData().answer
        
        if (StringUtilities.uniformizeString(currentCardAnswer) === StringUtilities.uniformizeString(answer)) {
            this.onSuccess()
        } else {
            this.onFailure()
        }
    }

    onSuccess() {
        this.nextCard()
        this.cardControlsRef.current.clearText()
        if (!this.state.showAnswer) {
            this.setState(
                function(previousState, properties) {
                    return {
                        correct: previousState.correct + 1
                    }
                }
            )
        }
    }

    onFailure() {
        if (!this.state.showAnswer) {
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

    render() {
        let currentCardData = this.getCurrentCardData()
        return (
            <div className="card">
                <Card
                    id={ currentCardData.id }
                    question={ currentCardData.question }
                    questionNotes={ currentCardData.questionNotes }
                    answer={ currentCardData.answer }
                    answerNotes={ currentCardData.answerNotes }
                    flipped={ this.state.showAnswer }
                />
                <CardProgress 
                    correct={ this.state.correct }
                    incorrect={ this.state.incorrect }
                />
                <CardControls
                    onSkip={ this.skipCard }
                    onAnswer={ this.checkAnswer }
                    ref={ this.cardControlsRef } 
                />
            </div>
        )
    }
}

export default CardList
