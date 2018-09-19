import {mat4} from 'gl-matrix'
import BunnyModel from 'models/bunny10k.obj'
import {FsSource, VsSource} from 'shaders'
import {Canvas as DefaultCanvas, Gl, initBuffer, initShaderProgram} from './Gl/Tools'
// import * as Cube from './Primitives/Cube'
import {PipelineBuffers, ProgramInfo} from './Program'

// tslint:disable:no-bitwise
class RenderPipeline {

    private SquareRotation: number
    private DeltaTimeSeconds: number
    private Then: number

    private Canvas: HTMLCanvasElement
    private Gl: WebGLRenderingContext
    private ShaderProgram: WebGLProgram
    private PipelineBuffers: PipelineBuffers
    private ProgramInfo: ProgramInfo
    private Bunny: {vertices: number[], vertexNormals: number[], faces: number[]}

    constructor (canvas: HTMLCanvasElement) {
        this.SquareRotation = 0.0
        this.DeltaTimeSeconds = 0.0
        this.Then = 0

        this.Bunny = (BunnyModel as any)

        this.Canvas = canvas || DefaultCanvas
        this.Gl = Gl(this.Canvas)
        this.ShaderProgram = this.initializeShaderProgram()
        this.ProgramInfo = this.linkBufferLocations()
        this.PipelineBuffers = this.initializeBuffers()
    }

    public initializePipeline (canvas: HTMLCanvasElement) {
        this.Canvas = canvas
        this.Gl = Gl(this.Canvas)
        this.ShaderProgram = this.initializeShaderProgram()
        this.ProgramInfo = this.linkBufferLocations()
        this.PipelineBuffers = this.initializeBuffers()
    }

    public render (now: number): void {
        now *= 0.001
        this.DeltaTimeSeconds = now - this.Then
        this.Then = now

        this.drawScene()
        requestAnimationFrame(this.render.bind(this))
    }

    private drawScene (): void {
        const gl = this.Gl
        const buffers = this.PipelineBuffers
        const programInfo = this.ProgramInfo

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

        gl.clearColor(0.0, 0.0, 0.0, 1.0 )         // Clear to black opaque (buffer?)
        gl.clearDepth(1.0)                         // Clear everything
        gl.enable(gl.DEPTH_TEST)                   // Enable depth testing
        gl.depthFunc(gl.LEQUAL)                    // Near things obscure far things

        // Clear canvas before drawing
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        const fieldOfView = 45 * Math.PI / 180  // 45 deg in radians
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
        const zNear = 0.1 // How close to clip
        const zFar = 100.0 // How far to clip
        const projectionMatrix = mat4.create()

        mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar) // create perspective matrix

        // Set drawing to Identity
        const modelViewMatrix = mat4.create()
        // Move drawing position to where we want to draw
        mat4.translate(
            modelViewMatrix, // Destination
            modelViewMatrix, // Source
            [-0.0, -1.0, -6.0] // Amount to translate (x,y,z)
        )

        // Rotate object
        mat4.rotate(
            modelViewMatrix,
            modelViewMatrix,
            this.SquareRotation,
            [0, 1, 0] // Around Z
        )
        mat4.scale(
            modelViewMatrix,
            modelViewMatrix,
            [10, 10, 10]
        )

        const normalMatrix = mat4.create()
        mat4.invert(normalMatrix, modelViewMatrix)
        mat4.transpose(normalMatrix, normalMatrix)

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
        {
            const numComponents = 3
            const type = gl.FLOAT
            const normalize = false
            const stride = 0
            const offset = 0
            gl.bindBuffer(buffers.normals.type, buffers.normals.buffer)
            gl.vertexAttribPointer(
                programInfo.attributeLocations.vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset)
            gl.enableVertexAttribArray(
                programInfo.attributeLocations.vertexNormal)
        }

        // Tell WGL how to pull positions out from the position buffer and into the vertexPosition attribute
        {
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

        // Tell WGL which indices to use to index the vertices
        gl.bindBuffer(buffers.indices.type, buffers.indices.buffer)

        // Tell WGL to use supplied shader program
        gl.useProgram(programInfo.program)

        // set shader uniforms (globals/constants) (Faces?)
        gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix)
        gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)
        {
            const offset = 0
            const facesCount = this.Bunny.faces.length
            const type = gl.UNSIGNED_SHORT
            gl.drawElements(gl.TRIANGLES, facesCount, type, offset)
        }
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.normalMatrix,
            false,
            normalMatrix)

        this.SquareRotation += this.DeltaTimeSeconds

    }

    private initializeShaderProgram (): WebGLProgram {
        const gl = this.Gl
        return initShaderProgram(
            gl,
            {source: VsSource, type: gl.VERTEX_SHADER},
            {source: FsSource, type: gl.FRAGMENT_SHADER}
        )
    }

    private linkBufferLocations (): ProgramInfo {
        const gl = this.Gl
        const program = this.ShaderProgram
        return {
            program,
            attributeLocations: {
                vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
                vertexColor: gl.getAttribLocation(program, 'aVertexColor'),
                vertexNormal: gl.getAttribLocation(program, 'aVertexNormal')
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix')!,
                modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix')!,
                normalMatrix: gl.getUniformLocation(program, 'uNormalMatrix')!
            }
        }
    }

    private initializeBuffers (): PipelineBuffers {
        const gl = this.Gl
        return {
            position: initBuffer(gl, gl.ARRAY_BUFFER, 'position', new Float32Array(this.Bunny.vertices)),
            color: undefined,
            // color: initBuffer(gl, gl.ARRAY_BUFFER, 'color', new Float32Array(Cube.getColors())),
            indices: initBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, 'index', new Uint16Array(this.Bunny.faces)),
            normals: initBuffer(gl, gl.ARRAY_BUFFER, 'normal', new Float32Array(this.Bunny.vertexNormals))
        }
    }
}

export default RenderPipeline
