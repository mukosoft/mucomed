import { getUiService } from '@service/UiService';
import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { StyleSheet } from 'react-native';
import Text from "@components/common/Text";
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import { alignContent, alignItems, alignSelf, aspectRatio_1_1, borderRadius, flex, fontSize, fontStyle, height, justifyContent, margin, padding } from '../../configs/styles';

/**
 * With this element, the user can navigate between the app.
 * 
 * @property {event} onPress
 * @property {boolean} active - is the screen, which this button navigates to, open
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class NavigationButton extends Component {
    handleViewRef = ref => this.view = ref;
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <Animatable.View ref={this.handleViewRef} animation={(this.props.active === true) && "bounceIn"}
                    style={(this.props.active === true) ? activeButton : nonActiveButton}>
                    <FAIcon name={this.props.icon} style={(this.props.active === true) ? activeIcon : nonActiveIcon}/>
                    <Text style={(this.props.active === true) ? activeText : nonActiveText}>{this.props.text}</Text>
                </Animatable.View>
            </TouchableWithoutFeedback>
        )
    }
}

const nonActiveButton = StyleSheet.flatten([
    flex.flexCol,
    height.height_65,
    alignContent.contentCenter,
    justifyContent.justifyStart,
    alignItems.itemsCenter,
    aspectRatio_1_1,
    borderRadius.roundedMD,
    padding.padding_y_4,
    padding.padding_x_1,
    { color: getUiService().theme.secondary }
])

const activeButton = StyleSheet.flatten([
    flex.flexCol,
    height.height_65,
    alignContent.contentCenter,
    justifyContent.justifyStart,
    alignItems.itemsCenter,
    aspectRatio_1_1,
    borderRadius.roundedMD,
    padding.padding_y_4,
    padding.padding_x_1,
    { color: getUiService().theme.secondary },
    { backgroundColor: getUiService().theme.primary }
])

const activeIcon = StyleSheet.flatten([
    fontSize.lg,
    alignSelf.selfCenter,
    { color: getUiService().theme.secondary }
])

const nonActiveIcon = StyleSheet.flatten([
    fontSize.lg,
    alignSelf.selfCenter,
    { color: getUiService().theme.primary }
])

const activeText = StyleSheet.flatten([
    alignSelf.selfCenter,
    fontSize.xs,
    fontStyle.bold,
    margin.margin_y_2,
    { color: getUiService().theme.secondary }
])

const nonActiveText = StyleSheet.flatten([
    alignSelf.selfCenter,
    fontSize.xs,
    fontStyle.bold,
    margin.margin_y_2,
    { color: getUiService().theme.primary }
])