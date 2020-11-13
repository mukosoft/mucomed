import { colors } from "./colors";

export const defaultStyles = {
    defaultContentContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: colors.white,
    },
    themeContainer: {
        backgroundColor: colors.white,
        height: '100%',
    },
    defaultShadow: {
        borderWidth: 0.25,
        borderColor: colors.turquoise_dark,
        // shadowColor: colors.grey_dark,
        // shadowOffset: {
        //     width: 1,
        //     height: 1,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 5,
        elevation: 0,
    },
    defaultBorderRadius: {
        borderRadius: 5
    },
    borderFull: {
        borderRadius: 999
    },
    fontLight: {
        fontFamily: "QuicksandLight"
    },
    fontNormal: {
        fontFamily: "QuicksandRegular",
    },
    fontBold: {
        fontFamily: "QuicksandBold",
    }
}
