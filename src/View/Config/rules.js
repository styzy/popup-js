const config = {
    marker: {
        default: false,
        type: [Boolean, Object]
    },
    content: {
        default: null,
        type: [HTMLElement, String, Function]
    },
    width: {
        default: 'auto',
        type: [String, Number]
    },
    height: {
        default: 'auto',
        type: [String, Number]
    },
    anchor: {
        default: 'center',
        type: String
    },
    onSuccess: {
        default: null,
        type: Function
    },
    onClose: {
        default: null,
        type: Function
    },
    beforeClose: {
        default: null,
        type: Function
    },
    autoClose: {
        default: false,
        type: Boolean
    },
    autoCloseDelay: {
        default: 3000,
        type: Number
    }
}

const marker = {
    clickCloseEnable: {
        default: false,
        type: Boolean
    },
    onClick: {
        default: null,
        type: Function
    },
    creator: {
        default: null,
        type: Function
    }
}

export { config as configRules }
export { marker as markerRules }

export default {
    config,
    marker
}