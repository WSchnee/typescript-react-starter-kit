export const Default: SimpleVec3 = {
    x:  0,
    y:  0,
    z:  0
}

export default interface SimpleVec3 {
    x: number,
    y: number,
    z: number
}

// Allows setting value to empty ''
export interface DefaultableSimpleVec3 {
    x: number | '',
    y: number | '',
    z: number | ''
}
