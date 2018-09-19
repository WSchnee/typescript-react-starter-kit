import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import {Actions} from 'actions'
import React from 'react'
import {connect} from 'react-redux'
import {State} from 'reducers'
import Style from './GlMenu.scss'

const dispatchToProps = {
    goFullScreen: Actions.WindowFullscreen
}

const mapStateToProps = (state: State) => ({
    isFullScreen: state.windowEvents.isFullScreen,
    fullscreenElement: state.windowEvents.fullscreenElement
})

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps
class GlMenu extends React.Component<Props> {

    public render (): JSX.Element {
        return (
        <div
            className={Style.wrapper}
            onDoubleClick={e => this.goFullscreen(e)}
        >
            <div className={Style.menu}>
                <div
                    className={Style.button}
                    onClick={e => this.goFullscreen(e)}
                >
                    <I icon="expand" />

                    {/* <div className={}>Fullscreen</div> */}
                </div>
            </div>
        </div>
        )
    }

    private goFullscreen (event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
        this.props.goFullScreen(this.props.fullscreenElement)
    }
}

export default connect(mapStateToProps, dispatchToProps)(GlMenu)
