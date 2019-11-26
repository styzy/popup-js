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
    button_yes: {
        default: CONSTANTS.TEXT.BUTTON_YES,
        type: [String, HTMLElement]
    },
    button_no: {
        default: CONSTANTS.TEXT.BUTTON_NO,
        type: [String, HTMLElement]
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
