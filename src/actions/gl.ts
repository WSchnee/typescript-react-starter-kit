import RenderPipeline from 'classes/RenderPipeline'
import { createAction } from './actionCreator'

const GlActions = {
    initGlCanvas: createAction<'INIT_GL_CANVAS'>('INIT_GL_CANVAS'),
    glRegisterPipeline: createAction<'GL_REGISTER_PIPELINE', RenderPipeline>('GL_REGISTER_PIPELINE'),
    changeObjectScale: createAction<'GL_CHANGE_OBJECT_SCALE', number | ''>('GL_CHANGE_OBJECT_SCALE'),
    toggleObjectLight: createAction<'GL_TOGGLE_OBJECT_LIGHT', number>('GL_TOGGLE_OBJECT_LIGHT')
}

export default GlActions
