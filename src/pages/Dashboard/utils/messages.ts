import { NOTIFY_ERRORS, NOTIFY_SUCCESS } from '../contants'
import { TGetMessageByActionMap, TGetMessageByActionParams, TGetMessageByActionReturn, TMessageType } from './type'

export const getMessageByAction = ({ action, type }: TGetMessageByActionParams): TGetMessageByActionReturn => {
  const messagesMap: TGetMessageByActionMap = {
    registrations: {
      showError: action.get.hasError,
      showSuccess: action.get.hasSuccess,
      messageError: NOTIFY_ERRORS.registrations.message,
      messageSuccess: NOTIFY_SUCCESS.registrations.message,
      callback: action.get.callback,
    },
    update: {
      showError: action.patch.hasError,
      showSuccess: action.patch.hasSuccess,
      messageError: NOTIFY_ERRORS.update.message,
      messageSuccess: NOTIFY_SUCCESS.update.message,
      callback: action.patch.callback,
    },
    delete: {
      showError: action.delete.hasError,
      showSuccess: action.delete.hasSuccess,
      messageError: NOTIFY_ERRORS.delete.message,
      messageSuccess: NOTIFY_SUCCESS.delete.message,
      callback: action.delete.callback,
    },
  }

  const messageType = Object.keys(messagesMap).find(
    key => messagesMap[key as TMessageType][type === 'success' ? 'showSuccess' : 'showError'],
  ) as TMessageType
  const messageObject = messagesMap[messageType]

  const response = {
    message: type === 'success' ? messageObject.messageSuccess : messageObject.messageError,
    callback: messageObject.callback,
  }

  return response
}
