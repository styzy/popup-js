import rules from './rules'
import sync from '@styzy/utils-configuration-sync'

class Plugin {
    #name
    #install
    #parser
    #isUsed
    constructor(customPlugin) {
        let plugin = {}
        try {
            plugin = sync(rules, customPlugin)
        } catch (error) {
            console.error(`Create Plugin error:` + error)
            return false
        }
        this.#name = plugin.name
        this.#install = plugin.install
        this.#parser = plugin.parser
        this.#isUsed = false
    }
    get name() {
        return this.#name
    }
    get install() {
        return this.#install
    }
    get parser() {
        return this.#parser
    }
    get isUsed() {
        return this.#isUsed
    }
    use() {
        this.#isUsed = true
    }
}

export default Plugin
