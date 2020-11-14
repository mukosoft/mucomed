import { getUiService } from '@service/UiService';
import React, { Component } from 'react';
import { ScrollView } from "react-native";
import { LineChart as RNLineChart } from "react-native-chart-kit";

/**
 * Renders a LineChart based on data. 
 * The data must be in a 1:1 relationship to each other (e.g. one date - one data).
 * 
 * This uses the react-native chart kit (https://github.com/indiespirit/react-native-chart-kit)
 * 
 * @author Dominique Börner
 */
export default class LineChart extends Component {
    data = ["21/02/2020", "27/04/2020", "18/05/2020", "25/06/2020", "10/07/2020", "13/07/2020", "23/07/2020", "04/08/2020", "12/08/2020", "18/08/2020"];

    render() {
        if (this.props.chartType === 'direct') {
        } else if (this.props.chartType === 'history' || !this.props.chartType) {
            return(
                <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                    <RNLineChart
                        data={{
                            labels: ["21/02/2020", "27/04/2020", "18/05/2020", "25/06/2020", "10/07/2020", "13/07/2020", "23/07/2020", "04/08/2020", "12/08/2020", "18/08/2020"],
                            datasets: [
                                {
                                    data: [
                                        87,
                                        85,
                                        84,
                                        83,
                                        80,
                                        87,
                                        85,
                                        88,
                                        85,
                                        83
                                    ]
                                },
                            ]
                        }}
                        width={this.data.length * 100}
                        height={200}
                        yAxisSuffix="%"
                        fromZero={true}
                        chartConfig={{
                            backgroundGradientFrom: getUiService().theme.primary,
                            backgroundGradientTo:  getUiService().theme.primary,
                            decimalPlaces: 1, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "3",
                                strokeWidth: "1",
                                stroke: getUiService().theme.primary
                            }
                        }}
                        bezier
                    />
                </ScrollView>
            )
        }

    }
}