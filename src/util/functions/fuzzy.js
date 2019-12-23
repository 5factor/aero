module.exports = (needle, haystack) => {
    if (needle == null || haystack == null) return false;

    const nl = needle.length;
    const hl = haystack.length;

    if (nl > hl) return false;
    if (nl === hl) return needle === haystack;

    outer: for (let i = 0, j = 0; i < nl; i++) {
        const nch = needle.charCodeAt(i);
        while (j < hl) {
            if (haystack.charCodeAt(j++) === nch) continue outer;
        }
        return false;
    }
    return true;
};