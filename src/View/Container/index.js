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

        if (typeof this.config.maxWidth === 'number') {
            el.style.maxWidth = `${this.config.maxWidth}px`
        }
        if (typeof this.config.maxWidth === 'string') {
            el.style.maxWidth = this.config.maxWidth
        }

        if (typeof this.config.maxHeight === 'number') {
            el.style.maxHeight = `${this.config.maxHeight}px`
        }
        if (typeof this.config.maxHeight === 'string') {
            el.style.maxHeight = this.config.maxHeight
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
            rootFontSize = parseFloat(window.getComputedStyle(document.documentElement)['font-size']),
            winWidth = window.innerWidth,
            winHeight = window.innerHeight,
            computedStyle = window.getComputedStyle(this.#el),
            minWidth = getPX(computedStyle['minWidth'], rootFontSize, winWidth) || 0,
            minHeight = getPX(computedStyle['minHeight'], rootFontSize, winHeight) || 0,
            maxWidth = getPX(computedStyle['maxWidth'], rootFontSize, winWidth) || window.innerWidth,
            maxHeight = getPX(computedStyle['maxHeight'], rootFontSize, winHeight) || window.innerHeight,
            width = size && size.width ? size.width : getPX(computedStyle['width'], rootFontSize, winWidth),
            height = size && size.height ? size.height : getPX(computedStyle['height'], rootFontSize, winHeight)

        console.log('size: ', size)
        console.log('height: ', height)
        console.log('minHeight: ', minHeight)
        console.log('maxHeight: ', maxHeight)
        width = Math.max(minWidth, Math.min(width, maxWidth))
        height = Math.max(minHeight, Math.min(height, maxHeight))

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

        function getPX(string, rootFontSize, winPX) {
            if (string.indexOf('%') !== -1) {
                let percent = parseFloat(string)
                return (winPX * percent) / 100
            }
            if (string.indexOf('em') !== -1) {
                return parseFloat(string) * rootFontSize
            }
            return parseFloat(string)
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
