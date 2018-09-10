
export default function (source: string) {
    const vertices: number[] = []
    const vertexNormals: number[] = []
    const faces: number[] = []

    const sourceLines = source.split('\n')
    for (const v of sourceLines) {
        if (v.startsWith('v ')) {
            const vC = v.split(' ')
            vertices.push(parseFloat(vC[1]), parseFloat(vC[2]), parseFloat(vC[3]))
        }
        if (v.startsWith('vn ')) {
            const vnC = v.split(' ')
            vertexNormals.push(parseFloat(vnC[1]), parseFloat(vnC[2]), parseFloat(vnC[3]))
        }
        if (v.startsWith('f ')) {
            const fC = v.split(' ')
            fC.shift()
            const fCF = fC.map(f => f.split('//').shift()!)
            faces.push(parseFloat(fCF[0]) - 1, parseFloat(fCF[1]) - 1, parseFloat(fCF[2]) - 1)
        }
    }

    return `
        const component = ${JSON.stringify({vertices, vertexNormals, faces})}\n
        export default component
    `
}
