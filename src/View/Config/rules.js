const config = {
	masker: {
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
	minWidth: {
		default: 'none',
		type: [String, Number]
	},
	minHeight: {
		default: 'none',
		type: [String, Number]
	},
	maxWidth: {
		default: 'none',
		type: [String, Number]
	},
	maxHeight: {
		default: 'none',
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

const masker = {
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
export { masker as maskerRules }

export default {
	config,
	masker
}
