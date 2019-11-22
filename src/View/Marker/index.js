import CONSTANTS from '../../CONSTANTS'
import SuperView from '../SuperView'

class Marker extends SuperView {
    viewId
    core
    config
    zIndex
    #el
    constructor({ viewId, core, config, zIndex }) {
        super()
        this.viewId = viewId
        this.core = core
        this.config = config
        this.zIndex = zIndex
        this.#el = this.#createElement(this.config.marker)
    }
    #createElement(marker) {
        if (!marker) {
            return false
        }
        let el,
            close = () => {
                return this.core.close(this.viewId)
            }
        if (marker.creator) {
            el = marker.creator(close, this.zIndex)
        } else {
            el = document.createElement('div')
            el.classList.add(CONSTANTS.CLASS_NAME.MARKER)
            if (this.config.plugin) {
                el.classList.add(`${CONSTANTS.CLASS_NAME.MARKER}-${this.config.plugin.name}`)
            }
            el.style.zIndex = this.zIndex

            if (marker.onClick) {
                el.addEventListener('click', event => {
                    marker.onClick.call(el, event, this.viewId)
                })
            }

            if (marker.clickCloseEnable) {
                el.addEventListener('click', close)
            }
        }
        return el
    }
    render() {
        return super.render(this.#el)
    }
    destory() {
        return super.destory(this.#el)
    }
}

export default Marker
