import React from "react"
import { StyleSheet, Text, View } from "react-native"
import {Image, Button} from "@rneui/base"
import UserLogged from './UserLogged';


export default function UserGuest(){
    return(
        <View>
            <Text>UserGuest</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32
    },
    
    logo:{
        width: 120,
        height: 120
    },
    title:{
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'center',
        color: '#cfac47'
    },
    description:{
        padding: 16,
        textAlign: 'center'
    }
});