const rules = {
    title: {
        default: '',
        type: [Boolean, String, HTMLElement, Function]
    },
    closeButton: {
        default: true,
        type: [Boolean, String, HTMLElement, Function]
    },
    marker: {
        default: true,
        type: [Boolean, Object]
    },
    content: {
        default: '',
        type: [String, HTMLElement, Function]
    },
    url: {
        default: '',
        type: [String, URL]
    },
    anchor: {
        default: 'center',
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
        default: 400,
        type: Number
    },
    minHeight: {
        default: 400,
        type: Number
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
    }
}

export default rules
