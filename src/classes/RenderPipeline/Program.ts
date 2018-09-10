import WebGLBufferContainer from './Gl/Interfaces/WebGLBufferContainer'

export interface ProgramInfo {
    program: WebGLProgram,
    attributeLocations: {
        vertexPosition: number
        vertexColor: number
    },
    uniformLocations: {
        projectionMatrix: WebGLUniformLocation,
        modelViewMatrix: WebGLUniformLocation
    }
}

export interface PipelineBuffers {
    position: WebGLBufferContainer,
    color?: WebGLBufferContainer,
    indices: WebGLBufferContainer
}
