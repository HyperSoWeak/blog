/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public/images");

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Check if it's an image
      if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(entry.name)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${entry.name} to ${destPath}`);
      }
    }
  }
}

// Ensure public/images exists
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

// Copy images from content/posts/[slug] to public/images/[slug]
if (fs.existsSync(POSTS_DIR)) {
  const slugs = fs.readdirSync(POSTS_DIR);
  for (const slug of slugs) {
    const slugDir = path.join(POSTS_DIR, slug);
    if (fs.statSync(slugDir).isDirectory()) {
      const destDir = path.join(PUBLIC_IMAGES_DIR, slug);
      copyDir(slugDir, destDir);
    }
  }
}

console.log("Asset copy complete.");
