import {Actions} from 'actions'
import React from 'react'
import {connect} from 'react-redux'
import {State} from 'reducers'
// import Crand from '../Crand'
import GlCanvas from '../GlCanvas'
import GlMenu from '../GlMenu'
import Style from './ComponentWindow.scss'

const dispatchToProps = {
    goFullScreen: Actions.WindowFullscreen,
    registerFullscreenElement: Actions.RegisterFullscreenElement
}

const mapStateToProps = (state: State) => ({
    isFullScreen: state.windowEvents.isFullScreen
})

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps

class ComponentWindow extends React.Component<Props> {

    public render (): JSX.Element {
        return (<div className={Style.layerStyle} ref={e => this.props.registerFullscreenElement(e as HTMLElement)}>
            <GlCanvas />
            <GlMenu />
        </div>)
    }
}

export default connect(mapStateToProps, dispatchToProps)(ComponentWindow)
