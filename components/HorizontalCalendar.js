import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { CALENDAR_DATE_AMOUNT } from './../configs/userconfig';
import CalendarItem from './cards/CalendarItem';

/**
 * Create a Horizontal ScrollView with Cards inside. Each card represents a date.
 * If a card is clicked, DateService gets updated.
 *
 *
 * @author Dominique Börner
 */
@observer
export default class HorizontalCalendar extends Component {
    render() {
        return (
            <SafeAreaView>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={(ref) => (this.scrollView = ref)}
                    onContentSizeChange={() => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}
                    style={styles.calendarContainer}>
                    {this.renderLastDays()}
                </ScrollView>
            </SafeAreaView>
        );
    }

    renderLastDays() {
        return this.getLastDays(CALENDAR_DATE_AMOUNT).map((date) => {
            return (
                <CalendarItem date={date} />
            );
        });
    }

    getLastDays(daysAmount) {
        let lastDays = [...Array(daysAmount)]
            .map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - i);
                return d;
            })
            .reverse();

        return lastDays;
    }
}

const styles = StyleSheet.create({
    calendarContainer: {
        backgroundColor: 'transparent',
    },
   
});
