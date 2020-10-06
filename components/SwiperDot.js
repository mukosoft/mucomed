import { View, StyleSheet } from "react-native";
import { colors } from "@configs/colors";
import React from "react";

const styles = StyleSheet.create({
    dotStyle: {
        backgroundColor:'rgb(222,222,222)',
        width: 8, height: 8,
        borderRadius: 4,
        margin: 3,
        shadowColor: colors.grey_dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    activeDotStyle: {
        backgroundColor: colors.orange,
        width: 8, height: 8,
        borderRadius: 4,
        margin: 3,
        shadowColor: colors.grey_dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export const swiperDot = <View style={styles.dotStyle} />
export const activeDot = <View style={styles.activeDotStyle} />