import React, {Component} from 'react';
import {LineChart} from "react-native-chart-kit";
import {ScrollView} from "react-native";
import {colors} from "../../configs/colors";

/**
 * FEV1 Chart
 *
 *
 * @property data
 * @property chartType 'direct' or 'history'
 * @author Dominique Börner
 */
export default class FEV1Chart extends Component {
    data = ["21/02/2020", "27/04/2020", "18/05/2020", "25/06/2020", "10/07/2020", "13/07/2020", "23/07/2020", "04/08/2020", "12/08/2020", "18/08/2020"];

    render() {
        if (this.props.chartType === 'direct') {
        } else if (this.props.chartType === 'history' || !this.props.chartType) {
            return(
                <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                    <LineChart
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
                            backgroundGradientFrom: colors.turquoise_dark,
                            backgroundGradientTo: colors.turquoise_dark,
                            decimalPlaces: 1, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "3",
                                strokeWidth: "1",
                                stroke: colors.turquoise_dark
                            }
                        }}
                        bezier
                    />
                </ScrollView>
            )
        }

    }
}