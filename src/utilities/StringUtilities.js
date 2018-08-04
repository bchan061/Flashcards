class StringUtilities {
    /**
     * Strips the string of any non-alphanumeric characters and lowercases it.
     * @param {string} string The string to strip.
     */
    static uniformizeString(string) {
        let newString = string.toLowerCase().trim()
        return newString.replace(/[^\w]/g, '')
    }
}

export default StringUtilities
