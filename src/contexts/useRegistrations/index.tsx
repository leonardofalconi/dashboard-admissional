import { FC, createContext, useContext, useState } from 'react'

import { IContact } from '~/entities/contact'

import { IRegistrationsContext } from './types'

const RegistrationsContext = createContext<IRegistrationsContext>({} as IRegistrationsContext)

export const RegistrationsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrations, setRegistrations] = useState<IContact[]>([])

  return (
    <RegistrationsContext.Provider value={{ registrations, setRegistrations }}>
      {children}
    </RegistrationsContext.Provider>
  )
}

export const useRegistrationsContext = () => useContext(RegistrationsContext)
