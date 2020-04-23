import CONSTANTS from '../../CONSTANTS'
import SuperView from '../SuperView'

class Masker extends SuperView {
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
		this.#el = this.#createElement(this.config.masker)
	}
	#createElement(masker) {
		if (!masker) {
			return false
		}
		let el,
			close = () => {
				return this.core.close(this.viewId)
			}
		if (masker.creator) {
			el = masker.creator(close, this.zIndex)
		} else {
			el = document.createElement('div')
			el.classList.add(CONSTANTS.CLASS_NAME.MASKER)
			if (this.config.plugin) {
				el.classList.add(`${CONSTANTS.CLASS_NAME.MASKER}-${this.config.plugin.name}`)
			}
			el.style.zIndex = this.zIndex

			if (masker.onClick) {
				el.addEventListener('click', (event) => {
					masker.onClick.call(el, event, this.viewId)
				})
			}

			if (masker.clickCloseEnable) {
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

export default Masker
