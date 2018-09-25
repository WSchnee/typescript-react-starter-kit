import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import {Actions} from 'actions'
import React from 'react'
import {connect} from 'react-redux'
import {State} from 'reducers'
import Style from './GlMenu.scss'

const dispatchToProps = {
    goFullScreen: Actions.WindowFullscreen,
    changeScale: Actions.changeObjectScale
}

const mapStateToProps = (state: State) => ({
    isFullScreen: state.windowEvents.isFullScreen,
    fullscreenElement: state.windowEvents.fullscreenElement,
    objectScale: state.gl.objectScale
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
                </div>

                <div className={Style.menuBox}>
                    <div className={Style.menuLine}>
                        <div className={Style.menuVerticalContainer}>
                            <div className={Style.text}>Scale:</div>
                            <input
                                value={this.props.objectScale}
                                className={Style.menuNumber} type="text"
                                onChange={this.handleChangeScale.bind(this)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
        )
    }

    private handleChangeScale (e: React.ChangeEvent<HTMLInputElement>) {
        let value: number | '' = parseFloat(e.currentTarget.value)
        if (isNaN(value)) {value = ''}
        this.props.changeScale(value)
    }

    private goFullscreen (event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
        this.props.goFullScreen(this.props.fullscreenElement)
    }
}

export default connect(mapStateToProps, dispatchToProps)(GlMenu)
