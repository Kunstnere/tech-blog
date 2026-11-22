import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kunstnere-tech-blog.3213209647.workers.dev",
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true
    }
  }
});
