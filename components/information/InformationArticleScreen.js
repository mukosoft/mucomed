import React, {Component} from "react";
import {Image, Linking, ScrollView, StyleSheet, View} from "react-native";
import {Headline, Provider as PaperProvider, Text} from "react-native-paper";

import {lightTheme} from "@configs/PaperTheme";
import {colors} from "@configs/colors";

/**
 * Renders the screen for displaying the article of an information
 * 
 * @author Dominique Börner
 */
export default class InformationArticleScreen extends Component {
    render() {
        return( <PaperProvider theme={lightTheme}>
                <View style={styles.container}>
                    <ScrollView>
                        <Image source={{ uri: this.props.information.img_url }} style={styles.imgStyle} />
                        <View style={styles.textContainer} >
                        <Headline>{this.props.information.name}</Headline>
                        <Text>{this.props.information.author}{(this.props.information.author_additional !== "") ? ", " + this.props.information.author_additional : ""}</Text>
                        <Text style={styles.authorUrl} onPress={() => Linking.openURL(this.props.information.author_homepage)}>{this.props.information.author_homepage}</Text>
                        { this.props.information.sections.map((section) => {
                            return <View>
                                <Text style={styles.sectionTitle}>{section.title}</Text>
                                <Text style={styles.sectionText}>{section.text}</Text>
                            </View>
                        })}
                        </View>
                    </ScrollView>
                </View>
            </PaperProvider>
        )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    textContainer: {
        margin: 10
    },
    imgStyle: {
        width: '100%', aspectRatio: 2,
        resizeMode: 'stretch'
    },
    authorUrl: {
        color: colors.silver
    },
    sectionTitle: {
        paddingTop: 5, paddingBottom: 5,
        fontSize: 20
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'justify'
    },
})