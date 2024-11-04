import { FC, memo } from 'react'
import { HiOutlineCalendar, HiOutlineMail, HiOutlineTrash, HiOutlineUser } from 'react-icons/hi'

import { IconButton } from '~/components/IconButton'
import { SmallButton } from '~/components/SmallButton'

import * as Styled from './styles'
import { IRegistrationCardProps } from './types'

const Component: FC<IRegistrationCardProps> = ({ contact, onActions, disabled }) => (
  <Styled.Card>
    <Styled.IconAndText>
      <HiOutlineUser />
      <h3>{contact.employeeName}</h3>
    </Styled.IconAndText>
    <Styled.IconAndText>
      <HiOutlineMail />
      <p>{contact.email}</p>
    </Styled.IconAndText>
    <Styled.IconAndText>
      <HiOutlineCalendar />
      <span>{contact.admissionDate}</span>
    </Styled.IconAndText>
    <Styled.Actions>
      <SmallButton
        onClick={() => onActions({ actionType: 'REPROVED', contact })}
        backgroundColor="#ff919a"
        textColor="#000000"
        disabled={disabled}
      >
        Reprovar
      </SmallButton>
      <SmallButton
        onClick={() => onActions({ actionType: 'APPROVED', contact })}
        backgroundColor="#9be59b"
        textColor="#000000"
        disabled={disabled}
      >
        Aprovar
      </SmallButton>
      <SmallButton
        onClick={() => onActions({ actionType: 'REVIEW', contact })}
        backgroundColor="#ff8858"
        textColor="#000000"
        disabled={disabled}
      >
        Revisar novamente
      </SmallButton>

      <IconButton
        disabled={disabled}
        onClick={() => onActions({ actionType: 'DELETE', contact })}
        aria-label="refetch"
        borderColor="#000"
        color="#000"
      >
        <HiOutlineTrash />
      </IconButton>
    </Styled.Actions>
  </Styled.Card>
)

export const RegistrationCard = memo(Component)
