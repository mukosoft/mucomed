import { getUiService } from "@service/UiService";

export const defaultStyles = {
    defaultContentContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: "#fff",
    },
    themeContainer: {
        backgroundColor: "#fff",
        height: '100%',
    },
    defaultShadow: {
        borderWidth: 0.25,
        borderColor: "#fff",
        elevation: 1,
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

// private definition of padding & margin sizes
const _margin_padding_1 = 2;
const _margin_padding_2 = 4;
const _margin_padding_3 = 6;
const _margin_padding_4 = 10;

export const opacity = {
    opacity75: { opacity: 0.75 },
    opacity50: { opacity: 0.50 },
    opacity25: { opacity: 0.25 },
}

export const fontStyle = {
    italic: { fontStyle: 'italic' },
    bold: { fontWeight: 'bold' },
    underline: { textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: getUiService().theme.text },
    muted: opacity.opacity75,
}

export const border = {
    borderSM: { borderWidth: 0.5 },
    borderMD: { borderWidth: 1 },
    borderXL: { borderWidth: 1.5 }
}

export const borderRadius = {
    roundedSM: { borderRadius: 2 },
    roundedMD: { borderRadius: 4 },
    roundedXL: { borderRadius: 8 },
    roundedFull: { borderRadius: 999 }
}

export const shadow = {
    shadowSM: { elevation: 1, backgroundColor: '#fff' },
    shadowMD: { elevation: 3, backgroundColor: '#fff' },
    shadowXL: { elevation: 5, backgroundColor: '#fff' },
}

export const padding = {
    padding_1: { padding: _margin_padding_1 },
    padding_2: { padding: _margin_padding_2 },
    padding_3: { padding: _margin_padding_3 },
    padding_4: { padding: _margin_padding_4 },
    padding_y_1: { paddingTop: _margin_padding_1, paddingBottom: _margin_padding_1 },
    padding_y_2: { paddingTop: _margin_padding_2, paddingBottom: _margin_padding_2 },
    padding_y_3: { paddingTop: _margin_padding_3, paddingBottom: _margin_padding_3 },
    padding_y_4: { paddingTop: _margin_padding_4, paddingBottom: _margin_padding_4 },
    padding_x_1: { paddingLeft: _margin_padding_1, paddingRight: _margin_padding_1 },
    padding_x_2: { paddingLeft: _margin_padding_2, paddingRight: _margin_padding_2 },
    padding_x_3: { paddingLeft: _margin_padding_3, paddingRight: _margin_padding_3 },
    padding_x_4: { paddingLeft: _margin_padding_4, paddingRight: _margin_padding_4 },
};



export const margin = {
    margin_1: { margin: _margin_padding_1 },
    margin_2: { margin: _margin_padding_2 },
    margin_3: { margin: _margin_padding_3 },
    margin_4: { margin: _margin_padding_3 },
    margin_y_1: { marginTop: _margin_padding_1, marginBottom: _margin_padding_1 },
    margin_y_2: { marginTop: _margin_padding_2, marginBottom: _margin_padding_2 },
    margin_y_3: { marginTop: _margin_padding_3, marginBottom: _margin_padding_3 },
    margin_y_4: { marginTop: _margin_padding_4, marginBottom: _margin_padding_4 },
    margin_x_1: { marginLeft: _margin_padding_1, marginRight: _margin_padding_1 },
    margin_x_2: { marginLeft: _margin_padding_2, marginRight: _margin_padding_2 },
    margin_x_3: { marginLeft: _margin_padding_3, marginRight: _margin_padding_3 },
    margin_x_4: { marginLeft: _margin_padding_4, marginRight: _margin_padding_4 },
};

export const flex = {
    flex_1: { display: 'flex', flex: 1},
    flexRow: { display: 'flex', flexDirection: 'row' },
    flexCol: { display: 'flex', flexDirection: 'column' },
    flexWrap: { flexWrap: 'wrap' }
}

export const justifyContent = {
    justifyStart: { justifyContent: 'flex-start' },
    justifyEnd: { justifyContent: 'flex-end' },
    justifyCenter: { justifyContent: 'center' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyAround: { justifyContent: 'space-around' },
    justifyEvenly: { justifyContent: 'space-evenly' },
}

export const alignContent = {
    contentStart: { justifyContent: 'flex-start' },
    contentEnd: { justifyContent: 'flex-end' },
    contentCenter: { justifyContent: 'center' },
    contentBetween: { justifyContent: 'space-between' },
    contentAround: { justifyContent: 'space-around' },
    contentEvenly: { justifyContent: 'space-evenly' },
}

export const alignItems = {
    itemsStart: { alignItems: 'flex-start' },
    itemsEnd: { alignItems: 'flex-end' },
    itemsCenter: { alignItems: 'center' },
    itemsBaseline: { alignItems: 'baseline' },
    itemsStretch: { alignItems: 'stretch' }
}

export const alignSelf = {
    selfAuto: { alignSelf: 'auto' },
    selfStart: { alignSelf: 'flex-start' },
    selfEnd: { alignSelf: 'flex-end' },
    selfCenter: { alignSelf: 'center' },
    selfStretch: { alignSelf: 'stretch' }
}

export const height = {
    height_10: { height: 10 },
    height_25: { height: 25 },
    height_50: { height: 50 },
    height_60: { height: 60 },
    height_75: { height: 75 },
    height_100: { height: 100 },
    height_125: { height: 125 },
    height_150: { height: 150 },
    heightAuto: { height: 'auto' }
}

export const width = {
    width_10: { width: 10 },
    width_25: { width: 25 },
    width_50: { width: 50 },
    width_60: { width: 60 },
    width_75: { width: 75 },
    width_100: { width: 100 },
    width_150: { width: 150 }
}

export const fontSize = {
    xs: { fontSize: 11 },
    sm: { fontSize: 14 },
    md: { fontSize: 16 },
    lg: { fontSize: 18 },
    xl: { fontSize: 24 },
    xxl: { fontSize: 32 }
}

export const textAlign = {
    textCenter: { textAlign: 'center' },
    textLeft: { textAlign: 'left' }
}

export const aspectRatio_1_1 = { aspectRatio: 1}