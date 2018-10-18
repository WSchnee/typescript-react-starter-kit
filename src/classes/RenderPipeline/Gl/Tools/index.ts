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

export const loadTexture =  (gl: WebGLRenderingContext, url: string) => {
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // Because images have to be download over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0
    const internalFormat = gl.RGBA
    const width = 1
    const height = 1
    const border = 0
    const srcFormat = gl.RGBA
    const srcType = gl.UNSIGNED_BYTE
    const pixel = new Uint8Array([0, 0, 255, 255])  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel)

    const image = new Image()
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    srcFormat, srcType, image)

      // WebGL1 has different requirements for power of 2 images
      // vs non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
         // Yes, it's a power of 2. Generate mips.
         gl.generateMipmap(gl.TEXTURE_2D)
      } else {
         // No, it's not a power of 2. Turn of mips and set
         // wrapping to clamp to edge
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      }
    }
    image.src = url
    return NotNull(() => texture, `Could not load texture with source: ${image.src}`)
}

const isPowerOf2 = (value: number) => {
    // tslint:disable-next-line:no-bitwise
    return (value & (value - 1)) === 0
}
