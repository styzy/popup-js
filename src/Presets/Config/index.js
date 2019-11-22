import sync from '@styzy/utils-configuration-sync'

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
