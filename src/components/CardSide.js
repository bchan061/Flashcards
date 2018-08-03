import React from 'react'

/**
 * A side of the card.
 * 
 * Expected properties:
 *   - cardSideClass: the class of the card
 *   - main: the main part of the side (either the question or the answer)
 *   - notes: accompanying notes for the main property
 */
class CardSide extends React.Component {
    render() {
        return (
            <div className="cardSide">
                <div className="main">
                    { this.props.main }
                </div>
                <div className="notes">
                    { this.props.notes }
                </div>
            </div>
        )
    }
}

export default CardSide
