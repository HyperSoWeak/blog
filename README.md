# ![Preview](./public/favicon.svg) Terminal Reverie

> Even 1s and 0s crave dreams.

**Terminal Reverie** is a personal technical blog built with a hacker/terminal aesthetic. It features a high-performance Next.js foundation, custom MDX rendering, and a sleek, dark-themed UI inspired by CLI environments and retro-futurism.

## Features

- **Terminal Aesthetic**: Custom UI components styled with Tailwind CSS v4, featuring scanlines, monospaced fonts (Fira Mono), and a Catppuccin Mocha color palette.
- **MDX Content**: Write posts in MDX with full component support (`<Grid>`, `<Details>`, etc.).
- **High Performance**: Static Site Generation (SSG) via `output: 'export'`, optimized for GitHub Pages.
- **Image Optimization**: Custom image handling pipeline that supports colocated images in post directories.
- **Math Support**: Built-in LaTeX support via `rehype-katex` and `remark-math`.
- **Hot Reload**: Custom hot-reload mechanism for content changes during development.
- **Responsive**: Fully responsive design that looks great on mobile and desktop.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/HyperSoWeak/blog.git
    cd blog
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Start the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Writing Posts

Creating a new post is simple using the built-in CLI tool.

1.  **Run the create script:**

    ```bash
    pnpm create-post
    ```

2.  **Follow the prompts:**
    - Enter the **Title** of your post.
    - Enter the **Slug** (optional, defaults to kebab-case title).

3.  **Edit your content:**
    The script will create a new directory at `content/posts/[slug]/index.mdx`. Open this file and start writing!

### Post Features

- **Images**: Place images directly in the post folder (e.g., `content/posts/my-post/image.png`) and reference them normally: `![Alt Text](./image.png)`.
- **Grid Layout**: Use the `<Grid>` component for side-by-side images.
  ```jsx
  <Grid cols={2}>![Image 1](./img1.png) ![Image 2](./img2.png)</Grid>
  ```
- **Details**: Use the `<Details>` component for collapsible sections.
  ```jsx
  <Details summary="Click to expand">Hidden content here.</Details>
  ```
- **Math**: Use standard LaTeX syntax (`$E=mc^2$` or `$$...$$`).

## Configuration

You can customize the site by editing `src/lib/config.ts`:

```typescript
export const siteConfig = {
  profile: {
    name: "Your Name",
    alias: "youralias",
    location: "Your Location",
    status: "ONLINE",
    email: "you@example.com",
  },
  social: {
    github: "https://github.com/...",
    linkedin: "https://linkedin.com/...",
    instagram: "https://instagram.com/...",
  },
};
```

## Deployment

This project is configured for **GitHub Pages**.

1.  Push your code to the `main` branch.
2.  The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy the static site.
3.  Ensure your repository settings have GitHub Pages enabled (Source: GitHub Actions).

## Project Structure

- `content/posts/`: Your blog posts (MDX).
- `src/app/`: Next.js App Router pages.
- `src/components/`: React components (Navbar, Footer, MDX components).
- `src/lib/`: Utilities and configuration.
- `scripts/`: Build and utility scripts.
- `public/`: Static assets (generated images go here during build).

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
