import { configRules, maskerRules, contentRules } from './rules'
import { sync } from '../../util'

class Config {
	constructor(customConfig) {
		let config = null
		try {
			config = sync(configRules, customConfig)
			if (typeof config.masker === 'object') {
				config.masker = sync(maskerRules, config.masker)
			} else if (config.masker === true) {
				config.masker = sync(maskerRules, {})
			}
		} catch (error) {
			console.error(`Create view error:`, error)
		}
		return config
	}
}

export default Config
