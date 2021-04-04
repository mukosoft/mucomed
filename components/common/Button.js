import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { getUiService } from "@service/UiService";
import { alignItems, alignSelf, border, borderRadius, flex, fontSize, fontStyle, height, justifyContent, margin, padding, textAlign, width } from '../../configs/styles';
import * as Animatable from 'react-native-animatable';

/**
 * Renders a button. Based on which property was set, the button will be 
 * rendered as either primary, secondary or text.
 * 
 * @property primary
 * @property secondary
 * @property text
 * @property animation - (optional) animation from animation package
 * @property {eventListener} onPress - event, which should be executed
 * @property {Object} style - StyleSheet object
 * 
 * @see https://github.com/oblador/react-native-animatable
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export default class Button extends Component {

    handleViewRef = ref => this.view = ref;

    
    animate = () => { 
        this.props.onPress();

        // animations
        if (this.props.animation === "rubberBand") {this.view.rubberBand(800)}; 
        if (this.props.animation === "pulse") {this.view.rubberBand(800)}; 
    }; 
    
    render() {
        let style = defaultStyle
        let textStyle = defaultTextStyle;

        if (this.props.primary) { style = primaryStyle; textStyle = primaryTextStyle }
        if (this.props.secondary) { style = secondaryStyle; textStyle = secondaryTextStyle }
        if (this.props.text) { style = textButtonStyle; textStyle = textFontStyle }

        return (
            <TouchableWithoutFeedback onPress={this.animate}>
                <Animatable.View ref={this.handleViewRef} style={[style, this.props.style, (this.props.danger && dangerStyle)]}>
                    {(this.props.icon) ? <Image source={this.props.icon} style={iconStyle} /> : null}
                    <Animatable.Text style={[textStyle, this.props.fontStyle]}>{this.props.children}</Animatable.Text>
                </Animatable.View>
            </TouchableWithoutFeedback>
        )
    }
}

// style definitions

const dangerStyle = StyleSheet.flatten([
    { backgroundColor: getUiService().theme.danger }
])

const iconStyle = StyleSheet.flatten([
    width.width_25,
    height.height_25,
    alignSelf.selfCenter,
    margin.margin_2
])

const defaultStyle = StyleSheet.flatten([
    flex.flexCol,
    justifyContent.justifyCenter,
    alignItems.itemsCenter,
    margin.margin_2,
    padding.padding_1,
])

const defaultTextStyle = StyleSheet.flatten([
    { color: getUiService().theme.primary }
])

const primaryStyle = StyleSheet.flatten([
    flex.flexCol,
    justifyContent.justifyCenter,
    alignItems.itemsCenter,
    margin.margin_2,
    padding.padding_4,
    borderRadius.roundedMD,
    { backgroundColor: getUiService().theme.primary }
])

const primaryTextStyle = StyleSheet.flatten([
    fontSize.md,
    textAlign.textCenter,
    { color: getUiService().theme.secondary }
])

const secondaryStyle = StyleSheet.flatten([
    flex.flexCol,
    justifyContent.justifyCenter,
    alignItems.itemsCenter,
    margin.margin_2,
    padding.padding_4,
    border.borderXL,
    borderRadius.roundedMD,
    { borderColor: getUiService().theme.primary },
    { color: getUiService().theme.primary }
])

const secondaryTextStyle = StyleSheet.flatten([
    fontSize.lg,
    textAlign.textCenter,
    { color: getUiService().theme.primary }
])

const textButtonStyle = StyleSheet.flatten([
    flex.flexCol,
    margin.margin_2,
    padding.padding_4,
    borderRadius.roundedMD,
    { color: getUiService().theme.primary }
])

const textFontStyle = StyleSheet.flatten([
    fontSize.lg,
    textAlign.textCenter,
    { color: getUiService().theme.primary }
])