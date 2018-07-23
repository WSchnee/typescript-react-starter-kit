import CrandActions from './crand'
import DemoActions from './version'

export const Actions = {
    ...DemoActions,
    ...CrandActions
}

export type Action = typeof Actions[keyof typeof Actions]
