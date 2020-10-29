import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Card, Text } from 'react-native-paper';
import { getDateStorage } from '../../stores/DateStorage';
import { DateTimeConverterService } from './../../service/DateTimeConverterService';
import { StyleSheet } from 'react-native';
import { colors } from '@configs/colors';

@observer
export default class CalendarItem extends Component {
    render() {
        const date = this.props.date;

        if (this.props.date.getDay() === getDateStorage().calendarSelection.getDay()) {
            style = styles.selectedCalendarDate;
            styleTitle = styles.selectedCalendarDateTitle;
            styleText = styles.selectedCalendarDateText;
        } else {
            style = styles.calendarDate;
            styleTitle = styles.calendarDateTitle;
            styleText = styles.calendarDateText;
        }

        return (
            <Card
                style={style}
                key={this.props.date}
                onPress={() => this.handlePress(this.props.date)}>
                <Card.Title
                    title={DateTimeConverterService.getDateName(date)}
                    titleStyle={styleTitle}
                />
                <Card.Content>
                    <Text style={styleText}>
                        {DateTimeConverterService.formatDate(date, false)}
                    </Text>
                </Card.Content>
            </Card>
        );
    }

    handlePress(date) {
        getDateStorage().setCalendarSelection(date);
    }
}

const styles = StyleSheet.create({
    calendarDate: {
        backgroundColor: colors.white,
        margin: 5,
        padding: 0,
        justifyContent: 'center',
        height: 100,
        width: 100,
        shadowColor: colors.grey_dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedCalendarDate: {
        backgroundColor: colors.turquoise_light,
        margin: 5,
        padding: 0,
        justifyContent: 'center',
        height: 100,
        width: 100,
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
})