export type TRegistrationCardActionsButton = 'approve' | 'disapprove' | 'review' | 'delete'

export type TRegistrationCardActionsButtonMap = { [key in TRegistrationCardActionsButton]: string }

export type TRegistrationColumn = 'approved' | 'review' | 'reproved'

export type TRegistrationColumnsMap = { [key in TRegistrationColumn]: string }

export type TNotifyMessageType = 'registrations' | 'update' | 'delete' | 'post'

export type TNotifyErrorMessage = { [key in TNotifyMessageType]: { message: string } }

export type TNotifySuccessMessage = { [key in TNotifyMessageType]: { message: string } }
