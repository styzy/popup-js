import CONSTANTS from './CONSTANTS'
import Core from './Core'
import PluginManager from './PluginManger'
import Presets from './Presets'
import './assets/stylus/index.styl'

class Popup {
    static #pluginManager = new PluginManager()
    static plugins(plugins) {
        if (plugins instanceof Array) {
            for (let index = 0, length = plugins.length; index < length; index++) {
                const plugin = plugins[index]
                this.plugins(plugin)
            }
        } else {
            this.#pluginManager.addPlugin(plugins)
        }
    }
    static getPlugins() {
        return this.#pluginManager.getPlugins()
    }
    static get version() {
        return CONSTANTS.VERSION
    }
    #core
    constructor(...args) {
        this.#core = new Core(...args)
        this.#loadPlugins()
    }
    #loadPlugins() {
        let plugins = this.constructor.#pluginManager.getUnusedPlugins()
        plugins.forEach(plugin => {
            this.#usePlugin(plugin)
        })
    }
    #usePlugin(plugin) {
        if (this.constructor.prototype[plugin.name]) {
            console.error(`Load plugin error: illegal plugin name ${plugin.name}`)
            return false
        }
        let pluginInstance = plugin.install({
            context: this,
            globalConfig: this.#core.config,
            open: (...args) => {
                return this.#core.open(...args, plugin)
            },
            close: (...args) => {
                return this.#core.close(...args)
            }
        })
        if (!pluginInstance) {
            console.error(`Init plugin error: plugin ${plugin.name} method install must return a valid value`)
            return false
        }
        this.constructor.prototype[plugin.name] = pluginInstance
        plugin.use()
    }
    open(...args) {
        return this.#core.open(...args)
    }
    close(...args) {
        return this.#core.close(...args)
    }
}

Popup.plugins(Presets)

export default Popup

export { Popup }
