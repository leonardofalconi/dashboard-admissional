import { MOCK_ALERT_ACTIONS_BUTTON_MAP } from '../constants/alert'
import { TAlertActionsButton } from '../types/alert'

export const alertAction = ({ action }: { action: TAlertActionsButton }) =>
  cy
    .get(`[data-testid="test-alert"] [data-testid="test-alert-actions"] ${MOCK_ALERT_ACTIONS_BUTTON_MAP[action]}`)
    .click()
