import CONSTANTS from '../CONSTANTS'
import { Plugin } from '../PluginManger'
import Manager from '../Manager'
import Config from '../Config'
import View, { ViewConfig } from '../View'

class Core {
    #config
    #manager
    #seed = 0
    #fadeInDuration = 300
    #viewInstances = {}
    constructor(customConfig) {
        this.#config = new Config(customConfig)
        this.#manager = new Manager(this.config.zIndex)
        if (this.config.devMode) {
            window[CONSTANTS.DEV_MODE_WINDOW_DATA_NAME] = {
                config: this.config,
                manager: this.#manager,
                seed: this.#seed,
                viewInstances: this.#viewInstances
            }
        }
    }
    get config() {
        return this.#config
    }
    #createSeed() {
        return this.#seed++
    }
    #createViewId() {
        return 'popup-' + this.#createSeed()
    }
    open(config, plugin) {
        let viewConfig = new ViewConfig(config)
        if (!viewConfig) {
            return false
        }
        if (plugin instanceof Plugin) {
            viewConfig.plugin = plugin
        }
        let view = new View({
            core: this,
            id: this.#createViewId(),
            config: viewConfig,
            zIndex: this.#manager.nextZIndex()
        })
        this.#viewInstances[view.id] = view
        view.render()

        if (view.config.onSuccess) {
            view.config.onSuccess(view.id)
        }

        if (view.config.autoClose && view.config.autoCloseDelay) {
            window.setTimeout(this.close.bind(this, view.id), view.config.autoCloseDelay + this.#fadeInDuration)
        }

        return view.id
    }
    close(id, isForce) {
        let view = this.#viewInstances[id]
        if (!view) {
            return false
        }
        let _close = needClose => {
            if (needClose) {
                if (view.config.onClose) {
                    view.config.onClose(view.id)
                }
                view.destory()
                delete this.#viewInstances[id]
                return true
            } else {
                return false
            }
        }
        if (view.config.beforeClose) {
            return _close(view.config.beforeClose(view.id))
        } else {
            return _close(true)
        }
    }
}

export default Core
