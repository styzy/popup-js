/**
 * iframe是否跨域
 * @param {Element} iframe
 */
export function isCrossOrigin(iframe) {
    var isCrossOrigin = false
    try {
        var test = !iframe.contentWindow.location.href
    } catch (e) {
        isCrossOrigin = true
    }
    return isCrossOrigin
}

export default {
    isCrossOrigin
}
