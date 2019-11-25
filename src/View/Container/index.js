import CONSTONTS from '../../CONSTANTS'
import SuperView from '../SuperView'
import Content from './Content'

class Container extends SuperView {
    viewId
    core
    zIndex
    content
    #el
    constructor({ viewId, core, config, zIndex }) {
        super()
        this.viewId = viewId
        this.core = core
        this.config = config
        this.zIndex = zIndex
        this.#el = this.#createElement()
        this.content = new Content({ viewId, core, config, container: this })
    }
    get el() {
        return this.#el
    }
    #createElement() {
        let el = document.createElement('div')
        el.classList.add(CONSTONTS.CLASS_NAME.CONTAINER)
        el.style.zIndex = this.zIndex

        if (typeof this.config.minWidth === 'number') {
            el.style.minWidth = `${this.config.minWidth}px`
        }
        if (typeof this.config.minWidth === 'string') {
            el.style.minWidth = this.config.minWidth
        }

        if (typeof this.config.minHeight === 'number') {
            el.style.minHeight = `${this.config.minHeight}px`
        }
        if (typeof this.config.minHeight === 'string') {
            el.style.minHeight = this.config.minHeight
        }

        if (typeof this.config.width === 'number') {
            el.style.width = `${this.config.width}px`
        }
        if (typeof this.config.width === 'string') {
            el.style.width = this.config.width
        }

        if (typeof this.config.height === 'number') {
            el.style.height = `${this.config.height}px`
        }
        if (typeof this.config.height === 'string') {
            el.style.height = this.config.height
        }

        return el
    }
    resize(size) {
        let el = this.#el,
            minWidth = parseFloat(window.getComputedStyle(this.#el)['minWidth']) || 0,
            minHeight = parseFloat(window.getComputedStyle(this.#el)['minHeight']) || 0,
            maxWidth = window.innerWidth,
            maxHeight = window.innerHeight,
            width = size && size.width ? size.width : parseFloat(window.getComputedStyle(this.#el)['width']),
            height = size && size.height ? size.height : parseFloat(window.getComputedStyle(this.#el)['height'])

        if (width > maxWidth) {
            width = maxWidth
        }
        if (width < minWidth) {
            width = minWidth
        }

        if (height > maxHeight) {
            height = maxHeight
        }
        if (height < minHeight) {
            height = minHeight
        }

        el.style.width = `${width}px`
        el.style.height = `${height}px`

        switch (this.config.anchor) {
            case CONSTONTS.ANCHOR.CENTER:
                el.style.top = '50%'
                el.style.left = '50%'
                el.style.marginTop = `-${height / 2}px`
                el.style.marginLeft = `-${width / 2}px`
                break
            case CONSTONTS.ANCHOR.TOP:
                el.style.top = '0'
                el.style.left = '50%'
                el.style.marginLeft = `-${width / 2}px`
                break
            case CONSTONTS.ANCHOR.BOTTOM:
                el.style.bottom = '0'
                el.style.left = '50%'
                el.style.marginLeft = `-${width / 2}px`
                break
            case CONSTONTS.ANCHOR.LEFT:
                el.style.left = '0'
                el.style.top = '50%'
                el.style.marginTop = `-${height / 2}px`
                break
            case CONSTONTS.ANCHOR.RIGHT:
                el.style.right = '0'
                el.style.top = '50%'
                el.style.marginTop = `-${height / 2}px`
                break
            case CONSTONTS.ANCHOR.LEFT_TOP:
                el.style.top = '0'
                el.style.left = '0'
                break
            case CONSTONTS.ANCHOR.RIGHT_TOP:
                el.style.top = '0'
                el.style.right = '0'
                break
            case CONSTONTS.ANCHOR.LEFT_BOTTOM:
                el.style.left = '0'
                el.style.bottom = '0'
                break
            case CONSTONTS.ANCHOR.RIGHT_BOTTOM:
                el.style.right = '0'
                el.style.bottom = '0'
                break
            default:
                el.style.top = '50%'
                el.style.left = '50%'
                el.style.marginTop = `-${height / 2}px`
                el.style.marginLeft = `-${width / 2}px`
                break
        }
    }
    render() {
        this.content.render()
        super.render(this.#el)
        this.resize()
    }
    destory() {
        super.destory(this.#el)
    }
}

export default Container
