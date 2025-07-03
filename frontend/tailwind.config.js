module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
        "./app/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#60A39f",
                secondary: "#cc4f38",
                accent: "#064c4a",
                neutral: "#baa98f",
                base: "#e0e0e0",
                dark: "#1e1e1e",
            },
        },
    },
    plugins: [],
};
