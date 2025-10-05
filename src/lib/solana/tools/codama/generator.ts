import { createFromRoot } from "codama"
import { rootNodeFromAnchorWithoutDefaultVisitor } from "@codama/nodes-from-anchor"
import { renderVisitor } from "@codama/renderers-js"
import path from "path"
import fs from "fs"

const pathToIdls = path.join(__dirname, "..", "..", "anchor", "idl")

const idls = fs.readdirSync(pathToIdls)

for (const idl of idls) {
  const name = idl.replace(".json", "")
  const idlPath = path.join(pathToIdls, idl)
  const idlContent = fs.readFileSync(idlPath, "utf8")
  const idlJson = JSON.parse(idlContent)

  try {
    const codama = createFromRoot(
      rootNodeFromAnchorWithoutDefaultVisitor(idlJson)
    )

    codama.accept(
      renderVisitor(path.join(__dirname, "generated", name), {
        deleteFolderBeforeRendering: true,
      })
    )
  } catch (error) {
    console.error(`Error processing ${idl}:`, (error as Error).message)
  }
}
