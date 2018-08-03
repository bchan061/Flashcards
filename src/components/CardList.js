import React from 'react'
import Card from './Card'
import CardControls from './CardControls'

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

        if (this.props.data) {
            let cardList = []
            this.props.data.forEach(function(child) {
                cardList.push(
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
            this.state.cardList = cardList
        }

        this.skipCard = this.skipCard.bind(this)

        this.cardControls = <CardControls onSkip={this.skipCard}/>
    }

    skipCard() {
        this.setState(function(previousState, properties) {
            return {
                currentCard: (previousState.currentCard + 1) % previousState.cardList.length
            }
        })
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
