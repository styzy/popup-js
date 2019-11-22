import GLOBAL_CONSTANTS from '../../../CONSTANTS'
import CONSTANTS from '../CONSTANTS'

const rules = {
    message: {
        default: '',
        type: [String, HTMLElement]
    },
    type: {
        default: CONSTANTS.TYPE.INFO,
        type: String
    },
    animate: {
        default: true,
        type: Boolean
    },
    animateDirection: {
        default: '',
        type: String
    },
    marker: {
        default: false,
        type: Boolean
    },
    anchor: {
        default: GLOBAL_CONSTANTS.ANCHOR.CENTER,
        type: String
    },
    autoClose: {
        default: true,
        type: Boolean
    },
    autoCloseDelay: {
        default: 3000,
        type: Number
    }
}

export default rules
