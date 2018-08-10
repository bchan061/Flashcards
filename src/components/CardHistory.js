/**
 * A stack for a history of cards.
 */
class CardHistory {
    /**
     * Initializes a new CardHistory object.
     */
    constructor() {
        this.history = []
        this.size = 0

        this.push = this.push.bind(this)
        this.pop = this.pop.bind(this)
        this.hasItem = this.hasItem.bind(this)
    }

    /**
     * Returns whether the CardHistory stack contains any items.
     */
    hasItem() {
        return this.size > 0
    }

    /**
     * Adds a new card into the history.
     * @param {boolean} successful whether the answer was correct the first time
     */
    push(wasSkipped, successful) {
        let item = {
            success: successful,
            skipped: wasSkipped
        }

        this.history[this.size] = item
        this.size += 1
    }

    /**
     * Returns the latest card in the stack.
     */
    pop() {
        if (this.hasItem()) {
            let currentItem = this.history[this.size - 1]
            this.size -= 1

            return currentItem
        } else {
            return null
        }
    }
}

export default CardHistory
