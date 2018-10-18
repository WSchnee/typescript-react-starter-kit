import {mat4} from 'gl-matrix'
import * as Cube from 'primitives/Cube'
// import BunnyModel from 'models/bunny10k.obj'
import {FsSource, VsSource} from 'shaders'
import ModelObject from 'types/ModelObject'
import {Canvas as DefaultCanvas, Gl, initBuffer, initShaderProgram} from './Gl/Tools'
import * as Program from './Program'
import * as Recipe from './Recipes'

// tslint:disable:no-bitwise
class RenderPipeline {

    private SquareRotation: number
    private DeltaTimeSeconds: number
    private Then: number
    private Scale: number[] = [10, 10, 10]

    private Canvas: HTMLCanvasElement
    private Gl: WebGLRenderingContext
    private ShaderProgram: WebGLProgram
    private PipelineBuffers: Program.PipelineBuffers
    private ProgramInfo: Program.ProgramInfo
    private Bunny: ModelObject

    constructor (canvas: HTMLCanvasElement) {
        this.SquareRotation = 0.0
        this.DeltaTimeSeconds = 0.0
        this.Then = 0

        this.Bunny = Cube.toModelObject()

        this.Canvas = canvas || DefaultCanvas
        this.Gl = Gl(this.Canvas)
        this.ShaderProgram = this.initializeShaderProgram()
        this.ProgramInfo = Program.linkBufferLocations(this.Gl, this.ShaderProgram, this.Bunny)
        this.PipelineBuffers = this.initializeBuffers()
    }

    public setScale (scale: number): void {
        const absScale = Math.abs(scale)
        this.Scale = Array<number>().concat(absScale, absScale, absScale)
    }

    public getScale (): number {
        return this.Scale[0]
    }

    public initializePipeline (canvas: HTMLCanvasElement): void {
        this.Canvas = canvas
        this.Gl = Gl(this.Canvas)
        this.ShaderProgram = this.initializeShaderProgram()
        this.ProgramInfo = Program.linkBufferLocations(this.Gl, this.ShaderProgram, this.Bunny)
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
            [-0.0, -(this.Bunny.rects.vertexRect.h / 2) * this.Scale[1], -6.0] // Amount to translate (x,y,z)
        )

        mat4.scale(
            modelViewMatrix,
            modelViewMatrix,
            this.Scale
        )

        // Rotate object
        mat4.rotate(
            modelViewMatrix,
            modelViewMatrix,
            this.SquareRotation,
            [0, 1, 0] // Around Z
        )

        // mat4.translate(
        //     modelViewMatrix, // Destination
        //     modelViewMatrix, // Source
        //     [0.0, 1.0, 6.0] // Amount to translate (x,y,z)
        // )

        const normalMatrix = mat4.create()
        mat4.invert(normalMatrix, modelViewMatrix)
        mat4.transpose(normalMatrix, normalMatrix)

        if (buffers.normals && programInfo.attributeLocations.vertexNormal) {
            Recipe.bindColorRecipe(gl, buffers.normals, programInfo.attributeLocations.vertexNormal)
        }
        Recipe.bindPositionRecipe(gl, buffers.position, buffers.indices, programInfo.attributeLocations.vertexPosition)

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

    private initializeBuffers (): Program.PipelineBuffers {
        const gl = this.Gl
        return {
            position: initBuffer(gl, gl.ARRAY_BUFFER, 'position', new Float32Array(this.Bunny.vertices)),
            color: undefined,
            // color: initBuffer(gl, gl.ARRAY_BUFFER, 'color', new Float32Array(Cube.getColors())),
            indices: initBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, 'index', new Uint16Array(this.Bunny.faces)),
            normals: this.Bunny.vertexNormals ? initBuffer(gl, gl.ARRAY_BUFFER, 'normal', new Float32Array(this.Bunny.vertexNormals)) : undefined
        }
    }
}

export default RenderPipeline
