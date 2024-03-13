import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../auth/adapters/screens/Login' ;
import createAccount from '../../auth/adapters/screens/CreateAccount' ;
import UserGuest from '../../auth/adapters/screens/UserGuest';
import Profile from '../../auth/adapters/screens/Profile'
import UserLogged from '../../auth/adapters/screens/UserLogged';


const Stack = createStackNavigator();

export default function AuthStack(){
    return(
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name = 'Login'
            component = {Login}
            options = {{title: 'Login'}}/>

            <Stack.Screen name = 'CreateAccount'
            component = {createAccount}
            options = {{title: 'Crea tu cuenta'}}/>

            <Stack.Screen name = 'UserGuest'
            component = {UserGuest}
            options = {{title: 'Bienvenido'}}/>

            <Stack.Screen name = 'UserLogged'
            component = {UserLogged}
            options = {{title: 'Cuenta'}}/>

            <Stack.Screen name = 'Profile'
            component = {Profile}
            options = {{title: 'Mi Perfil'}}/>
        </Stack.Navigator>
    )
}
