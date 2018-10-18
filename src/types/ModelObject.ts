import SimpleRect, {Default as RectDefault} from './SimpleRect'
import SimpleVec3, { Default as Vec3Default} from './SimpleVec3'

export const DefaultObjPointInformation = {
    verticesMax: Vec3Default,
    verticesMin: Vec3Default,
    vertexNormalsMax: Vec3Default,
    vertexNormalsMin: Vec3Default,
    facesMax: Vec3Default,
    facesMin: Vec3Default
}

export const DefaultRects = {
    vertexRect: RectDefault,
    vertexNormalRect: RectDefault,
    faceRect: RectDefault
}

export const Default: ModelObject = {
    vertices: [0, 0, 0],
    vertexNormals: [0, 0, 0],
    faces: [0, 0, 0],
    textureCoordinates: [0, 0, 0],
    pointInformation: DefaultObjPointInformation,
    rects: DefaultRects
}

// To contain special points such as min and max coords
export interface ObjPointInformation {
    verticesMax: SimpleVec3,
    verticesMin: SimpleVec3,
    vertexNormalsMax: SimpleVec3,
    vertexNormalsMin: SimpleVec3,
    facesMax: SimpleVec3,
    facesMin: SimpleVec3
}

export interface ObjRects {
    vertexRect: SimpleRect,
    vertexNormalRect: SimpleRect,
    faceRect: SimpleRect
}

export default interface ModelObject {
    vertices: number[],
    vertexNormals: number[],
    faces: number[]
    textureCoordinates: number[],
    pointInformation: ObjPointInformation
    rects: ObjRects
}
