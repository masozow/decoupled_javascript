export const esc = (value) => {
    const ESCAPE_HTML = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }
    return String(value).replace(/[&<>"']/g, (char) => ESCAPE_HTML[char]);
}