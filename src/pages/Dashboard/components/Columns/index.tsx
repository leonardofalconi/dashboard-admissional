import { FC } from 'react'

import * as Styled from './styles'
import { RegistrationCard } from '../RegistrationCard'
import { ALL_COLUMNS } from './constants'
import { IColumnsProps } from './types'

export const Collumns: FC<IColumnsProps> = ({ registrations }) => (
  <Styled.Container>
    {ALL_COLUMNS.map(collum => {
      return (
        <Styled.Column $status={collum.status} key={collum.title}>
          <>
            <Styled.TitleColumn $status={collum.status}>{collum.title}</Styled.TitleColumn>
            <Styled.CollumContent>
              {registrations?.map(
                contact => contact.status === collum.status && <RegistrationCard contacts={contact} key={contact.id} />,
              )}
            </Styled.CollumContent>
          </>
        </Styled.Column>
      )
    })}
  </Styled.Container>
)
