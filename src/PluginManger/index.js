import Plugin from './Plugin'

class PluginManager {
    #plugins = []
    addPlugin(customPlugin) {
        let plugin = new Plugin(customPlugin)
        if (!plugin) {
            return false
        }
        if (this.#plugins[plugin.name]) {
            console.error(`Add plugin error: plugin width name ${plugin.name} is already exists`)
            return false
        }
        this.#plugins.push(plugin)
    }
    getPlugins() {
        return this.#plugins.map(plugin => plugin)
    }
    getUnusedPlugins() {
        return this.#plugins.filter(plugin => !plugin.isUsed)
    }
}

export { Plugin }

export default PluginManager
