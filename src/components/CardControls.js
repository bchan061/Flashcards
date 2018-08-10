import React from 'react'

/**
 * A form for the card.
 * 
 * Required properties:
 *   - onSkip: a method to be called when skipping
 *   - onAnswer: a method to be called when answering
 *   - onSwapCheck: a method to be called when checking the "swap" box
 *   - onNotesCheck: a method to be called when checking the "notes" box
 *   - swapQuestionWithAnswer: whether the question and answer are swapped or not
 *   - showNotes: whether the notes are shown or not
 *   - canUndo: whether the undo button is active or not
 *   - onUndo: a method to be called when clicking on "undo"
 */
class CardControls extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }

        this.submitAnswer = this.submitAnswer.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.clearText = this.clearText.bind(this)
        this.swapCheckboxChanged = this.swapCheckboxChanged.bind(this)
        this.notesCheckboxChanged = this.notesCheckboxChanged.bind(this)
    }

    onTextChange(event) {
        let text = event.target.value
        this.setState(function(previousState, properties) {
            return {
                text
            }
        })
    }

    clearText() {
        this.setState(function(previousState, properties) {
            return {
                text: ''
            }
        })
    }

    submitAnswer(event) {
        event.preventDefault()
        this.props.onAnswer(this.state.text)
    }

    swapCheckboxChanged(event) {
        this.props.onSwapCheck(event.target.checked)
    }

    notesCheckboxChanged(event) {
        this.props.onNotesCheck(event.target.checked)
    }

    render() {
        return (
            <div className="controls">
                <form onSubmit={ this.submitAnswer }>
                        <div className="middleControls">
                            <input
                                type="button"
                                value="Undo"
                                className="undoButton"
                                disabled={ this.props.canUndo }
                                onClick={ this.props.onUndo }/>
                            <input 
                                type="text"
                                className="textBox"
                                onChange={ this.onTextChange }
                                placeholder="Answer"
                                value={ this.state.text }/>
                            <input type="submit" className="doNotDisplay"/>
                            <input type="button" value="Skip" className="skipButton" onClick={ this.props.onSkip }/>
                        </div>
                        <div className="optionsBox">
                            <label >
                                <input
                                    type="checkbox"
                                    className="swapBox"
                                    checked={ this.props.swapQuestionWithAnswer }
                                    onChange={ this.swapCheckboxChanged }/>
                                    Swap
                            </label>
                            <br/>
                            <label>
                                <input
                                    type="checkbox"
                                    className="swapBox"
                                    checked={ this.props.showNotes }
                                    onChange={ this.notesCheckboxChanged }/>
                                    Show Notes
                            </label>
                        </div>
                </form>
            </div>
        )
    }
}

export default CardControls
