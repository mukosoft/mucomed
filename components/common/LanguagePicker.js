import React, { Component } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Image } from "react-native";
import Text from '@components/common/Text';
import { alignItems, aspectRatio_1_1, border, borderRadius, flex, justifyContent, margin, padding, width } from "../../configs/styles";
import * as Animatable from 'react-native-animatable';
import { LANGUAGES } from "../../models/Languages";
import { getUiService } from "../../service/UiService";
import { getSettingsService } from "../../service/SettingsService";
import { observer } from "mobx-react";
import GermanFlag from "@assets/icons/germany.png";
import EnglishFlag from "@assets/icons/united-kingdom.png";

@observer
export default class LanguagePicker extends Component {
    handleGermanViewRef = ref => this.germanView = ref;
    handleEnglishViewRef = ref => this.englishView = ref;

    state = {
        language: LANGUAGES.german
    }

    render() {
        return <View style={[flex.flexRow]}>
            <TouchableWithoutFeedback onPress={() => this.buttonPressed(LANGUAGES.german)}>
                <Animatable.View ref={this.handleGermanViewRef} style={[languageItem, (getSettingsService().getCurrentLanguage() === LANGUAGES.german) && selectedStyle]}>
                    <Image source={GermanFlag} style={icon} />
                    <Text title>Deutsch</Text>
                </Animatable.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.buttonPressed(LANGUAGES.english)}>
                <Animatable.View ref={this.handleEnglishViewRef} style={[languageItem, (getSettingsService().getCurrentLanguage() === LANGUAGES.english) && selectedStyle]}>
                    <Image source={EnglishFlag} style={icon} />
                    <Text title>English</Text>
                </Animatable.View>
            </TouchableWithoutFeedback>
        </View>
    }

    buttonPressed(language) {
        if (language === LANGUAGES.german) { this.germanView.rubberBand(800) }
        if (language === LANGUAGES.english) { this.englishView.rubberBand(800) }
        getSettingsService().changeLanguage(language);
    }

}

const languageItem = StyleSheet.flatten([
    flex.flexRow,
    padding.padding_x_3,
    margin.margin_3,
    border.borderXL,
    borderRadius.roundedMD,
    alignItems.itemsCenter,
    justifyContent.justifyCenter,
    { borderColor: getUiService().theme.primary }
])

const selectedStyle = StyleSheet.flatten([
    { backgroundColor: getUiService().theme.secondary }
])

const icon = StyleSheet.flatten([
    width.width_25,
    aspectRatio_1_1,
    margin.margin_x_3
])