import GLOBAL_CONSTANTS from '../../CONSTANTS'
import CONSTANTS from './CONSTANTS'
import Config from '../Config'
import rules from './rules'
import { isHTMLElement } from '../../util'
import { isCrossOrigin } from './util'
import './stylus/index.styl'

const install = ({ globalConfig, open, close }) => {
    const dialog = customConfig => {
        if (typeof customConfig !== 'object') {
            customConfig = {}
        }

        let pluginConfig = new Config(rules, customConfig),
            content = null,
            header = null,
            loading = null,
            containerResize = null

        if (pluginConfig.title === true) {
            pluginConfig.title = ''
        }

        if (pluginConfig.url) {
            pluginConfig.content = false
        }

        const render = ({ close, resize }) => {
            containerResize = resize
            let el = document.createElement('div'),
                el_body = document.createElement('div'),
                el_header = document.createElement('div')
            el.classList.add(CONSTANTS.CLASS_NAME.DIALOG)
            el_body.classList.add(CONSTANTS.CLASS_NAME.BODY)
            el_header.classList.add(CONSTANTS.CLASS_NAME.HEADER)

            if (pluginConfig.title !== false) {
                let el_title = document.createElement('div')
                el_title.classList.add(CONSTANTS.CLASS_NAME.TITLE)

                if (pluginConfig.title instanceof Function) {
                    el_title.appendChild(pluginConfig.title())
                } else if (isHTMLElement(pluginConfig.title)) {
                    el_title.appendChild(pluginConfig.title.cloneNode(true))
                } else {
                    el_title.innerHTML = pluginConfig.title
                }
                el_header.appendChild(el_title)

                if (pluginConfig.closeButton !== false) {
                    let el_close = document.createElement('div')
                    el_close.classList.add(CONSTANTS.CLASS_NAME.CLOSE)

                    if (pluginConfig.closeButton === true) {
                        let el_close_i = document.createElement('i')
                        el_close_i.classList.add(GLOBAL_CONSTANTS.CLASS_NAME.ICONFONT)
                        el_close_i.classList.add(GLOBAL_CONSTANTS.CLASS_NAME.ICONFONT_CLOSE)
                        el_close_i.classList.add(CONSTANTS.CLASS_NAME.ICONFONT)
                        el_close.appendChild(el_close_i)
                    } else if (pluginConfig.closeButton instanceof Function) {
                        el_close.appendChild(pluginConfig.closeButton())
                    } else {
                        el_close.innerHTML = pluginConfig.closeButton
                    }
                    el_close.addEventListener('click', () => {
                        close()
                    })
                    el_header.appendChild(el_close)
                }

                el.appendChild(el_header)
                header = el_header
            }

            if (pluginConfig.url) {
                let el_loading = createLoading()
                loading = el_loading
                el_body.appendChild(el_loading)

                if (typeof pluginConfig.url === 'string') {
                    pluginConfig.url = getURL(pluginConfig.url)
                }

                let el_iframe = document.createElement('iframe')
                el_iframe.classList.add(CONSTANTS.CLASS_NAME.IFRAME)
                el_iframe.addEventListener('load', () => {
                    iframeLoadHandler.call(el_iframe)
                    el_loading.classList.remove(CONSTANTS.CLASS_NAME.LOADING_SHOW)
                    window.setTimeout(() => {
                        el_body.removeChild(el_loading)
                    }, 500)
                })
                el_iframe.src = pluginConfig.url.href
                el_body.appendChild(el_iframe)
            }

            if (pluginConfig.content) {
                if (pluginConfig.content instanceof Function) {
                    let el_content = pluginConfig.content(close, el_body)
                    el_body.appendChild(el_content)
                }
                if (isHTMLElement(pluginConfig.content)) {
                    el_body.appendChild(pluginConfig.content.cloneNode(true))
                }
                if (typeof pluginConfig.content === 'string') {
                    el_body.innerHTML = pluginConfig.content
                }
            }

            el.appendChild(el_body)
            content = el_body

            return el

            function createLoading() {
                let el_loading = document.createElement('div'),
                    el_i = document.createElement('i')
                el_loading.classList.add(CONSTANTS.CLASS_NAME.LOADING)
                el_i.classList.add(GLOBAL_CONSTANTS.CLASS_NAME.ICONFONT)
                el_i.classList.add(GLOBAL_CONSTANTS.CLASS_NAME.ICONFONT_LOADING)
                el_i.classList.add(CONSTANTS.CLASS_NAME.ICONFONT)
                el_loading.appendChild(el_i)
                return el_loading
            }
        }

        const onSuccess = id => {
            if (loading) {
                loading.classList.add(CONSTANTS.CLASS_NAME.LOADING_SHOW)
            }
            if (pluginConfig.onSuccess) {
                return pluginConfig.onSuccess(id, content, iframeLoadHandler)
            } else {
                return null
            }
        }

        const beforeClose = id => {
            if (pluginConfig.beforeClose) {
                return pluginConfig.beforeClose(id, content)
            } else {
                return true
            }
        }

        const onClose = id => {
            if (pluginConfig.onClose) {
                return pluginConfig.onClose(id)
            } else {
                return null
            }
        }

        return open({
            content: render,
            marker: pluginConfig.marker,
            anchor: pluginConfig.anchor,
            width: pluginConfig.width,
            height: pluginConfig.height,
            minWidth: pluginConfig.minWidth,
            minHeight: pluginConfig.minHeight,
            maxWidth: pluginConfig.maxWidth,
            maxHeight: pluginConfig.maxHeight,
            onSuccess: onSuccess,
            beforeClose: beforeClose,
            onClose: onClose
        })

        function iframeLoadHandler() {
            this.removeEventListener('load', iframeLoadHandler)
            if (pluginConfig.width !== 'auto' && pluginConfig.height !== 'auto') {
                return false
            }
            if (isCrossOrigin(this)) {
                return false
            }
            let iframeSize = getIframeSize(this),
                size = {}
            if (pluginConfig.width === 'auto') {
                size.width = iframeSize.width
            }
            if (pluginConfig.height === 'auto') {
                if (pluginConfig.title) {
                    let titleHeight = parseFloat(window.getComputedStyle(header)['height'])
                    size.height = iframeSize.height + titleHeight
                } else {
                    size.height = iframeSize.height
                }
            }
            containerResize(size)

            function getIframeSize(iframe) {
                let iframeWindow = iframe.contentWindow,
                    width,
                    height
                // 获取高度赋值给iframe
                if (iframe.attachEvent) {
                    height = iframeWindow.document.documentElement.scrollHeight
                    width = iframeWindow.document.documentElement.scrollWidth
                } else {
                    let computedStyle = iframeWindow.getComputedStyle(iframeWindow.document.documentElement)
                    width = parseFloat(computedStyle['width'])
                    height = parseFloat(computedStyle['height'])
                }
                return {
                    width,
                    height
                }
            }
        }

        function getURL(url) {
            let el = document.createElement('a')
            el.href = url
            return new URL(el.href)
        }
    }

    return dialog
}

export default {
    name: 'dialog',
    install
}
