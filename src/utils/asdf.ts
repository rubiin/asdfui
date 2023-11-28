import fs from 'node:fs'
import os from 'node:os'
import readLine from 'node:readline'
import { $ } from 'execa'

import type { Option } from '@inkjs/ui'
import { formatPluginData, sanitizeData } from './helpers.js'
import type { VersionInfo } from './types.js'

export async function listAllPlugins(): Promise<Option[]> {
  try {
    const { stdout } = await $`asdf plugin list`
    const sanitizedData = sanitizeData(stdout)
    return formatPluginData(sanitizedData)
  }
  catch (error) {
    return []
  }
}

export async function listToolsVersions(name: string): Promise<Option[]> {
  try {
    const { stdout } = await $`asdf list all ${name}`
    const sanitizedData = sanitizeData(stdout)
    return formatPluginData(sanitizedData).reverse()
  }
  catch (error) {
    return []
  }
}

export async function installToolVersion({ name, version }: VersionInfo): Promise<boolean> {
  try {
    await $`asdf install ${name} ${version}`
    return true
  }
  catch (error) {
    return false
  }
}

export async function uninstallToolVersion({ name, version }: VersionInfo): Promise<boolean> {
  try {
    await $`asdf uninstall ${name} ${version.replace('🌎', '').trim()}`
    return true
  }
  catch (error) {
    return false
  }
}

export async function getInfo(): Promise<VersionInfo[]> {
  try {
    const { stdout } = await $`asdf current`
    const text = stdout.trim()
    const lines = sanitizeData(text)
    const extractedFields = lines.map((line) => {
      const fields = line.trim().split(/\s+/)
      return { name: fields[0]!, version: fields[1]! }
    })
    return extractedFields
  }
  catch (error) {
    return []
  }
}

export async function setVersionGlobal({ name, version }: VersionInfo): Promise<boolean> {
  try {
    await $`asdf global ${name} ${version}`
    return true
  }
  catch (error) {
    return false
  }
}

export async function listInstalledToolsVersions(name: string) {
  // otherwise asdf returns all plugins
  if (name === '')
    return []

  try {
    const { stdout } = await $`asdf list ${name}`
    if (stdout === '')
      return []
    const sanitizedData = sanitizeData(stdout)
    const values = formatPluginData(
      sanitizedData.map((value) => {
        value = value.trim()
        if (value.startsWith('*'))
          value = `${value.replace('*', '')} 🌎`

        return value
      }),
    ).reverse()

    return values
  }
  catch (error) {
    return []
  }
}

export async function getGlobalVersionForTool(searchTerm: string) {
  const filePath = `${os.homedir()}/.tool-versions`
  return new Promise((resolve, reject) => {
    let result: unknown

    const lineReader = readLine.createInterface({
      input: fs.createReadStream(filePath),
    })

    lineReader.on('line', (line: string) => {
      if (line.includes(searchTerm))
        result = line.split(' ')[1]!
    })

    // Wait for close/error event and resolve/reject
    lineReader.on('close', () => resolve(result))
    lineReader.on('error', (error: Error) => reject(error))
  })
}
