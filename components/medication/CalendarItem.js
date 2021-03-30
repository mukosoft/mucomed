import React, { Component } from 'react';
import { getDateService } from '@service/DateService';
import { DateTimeConverterService } from '@service/DateTimeConverterService';
import { getUiService } from '@service/UiService';
import { observer } from 'mobx-react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { alignContent, alignItems, aspectRatio_1_1, flex, fontSize, fontStyle, height, shadow, justifyContent, margin, padding, borderRadius } from '../../configs/styles';

/**
 * Renders a single element of the calendar. If the CalendarItem element is 
 * clicked, dateService sets the date to the clicked date. Also, the 
 * calendarItem slides down.
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export default class CalendarItem extends Component {

    state = {
        animMargin: new Animated.Value(0)
    }
    
    render() {
        const date = this.props.date;
        let style;
        let styleText;
        let styleDate;

        if (this.isSelected()) {
            style = itemSelected;
            styleText = itemSelectedText;
            styleDate = dateSelectedText;
            this.animateMarginTop(10);
        } else {
            style = item;
            styleText = itemText;
            styleDate = dateText;
            this.animateMarginTop(0);
        }

        return (
            <TouchableWithoutFeedback onPress={() => getDateService().setCalendarSelection(date)}>
                <View style={container}>
                    <Animated.View
                    style={[style, borderRadius.roundedMD, { marginTop: this.state.animMargin }]}
                    key={this.props.date}>
                        <Text style={styleText}>{DateTimeConverterService.formatDate(date, false)}</Text>
                        <Text style={styleDate}>{DateTimeConverterService.getDateName(date)}</Text>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback> 
        );
    }

    isSelected() {
        return (`${this.props.date.getDate()}${this.props.date.getMonth()}`) === (`${getDateService().calendarSelection.getDate()}${getDateService().calendarSelection.getMonth()}`);
    }

    animateMarginTop(px) {
        Animated.timing(this.state.animMargin, {
            toValue: px,
            duration: 200,
            useNativeDriver: false
        }).start();
    }
}

// style definitions

const container = StyleSheet.flatten([
    flex.flexCol,
    justifyContent.justifyCenter,
    alignContent.contentCenter,
    alignItems.itemsCenter
])

const item = StyleSheet.flatten([
    padding.padding_2,
    margin.margin_2,
    justifyContent.justifyCenter,
    alignItems.itemsCenter,
    height.height_75,
    aspectRatio_1_1,
    { backgroundColor: getUiService().theme.secondary }
])

const itemText = StyleSheet.flatten([
    fontSize.lg,
    fontStyle.bold,
    { color: getUiService().theme.primary }
])

const dateText = StyleSheet.flatten([
    fontSize.sm,
    padding.padding_y_2,
    { color: getUiService().theme.primary }
])

const itemSelected = StyleSheet.flatten([
    padding.padding_2,
    margin.margin_2,
    justifyContent.justifyCenter,
    alignItems.itemsCenter,
    height.height_75,
    aspectRatio_1_1,
    { backgroundColor: getUiService().theme.primary }
])

const itemSelectedText = StyleSheet.flatten([
    fontSize.lg,
    fontStyle.bold,
    { color: getUiService().theme.secondary }
])

const dateSelectedText = StyleSheet.flatten([
    fontSize.sm,
    padding.padding_y_2,
    { color: getUiService().theme.secondary }
])