import {
  indigo500,
  indigo700,
  deeporange500,
  grey900,
  white
} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";

export const theme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700,
    primary3Color: white,
    accent1Color: deeporange500,
    textColor: grey900
  }
});

export const globalStyle = {
  card: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  }
};
