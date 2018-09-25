declare module '*.cpp' {
    const content: any
    export default content
}

declare module '*.glsl' {
    const content: string
    export default content
}

declare module '*.obj' {
    const content: {
        vertices: number[],
        vertexNormals: number[],
        faces: number[]
        pointInformation: {
            verticesMax: {
                x: number,
                y: number,
                z: number
            }
            verticesMin: {
                x: number,
                y: number,
                z: number
            },
            vertexNormalsMax: {
                x: number,
                y: number,
                z: number
            }
            vertexNormalsMin: {
                x: number,
                y: number,
                z: number
            },
            facesMax: {
                x: number,
                y: number,
                z: number
            },
            facesMin: {
                x: number,
                y: number,
                z: number
            }
        }
        rects: {
            vertexRect: {
                w: number,
                h: number,
                d: number
            },
            vertexNormalRect: {
                w: number,
                h: number,
                d: number
            },
            faceRect: {
                w: number,
                h: number,
                d: number
            }
        }
    }
    export default content
}

declare module '*.bmp' {
    const content: any
    export default content
}
