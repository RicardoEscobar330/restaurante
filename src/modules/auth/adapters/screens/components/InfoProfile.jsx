import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import UsuarioAvatar from '../../../../../../assets/usuario.png'
import { getAuth, updateProfile } from 'firebase/auth'
import { Avatar } from '@rneui/themed'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { storage } from '../../../../../config/util/firebaseConnection'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import Loading from '../../../../../kernel/components/Loading'

export default function InfoProfile(props) {
    const {
        infoUser: { photoURL, displayName, email, uid },
    } = props;
    const [isVisible, setVisible] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const uploadImage = async (uri) => {
        setShowLoading(true);
        const response = await fetch(uri);
        const {_bodyBlob} = response;
        const storageRef = ref(storage, `avatar/${uid}`)
        return uploadBytes(storageRef, _bodyBlob);
    };

    const uploadPhotoURL = () => {
        getDownloadURL(ref(storage, `avatar/${uid}` )).then((url) => {
            updateProfile(getAuth().currentUser, {
                photoURL: url,
            }).catch((error)=> {
                console.error(error);
                alert("Ocurrió un error al actualizar la foto de perfil");
            }).finally(() => {
                setShowLoading(false);
            });
        });
    }

    const changeAvatar = async () => {
        const resultPermission = await MediaLibrary.requestPermissionsAsync();
        if(resultPermission.status !== 'denied'){
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                //base64: true,
            });
            if(result.canceled(true)){
                setVisible(false);
                try{
                    setVisible(true);
                    await uploadImage(result.assets[0].uri);
                    await uploadPhotoURL();
                } catch (error){
                    alert("Error al subir la imagen")
                } finally {
                    setVisible(false);
                }
            }
        } else {
            alert("Es necesario acpetar los permisos de la galería")
        }
    }


    return (
        <View style={styles.row}>
            <Avatar
                size={64}
                rounded
                source={photoURL ? { uri: photoURL } : UsuarioAvatar}
                containerStyle={{ backgroundColor: 'grey' }}
            >
                <Avatar.Accessory size={24} onPress={changeAvatar}/>
            </Avatar>
            <View style={{ flexDirection: 'column', marginLeft: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {displayName || 'Anonimo'}
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {email || 'No hay correo electronico'}
                </Text>
            </View>
            <Loading isVisible={isVisible} title='Cambiando foto de perfil'/>
        </View>

    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 16,

    }
})