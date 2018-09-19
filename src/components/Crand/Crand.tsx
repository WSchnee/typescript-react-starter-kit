import { Actions } from 'actions'
import wasm from 'csource/test.cpp'
import React from 'react'
import ReactDropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { State } from 'reducers'

const mapStateToProps = (state: State) => ({
    initialized: state.wasm.initialized,
    number: state.wasm.number,
    memory: state.wasm.memory,
    memoryManager: state.wasm.memoryManager
})

const dispatchToProps = {
    initWasm: Actions.initWasm,
    getRandom: Actions.getRandom,
    bufferArray: Actions.bufferArray,
    dropFiles: Actions.dropFiles
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

class Crand extends React.Component<Props> {

    public componentWillMount (): void {
        wasm.init().then((module: any) => {
            this.props.initWasm({
                initialized: true,
                module
            })
        })
    }

    public componentWillUnmount (): void {
        if (this.props.initialized)
            this.props.memoryManager.free(this.props.memory)
    }

    public render (): JSX.Element {
        // let buffer: ArrayBuffer
        return (
            this.props.initialized ? (
            <div>
                <h1>
                    Dice output: {this.props.number.toString()}
                </h1>
                <button
                    type="button"
                    onClick={() => this.props.getRandom()}>Throw die!
                </button>
                <ReactDropzone onDrop={files => this.props.dropFiles(files[0])}>
                    DropZone
                </ReactDropzone>
                <button
                    type="button"
                    onClick={() => this.props.getRandom()}>Throw die!
                </button>
            </div>
            ) :
            <h1>
                WASM not loaded
            </h1>
        )
    }
}

export default connect(
    mapStateToProps,
    dispatchToProps
)(Crand)
