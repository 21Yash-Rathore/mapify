import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

export default defineConfig({
  define: {
    "process.env": process.env, // Expose .env variables to your project
  },
});
