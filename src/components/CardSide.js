import React from 'react'
import './../utilities/FontUtilities'
import FontUtilities from './../utilities/FontUtilities';

/**
 * A side of the card.
 * 
 * Expected properties:
 *   - cardSideClass: the class of the card
 *   - main: the main part of the side (either the question or the answer)
 *   - notes: accompanying notes for the main property
 */
class CardSide extends React.Component {
    constructor(props) {
        super(props)

        this.returnFontStyle = this.returnFontStyle.bind(this)
    }

    returnFontStyle() {
        /* Some magic numbers here */
        return FontUtilities.returnFontStyle(this.props.main, 5, 10, 5, 100, "vmin")
    }

    render() {
        return (
            <div className="cardSide">
                <div className="main" style={ this.returnFontStyle() }>
                    { this.props.main }
                </div>
                {
                    this.props.notes &&
                    (<div className="notes">
                        { this.props.notes }
                    </div>)
                }
            </div>
        )
    }
}

export default CardSide
