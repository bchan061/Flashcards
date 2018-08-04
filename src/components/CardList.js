import React from 'react'
import Card from './Card'
import CardControls from './CardControls'
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
            cardList: []
        }

        this.skipCard = this.skipCard.bind(this)
        this.nextCard = this.nextCard.bind(this)
        this.checkAnswer = this.checkAnswer.bind(this)
        this.constructCardList = this.constructCardList.bind(this)
        this.shuffleCardList = this.shuffleCardList.bind(this)

        this.state.cardList = this.constructCardList()

        this.cardControlsRef = React.createRef()
        this.cardControls = <CardControls
                                onSkip={ this.skipCard }
                                onAnswer={ this.checkAnswer }
                                ref={ this.cardControlsRef } 
                            />

        this.shuffleCardList()
    }

    constructCardList() {
        if (this.props.data) {
            let newCardList = []
            this.props.data.forEach(function(child) {
                newCardList.push(
                    <Card
                        id={ child.id }
                        key={ child.key }
                        question={ child.question }
                        questionNotes={ child.questionNotes }
                        answer={ child.answer }
                        answerNotes={ child.answerNotes }
                    />
                )
            })
            return newCardList
        }
    }

    shuffleCardList() {
        let cardList = this.state.cardList
        RandomUtilities.shuffleList(cardList)

        this.setState(function(previousState, parameters) {
            return {
                cardList
            }
        })
    }

    skipCard() {
        this.nextCard()
    }

    nextCard() {
        this.setState(function(previousState, properties) {
            return {
                currentCard: (previousState.currentCard + 1) % previousState.cardList.length
            }
        })
    }

    checkAnswer(answer) {
        let currentCardAnswer = this.state.cardList[this.state.currentCard].props.answer
        
        if (StringUtilities.uniformizeString(currentCardAnswer) === StringUtilities.uniformizeString(answer)) {
            this.skipCard()
            this.cardControlsRef.current.clearText()
        } else {
            this.cardControlsRef.current.clearText()
        }
    }



    render() {
        return (
            <div className="card">
                { this.state.cardList[this.state.currentCard] }

                { this.cardControls }
            </div>
        )
    }
}

export default CardList
