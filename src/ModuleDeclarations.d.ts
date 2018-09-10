declare module '*.cpp' {
    const content: any
    export default content
}

declare module '*.glsl' {
    const content: string
    export default content
}

declare module '*.obj' {
    const content: {vertices: number[], vertexNormals: number[], faces: number[]}
    export default content
}
