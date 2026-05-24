// Core
import type { ReactElement } from 'react'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Styles
import {
  ContextBackdrop,
  ContextEventCard,
  ContextEventLabel,
  ContextEventName,
  ContextEyebrow,
  ContextGlow,
  ContextGrid,
  ContextInner,
  ContextIntro,
  ContextModuleGrid,
  ContextModuleHint,
  ContextModuleLabel,
  ContextModulesHeading,
  ContextModuleTile,
  ContextModuleValue,
  ContextShell,
  ContextStatusMeta,
  ContextStatusPill,
  ContextStatusStrip,
  ContextSubtitle,
  ContextTelemetry,
  ContextTelemetryItem,
  ContextTitle,
} from './AuthContextPanel.style'

const AuthContextPanel = (): ReactElement => {
  const { contextPanel } = authStrings

  return (
    <ContextShell aria-hidden>
      <ContextBackdrop />
      <ContextGrid />
      <ContextGlow />
      <ContextInner>
        <ContextStatusStrip>
          <ContextStatusPill>{contextPanel.sessionLive}</ContextStatusPill>
          <ContextStatusMeta>
            {contextPanel.syncLabel}: {contextPanel.syncValue}
          </ContextStatusMeta>
          <ContextTelemetry>
            {contextPanel.telemetry.map((item) => (
              <ContextTelemetryItem key={item}>{item}</ContextTelemetryItem>
            ))}
          </ContextTelemetry>
        </ContextStatusStrip>

        <ContextIntro>
          <ContextEyebrow>{contextPanel.eyebrow}</ContextEyebrow>
          <ContextTitle>{contextPanel.title}</ContextTitle>
          <ContextSubtitle>{contextPanel.subtitle}</ContextSubtitle>
        </ContextIntro>

        <ContextEventCard>
          <ContextEventLabel>{contextPanel.eventLabel}</ContextEventLabel>
          <ContextEventName>{contextPanel.eventName}</ContextEventName>
        </ContextEventCard>

        <section>
          <ContextModulesHeading>{contextPanel.modulesHeading}</ContextModulesHeading>
          <ContextModuleGrid>
            {contextPanel.modules.map((module) => (
              <ContextModuleTile key={module.label}>
                <ContextModuleLabel>{module.label}</ContextModuleLabel>
                <ContextModuleValue>{module.value}</ContextModuleValue>
                <ContextModuleHint>{module.hint}</ContextModuleHint>
              </ContextModuleTile>
            ))}
          </ContextModuleGrid>
        </section>
      </ContextInner>
    </ContextShell>
  )
}

export { AuthContextPanel }
