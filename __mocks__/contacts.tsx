import { IContact } from './types'

export const MOCK_CONTACTS: IContact[] = [
  {
    id: '1',
    employeeName: 'Leonardo Cypress',
    email: 'leonardo@cypress.com',
    cpf: '12312312312',
    admissionDate: '1991-06-27',
    status: 'REVIEW',
  },
  {
    id: '2',
    employeeName: 'Falconi Cypress',
    email: 'falconi@cypress.com',
    cpf: '32132132132',
    admissionDate: '1999-09-09',
    status: 'APPROVED',
  },
  {
    id: '3',
    employeeName: 'Ricardo Cypress',
    email: 'ricardo@cypress.com',
    cpf: '55566677788',
    admissionDate: '1996-02-29',
    status: 'REPROVED',
  },
]
