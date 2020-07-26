import {createMuiTheme} from "@material-ui/core/styles"

export const customTheme = createMuiTheme({
    // palette: {
    //   primary: {
    //     main: '#ff9800',
    //   },
    // },
    overrides: {
        MuiButton: {
          sizeLarge: {
            height: '50px'
          }
        },
    },
})