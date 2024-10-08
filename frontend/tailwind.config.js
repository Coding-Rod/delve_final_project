const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#16697A",
      secondary: "#489FB5",
      terciary: "#82C0CC",
      information: "#EDE7E3",
      warning: "#FFA62B",
      danger: "#E11D48",
      success: "#65A30D"
    }
  },
  plugins: [],
});
