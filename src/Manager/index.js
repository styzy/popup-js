class Manager {
    #zIndex
    constructor(initZIndex) {
        this.#zIndex = initZIndex
    }
    nextZIndex() {
        return this.#zIndex++
    }
}

export default Manager
