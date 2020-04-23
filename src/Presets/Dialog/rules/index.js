import GLOBAL_CONSTANTS from '../../../CONSTANTS'

const rules = {
	title: {
		default: '',
		type: [Boolean, String, HTMLElement, Function]
	},
	closeButton: {
		default: true,
		type: [Boolean, String, HTMLElement, Function]
	},
	masker: {
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
		default: 400,
		type: [String, Number]
	},
	minHeight: {
		default: 400,
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
