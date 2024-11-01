import * as Styled from './styles'
import { Collumns } from './components/Columns'
import { SearchBar } from './components/Searchbar'

export const DashboardPage = () => {
  return (
    <Styled.Container>
      <SearchBar />
      <Collumns
        registrations={[
          {
            id: 1,
            admissionDate: '23/10/2023',
            email: 'maria@caju.com.br',
            employeeName: 'Maria Silva',
            status: 'REVIEW',
            cpf: '12345678901',
          },
        ]}
      />
    </Styled.Container>
  )
}
