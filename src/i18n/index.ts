import { siteConfig } from "../config/site"
import { en } from "./en"
import { zhHans, type Dict } from "./zh-hans"

export type { Dict }

const dictionaries: Record<string, Dict> = {
  "zh-hans": zhHans,
  en,
}

export const t: Dict = dictionaries[siteConfig.lang] ?? zhHans
