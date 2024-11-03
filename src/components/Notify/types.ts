export interface INotifyProps {
  title: string
  message: string
  status: 'success' | 'error'
}

export type TNotifyContainerStyled = { $backgroundColor: string }
