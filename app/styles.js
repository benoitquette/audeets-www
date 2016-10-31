import {
  indigo500,
  indigo700,
  indigo100,
  lime500,
  grey900
} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

export const theme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700,
    primary3Color: indigo100,
    accent1Color: lime500,
    textColor: grey900
  }
});
