import { getUiService } from '@service/UiService';
import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { alignContent, alignSelf, aspectRatio_1_1, borderRadius, flex, fontSize, fontStyle, height, justifyContent, margin } from '../../configs/styles';

export default class NavigationButton extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={(this.props.active === true) ? activeButton : nonActiveButton}>
                    <FAIcon name={this.props.icon} style={(this.props.active === true) ? activeIcon : nonActiveIcon}/>
                    <Text style={(this.props.active === true) ? activeText : nonActiveText}>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const nonActiveButton = StyleSheet.flatten([
    flex.flexCol,
    height.height_60,
    alignContent.contentCenter,
    justifyContent.justifyCenter,
    aspectRatio_1_1,
    borderRadius.roundedMD,
    { color: getUiService().theme.secondary }
])

const activeButton = StyleSheet.flatten([
    flex.flexCol,
    height.height_60,
    alignContent.contentCenter,
    justifyContent.justifyCenter,
    aspectRatio_1_1,
    borderRadius.roundedMD,
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