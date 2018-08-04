class FontUtilities {
    /**
     * Returns a font style with the font size according to the length of the text.
     * @param {string} text the text
     * @param {number} minFontSize the smallest font size to show
     * @param {number} maxFontSize the largest font size to show
     * @param {number} minFontLength the smallest font length needed to start scaling
     * @param {number} maxFontLength the largest font length to scale
     * @param {string} unit the unit for scaling ("em" by default)
     */
    static returnFontStyle(text, minFontSize, maxFontSize, minFontLength, maxFontLength, unit = 'em') {
        let fontStyle = {}
        
        /* Clamp the font length */
        let fontLength = Math.max(text.length, minFontLength)
        fontLength = Math.min(text.length, maxFontLength)
        /* Obtain a range from 0.0 to 1.0 */
        let fontAlpha = (fontLength) / (maxFontLength - minFontLength)

        let fontSize = (maxFontSize - (maxFontSize - minFontSize) * fontAlpha)
        fontStyle['fontSize'] = fontSize + unit

        return fontStyle
    }
}

export default FontUtilities
