class FontUtilities {
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
