import React from 'react'

/**
 * A component for monitoring progress.
 * 
 * Properties:
 *   correct: the number of correct answers
 *   incorrect: the number of incorrect answers
 */
class CardProgress extends React.Component {
    render() {
        return (
            <div className="cardProgress">
                { 
                    this.props.correct > 0 && 
                    (<div className="cardProgressCorrect"> &#x2B24; { this.props.correct } </div>) 
                }
                {
                    this.props.incorrect > 0 && 
                    (<div className="cardProgressIncorrect"> &#x2B24; { this.props.incorrect } </div>)
                }
            </div>
        )
    }
}

export default CardProgress
