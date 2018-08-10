class StringUtilities {
    /**
     * Strips the string of any punctuation and whitespace, and lowercases it.
     * @param {string} string The string to strip.
     */
    static uniformizeString(string) {
        let newString = string.toLowerCase().trim()
        let punctuationRegularExpression = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{¦}~]/g
        return newString.replace(punctuationRegularExpression, '')
    }
}

export default StringUtilities
