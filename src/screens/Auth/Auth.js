import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ImageBackground, Dimensions} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBG from "../../components/UI/ButtonWithBG/ButtonWithBG";
import bgImage from "../../assets/bgimage.jpg";

import validate from '../../utility/validation';
class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
        controls:{
            email: {
                value: "",
                valid: false,
                validationRules:{
                    isEmail:true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules:{
                    minLength:6
                },
                touched: false
            },
            confirmPassword:{
                value: "",
                valid: false,
                validationRules:{
                    equalTo: 'password'
                },
                touched: false
            },
        }
    }
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount(){
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode:    
                dims.window.height > 500 ? "portrait" : "landscape"
        })
    }
    loginHandler = () => {
        startMainTabs();
    };

    updateInputState = (key, value) => {
        let connectedValue = {};
        if(this.state.controls[key].validationRules.equalTo){

            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;

            connectedValue = {
                ...connectedValue,
                equalTo :  equalValue
            }
        }
        if(key === 'password'){
            connectedValue = {
                ...connectedValue,
                equalTo :  value
            }
        }
        this.setState(prevState => {
            return{
              controls:{
                  ...prevState.controls,
                  confirmPassword: {
                    ...prevState.controls.confirmPassword,
                    valid:key === 'password' 
                    ? validate(prevState.controls.confirmPassword.value, 
                          prevState.controls.confirmPassword.validationRules, 
                          connectedValue
                      )
                    : prevState.controls.confirmPassword.valid
                },
                  [key]: {
                      ...prevState.controls[key],
                      value: value,
                      valid: validate(
                          value, 
                          prevState.controls[key].validationRules, 
                          connectedValue
                        ),
                        touched: true
                  }
                }
              }
        });
    }
    render() {
        let headingText = null;
        let Password = null;
        if(this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                        <HeadingText style={styles.textHeading}>Please Login in </HeadingText>
                </MainText> 
            );

        }
        return (
            <ImageBackground source={bgImage} style={styles.bgImage}>
                <View style={styles.container}>
                    {headingText} 
                    <ButtonWithBG color="#29aaf4">Switch to Login</ButtonWithBG>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Your email address" 
                                    style={styles.input}
                                    value={this.state.controls.email.value}
                                    onChangeText={(val) => this.updateInputState('email', val)}
                                    valid={this.state.controls.email.valid}
                                    touched={this.state.controls.email.touched}/>

                        <View style={this.state.viewMode === "portrait" 
                            ? styles.portraitPasswordContainer 
                            : styles.landscapePasswordContainer
                            }
                        >
                            <View style={this.state.viewMode === "portrait" 
                                    ? styles.portraitPasswordWrapper 
                                    : styles.landscapePasswordWrapper
                                }
                            >
                            <DefaultInput 
                                    placeholder="Password" 
                                    style={styles.input}
                                    value={this.state.controls.password.value}
                                    onChangeText={(val) => this.updateInputState('password', val)}
                                    valid={this.state.controls.password.valid}
                                    touched={this.state.controls.password.touched} />
                            </View>

                            <View style={this.state.viewMode === "portrait" 
                                    ? styles.portraitPasswordWrapper 
                                    : styles.landscapePasswordWrapper
                                }
                            >       
                            <DefaultInput 
                                    placeholder="Confirm Password" 
                                    style={styles.input}
                                    value={this.state.controls.confirmPassword.value}
                                    onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                                    valid={this.state.controls.confirmPassword.valid}
                                    touched={this.state.controls.confirmPassword.touched}/>
                            </View>

                        </View>

                    </View>
                    <ButtonWithBG 
                            color="#29aaf4" 
                            onPress={this.loginHandler}
                            disbaled={this.state.controls.email.valid 
                                && this.state.controls.password.valid 
                                && this.state.controls.confirmPassword.valid}
                                
                    >
                            Submit
                    </ButtonWithBG>
                
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
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
        
        
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
        
        
    },
    landscapePasswordWrapper:{
        width: "48%",
        
    },
    portraitPasswordWrapper:{
        width:"100%"
        
    }
});
export default AuthScreen;