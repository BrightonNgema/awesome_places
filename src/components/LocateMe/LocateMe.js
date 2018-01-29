import React, {Component} from 'react';
import {View, Button, Image,Text, StyleSheet} from 'react-native';
class LocateMe extends Component {
    render() {
        return(
        <View style={styles.container}>
            <View style={styles.placeholder}>
                        <Text>Map</Text>
            </View>
            <View style={styles.button}>
                <Button title="Locate Me" onPress={() => alert("pick location")}/>
            </View>
        </View>
        );
    }
}

const styles =StyleSheet.create({
    container:{
        width:"100%",
        alignItems: "center"
    },
    placeholder:{
        borderWidth:1,
        borderColor:"#000",
        backgroundColor:"#eee",
        width:"80%",
        height:150
    },
    button:{
        margin: 8
    },
    previewImage:{
        width:"100%",
        height: "100%"
    }
});
export default LocateMe;