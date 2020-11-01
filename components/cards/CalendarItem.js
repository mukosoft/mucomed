import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Card, Text } from 'react-native-paper';
import { getDateService } from '../../service/DateService';
import { colors } from '@configs/colors';
import { DateTimeConverterService } from './../../service/DateTimeConverterService';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {defaultStyles} from './../../configs/styles';

@observer
export default class CalendarItem extends Component {
    render() {
        const date = this.props.date;

        if (
            this.props.date.getDay() === getDateService().calendarSelection.getDay()
        ) {
            style = styles.selectedCalendarDate;
            styleTitle = styles.selectedCalendarDateTitle;
            styleText = styles.selectedCalendarDateText;
        } else {
            style = styles.calendarDate;
            styleTitle = styles.calendarDateTitle;
            styleText = styles.calendarDateText;
        }

        return (
            <TouchableOpacity onPress={() => this.handlePress(this.props.date)}>
                <View
                style={[style, defaultStyles.defaultShadow, defaultStyles.defaultBorderRadius]}
                key={this.props.date}>
                    <Text style={styleTitle}>{DateTimeConverterService.getDateName(date)}</Text>
                    <Text style={styleText}>{DateTimeConverterService.formatDate(date, false)}</Text>
                </View>
            </TouchableOpacity>
           
        );
    }

    handlePress(date) {
        getDateService().setCalendarSelection(date);
    }
}


const styles = StyleSheet.create({
    calendarDate: {
        backgroundColor: colors.white,
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        aspectRatio: 1
    },
    selectedCalendarDate: {
        backgroundColor: colors.turquoise_light,
        margin: 5,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        aspectRatio: 1
    },
    calendarDateTitle: {
        fontSize: 14,
        color: colors.turquoise_light,
        fontWeight: '100',
    },
    selectedCalendarDateTitle: {
        fontSize: 14,
        color: colors.white,
        fontWeight: '100',
    },
    calendarDateText: {
        fontWeight: '900',
        fontSize: 20,
        color: colors.turquoise_light,
    },
    selectedCalendarDateText: {
        fontWeight: '900',
        fontSize: 20,
        color: colors.white,
    },
});
