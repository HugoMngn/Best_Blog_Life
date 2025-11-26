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
            },
            boxShadow: {
                soft: "0 4px 10px rgba(0,0,0,0.08)",
            },
            animation: {
                fadeIn: "fadeIn 0.4s ease-out",
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
