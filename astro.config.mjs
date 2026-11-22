import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kunstnere-tech-blog.pages.dev",
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true
    }
  }
});
