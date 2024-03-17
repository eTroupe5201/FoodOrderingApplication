import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
      env: {
        MAILOSAUR_API_KEY: "gK7uaNDH5wWN41T9PDwDyh2baiPVmIjE",
    },
  },
});
