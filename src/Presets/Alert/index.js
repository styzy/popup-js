import CONSTANTS from './CONSTANTS'
import Config from '../Config'
import rules from './rules'
import { isHTMLElement } from '../../util'
import './stylus/index.styl'

const install = ({ globalConfig, open, close }) => {
    const alert = customConfig => {
        if (typeof customConfig === 'string') {
            customConfig = {
                content: customConfig
            }
        }

        let pluginConfig = new Config(rules, customConfig)

        if (pluginConfig.title === true) {
            pluginConfig.title = ''
        }

        const render = ({ close, resize }) => {
            let el = document.createElement('div'),
                el_header = document.createElement('div'),
                el_body = document.createElement('div'),
                el_footer = document.createElement('div')
            el_header.classList.add(CONSTANTS.CLASS_NAME.HEADER)
            el.classList.add(CONSTANTS.CLASS_NAME.ALERT)
            el_body.classList.add(CONSTANTS.CLASS_NAME.BODY)
            el_footer.classList.add(CONSTANTS.CLASS_NAME.FOOTER)

            if (pluginConfig.title !== false) {
                let el_title = document.createElement('div')
                el_title.classList.add(CONSTANTS.CLASS_NAME.TITLE)

                if (pluginConfig.title instanceof Function) {
                    el_title.appendChild(pluginConfig.title())
                }
                if (isHTMLElement(pluginConfig.title)) {
                    el_title.appendChild(pluginConfig.title.cloneNode(true))
                }
                if (typeof pluginConfig.title === 'string') {
                    el_title.innerHTML = pluginConfig.title
                }

                el_header.appendChild(el_title)
                el.appendChild(el_header)
            }

            if (isHTMLElement(pluginConfig.content)) {
                el_body.appendChild(pluginConfig.content.cloneNode(true))
            }
            if (typeof pluginConfig.content === 'string') {
                el_body.innerHTML = pluginConfig.content
            }
            el.appendChild(el_body)

            let el_button = document.createElement('button')
            el_button.classList.add(CONSTANTS.CLASS_NAME.BUTTON)
            el_button.type = 'button'
            el_button.addEventListener('click', close)
            if (isHTMLElement(pluginConfig.button)) {
                el_button.appendChild(pluginConfig.button.cloneNode(true))
            }
            if (typeof pluginConfig.button === 'string') {
                el_button.innerHTML = pluginConfig.button
            }
            el_footer.appendChild(el_button)
            el.appendChild(el_footer)

            return el
        }

        let config = {
            content: render,
            marker: pluginConfig.marker,
            anchor: pluginConfig.anchor,
            width: pluginConfig.width,
            height: pluginConfig.height,
            minWidth: pluginConfig.minWidth,
            minHeight: pluginConfig.minHeight,
            maxWidth: pluginConfig.maxWidth,
            maxHeight: pluginConfig.maxHeight,
            onSuccess: pluginConfig.onSuccess,
            beforeClose: pluginConfig.beforeClose,
            onClose: pluginConfig.onClose
        }

        if (pluginConfig.onSuccess === undefined) {
            delete config.onSuccess
        }

        if (pluginConfig.beforeClose === undefined) {
            delete config.beforeClose
        }

        if (pluginConfig.onClose === undefined) {
            delete config.onClose
        }

        return open(config)
    }

    return alert
}

export default {
    name: 'alert',
    install
}
