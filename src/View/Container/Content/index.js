import CONSTANTS from '../../../CONSTANTS'
import { isHTMLElement } from '../../../util'

class Content {
    viewId
    core
    config
    container
    widthCallback
    heightCallback
    #el
    constructor({ viewId, core, config, container }) {
        this.viewId = viewId
        this.core = core
        this.config = config
        this.container = container
        this.#el = this.#createElement(this.config.content)
    }
    #createElement(content) {
        let el,
            close = () => {
                return this.core.close(this.viewId)
            }
        if (content instanceof Function) {
            el = content({ close, resize: this.container.resize.bind(this.container) })
        } else {
            if (isHTMLElement(content)) {
                el = content
            } else {
                el = document.createElement('div')
                el.classList.add(CONSTANTS.CLASS_NAME.CONTENT)
                if (this.config.plugin) {
                    el.classList.add(`${CONSTANTS.CLASS_NAME.CONTENT}-${this.config.plugin.name}`)
                }
                el.innerHTML = content
            }
        }
        return el
    }
    render() {
        this.container.el.appendChild(this.#el)
    }
}

export default Content
