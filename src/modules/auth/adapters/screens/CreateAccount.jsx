import React from "react";
import { View, Text, StyleSheet} from "react-native";

export default function CreateAccount(){
    return (
        <View style={styles.container}>
            <Text>Crea tu cuenta</Text>
        </View>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: "center",
        width: '100%'
    }
})