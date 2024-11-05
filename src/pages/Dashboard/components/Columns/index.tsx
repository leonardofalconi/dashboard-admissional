import { FC, memo } from 'react'

import * as Styled from './styles'
import { RegistrationCard } from '../RegistrationCard'
import { ALL_COLUMNS } from './constants'
import { IColumnsProps } from './types'

const Component: FC<IColumnsProps> = ({ registrations, action, disabled }) => (
  <Styled.Container>
    {ALL_COLUMNS.map(column => {
      return (
        <Styled.Column
          data-testid={`test-column-${column.status.toLowerCase()}`}
          $status={column.status}
          key={column.title}
        >
          <>
            <Styled.TitleColumn $status={column.status}>{column.title}</Styled.TitleColumn>
            <Styled.CollumContent>
              {registrations?.map(
                contact =>
                  contact.status === column.status && (
                    <RegistrationCard disabled={disabled} onActions={action} contact={contact} key={contact.id} />
                  ),
              )}
            </Styled.CollumContent>
          </>
        </Styled.Column>
      )
    })}
  </Styled.Container>
)

export const Collumns = memo(Component)
