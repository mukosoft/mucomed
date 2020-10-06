import React, {Component} from 'react';
import {ScrollView, StyleSheet} from "react-native";
import {Avatar, Button, Card, IconButton, Provider as PaperProvider, Text} from "react-native-paper";
import {colors} from "@configs/colors";
import HorizontalCalendar from "@components/HorizontalCalendar";
import MedicationList from "../lists/MedicationList";
import defaultTheme from "./../../configs/PaperTheme";
import MedicationService from "../../service/MedicationService";
import {observer} from "mobx-react";
import {getDateStorage} from "../../stores/DateStorage";
import {getMedicationStore} from "../../stores/MedicationStore";
import VitaldataService from "../../service/VitaldataService";
import MealList from "../lists/MealList";
import {getMealStore} from "../../stores/MealStore";


/**
 * Homescreen
 *
 * @author Dominique Börner
 */
@observer
export class HomeScreen extends Component {
    render() {
        return (
            <PaperProvider theme={defaultTheme}>
                <ScrollView style={styles.container}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <HorizontalCalendar />
                            <Card style={styles.contentCard}>
                                <Card.Title title="Medikamente" right={() => <IconButton icon="plus" onPress={() => MedicationService.openMedicationWindow()} />}
                                            left={(props) => <Avatar.Icon style={{ marginRight:10, backgroundColor: colors.white }}
                                                                          color={"black"} {...props} icon="pill" /> }/>
                                <Card.Content>
                                    <MedicationList medications={getMedicationStore().medicationObj}/>
                                </Card.Content>
                            </Card>
                            <Card style={styles.contentCard}>
                                <Card.Title title="Mahlzeiten" right={() => <IconButton icon="plus" />}
                                            left={(props) => <Avatar.Icon style={{ marginRight:10, backgroundColor: colors.white }}
                                                                          color={"black"} {...props} icon="food-apple" /> }/>
                                <Card.Content>
                                    <MealList meals={getMealStore().mealsObj}/>
                                </Card.Content>
                            </Card>
                            <Card style={styles.contentCard}>
                                <Card.Title title="Vitaldaten" left={() => <IconButton icon="heart" />} />
                                <Card.Content>
                                    <Button mode="contained" style={styles.buttons} onPress={() => VitaldataService.openVitaldataWindow()}>Vitaldaten erfassen</Button>
                                    <Button mode="contained" style={styles.buttons}>Arztbericht einscannen</Button>
                                </Card.Content>
                            </Card>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </PaperProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: colors.white,
    },
    card: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
        marginTop: 10,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        minHeight: 600
    },
    contentCard: {
        margin: 5
    },
    medicationCard: {
        backgroundColor: colors.turquoise_dark,
        margin: 5, padding: 0,
        justifyContent: 'center',
        height: 100, width: 100,
        shadowColor: colors.grey_dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    medicationName: {
        color: colors.white
    },
    medicationDosage: {
        color: colors.white
    },
    buttons: {
        margin: 2.5
    }
})