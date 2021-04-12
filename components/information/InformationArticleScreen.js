import React, { Component } from 'react';
import { Image, ScrollView, View, StyleSheet } from 'react-native';
import AppContainer from '../common/AppContainer';
import Text from "@components/common/Text";
import { getSettingsService } from '../../service/SettingsService';
import { borderRadius, fontSize, height, margin, padding, shadow } from '../../configs/styles';
import { getUiService } from '../../service/UiService';

/**
 * Renders a screen with a single information.
 * 
 * @see InformationScreen 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class InformationArticleScreen extends Component {
    render() {
        return (
            <AppContainer>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={contentContainer}>
                        <Image style={imageStyle} source={{ uri: getUiService().convertRefToSrc(this.props.componentProps.img.asset._ref)}} />
                        <Text title>{this.props.componentProps[`name_${getSettingsService().getCurrentLanguage()}`]}</Text>
                        <Text heading style={fontSize.md}> von {this.props.componentProps.author_de}, {this.props.componentProps[`author_info_${getSettingsService().getCurrentLanguage()}`]}</Text>
                        <Text heading style={fontSize.sm}>Website: {this.props.componentProps.author_url}</Text>
                        <Text>{this.props.componentProps[`text_${getSettingsService().getCurrentLanguage()}`]}</Text>
                    </View>
                </ScrollView>
            </AppContainer>
        )
    }
}

// style definitions

const contentContainer = StyleSheet.flatten([
    margin.margin_4, 
    padding.padding_4, 
    shadow.shadowMD
])

const imageStyle = StyleSheet.flatten([
    { width: "100%" }, height.height_150,
    borderRadius.roundedMD
])