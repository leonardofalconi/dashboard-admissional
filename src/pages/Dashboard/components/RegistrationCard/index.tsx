import { FC, memo, useState } from 'react'
import { HiOutlineCalendar, HiOutlineMail, HiOutlineTrash, HiOutlineUser } from 'react-icons/hi'

import { Alert } from '~/components/Alert'
import { IconButton } from '~/components/IconButton'
import { SmallButton } from '~/components/SmallButton'
import { Theme } from '~/theme'

import * as Styled from './styles'
import { IRegistrationCardProps, TAlert } from './types'

const Component: FC<IRegistrationCardProps> = ({ contact, onActions, disabled }) => {
  const [alert, setAlert] = useState<TAlert>({
    isVisible: false,
    title: 'Contato',
  })

  return (
    <>
      <Styled.Card data-testid="test-registration-card" data-test-employee-name={contact.employeeName}>
        <Styled.IconAndText>
          <HiOutlineUser />
          <h4>{contact.employeeName}</h4>
        </Styled.IconAndText>
        <Styled.IconAndText>
          <HiOutlineMail />
          <p>{contact.email}</p>
        </Styled.IconAndText>
        <Styled.IconAndText>
          <HiOutlineCalendar />
          <span>{contact.admissionDate}</span>
        </Styled.IconAndText>
        <Styled.Actions data-testid="test-registration-card-actions">
          {contact.status === 'REVIEW' ? (
            <>
              <SmallButton
                onClick={() =>
                  setAlert(current => ({
                    ...current,
                    isVisible: true,
                    description: `Tem certeza que deseja reprovar o(a) ${contact.employeeName}?`,
                    onConfirm: () => onActions({ actionType: 'REPROVED', contact }),
                  }))
                }
                backgroundColor={Theme.colors.americanPink}
                textColor={Theme.colors.eerieBlack}
                disabled={disabled}
              >
                Reprovar
              </SmallButton>
              <SmallButton
                onClick={() =>
                  setAlert(current => ({
                    ...current,
                    isVisible: true,
                    description: `Tem certeza que deseja aprovar o(a) ${contact.employeeName}?`,
                    onConfirm: () => onActions({ actionType: 'APPROVED', contact }),
                  }))
                }
                backgroundColor={Theme.colors.grannySmithApple}
                textColor={Theme.colors.black}
                disabled={disabled}
              >
                Aprovar
              </SmallButton>
            </>
          ) : (
            <SmallButton
              onClick={() =>
                setAlert(current => ({
                  ...current,
                  isVisible: true,
                  description: `Tem certeza que deseja retornar para a revisão o(a) ${contact.employeeName}?`,
                  onConfirm: () => onActions({ actionType: 'REVIEW', contact }),
                }))
              }
              backgroundColor={Theme.colors.coral}
              textColor={Theme.colors.black}
              disabled={disabled}
            >
              Revisar novamente
            </SmallButton>
          )}

          <IconButton
            disabled={disabled}
            onClick={() =>
              setAlert(current => ({
                ...current,
                isVisible: true,
                description: `Tem certeza que deseja deletar o(a) ${contact.employeeName}?`,
                onConfirm: () => onActions({ actionType: 'DELETE', contact }),
              }))
            }
            aria-label="refetch"
            borderColor={Theme.colors.black}
            color={Theme.colors.black}
          >
            <HiOutlineTrash />
          </IconButton>
        </Styled.Actions>
      </Styled.Card>

      {alert.isVisible && (
        <Alert
          title={alert.title!}
          onCancel={() => setAlert(current => ({ ...current, isVisible: false }))}
          onConfirm={alert.onConfirm!}
        >
          {alert.description}
        </Alert>
      )}
    </>
  )
}

export const RegistrationCard = memo(Component)
