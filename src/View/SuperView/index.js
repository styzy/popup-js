import CONSTONTS from '../../CONSTANTS'
class SuperView {
    constructor() {}
    render(el, el_container = document.body) {
        if (!el) {
            return false
        }
        el_container.appendChild(el)
        el.classList.add(CONSTONTS.CLASS_NAME.FADE_IN)
        window.setTimeout(() => {
            el.classList.remove(CONSTONTS.CLASS_NAME.FADE_IN)
        }, 300)
    }
    destory(el, el_container = document.body) {
        if (!el) {
            return false
        }
        el.classList.add(CONSTONTS.CLASS_NAME.FADE_OUT)
        window.setTimeout(() => {
            el_container.removeChild(el)
        }, 300)
    }
    // async #animate() {
    //     return new Promise()
    // }
}

export default SuperView
