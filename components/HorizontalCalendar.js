import { colors } from '@configs/colors';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { CALENDAR_DATE_AMOUNT } from './../configs/userconfig';
import CalendarItem from './cards/CalendarItem';
import Layout from './container/Layout';

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
                <Layout style={styles.layout}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ref={(ref) => (this.scrollView = ref)}
                        onContentSizeChange={() => {
                            this.scrollView.scrollToEnd({ animated: true });
                        }}>
                        {this.renderLastDays()}
                    </ScrollView>
                </Layout>
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
    layout: {
        marginTop: 10, marginBottom: 10,
        minHeight: 110,
    }
})