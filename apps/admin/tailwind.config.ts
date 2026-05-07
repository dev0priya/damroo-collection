import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#191512",
          rose: "#a83d56",
          saffron: "#d99b2b",
          leaf: "#2d6a4f"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
