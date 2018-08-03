import React from 'react'

/**
 * A form for the card.
 * 
 * Required properties:
 *   - onSkip: a method to be called when skipping
 *   - onAnswer: a method to be called when answering
 */
class CardControls extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }

        this.submitAnswer = this.submitAnswer.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
    }

    onTextChange(event) {
        let text = event.target.value
        this.setState(function(previousState, properties) {
            return {
                text
            }
        })
    }

    submitAnswer(event) {
        event.preventDefault()
        this.props.onAnswer(this.state.text)
    }

    render() {
        return (
            <div className="controls">
                <form onSubmit={ this.submitAnswer }>
                        <input 
                            type="text"
                            className="textBox"
                            onChange={ this.onTextChange }
                            placeholder="Enter the answer..." />
                        <input type="submit" className="submitButton"/>
                        <input type="button" className="skipButton" value="Skip" onClick={this.props.onSkip} />
                </form>
            </div>
        )
    }
}

export default CardControls
