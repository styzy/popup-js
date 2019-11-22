import rules from './rules'
import sync from '@styzy/utils-configuration-sync'

class Config {
    constructor(customConfig) {
        let config = null
        try {
            config = sync(rules, customConfig)
        } catch (error) {
            console.error(`Init Popup error:`, error)
        }
        return config
    }
}

export default Config
