import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import {Actions} from 'actions'
import React from 'react'
import {connect} from 'react-redux'
import {State} from 'reducers'
import Style from './GlMenu.scss'

const dispatchToProps = {
    goFullScreen: Actions.WindowFullscreen,
    changeScale: Actions.changeObjectScale,
    changePosition: Actions.changeObjectPosition
}

const mapStateToProps = (state: State) => ({
    isFullScreen: state.windowEvents.isFullScreen,
    fullscreenElement: state.windowEvents.fullscreenElement,
    objectScale: state.gl.objectScale,
    minObjScale: state.gl.minObjectScale,
    maxObjScale: state.gl.maxObjectScale,
    position: state.gl.objectPosition
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

                <div className={Style.menuBox} onClick={e => e.stopPropagation()}>
                    {this.renderScaleElements()}
                    {this.renderPositionElements()}
                </div>
            </div>
        </div>
        )
    }

    private renderPositionElements (): JSX.Element {
        return (
            <div>
                <div className={Style.menuTitleLine}>
                    <div className={Style.text}>Position:</div>
                </div>
                <div className={Style.menuTitleLine}>
                    <div className={Style.text}>X</div>
                    <input
                        value={this.props.position.x}
                        className={''.concat(Style.menuNumber, ' ', Style.input)} type="text"
                        onChange={this.handleChangePosition.bind(this, 'x')}
                    />
                    <div className={Style.text}>Y</div>
                    <input
                        value={this.props.position.y}
                        className={''.concat(Style.menuNumber, ' ', Style.input)} type="text"
                        onChange={this.handleChangePosition.bind(this, 'y')}
                    />
                    <div className={Style.text}>Z</div>
                    <input
                        value={this.props.position.z}
                        className={''.concat(Style.menuNumber, ' ', Style.input)} type="text"
                        onChange={this.handleChangePosition.bind(this, 'z')}
                    />
                </div>
            </div>
        )
    }

    private renderScaleElements (): JSX.Element {
        return (
            <div className={Style.menuLine}>
                <div className={Style.menuVerticalContainer}>
                    <div className={Style.text}>Scale:</div>
                    <input
                        value={this.props.objectScale}
                        className={''.concat(Style.menuNumber, ' ', Style.input)} type="text"
                        onChange={this.handleChangeScale.bind(this)}
                    />
                </div>
                <div className={Style.menuVerticalContainer}>
                    <input
                        type="range"
                        min={this.props.minObjScale}
                        max={this.props.maxObjScale}
                        value={this.props.objectScale}
                        className={Style.slider}
                        onChange={this.handleChangeScale.bind(this)}
                    />
                </div>
            </div>
        )
    }

    private handleChangeScale (e: React.ChangeEvent<HTMLInputElement>): void {
        const value = this.validateNumber(e.currentTarget.value)
        this.props.changeScale(value)
    }

    private handleChangePosition (angle: 'x' | 'y' | 'z', e: React.ChangeEvent<HTMLInputElement>): void {
        const value = this.validateNumber(e.currentTarget.value)
        this.props.changePosition({angle, new: value})
    }

    private validateNumber (str: string): number | '' {
        let value: number | '' = parseFloat(str)
        if (isNaN(value)) {value = ''}
        return value
    }

    private goFullscreen (event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
        this.props.goFullScreen(this.props.fullscreenElement)
    }
}

export default connect(mapStateToProps, dispatchToProps)(GlMenu)
