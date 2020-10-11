import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import {Avatar, Card, IconButton, Menu, Text} from "react-native-paper";
import {colors} from "@configs/colors";
import {observer} from "mobx-react";
import {getDateStorage} from "../../stores/DateStorage";
import {DateTimeConverterService} from "../../service/DateTimeConverterService";
import Button from "react-native-paper/src/components/Button";
import MedicationService from "../../service/MedicationService";

/**
 * Create a Horizontal scrollable list with medications inside.
 * Each medication can be filtered by time.
 *
 * @author Dominique Börner
 */
@observer
export default class MedicationList extends Component {

    state = {};

    render() {

        console.log(this.state)

        return(
            <SafeAreaView>
                <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            ref={ref => this.scrollView = ref}
                            style={styles.medicationList}>
                    { /* TODO: Filter element for times */}
                    {this.showMedications()}

                </ScrollView>
            </SafeAreaView>
        );
    }

    showMedications() {
        const dayName = DateTimeConverterService.convertSelectedDateToDateObj(getDateStorage().getSelectedDate())

        console.log(this.props.medications)
        // TODO: Add field for time like medicationList[time].map ...
        if (this.props.medications[dayName].medicationList.length > 0) {
            return this.props.medications[dayName].medicationList.map((medication => {
                    let menuStateVisible = `${medication.name}_menuVisible`;
                    return <Card style={styles.medicationCard} key={medication.name}>
                        <Card.Title title={medication.name} titleStyle={styles.name}
                                    right={(props) => <Menu visible={this.state[menuStateVisible]}
                                                            anchor={<IconButton
                                                                onPress={() => this.setState({[menuStateVisible]: true})} color={colors.white} icon="dots-vertical"
                                                            />}
                                                            onDismiss={() => this.setState({[menuStateVisible]: false})}>
                                        <Menu.Item onPress={() => {}} title="Bearbeiten" />
                                        <Menu.Item onPress={() => { MedicationService.getInstance().deleteMedicationByName(medication.name)}} title="Löschen" />
                                    </Menu>
                                    } onPress={() => {
                            this.setState({ menuVisible: true})
                        }}
                        />
                        <Card.Content>
                            <Text style={styles.dosage}>{medication.dosage}</Text>
                        </Card.Content>
                    </Card>;
                })
            )
        }
    }
}

const styles = StyleSheet.create({
    medicationCard: {
        width: 120,
        aspectRatio: 1,
        margin: 5,
        padding: 0,
        backgroundColor: colors.turquoise_light,
    },
    name: {
        fontSize: 16,
        color: colors.white
    },
    dosage: {
        fontSize: 10,
        color: colors.white,
    },
    button: {
        color: colors.white
    }
});