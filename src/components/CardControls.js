import React from 'react'

/**
 * A form for the card.
 * 
 * Required properties:
 *   - onSkip: a method to be called when skipping 
 */
class CardControls extends React.Component {
    render() {
        return (
            <form>
                <input type="text" className="textBox" />
                <input type="button" className="skipButton" value="Skip" onClick={this.props.onSkip} />
            </form>
        )
    }
}

export default CardControls
