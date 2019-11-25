import { sync } from '../../util'

class Config {
    constructor(rules, customConfig) {
        let config = null
        try {
            config = sync(rules, customConfig || {})
        } catch (error) {
            console.error(`Sync config error:`, error)
        }
        return config
    }
}

export default Config
