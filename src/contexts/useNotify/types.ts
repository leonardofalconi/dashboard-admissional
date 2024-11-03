export type TNotifyContextSetNotifyParams = { title: string; message: string; status: 'success' | 'error' }

export interface INotifyContext {
  setNotify: (params: TNotifyContextSetNotifyParams) => void
}
