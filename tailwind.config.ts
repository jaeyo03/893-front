import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        main: "#0064FF",
        mainLight: "#718EFF",
        mainLighter: "AAB8FF",
        mainLightest: "DDE2FF",
        divider: "#F1F4F6",
        graybg: "#EEF0F2",
        checkbox: "#E8ECEF",
        cancel: "#FFCECF",
        red: "#FF0000",
        rightgray: "#D9D9D9",
        imageindex: "#C2E5FF",
        disabled: "#FFFFFF",
        alarmcategory: "#4173F5",
        alarmkeyword: "#929294",
        alarmdot: "#E0E0E0",
        alarmborder: "#EDEDF0",
        registerline: "#E6E6E6",
        resgisterchecktext: "#5A5A5A",
        resgistertext: "#616161",
        resgistersubtext: "#9CA3AF",
        registertextcnt: "#999999",
        registertimemodal: "#EBF3FF",
        detailpdtcancle: "#FFFAEA",
        detailpdtcanclemaintext: "#813C1A",
        detailpdtcanclebuttontext: "#A34E1E",
        detailpdtcanclebuttonline: "#EDA34B",
        detailmoneykr: "#FFBFBF",
        detailbid: "#EFF3F8",
        warningkeword: "#FE6C6C",
        mypageendpurchase: "#FF4848",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
