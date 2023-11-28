import process from 'node:process'
import { BorderColor } from './types.js'

const movementKeys = '[↑/↓] movement'
const quitKey = '[q]uit'

export const getBorderColorOnFocus = (isFocused: boolean) => (isFocused ? BorderColor.FOCUSED : BorderColor.UNFOCUSED)

export function sanitizeData(data: string): string[] {
  return data.trim().split('\n')
}

export function formatPluginData(data: string[]) {
  return data.map(element => ({
    label: element,
    value: element,
  }))
}

export function totalNumber(start: string, installed: any, available?: any) {
  return available ? `${start} (${installed}/${available})` : `${start} (${installed})`
}

export function getCommandInfo() {
  return `${movementKeys} | [i]nstall | [u]nintstall  | [g]lobal | ${quitKey}`
}

export function clearConsole() {
  process.stdout.write('\x1B[2J\x1B[3J\x1B[H\x1Bc')
}
