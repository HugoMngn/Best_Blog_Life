/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",

    theme: {
        extend: {
            colors: {
                primary: "#3b82f6",
                secondary: "#6366f1",
                soft: "#f1f5f9",
            },

            boxShadow: {
                soft: "0 4px 16px rgba(0, 0, 0, 0.06)",
            },

            animation: {
                fadeIn: "fadeIn 0.4s ease-out both",
                spinSlow: "spin 2s linear infinite",
            },

            keyframes: {
                fadeIn: {
                    from: { opacity: "0", transform: "translateY(8px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },

    safelist: [
        "min-h-screen",
        "bg-gradient-to-br",
        "from-gray-50",
        "to-blue-50",
        "animate-fadeIn",
        "line-clamp-2",
        "line-clamp-3",
    ],
}
