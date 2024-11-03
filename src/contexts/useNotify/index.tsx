import { FC, createContext, useCallback, useContext, useRef, useState } from 'react'

import { Notify } from '~/components/Notify'

import { NOTIFY_TIMER_IN_SECONDS } from './constants'
import { INotifyContext, TNotifyContextSetNotifyParams } from './types'

const NotifyContext = createContext<INotifyContext>({} as INotifyContext)

export const NotifyProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifyState, setNotifyState] = useState<TNotifyContextSetNotifyParams>()

  const timerKey = useRef<NodeJS.Timeout>()

  const setNotify = useCallback((params: TNotifyContextSetNotifyParams) => {
    setNotifyState(params)

    clearTimeout(timerKey.current)

    timerKey.current = setTimeout(() => setNotifyState(undefined), NOTIFY_TIMER_IN_SECONDS * 1000)
  }, [])

  return (
    <NotifyContext.Provider value={{ setNotify }}>
      {notifyState && <Notify {...notifyState} />}

      {children}
    </NotifyContext.Provider>
  )
}

export const useNotifyContext = () => useContext(NotifyContext)
