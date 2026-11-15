import { createRequire } from "module";
import initSqlJs from "sql.js";
import fs from "fs/promises"

const require = createRequire(import.meta.url)

let sql = null

export async function getSqLite() {
   if (sql) return sql

   const wasmPath = require.resolve("sql.js/dist/sql-wasm.wasm");
   const wasmBinary = await fs.readFile(wasmPath)
   sql = await initSqlJs(
      wasmBinary
   )
   return sql;
}

export async function openDatabase(filePath){
   const fs = await import("fs/promises")

   const sql = await getSqLite()

   const data = await fs.readFile(filePath)

   return new sql.Database(new Uint8Array(data))
}