export type TMessageType = 'registrations' | 'update' | 'delete'

export type TMessage = {
  showError?: boolean
  showSuccess?: boolean
  messageSuccess: string
  messageError: string
  callback?: () => void
}

export type TGetMessageByActionMap = {
  [key in TMessageType]: TMessage
}

export type TGetMessageByActionParamsAction = { hasError?: boolean; hasSuccess?: boolean; callback?: () => void }

export type TGetMessageByActionParamsActionType = 'get' | 'patch' | 'delete'

export type TGetMessageByActionParams = {
  type: 'error' | 'success'
  action: {
    [key in TGetMessageByActionParamsActionType]: TGetMessageByActionParamsAction
  }
}

export type TGetMessageByActionReturn = {
  message: string
  callback?: () => void
}
