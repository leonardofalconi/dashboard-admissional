export type TContactStatus = 'REVIEW' | 'APPROVED' | 'REPROVED'

export interface IContact {
  id: string
  admissionDate: string
  email: string
  employeeName: string
  status: TContactStatus
  cpf: string
}
