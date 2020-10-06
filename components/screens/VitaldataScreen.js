import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {Button, Headline, List, Provider as PaperProvider, Text, TextInput} from "react-native-paper";
import defaultTheme from "../../configs/PaperTheme";


/**
 * Profile screen
 *
 * @author Dominique Börner
 */
export class VitaldataScreen extends Component {

    state = {
        weight: "",
        height: "",
    };

    render() {
        console.log(this.state);
        return (
            <PaperProvider theme={defaultTheme}>
                <ScrollView style={styles.vitaldataContainer}>
                    <Headline>Vitaldaten</Headline>
                    <List.Section>
                        <List.AccordionGroup>
                            <List.Accordion title="Gewicht" id="1" left={() => <List.Icon icon="weight-kilogram" />} >
                                <View>
                                    <Text>Kg</Text>
                                    <TextInput mode="outlined" value={this.state.weight} onChangeText={(value) => this.setState({weight: value})}/>
                                </View>
                            </List.Accordion>
                            <List.Accordion title="Größe" id="2" left={() => <List.Icon icon="account" />} >
                                <View>
                                    <Text>cm</Text>
                                    <TextInput mode="outlined" value={this.state.height} onChangeText={(value) => this.setState({height: value})}/>
                                </View>
                            </List.Accordion>
                        </List.AccordionGroup>
                    </List.Section>
                    <Button mode="contained">Speichern</Button>
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