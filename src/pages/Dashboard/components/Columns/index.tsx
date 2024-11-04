import { FC } from 'react'

import * as Styled from './styles'
import { RegistrationCard } from '../RegistrationCard'
import { ALL_COLUMNS } from './constants'
import { IColumnsProps } from './types'

export const Collumns: FC<IColumnsProps> = ({ registrations, actions, disabled }) => (
  <Styled.Container>
    {ALL_COLUMNS.map(collum => {
      return (
        <Styled.Column $status={collum.status} key={collum.title}>
          <>
            <Styled.TitleColumn $status={collum.status}>{collum.title}</Styled.TitleColumn>
            <Styled.CollumContent>
              {registrations?.map(
                contact =>
                  contact.status === collum.status && (
                    <RegistrationCard disabled={disabled} onActions={actions} contact={contact} key={contact.id} />
                  ),
              )}
            </Styled.CollumContent>
          </>
        </Styled.Column>
      )
    })}
  </Styled.Container>
)
