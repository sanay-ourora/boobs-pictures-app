import { context, build } from "esbuild";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import process from "node:process";

const isServe = process.argv.includes("--serve");
const isCheck = process.argv.includes("--check");

const buildOptions = {
  entryPoints: ["src/main.jsx"],
  bundle: true,
  format: "esm",
  jsx: "automatic",
  minify: !isServe,
  sourcemap: isServe,
  target: ["es2022"],
  outdir: "dist/assets",
  entryNames: isServe ? "app" : "app-[hash]",
  assetNames: "[name]-[hash]",
  loader: {
    ".png": "file",
    ".svg": "file"
  },
  logLevel: "info"
};

if (isCheck) {
  await build({ ...buildOptions, write: false });
  process.exit(0);
}

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });

if (isServe) {
  const buildContext = await context(buildOptions);
  await buildContext.watch();
  const server = await buildContext.serve({
    servedir: "dist",
    host: "127.0.0.1",
    port: 4180
  });
  console.log(`Local app: http://${server.host}:${server.port}`);
} else {
  const result = await build({ ...buildOptions, metafile: true });
  const outputPaths = Object.keys(result.metafile.outputs);
  const scriptPath = outputPaths.find((outputPath) => outputPath.endsWith(".js"));
  const stylesheetPath = outputPaths.find((outputPath) => outputPath.endsWith(".css"));

  if (!scriptPath || !stylesheetPath) {
    throw new Error("Could not find the generated app assets.");
  }

  const htmlPath = "dist/index.html";
  const html = await readFile(htmlPath, "utf8");
  await writeFile(
    htmlPath,
    html
      .replace("/assets/app.js", `/${scriptPath.replace("dist/", "")}`)
      .replace("/assets/app.css", `/${stylesheetPath.replace("dist/", "")}`)
  );
}
