import { observer } from "mobx-react";
import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { alignContent, alignItems, aspectRatio_1_1, borderRadius, flex, height, justifyContent, margin, padding, shadow, width } from "../../configs/styles";
import { getUiService } from "../../service/UiService";
import Text from "../common/Text";
import TextInput from "../common/Textinput";

/**
 * Renders a medication.
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export default class VitaldataItem extends Component {
    render() {
        return (
            <View style={vitaldataCard}>
                <Image source={this.props.vitaldata.img} style={imgStyle} />
                <Text heading>{this.props.vitaldata.title}</Text>
                <View style={flexRow}>
                    <TextInput placeholder={this.props.vitaldata.unit} style={textInputStyle} onChangeText={this.props.onChangeText} />
                </View>
            </View>
        )
    }

    setVitaldataState(value) {
        const vitaldataObj = {};
        vitaldataObj[this.props.vitaldata.id] = value;
        this.setState(vitaldataObj);

    }
}

const flexRow = StyleSheet.flatten([
    flex.flexRow,
    justifyContent.justifyCenter,
    alignItems.itemsCenter
])

const imgStyle = StyleSheet.flatten([
    width.width_50,
    height.height_50,
    padding.padding_4
])

const textInputStyle = StyleSheet.flatten([
    width.width_100,
    height.height_50,
    margin.margin_2
])

const vitaldataCard = StyleSheet.flatten([
    width.width_150,
    aspectRatio_1_1,
    margin.margin_3,
    shadow.shadowMD,
    padding.padding_2,
    justifyContent.justifyCenter,
    alignContent.contentCenter,
    alignItems.itemsCenter,
    borderRadius.roundedMD
])