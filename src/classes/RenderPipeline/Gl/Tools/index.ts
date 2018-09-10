import WebGLBufferContainer from '../Interfaces/WebGLBufferContainer'
import WebGLShaderSource from '../Interfaces/WebGLShaderSource'
import NotNull from './NotNull'

export const Canvas: HTMLCanvasElement = NotNull(
    () => document.getElementById('glCanvas') as HTMLCanvasElement
    , 'WebGL canvas is undefined'
)

export const Gl: (canvas: HTMLCanvasElement) => WebGLRenderingContext = canvas => NotNull(
    () => canvas.getContext('webgl')
    , 'WebGl context is undefined'
)

export const loadShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader => {
    const shader = NotNull(
        () => gl.createShader(type),
        `Could not load WebGL shader: ${source}`
    )

    gl.shaderSource(shader, source) // Send source to gl shader obj
    gl.compileShader(shader) // Compile shader

    // throw if failed
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getProgramInfoLog(shader)
        gl.deleteShader(shader)
        throw new Error(`Error while compiling shaders: ${info}`)
    }

    return shader
}

export const initShaderProgram = (gl: WebGLRenderingContext, ...shaderSources: WebGLShaderSource[]): WebGLProgram => {
    // Load shaders
    const shaders: WebGLShader[] = shaderSources.map(shader => loadShader(gl, shader.type, shader.source))

    // Create shader program
    const shaderProgram = NotNull(
        () => gl.createProgram(),
        'Could not create WebGL shader program'
    )

    shaders.forEach(shader => gl.attachShader(shaderProgram, shader))
    gl.linkProgram(shaderProgram)

    // Alert if failed
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        throw new Error(`Unable to init shader program ${gl.getProgramInfoLog(shaderProgram)}`)
    }

    return shaderProgram
}

type BufferDataType =
    number | Int8Array | Int16Array |
    Int32Array | Uint8Array | Uint16Array |
    Uint32Array | Uint8ClampedArray | Float32Array |
    Float64Array | DataView | ArrayBuffer

export const initBuffer = (
    gl: WebGLRenderingContext,
    type: number,
    name: string,
    data: BufferDataType,
    drawMethod: number = gl.STATIC_DRAW
): WebGLBufferContainer => {
    const buffer = NotNull(
        () => gl.createBuffer(),
        `Unable to init ${name} buffer`
    )

    gl.bindBuffer(type, buffer)
    gl.bufferData(type, data, drawMethod)

    return {
        buffer,
        type
    }
}
