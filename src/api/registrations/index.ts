import { API_END_POINTS } from '~/api/constants'
import { HTTP_CLIENT } from '~/clients/httpClient'
import { IContact } from '~/entities/contact'

const GET = ({ search }: { search?: string }) =>
  HTTP_CLIENT.get<IContact[]>(`${API_END_POINTS.registrations}${search ? `?${search}` : ''}`)

const POST = (contact: Omit<IContact, 'id'>) => HTTP_CLIENT.post<IContact>(API_END_POINTS.registrations, contact)

const PATCH = ({ id, values }: { id: IContact['id']; values: Partial<Omit<IContact, 'id'>> }) =>
  HTTP_CLIENT.patch<IContact>(`${API_END_POINTS.registrations}/${id}`, values)

const DELETE = ({ id }: { id: IContact['id'] }) => HTTP_CLIENT.delete<IContact>(`${API_END_POINTS.registrations}/${id}`)

export const REGISTRATION = {
  GET,
  POST,
  PATCH,
  DELETE,
}
