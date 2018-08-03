import React from 'react'
import CardSide from './CardSide'

/**
 * A structure that holds a card.
 * 
 * Expected properties:
 *   - id: the ID of the card
 *   - question: the question of the card
 *   - questionNotes: accompanying notes for the question
 *   - answer: the answer of the card
 *   - answerNotes: accompanying notes for the answer
 */
class Card extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            flipped: false
        }
    }

    render() {
        if (!this.state.flipped) {
            return (
                <CardSide cardSideClass="question" main={ this.props.question } notes={ this.props.questionNotes } />
            )
        } else {
            return (
                <CardSide cardSideClass="answer" main={ this.props.answer } notes={ this.props.answerNotes } />
            )
        }
    }
}

export default Card
