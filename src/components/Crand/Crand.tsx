import { Actions } from 'actions'
import wasm from 'csource/test.cpp'
import React from 'react'
import { connect } from 'react-redux'
import { State } from 'reducers'

const mapStateToProps = (state: State): {
    initialized: boolean,
    number: number
} => ({
    initialized: state.wasm.initialized,
    number: state.wasm.number
})

const dispatchToProps = {
    initWasm: Actions.initWasm,
    getRandom: Actions.getRandom
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

class Crand extends React.Component<Props> {

    public componentWillMount () {
        wasm.init().then((module: any) => {
            this.props.initWasm({
                initialized: true,
                ...module.exports
            })
        })
    }

    render () {
        return (
            this.props.initialized ? (
            <div>
                <h1>
                    Dice output: {this.props.number}
                </h1>
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
