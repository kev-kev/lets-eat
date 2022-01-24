import { withStyles } from "@material-ui/core/styles";

const GlobalCss = withStyles({
  "@global": {
    ".MuiButton-root": {
      "text-transform": "lowercase",
    },
  },
})(() => null);

export default GlobalCss;
