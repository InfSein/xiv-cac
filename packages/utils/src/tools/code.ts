import UtilConf from "../conf"

export const encode = (skillIds: number[]) => {
  const version = UtilConf.version

  if (skillIds.length === 0) {
    return `${version}v1b`
  }

  let maxId = 0
  for (const id of skillIds) {
    if (!Number.isInteger(id) || id < 0) {
      throw new Error(`Invalid skill ID: ${id}`)
    }
    if (id > maxId) maxId = id
  }
  const bitWidth = Math.max(1, Math.ceil(Math.log2(maxId + 1)))

  let bitBuffer = 0
  let bitLength = 0
  const bytes: number[] = []

  for (const id of skillIds) {
    bitBuffer = (bitBuffer << bitWidth) | id
    bitLength += bitWidth

    while (bitLength >= 8) {
      bitLength -= 8
      bytes.push((bitBuffer >> bitLength) & 0xff)
    }
  }

  if (bitLength > 0) {
    bytes.push((bitBuffer << (8 - bitLength)) & 0xff)
  }

  const payload = base64UrlEncode(new Uint8Array(bytes))
  return `${version}v${bitWidth}b${payload}`
}

export const decode = (code: string) => {
  const match = /^(\d+)v(\d+)b(.*)$/.exec(code)
  if (!match) {
    throw new Error('Invalid code format')
  }

  const version = Number(match[1])
  const bitWidth = Number(match[2])
  const payload = match[3]

  if (!Number.isInteger(version) || version < 0) {
    throw new Error('Invalid version')
  }
  if (!Number.isInteger(bitWidth) || bitWidth <= 0) {
    throw new Error('Invalid bitWidth')
  }

  if (!payload) {
    return { version, bitWidth, skillIds: [] }
  }

  const bytes = base64UrlDecode(payload)

  let bitBuffer = 0
  let bitLength = 0
  const skillIds: number[] = []
  const mask = (1 << bitWidth) - 1

  for (const byte of bytes) {
    bitBuffer = (bitBuffer << 8) | byte
    bitLength += 8

    while (bitLength >= bitWidth) {
      bitLength -= bitWidth
      const id = (bitBuffer >> bitLength) & mask
      if (id > 0) {
        skillIds.push(id)
      }
    }
  }

  return { version, bitWidth, skillIds }
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = ''
  for (const b of bytes) {
    binary += String.fromCharCode(b)
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}
function base64UrlDecode(str: string): Uint8Array {
  const padded = str
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(str.length / 4) * 4, '=')

  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}