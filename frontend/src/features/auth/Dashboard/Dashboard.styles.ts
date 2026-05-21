// Libraries
import styled from 'styled-components'

export const DashboardShell = styled.div`
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.bgApp};
  padding: ${({ theme }) => theme.spacing.xl};
`

export const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border1};
`

export const DashboardTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(28px, 5vw, 36px);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const DashboardSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMid};
  max-width: 48ch;
`

export const DashboardMeta = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textLow};
`

export const DashboardCard = styled.section`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surf1};
  border: 1px solid ${({ theme }) => theme.colors.border1};
  box-shadow: ${({ theme }) => theme.shadows.card};
`
