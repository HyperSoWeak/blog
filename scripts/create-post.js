const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const POSTS_DIR = path.join(process.cwd(), "content/posts");

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createPost() {
  console.log("📝 Create a New Blog Post");

  const title = await question("Enter post title: ");
  if (!title) {
    console.error("❌ Title is required.");
    rl.close();
    return;
  }

  let slug = await question("Enter post slug (leave empty to generate from title): ");
  if (!slug) {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  const date = new Date().toISOString().split("T")[0];

  const content = `--- 
title: "${title}"
date: "${date}"
categories: ["Uncategorized"]
tags: ["New"]
featuredImage: ""
---

Write your content here...
`;

  const postDir = path.join(POSTS_DIR, slug);
  const filePath = path.join(postDir, "index.mdx");

  if (fs.existsSync(postDir)) {
    console.error(`❌ Post with slug "${slug}" already exists.`);
    rl.close();
    return;
  }

  fs.mkdirSync(postDir, { recursive: true });
  fs.writeFileSync(filePath, content);

  console.log(`\n✅ Post created successfully!`);
  console.log(`📂 Location: content/posts/${slug}/index.mdx`);

  rl.close();
}

createPost();
