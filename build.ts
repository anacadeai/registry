#!/usr/bin/env bun

import { mkdirSync, writeFileSync, readFileSync } from "node:fs"

const catalog = JSON.parse(readFileSync("catalog.json", "utf-8"))

mkdirSync("api/plugins/featured", { recursive: true })
mkdirSync("health", { recursive: true })

writeFileSync("api/plugins/index.json", JSON.stringify(catalog))
writeFileSync("api/plugins/featured/index.json", JSON.stringify(catalog.filter((p: { featured?: boolean }) => p.featured)))
writeFileSync("health/index.json", JSON.stringify({ status: "ok", plugins: catalog.length }))

console.log(`Built ${catalog.length} plugins (${catalog.filter((p: { featured?: boolean }) => p.featured).length} featured)`)
