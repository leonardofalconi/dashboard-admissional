import { FC } from 'react'
import { HiOutlineCalendar, HiOutlineMail, HiOutlineTrash, HiOutlineUser } from 'react-icons/hi'

import { SmallButton } from '~/components/SmallButton'

import * as Styled from './styles'
import { IRegistrationCardProps } from './types'

export const RegistrationCard: FC<IRegistrationCardProps> = ({ contacts }) => (
  <Styled.Card>
    <Styled.IconAndText>
      <HiOutlineUser />
      <h3>{contacts.employeeName}</h3>
    </Styled.IconAndText>
    <Styled.IconAndText>
      <HiOutlineMail />
      <p>{contacts.email}</p>
    </Styled.IconAndText>
    <Styled.IconAndText>
      <HiOutlineCalendar />
      <span>{contacts.admissionDate}</span>
    </Styled.IconAndText>
    <Styled.Actions>
      <SmallButton backgroundColor="#ff919a" textColor="#000000">
        Reprovar
      </SmallButton>
      <SmallButton backgroundColor="#9be59b" textColor="#000000">
        Aprovar
      </SmallButton>
      <SmallButton backgroundColor="#ff8858" textColor="#000000">
        Revisar novamente
      </SmallButton>

      <HiOutlineTrash />
    </Styled.Actions>
  </Styled.Card>
)
