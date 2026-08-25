import { context, build } from "esbuild";
import { cp, mkdir, rm } from "node:fs/promises";
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
  entryNames: "app",
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
  await build(buildOptions);
}
