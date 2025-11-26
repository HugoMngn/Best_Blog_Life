import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    darkMode: "class",

    theme: {
        extend: {
            colors: {
                primary: "#1d4ed8",
                soft: "#f8fafc",
            },
            boxShadow: {
                soft: "0 4px 10px rgba(0,0,0,0.08)",
                card: "0 10px 20px rgba(0,0,0,0.08)",
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem",
            },
            animation: {
                fadeIn: "fadeIn 0.5s ease-out forwards",
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
    },

    safelist: [
        "animate-fadeIn",
        "line-clamp-2",
        "line-clamp-3",
    ],

    plugins: [forms, typography, aspectRatio],
};
