// Core
import type { JSX } from 'react'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Style
import {
  ContextBackdrop,
  ContextEyebrow,
  ContextGlow,
  ContextGrid,
  ContextInner,
  ContextIntro,
  ContextShell,
  ContextStatusPill,
  ContextStatusStrip,
  ContextSubtitle,
  ContextTitle,
} from './AuthContextPanel.style'

function AuthContextPanel(): JSX.Element {
  const { contextPanel } = authStrings

  return (
    <ContextShell aria-hidden>
      <ContextBackdrop />
      <ContextGrid />
      <ContextGlow />
      <ContextInner>
        <ContextStatusStrip>
          <ContextStatusPill>{contextPanel.sessionLive}</ContextStatusPill>
        </ContextStatusStrip>

        <ContextIntro>
          <ContextEyebrow>{contextPanel.eyebrow}</ContextEyebrow>
          <ContextTitle>{contextPanel.title}</ContextTitle>
          <ContextSubtitle>{contextPanel.subtitle}</ContextSubtitle>
        </ContextIntro>
      </ContextInner>
    </ContextShell>
  )
}

export { AuthContextPanel }
