export type DashboardModule = {
  label: string
  value: string
  hint: string
}

export interface DashboardPageProps {
  title: string
  subtitle: string
  modules: readonly DashboardModule[]
}
