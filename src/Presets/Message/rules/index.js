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
    width: {
        default: 'auto',
        type: [String, Number]
    },
    height: {
        default: 'auto',
        type: [String, Number]
    },
    minWidth: {
        default: 300,
        type: [String, Number]
    },
    minHeight: {
        default: 'none',
        type: [String, Number]
    },
    maxWidth: {
        default: 400,
        type: [String, Number]
    },
    maxHeight: {
        default: 'none',
        type: [String, Number]
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
