import { Actions } from 'actions'
import React from 'react'
import { connect } from 'react-redux'
import {State} from 'reducers'

const dispatchToProps = {
    keyDown: Actions.keyDown,
    keyUp: Actions.keyUp,
    keyPressed: Actions.keyPressed,
    windowResize: Actions.WindowResized
}

const mapStateToProps = (state: State) => ({
    width: state.windowEvents.width,
    height: state.windowEvents.height
})

type Props = ReturnType<typeof mapStateToProps>  &typeof dispatchToProps

class WindowEventListener extends React.Component<Props> {
    private ListenKeys: string[] = [
        'ArrowDown',
        'ArrowUp',
        'ArrowLeft',
        'ArrowRight'
    ]

    public componentWillMount (): void {
        document.addEventListener('keydown', (k: KeyboardEvent) => this.hijackKeyEvent(k, this.props.keyDown))
        document.addEventListener('keyup', (k: KeyboardEvent) => this.hijackKeyEvent(k, this.props.keyUp))
        document.addEventListener('keypressed', (k: KeyboardEvent) => this.hijackKeyEvent(k, this.props.keyPressed))
        window.addEventListener('resize', () => this.props.windowResize())
    }

    public componentWillUnmount (): void {
        document.removeEventListener('keydown', (k: KeyboardEvent) => this.hijackKeyEvent(k, this.props.keyDown))
        document.removeEventListener('keyup', (k: KeyboardEvent) => this.hijackKeyEvent(k, this.props.keyUp))
        document.removeEventListener('keypressed', (k: KeyboardEvent) => this.hijackKeyEvent(k, this.props.keyPressed))
        window.removeEventListener('resize', () => this.props.windowResize())
    }

    public render (): JSX.Element {
        return <div/>
    }

    private hijackKeyEvent (k: KeyboardEvent, func: (payload: KeyboardEvent) => any): void {
        if (this.ListenKeys.includes(k.key)) {
            k.preventDefault()
            k.stopPropagation()
            func(k)
        }
    }
}

export default connect(mapStateToProps, dispatchToProps)(WindowEventListener)
