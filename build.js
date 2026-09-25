const fs = require("fs");
const path = require("path");
const { minify: minifyHTML } = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const { minify: minifyJS } = require("terser");

const sourceDir = __dirname;
const outputDir = path.join(__dirname, "dist");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);
    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

async function build() {
  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const outputPath = path.join(outputDir, file);

    if (file.endsWith(".html")) {
      const html = fs.readFileSync(sourcePath, "utf8");

      const minified = await minifyHTML(html, {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      });

      fs.writeFileSync(outputPath, minified);
      console.log(`Built ${file}`);
    }

    else if (file.endsWith(".css")) {
      const css = fs.readFileSync(sourcePath, "utf8");
      const minified = new CleanCSS().minify(css).styles;

      fs.writeFileSync(outputPath, minified);
      console.log(`Built ${file}`);
    }

    else if (file.endsWith(".js") && file !== "build.js") {
      const js = fs.readFileSync(sourcePath, "utf8");
      const result = await minifyJS(js);

      fs.writeFileSync(outputPath, result.code);
      console.log(`Built ${file}`);
    }
  }

  const imagesSource = path.join(sourceDir, "images");
  const imagesOutput = path.join(outputDir, "images");

  if (fs.existsSync(imagesSource)) {
    copyDirectory(imagesSource, imagesOutput);
    console.log("Copied images");
  }

  console.log("Build complete.");
}

build().catch(error => {
  console.error(error);
  process.exit(1);
});