class Core {
    constructor() {
        this.version = '0.0.0'
    }
    sayHello() {
        document.write(`version ${this.version}!`)
    }
}

export default new Core()