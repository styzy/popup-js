import { configRules, markerRules, contentRules } from './rules'
import { sync } from '../../util'

class Config {
    constructor(customConfig) {
        let config = null
        try {
            config = sync(configRules, customConfig)
            if (typeof config.marker === 'object') {
                config.marker = sync(markerRules, config.marker)
            } else if (config.marker === true) {
                config.marker = sync(markerRules, {})
            }
        } catch (error) {
            console.error(`Create view error:`, error)
        }
        return config
    }
}

export default Config
