const rules = {
    name: {
        default: '',
        type: [String, Function],
        required: true
    },
    install: {
        default: null,
        type: Function,
        required: true
    },
    parser: {
        default: null,
        type: Function
    }
}

export default rules
