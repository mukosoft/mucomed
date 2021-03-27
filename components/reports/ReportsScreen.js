import React, { Component } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { Navigation } from 'react-native-navigation';
import AppContainer from "../common/AppContainer";
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import { padding, textAlign } from "../../configs/styles";
import DocumentScanner from "@woonivers/react-native-document-scanner"

/**
 * Renders the user profile.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class ReportsScreen extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.documentScanner = React.createRef();
    }

    render() {
        // if (!this.state.meal) {
        // this.getRandomMeal();
        // return (<ActivityIndicator animating={true} color={getUiService().theme.primary} size="large" />)
        // } else {
        return (
            <AppContainer>
                <ScrollView showsVerticalScrollIndicator={false} style={padding.padding_3}>
                    <Text title style={textAlign.textCenter}>Hallo! 👋</Text>
                    <Button onPress={() => this.documentScanner.current.capture()} >Click</Button>
                   
                </ScrollView>
                <DocumentScanner 
                    ref={this.documentScanner}
                    style={documentScannerStyle} 
                    onPictureTaken={() => this.savePicture()} 
                    overlayColor="rgba(255, 130, 0, 0.7)" 
                    enableTorch={false} 
                    quality={0.5} 
                    detectionCountBeforeCapture={5}
                    detectionRefreshRateInMS={50} />
            </AppContainer>
        )
        // }
    }

    savePicture() {
        console.debug('Picture saved!')
    }
}

const documentScannerStyle = StyleSheet.flatten([

])
