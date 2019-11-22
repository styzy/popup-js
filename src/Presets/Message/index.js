import GLOBAL_CONSTANTS from '../../CONSTANTS'
import CONSTANTS from './CONSTANTS'
import Config from '../Config'
import rules from './rules'
import './stylus/index.styl'

const install = ({ globalConfig, open, close }) => {
    const render = (customConfig, type) => {
        if (typeof customConfig === 'string') {
            customConfig = {
                message: customConfig
            }
        }
        let pluginConfig = new Config(rules, customConfig),
            element = null,
            animateClass = null

        if (type) {
            pluginConfig.type = type
        }
        if (pluginConfig.animate) {
            pluginConfig.animateDirection = pluginConfig.animateDirection || getDefaultAnimateClassByAnchor(pluginConfig.anchor)
            animateClass = animateDirectionClassMap(pluginConfig.animateDirection)
        }
        return open({
            content({ close }) {
                let el = document.createElement('div')
                el.classList.add(CONSTANTS.CLASS_NAME.MESSAGE)
                el.classList.add(typeClassMap(pluginConfig.type))
                if (animateClass) {
                    el.classList.add(animateClass.in)
                }

                // let el_icon = document.createElement('i')
                // el_icon.classList.add()
                el.innerHTML = pluginConfig.message
                element = el
                return el
            },
            marker: pluginConfig.marker,
            anchor: pluginConfig.anchor,
            autoClose: pluginConfig.autoClose,
            autoCloseDelay: pluginConfig.autoCloseDelay,
            onClose: () => {
                if (animateClass) {
                    element.classList.add(animateClass.out)
                }
            }
        })
    }

    let message = config => {
        return render(config)
    }
    message.info = config => {
        return render(config, CONSTANTS.TYPE.INFO)
    }
    message.success = config => {
        return render(config, CONSTANTS.TYPE.SUCCESS)
    }
    message.warning = config => {
        return render(config, CONSTANTS.TYPE.WARNING)
    }
    message.error = (...args) => {
        return render(...args, CONSTANTS.TYPE.ERROR)
    }
    return message
}

function typeClassMap(type) {
    switch (type) {
        case CONSTANTS.TYPE.INFO:
            return CONSTANTS.CLASS_NAME.INFO
        case CONSTANTS.TYPE.SUCCESS:
            return CONSTANTS.CLASS_NAME.SUCCESS
        case CONSTANTS.TYPE.WARNING:
            return CONSTANTS.CLASS_NAME.WARNING
        case CONSTANTS.TYPE.ERROR:
            return CONSTANTS.CLASS_NAME.ERROR
        default:
            return CONSTANTS.CLASS_NAME.INFO
    }
}

function getDefaultAnimateClassByAnchor(anchor) {
    switch (anchor) {
        case GLOBAL_CONSTANTS.ANCHOR.CENTER:
            return ''
        case GLOBAL_CONSTANTS.ANCHOR.TOP:
            return CONSTANTS.ANIMATE_DIRECTION.TOP
        case GLOBAL_CONSTANTS.ANCHOR.LEFT:
            return CONSTANTS.ANIMATE_DIRECTION.LEFT
        case GLOBAL_CONSTANTS.ANCHOR.RIGHT:
            return CONSTANTS.ANIMATE_DIRECTION.RIGHT
        case GLOBAL_CONSTANTS.ANCHOR.BOTTOM:
            return CONSTANTS.ANIMATE_DIRECTION.BOTTOM
        case GLOBAL_CONSTANTS.ANCHOR.LEFT_TOP:
            return CONSTANTS.ANIMATE_DIRECTION.TOP
        case GLOBAL_CONSTANTS.ANCHOR.RIGHT_TOP:
            return CONSTANTS.ANIMATE_DIRECTION.TOP
        case GLOBAL_CONSTANTS.ANCHOR.LEFT_BOTTOM:
            return CONSTANTS.ANIMATE_DIRECTION.BOTTOM
        case GLOBAL_CONSTANTS.ANCHOR.RIGHT_BOTTOM:
            return CONSTANTS.ANIMATE_DIRECTION.BOTTOM
        default:
            return ''
    }
}

function animateDirectionClassMap(direct) {
    switch (direct) {
        case CONSTANTS.ANIMATE_DIRECTION.TOP:
            return {
                in: CONSTANTS.CLASS_NAME.ANIMATE_TOP_IN,
                out: CONSTANTS.CLASS_NAME.ANIMATE_TOP_OUT
            }
        case CONSTANTS.ANIMATE_DIRECTION.LEFT:
            return {
                in: CONSTANTS.CLASS_NAME.ANIMATE_LEFT_IN,
                out: CONSTANTS.CLASS_NAME.ANIMATE_LEFT_OUT
            }
        case CONSTANTS.ANIMATE_DIRECTION.RIGHT:
            return {
                in: CONSTANTS.CLASS_NAME.ANIMATE_RIGHT_IN,
                out: CONSTANTS.CLASS_NAME.ANIMATE_RIGHT_OUT
            }
        case CONSTANTS.ANIMATE_DIRECTION.BOTTOM:
            return {
                in: CONSTANTS.CLASS_NAME.ANIMATE_BOTTOM_IN,
                out: CONSTANTS.CLASS_NAME.ANIMATE_BOTTOM_OUT
            }
        default:
            return null
    }
}

export default {
    name: 'message',
    install
}
