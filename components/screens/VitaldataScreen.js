import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {Button, Headline, List, Provider as PaperProvider, Text, TextInput} from "react-native-paper";
import {lightTheme} from "../../configs/PaperTheme";
import {VITALDATA} from "../../models/VitaldataModel";
import {getDateService} from "../../service/DateService";


/**
 * Profile screen
 *
 * @author Dominique Börner
 */
export class VitaldataScreen extends Component {

    state = {};

    render() {
        VitaldataService.getInstance().getVitaldata({date: getDateService().getSelectedDate()})
            .then((result) => getVitaldataService().vitaldataObj = result.data);

        console.log(getVitaldataService().vitaldataObj)

        return (
            <PaperProvider theme={lightTheme}>
                <ScrollView style={styles.vitaldataContainer}>
                    <List.Section>
                        <List.AccordionGroup>
                            {
                                VITALDATA.map((data) => {
                                    return(
                                        <List.Accordion title={data.title} id={data.id} left={() => <List.Icon icon={data.icon} />} >
                                            <View>
                                                <Text>{data.unit}</Text>
                                                <TextInput mode="outlined" value={(getVitaldataService().vitaldataObj[data.id]) ? getVitaldataService().vitaldataObj[data.id] : ""}
                                                           onChangeText={(value) => getVitaldataService().vitaldataObj[data.id] = value} />
                                            </View>
                                        </List.Accordion>
                                    )
                                })
                            }
                        </List.AccordionGroup>
                    </List.Section>
                    <Button mode="contained" onPress={() =>
                        VitaldataService.getInstance().addVitaldataIfNotExists({date: getDateService().getSelectedDate(), data: getVitaldataService().vitaldataObj})}>
                        Speichern
                    </Button>
                </ScrollView>
            </PaperProvider>
        )
    }
}

const styles = StyleSheet.create({
    vitaldataContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    }
})