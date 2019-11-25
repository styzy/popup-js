import GLOBAL_CONSTANTS from '../../../CONSTANTS'
import CONSTANTS from '../CONSTANTS'

const rules = {
    title: {
        default: CONSTANTS.TEXT.TITLE,
        type: [Boolean, String, HTMLElement]
    },
    content: {
        default: '',
        type: [String, HTMLElement]
    },
    button: {
        default: CONSTANTS.TEXT.BUTTON,
        type: [String, HTMLElement]
    },
    marker: {
        default: true,
        type: [Boolean, Object]
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
        type: Number
    },
    minHeight: {
        default: 160,
        type: Number
    },
    maxWidth: {
        default: 600,
        type: Number
    },
    maxHeight: {
        default: 600,
        type: Number
    },
    onSuccess: {
        default: null,
        type: Function
    },
    beforeClose: {
        default: null,
        type: Function
    },
    onClose: {
        default: null,
        type: Function
    }
}

export default rules
