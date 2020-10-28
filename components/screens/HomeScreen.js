import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {Avatar, Button, Card, IconButton, Provider as PaperProvider} from "react-native-paper";
import {colors} from "@configs/colors";
import HorizontalCalendar from "@components/HorizontalCalendar";
import MedicationList from "../lists/MedicationList";
import {darkTheme, lightTheme} from "../../configs/PaperTheme";
import MedicationService from "../../service/MedicationService";
import {observer} from "mobx-react";
import {getMedicationStore} from "../../stores/MedicationStore";
import VitaldataService from "../../service/VitaldataService";
import {defaultStyles} from "../../configs/styles";
import {getUiStore} from "../../stores/UiStore";


/**
 * Homescreen
 *
 * @author Dominique Börner
 */
@observer
export class HomeScreen extends Component {
    render() {
        return (
            <PaperProvider theme={lightTheme}>
                <View style={defaultStyles.themeContainer}>
                    <ScrollView style={defaultStyles.defaultContentContainer}>
                        <HorizontalCalendar />
                        <Card style={styles.contentCard}>
                            <Card.Title title={getUiStore().getTranslation('medication')} right={() => <IconButton icon="plus" onPress={() => MedicationService.openMedicationWindow()} />}
                                        left={(props) => <Avatar.Icon style={{ marginRight:10, backgroundColor: colors.white }}
                                                                      color={"black"} {...props} icon="pill" /> }/>
                            <Card.Content>
                                <MedicationList medications={getMedicationStore().medicationObj}/>
                            </Card.Content>
                        </Card>

                        { /** TODO: Aufgrund von vielen Begleiterkrankungen genauer überlegen
                         <Card style={styles.contentCard}>
                         <Card.Title title="Mahlzeiten" right={() => <IconButton icon="plus" />}
                         left={(props) => <Avatar.Icon style={{ marginRight:10, backgroundColor: colors.white }}
                                                                          color={"black"} {...props} icon="food-apple" /> }/>
                         <Card.Content>
                         <MealList meals={getMealStore().mealsObj}/>
                         </Card.Content>
                         </Card> **/ }
                        <Card style={styles.contentCard}>
                            <Card.Title title={getUiStore().getTranslation('vitaldata')} left={() => <IconButton icon="heart" />} />
                            <Card.Content>
                                <Button mode="contained" style={defaultStyles.defaultButton} onPress={() => VitaldataService.openVitaldataWindow()}>{getUiStore().getTranslation('add_vitaldata')}</Button>
                                <Button mode="contained" style={defaultStyles.defaultButton}>{getUiStore().getTranslation('add_doctor_report')}</Button>
                            </Card.Content>
                        </Card>
                    </ScrollView>
                </View>
            </PaperProvider>
        )
    }
}

const styles = StyleSheet.create({
    contentCard: {
        margin: 10
    }
})