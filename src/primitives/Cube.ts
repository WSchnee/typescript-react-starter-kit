import ModelObject from '../types/ModelObject'

export const Positions = [
    // Front face
    -1.0, -1.0,  1.0,
    1.0, -1.0,  1.0,
    1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,
    1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0,  1.0,  1.0,
    1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
]

// This array defines each face as two triangles, using the
// indices into the vertex array to specify each triangle's
// position.
export const Indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23   // left
]

// Colors
export const FaceColors = [
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0]    // Left face: purple
]

export const getColors = (): number[] => {
    let colors: number[] = []

    for (const c of FaceColors) {
        // Repeat each color four times for the four vertices of the face
        colors = colors.concat(c, c, c, c)
    }

    return colors
}

export const toModelObject = (): ModelObject => {
    const verticesMax = {x: 1 , y: 1, z: 1}
    const verticesMin = {x: -1 , y: -1, z: -1}
    const facesMax = {x: 20 , y: 22, z: 23}
    const facesMin = {x: 0 , y: 0, z: 0}

    return {
        vertices: Positions,
        faces: Indices,
        color: getColors(),
        pointInformation: {
            verticesMax,
            verticesMin,
            facesMax,
            facesMin
        },
        rects: {
            vertexRect: {
                w: verticesMax.x - verticesMin.x,
                h: verticesMax.y - verticesMin.y,
                d: verticesMax.z - verticesMin.x
            },
            faceRect: {
                w: facesMax.x - facesMin.x,
                h: facesMax.y - facesMin.y,
                d: facesMax.z - facesMin.x
            }
        }
    }
}
