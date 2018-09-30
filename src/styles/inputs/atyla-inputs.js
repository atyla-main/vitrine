import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { colors } from '../../styles/colors';

export const AtylaInputTheme = createMuiTheme({
  palette: {
    primary: { main: colors.frenchPass },
    secondary: { main: colors.frenchPass }
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `1px solid ${colors.frenchPass}`
        },
        '&:after': {
          borderBottom: `1px solid ${colors.purpleHeart}`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `1px solid ${colors.purpleHeart}`
        }
      },
      disabled: {},
      error: {},
      focused: {}
    }
  }
});

export const AtylaInput = withStyles({
  root: {
    borderRadius: 3,
    border: 0,
    color: colors.starDust,
    height: 48,
    fontSize: '21px'
  }
})(Input);
