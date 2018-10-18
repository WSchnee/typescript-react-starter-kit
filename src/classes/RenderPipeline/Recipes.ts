
// Tell WGL how to pull positions out from the position buffer and into the vertexPosition attribute
export const bindPositionRecipe = (
    gl: WebGLRenderingContext,
    positions: {type: number, buffer: WebGLBuffer},
    indices: {type: number, buffer: WebGLBuffer},
    positionAttribLocation: number): void => {

    const numComponents = 3    // Pull out 3 values per iteration
    const type = gl.FLOAT      // Data in the buffer = 32bit floats
    const normalize = false    // Do not normalize
    const stride = 0           // How many bytes to get from one set of values to the next
                                // 0 = use type and numComponents above
    const offset = 0           // Buffer-offset (where to start working from)

    gl.bindBuffer(positions.type, positions.buffer)
    gl.vertexAttribPointer(
        positionAttribLocation,
        numComponents,
        type,
        normalize,
        stride,
        offset
    )
    gl.enableVertexAttribArray(positionAttribLocation)
    // Tell WGL which indices to use to index the vertices
    gl.bindBuffer(indices.type, indices.buffer)

}

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
export const bindColorRecipe = (gl: WebGLRenderingContext, normals: {type: number, buffer: WebGLBuffer}, vertexNormalsAttribLocation: number): void => {
    const numComponents = 3
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.bindBuffer(normals.type, normals.buffer)
    gl.vertexAttribPointer(
        vertexNormalsAttribLocation,
        numComponents,
        type,
        normalize,
        stride,
        offset)
    gl.enableVertexAttribArray(
        vertexNormalsAttribLocation)
}
