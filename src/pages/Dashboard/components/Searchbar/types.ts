export interface ISearchBarProps {
  onRefreshButtonClick: () => void
  onNewAdmissionButtonClick: () => void
  search: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
  disabled?: boolean
}
