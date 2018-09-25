import ModelObject from 'types/ModelObject'
import SimpleVec3 from 'types/SimpleVec3'

export default function (source: string) {
    const vertices: number[] = []
    const vertexNormals: number[] = []
    const faces: number[] = []

    const sourceLines = source.split('\n')
    const verticesMax: SimpleVec3 = {x: 0, y: 0, z: 0}
    const vertexNormalsMax: SimpleVec3 = {x: 0, y: 0, z: 0}
    const facesMax: SimpleVec3 = {x: 0, y: 0, z: 0}
    const verticesMin: SimpleVec3 = {x: 0, y: 0, z: 0}
    const vertexNormalsMin: SimpleVec3 = {x: 0, y: 0, z: 0}
    const facesMin: SimpleVec3 = {x: 0, y: 0, z: 0}

    const parseLine = (
        destinationArray: number[],
        destinationMax: SimpleVec3,
        destinationMin: SimpleVec3,
        splitLine: number[]
    ): void => {
        const x = splitLine[0]
        const y = splitLine[1]
        const z = splitLine[2]
        if (x > destinationMax.x) {destinationMax.x = x}
        if (y > destinationMax.y) {destinationMax.y = y}
        if (z > destinationMax.z) {destinationMax.z = z}
        if (x < destinationMin.x) {destinationMin.x = x}
        if (y < destinationMin.y) {destinationMin.y = y}
        if (z < destinationMin.z) {destinationMin.z = z}
        destinationArray.push(x, y, z)
    }

    for (const v of sourceLines) {
        if (v.startsWith('v ')) {
            parseLine(vertices, verticesMax, verticesMin, v.split(' ').slice(1, 4).map(parseFloat))
        }
        if (v.startsWith('vn ')) {
            parseLine(vertexNormals, vertexNormalsMax, vertexNormalsMin, v.split(' ').slice(1, 4).map(parseFloat))
        }
        if (v.startsWith('f ')) {
            const fC = v.split(' ')
            fC.shift()
            const fCF = fC.map(f => f.split('//').shift()!)
            parseLine(
                faces,
                facesMax,
                facesMin,
                [parseFloat(fCF[0]) - 1, parseFloat(fCF[1]) - 1, parseFloat(fCF[2]) - 1]
            )
        }
    }

    const modelObject: ModelObject = {
        vertices,
        vertexNormals,
        faces,
        pointInformation: {
            verticesMax, verticesMin, vertexNormalsMax, vertexNormalsMin, facesMax, facesMin
        },
        rects: {
            vertexRect: {
                w: verticesMax.x - verticesMin.x,
                h: verticesMax.y - verticesMin.y,
                d: verticesMax.z - verticesMin.x
            },
            vertexNormalRect: {
                w: vertexNormalsMax.x - vertexNormalsMin.x,
                h: vertexNormalsMax.y - vertexNormalsMin.y,
                d: vertexNormalsMax.z - vertexNormalsMin.x
            },
            faceRect: {
                w: facesMax.x - facesMin.x,
                h: facesMax.y - facesMin.y,
                d: facesMax.z - facesMin.x
            }
        }
    }

    return `
        const component = ${JSON.stringify(modelObject)}\n
        export default component
    `
}
