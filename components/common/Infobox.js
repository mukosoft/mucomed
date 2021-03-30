import React, { Component } from 'react';
import { StyleSheet, View, Image } from "react-native";
import { alignItems, border, borderRadius, flex, fontStyle, height, justifyContent, margin, padding, width } from '../../configs/styles';
import { getUiService } from '../../service/UiService';
import infoIcon from "@assets/icons/information.png";
import Text from "@components/common/Text";

/**
 * renders an info box
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class Infobox extends Component {
    render() {
        return <View style={boxStyle}>
            <Image source={infoIcon} style={infoIconStyle} />
            {this.props.children}
        </View>
    }
}

const boxStyle = StyleSheet.flatten([
    flex.flexRow,
    padding.padding_3,
    margin.margin_y_3,
    borderRadius.roundedMD,
    justifyContent.justifyBetween,
    alignItems.itemsCenter,
    { backgroundColor: getUiService().theme.secondary },
    border.borderXL.borderWidth,
    getUiService().theme.primary,
    { width: "90%" }
])

const infoIconStyle = StyleSheet.flatten([
    width.width_25,
    height.height_25
])