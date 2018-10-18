import ModelObject from 'types/ModelObject'
import WebGLBufferContainer from './Gl/Interfaces/WebGLBufferContainer'

export interface ProgramInfo {
    program: WebGLProgram,
    attributeLocations: {
        vertexPosition: number
        vertexColor?: number
        vertexNormal?: number
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
    normals?: WebGLBufferContainer
}

export const linkBufferLocations = (gl: WebGLRenderingContext, shaderProgram: WebGLProgram, model: ModelObject): ProgramInfo => {
    return {
        program: shaderProgram,
        attributeLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexNormal: model.vertexNormals ? gl.getAttribLocation(shaderProgram, 'aVertexNormal') : undefined
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix')!,
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')!,
            normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix')!
        }
    }
}
