import Masker from './Masker'
import Container from './Container'
import Config from './Config'

class View {
	#id
	core
	config
	zIndex
	masker
	container
	constructor({ id, core, config, zIndex }) {
		this.#id = id
		this.core = core
		this.config = config
		this.zIndex = zIndex
		this.#createChild()
	}
	get id() {
		return this.#id
	}
	#createChild() {
		this.masker = new Masker({
			viewId: this.#id,
			core: this.core,
			config: this.config,
			zIndex: this.zIndex
		})
		this.container = new Container({
			viewId: this.#id,
			core: this.core,
			config: this.config,
			zIndex: this.zIndex
		})
	}
	render() {
		this.masker.render()
		this.container.render()
	}
	destory() {
		this.masker.destory()
		this.container.destory()
	}
}

export { Config as ViewConfig }

export default View
