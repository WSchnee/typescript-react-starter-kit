import {Actions} from 'actions'
import RenderPipeline from 'classes/RenderPipeline'
import React from 'react'
import { connect } from 'react-redux'
import { State } from 'reducers'

const mapStateToProps = (state: State) => ({
    initialized: state.gl.initialized,
    width: state.windowEvents.width,
    height: state.windowEvents.height
})

const dispatchToProps = {
    initCanvas: Actions.initGlCanvas
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

class GlCanvas extends React.PureComponent<Props> {

    // private RenderPipeline: RenderPipeline | undefined
    private Canvas: HTMLCanvasElement = document.createElement('canvas')
    private RenderPipeline: RenderPipeline | undefined = undefined

    public componentWillReceiveProps (nextProps: Props): void {
        if (this.props.initialized === false && nextProps.initialized === true) {
            this.RenderPipeline = new RenderPipeline(this.Canvas)
            const task = async () =>
                requestAnimationFrame(this.RenderPipeline!.render.bind(this.RenderPipeline))
            task()
        }
    }

    public render () {
       return <canvas width={this.props.width} height={this.props.height} ref={c => this.Canvas = c!}/>
    }

    public componentDidMount () {
        if (!this.props.initialized) {
            this.props.initCanvas()
        }
    }

    public componentWillUnmount () {
        if (this.props.initialized) {
            this.props.initCanvas()
        }
    }

    // public initializeCanvas (canvasElement: HTMLCanvasElement) {
    //     if (this.props.initialized) { return }
    //     this.Canvas = canvasElement
    //     this.props.initCanvas(canvasElement)
    // }

}

export default connect(
    mapStateToProps,
    dispatchToProps
)(GlCanvas)
