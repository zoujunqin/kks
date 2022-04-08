export function getBoundingRect(conforms) {
    const vl = Math.min(...conforms.map(c => c.left))
    const ht = Math.min(...conforms.map(c => c.top))
    const vr = Math.max(...conforms.map(c => (c.left + c.width)))
    const hb = Math.max(...conforms.map(c => (c.top + c.height)))
    const width = vr - vl
    const height = hb - ht
    const vc = vl + width / 2
    const hc = ht + height / 2
    return { vl, vc, vr, ht, hc, hb, width, height }
}