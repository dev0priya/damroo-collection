import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tertiary-container": "#707484",
        "primary": "#b90041",
        "secondary-fixed-dim": "#c2c5de",
        "on-tertiary-fixed-variant": "#424655",
        "inverse-surface": "#2e3132",
        "surface-dim": "#d9dadb",
        "on-error": "#ffffff",
        "on-tertiary-container": "#fefcff",
        "surface-container-low": "#f3f4f5",
        "inverse-on-surface": "#f0f1f2",
        "surface-container-high": "#e7e8e9",
        "tertiary": "#575b6b",
        "on-surface-variant": "#5b4042",
        "surface-variant": "#e1e3e4",
        "outline": "#8f6f72",
        "on-secondary": "#ffffff",
        "primary-fixed": "#ffd9dc",
        "on-secondary-container": "#5e6177",
        "surface-container": "#edeeef",
        "on-background": "#191c1d",
        "primary-fixed-dim": "#ffb2ba",
        "on-secondary-fixed": "#161b2d",
        "on-tertiary": "#ffffff",
        "surface-container-highest": "#e1e3e4",
        "primary-container": "#df2457",
        "on-tertiary-fixed": "#171b28",
        "background": "#f8f9fa",
        "surface": "#f8f9fa",
        "tertiary-fixed": "#dfe2f4",
        "on-primary-fixed": "#400011",
        "surface-tint": "#bd0043",
        "tertiary-fixed-dim": "#c2c6d7",
        "secondary-fixed": "#dee1fa",
        "secondary-container": "#dbdef8",
        "secondary": "#5a5d73",
        "on-primary-container": "#fffbff",
        "outline-variant": "#e3bdc0",
        "inverse-primary": "#ffb2ba",
        "error": "#ba1a1a",
        "surface-bright": "#f8f9fa",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#42465a",
        "on-primary": "#ffffff",
        "on-surface": "#191c1d",
        "surface-container-lowest": "#ffffff",
        "on-error-container": "#93000a",
        "on-primary-fixed-variant": "#910031"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "xs": "0.25rem",
        "xl": "2.5rem",
        "md": "1rem",
        "lg": "1.5rem",
        "sm": "0.5rem",
        "gutter": "1.5rem",
        "container-max": "1280px"
      },
      fontFamily: {
        "label-lg": ["Manrope"],
        "label-md": ["Manrope"],
        "headline-lg": ["Noto Serif"],
        "headline-xl": ["Noto Serif"],
        "body-lg": ["Manrope"],
        "body-md": ["Manrope"],
        "headline-md": ["Noto Serif"]
      },
      fontSize: {
        "label-lg": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "label-md": ["12px", { "lineHeight": "1.2", "letterSpacing": "0.02em", "fontWeight": "500" }],
        "headline-lg": ["32px", { "lineHeight": "1.3", "fontWeight": "600" }],
        "headline-xl": ["48px", { "lineHeight": "1.2", "fontWeight": "700" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "400" }],
        "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "600" }]
      }
    }
  },
  plugins: []
} satisfies Config;
