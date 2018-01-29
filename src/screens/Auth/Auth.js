import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ImageBackground} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBG from "../../components/UI/ButtonWithBG/ButtonWithBG";
import bgImage from "../../assets/bgimage.jpg";

class AuthScreen extends Component {

    loginHandler = () => {
        startMainTabs();
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.bgImage}>
                <View style={styles.container}>
                
                    <MainText>
                        <HeadingText style={styles.textHeading}>Please Login in </HeadingText>
                    </MainText>    
                    <ButtonWithBG color="#29aaf4">Switch to Login</ButtonWithBG>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Your email address" style={styles.input} />
                        <DefaultInput placeholder="Password" style={styles.input} />
                        <DefaultInput placeholder="Confirm Password" style={styles.input}/>
                    </View>
                    <ButtonWithBG color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBG>
                
                </View>
                </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width:"80%" 
    },
    input:{
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    bgImage:{
        width:"100%",
        flex: 1,
    }
});
export default AuthScreen;