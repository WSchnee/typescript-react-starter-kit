import {PipelineBuffers, ProgramInfo} from '../../Program'

// // // Tell WGL how to pull pcolor out from the color buffer and into the vertexPosition attribute
// {
//     const numComponents = 4    // Pull out 4 values per iteration
//     const type = gl.FLOAT      // Data in the buffer = 32bit floats
//     const normalize = false    // Do not normalize
//     const stride = 0           // How many bytes to get from one set of values to the next
//                                // 0 = use type and numComponents above
//     const offset = 0           // Buffer-offset (where to start working from)

//     gl.bindBuffer(buffers.color.type, buffers.color.buffer)
//     gl.vertexAttribPointer(programInfo.attributeLocations.vertexColor, numComponents, type, normalize, stride, offset)
//     gl.enableVertexAttribArray(programInfo.attributeLocations.vertexColor)
// }

// Tell WebGL how to pull out the normals from
// the normal buffer into the vertexNormal attribute.
export const setupColorRecipe = (gl: WebGLRenderingContext, buffers: PipelineBuffers, programInfo: ProgramInfo): void => {
    const numComponents = 3
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.bindBuffer(buffers.normals.type, buffers.normals.buffer)
    gl.vertexAttribPointer(
        programInfo.attributeLocations.vertexNormal!,
        numComponents,
        type,
        normalize,
        stride,
        offset)
    gl.enableVertexAttribArray(
        programInfo.attributeLocations.vertexNormal!)
}

// Tell WGL how to pull positions out from the position buffer and into the vertexPosition attribute
export const setupPositionRecipe = (gl: WebGLRenderingContext, buffers: PipelineBuffers, programInfo: ProgramInfo): void => {
    const numComponents = 3    // Pull out 3 values per iteration
    const type = gl.FLOAT      // Data in the buffer = 32bit floats
    const normalize = false    // Do not normalize
    const stride = 0           // How many bytes to get from one set of values to the next
                                // 0 = use type and numComponents above
    const offset = 0           // Buffer-offset (where to start working from)

    gl.bindBuffer(buffers.position.type, buffers.position.buffer)
    gl.vertexAttribPointer(
        programInfo.attributeLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
    )
    gl.enableVertexAttribArray(programInfo.attributeLocations.vertexPosition)
}

// // tell webgl how to pull out the texture coordinates from buffer
// export const setupTextureRecipe = (gl: WebGLRenderingContext, buffers: PipelineBuffers, programInfo: ProgramInfo) => {
//     const num = 2 // every coordinate composed of 2 values
//     const type = gl.FLOAT // the data in the buffer is 32 bit float
//     const normalize = false // don't normalize
//     const stride = 0 // how many bytes to get from one set to the next
//     const offset = 0 // how many bytes inside the buffer to start from
//     gl.bindBuffer(buffers.texture!.type, buffers.texture!.buffer)
//     const vertexTextureCoords = programInfo.attributeLocations.vertexTexture!
//     gl.vertexAttribPointer(vertexTextureCoords, num, type, normalize, stride, offset)
//     gl.enableVertexAttribArray(vertexTextureCoords)
// }
