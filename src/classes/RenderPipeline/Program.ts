import WebGLBufferContainer from './Gl/Interfaces/WebGLBufferContainer'

export interface ProgramInfo {
    program: WebGLProgram,
    attributeLocations: {
        vertexPosition: number
        vertexColor: number
        vertexNormal: number
    },
    uniformLocations: {
        projectionMatrix: WebGLUniformLocation,
        modelViewMatrix: WebGLUniformLocation
        normalMatrix: WebGLUniformLocation
    }
}

export interface PipelineBuffers {
    position: WebGLBufferContainer,
    color?: WebGLBufferContainer,
    indices: WebGLBufferContainer,
    normals: WebGLBufferContainer
}
