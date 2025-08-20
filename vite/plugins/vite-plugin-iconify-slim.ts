import fs from 'fs'
import path from 'path'
import { getIcons } from '@iconify/utils'
import type { Plugin } from 'vite'

interface IconConfig {
  collection: string
  icons: string[]
}

interface Options {
  iconConfig: IconConfig[]
  outDir?: string
}

const IconifySlim = (options: Options): Plugin => {
  const { iconConfig, outDir = 'src/assets/icons' } = options
  const jsonDir = path.resolve(process.cwd(), 'node_modules/@iconify/json/json')
  const outputDir = path.resolve(process.cwd(), outDir)

  return {
    name: 'vite-plugin-iconify-slim',
    apply: 'build',

    buildStart() {
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      for (const { collection, icons } of iconConfig) {
        const filePath = path.join(jsonDir, `${collection}.json`)

        if (!fs.existsSync(filePath)) {
          this.warn(`Icon collection JSON not found: ${filePath}`)
          continue
        }

        const rawData = fs.readFileSync(filePath, 'utf-8')
        const json = JSON.parse(rawData)

        // 使用 @iconify/utils 的 getIcons 函数裁剪指定图标
        const slimJson = getIcons(json, icons, true)

        // 检查是否有缺失的图标
        const missingIcons = slimJson.not_found || []
        if (missingIcons.length > 0) {
          this.info(`Missing icons in collection "${collection}": ${missingIcons.join(', ')}`)
        }

        const outFile = path.join(outputDir, `${collection}-slim.json`)
        fs.writeFileSync(outFile, JSON.stringify(slimJson, null, 2) + '\n', 'utf-8')
      }
    }
  }
}

export { IconifySlim as default }
