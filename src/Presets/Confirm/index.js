import CONSTANTS from './CONSTANTS'
import Config from '../Config'
import rules from './rules'
import { isHTMLElement } from '../../util'
import './stylus/index.styl'

const install = ({ globalConfig, open, close }) => {
    const confirm = customConfig => {
        if (typeof customConfig === 'string') {
            customConfig = {
                content: customConfig
            }
        }

        let pluginConfig = new Config(rules, customConfig),
            result = false

        if (pluginConfig.title === true) {
            pluginConfig.title = ''
        }

        const render = ({ close, resize }) => {
            let el = document.createElement('div'),
                el_header = document.createElement('div'),
                el_body = document.createElement('div'),
                el_footer = document.createElement('div')
            el.classList.add(CONSTANTS.CLASS_NAME.CONFIRM)
            el_header.classList.add(CONSTANTS.CLASS_NAME.HEADER)
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

            let el_button_yes = createButton(pluginConfig.button_yes, false)
            el_button_yes.addEventListener('click', () => {
                result = true
                close()
            })
            el_footer.appendChild(el_button_yes)

            let el_button_no = createButton(pluginConfig.button_no, true)
            el_button_no.addEventListener('click', close)
            el_footer.appendChild(el_button_no)

            el.appendChild(el_footer)

            return el

            function createButton(button, isPlain) {
                let el_button = document.createElement('button')
                el_button.classList.add(CONSTANTS.CLASS_NAME.BUTTON)
                if (isPlain) {
                    el_button.classList.add(CONSTANTS.CLASS_NAME.BUTTON_PLAIN)
                }
                el_button.type = 'button'
                if (isHTMLElement(button)) {
                    el_button.appendChild(button.cloneNode(true))
                }
                if (typeof button === 'string') {
                    el_button.innerHTML = button
                }
                return el_button
            }
        }

        const onClose = id => {
            if (pluginConfig.onClose) {
                pluginConfig.onClose(result, id)
            }
        }

        let config = {
            content: render,
            marker: true,
            anchor: pluginConfig.anchor,
            width: pluginConfig.width,
            height: pluginConfig.height,
            minWidth: pluginConfig.minWidth,
            minHeight: pluginConfig.minHeight,
            maxWidth: pluginConfig.maxWidth,
            maxHeight: pluginConfig.maxHeight,
            onSuccess: pluginConfig.onSuccess,
            beforeClose: pluginConfig.beforeClose,
            onClose: onClose
        }

        if (pluginConfig.onSuccess === undefined) {
            delete config.onSuccess
        }

        if (pluginConfig.beforeClose === undefined) {
            delete config.beforeClose
        }

        return open(config)
    }

    return confirm
}

export default {
    name: 'confirm',
    install
}
