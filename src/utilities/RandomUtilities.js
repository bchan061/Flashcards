class RandomUtilities {
    /**
     * Fisher-Yates shuffle.
     * @param {list} The list to randomize.
     */
    static shuffleList(list) {
        for(let i = list.length - 1; i >= 1; i--) {
            let randomItemPosition = Math.floor(Math.random() * i)
            this.swap(list, i, randomItemPosition)
        }
    }

    static swap(list, item1Pos, item2Pos) {
        let temp = list[item1Pos]
        list[item1Pos] = list[item2Pos]
        list[item2Pos] = temp
    }
}

export default RandomUtilities
