import { FC } from 'react'
import { HiOutlineCalendar, HiOutlineMail, HiOutlineTrash, HiOutlineUser } from 'react-icons/hi'

import { SmallButton } from '~/components/SmallButton'

import * as Styled from './styles'
import { IRegistrationCardProps } from './types'

export const RegistrationCard: FC<IRegistrationCardProps> = ({ contact, onActions }) => (
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
      >
        Reprovar
      </SmallButton>
      <SmallButton
        onClick={() => onActions({ actionType: 'APPROVED', contact })}
        backgroundColor="#9be59b"
        textColor="#000000"
      >
        Aprovar
      </SmallButton>
      <SmallButton
        onClick={() => onActions({ actionType: 'REVIEW', contact })}
        backgroundColor="#ff8858"
        textColor="#000000"
      >
        Revisar novamente
      </SmallButton>

      <HiOutlineTrash onClick={() => onActions({ actionType: 'DELETE', contact })} />
    </Styled.Actions>
  </Styled.Card>
)
