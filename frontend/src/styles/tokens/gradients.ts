import { colors } from '@/styles/tokens/colors'

export const gradients = {
  inputSurface: `linear-gradient(180deg, ${colors.overlaySubtle} 0%, transparent 38%)`,
  checkboxUnchecked: `linear-gradient(180deg, ${colors.overlayMuted} 0%, transparent 100%)`,
  checkboxChecked: `linear-gradient(135deg, ${colors.blood} 0%, ${colors.bloodSoft} 100%)`,
  dashboardCard: `linear-gradient(165deg, ${colors.overlaySubtle} 0%, transparent 48%)`,
  moduleFeatured: `linear-gradient(160deg, ${colors.bloodTint} 0%, transparent 55%)`,
  strengthFill: `linear-gradient(90deg, ${colors.bloodSoft}, ${colors.blood})`,
  brandIcon: `linear-gradient(145deg, ${colors.blood} 0%, ${colors.bloodDeep} 100%)`,
  buttonBlood: `linear-gradient(180deg, ${colors.blood} 0%, ${colors.bloodSoft} 100%)`,
  buttonBone: `linear-gradient(180deg, ${colors.boneLight} 0%, ${colors.boneSoft} 100%)`,
  glowBlood: [
    'radial-gradient(circle,',
    `${colors.bloodGlowAmbient} 0%,`,
    `${colors.bloodGlowAmbientMid} 45%, transparent 70%)`,
  ].join(' '),
  glowBloodSoft: [
    'radial-gradient(circle,',
    `${colors.bloodGlowAmbientSoft} 0%, transparent 70%)`,
  ].join(' '),
  glowCopper: [
    'radial-gradient(circle,',
    `${colors.copperGlowAmbient} 0%, transparent 70%)`,
  ].join(' '),
  cardTopLine: [
    'linear-gradient(90deg, transparent,',
    `${colors.bloodLineGradient} 18%,`,
    `${colors.copperLineGradient} 55%, transparent)`,
  ].join(' '),
  authContextSurface: [
    'linear-gradient(165deg,',
    `${colors.overlaySubtle} 0%, transparent 42%),`,
    `linear-gradient(220deg, ${colors.bloodTint} 0%, transparent 55%)`,
  ].join(' '),
  authContextVignette: [
    'radial-gradient(ellipse 90% 80% at 70% 20%,',
    `${colors.bloodGlowAmbient} 0%, transparent 62%)`,
  ].join(' '),
  gridMask: 'radial-gradient(ellipse 75% 65% at 42% 0%, black 18%, transparent 70%)',
  gridLineH: `linear-gradient(${colors.gridLine} 1px, transparent 1px)`,
  gridLineV: `linear-gradient(90deg, ${colors.gridLine} 1px, transparent 1px)`,
} as const
