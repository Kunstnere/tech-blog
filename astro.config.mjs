import { defineConfig } from "astro/config";

// 上线前把 example.com 换成你自己的域名。
export default defineConfig({
  site: "https://example.com",
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true
    }
  }
});
