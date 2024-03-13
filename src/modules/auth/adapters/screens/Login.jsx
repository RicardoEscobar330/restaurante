import { useState, React } from "react";
import { View, StyleSheet } from "react-native";
import { Image, Button, Input, Icon } from "@rneui/base";
import Logo from "../../../../../assets/logo.jpg";
import { isEmpty } from "lodash";
import Loading from "../../../../kernel/components/Loading";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showMessage, setShowMessage] = useState({email: "", password:""});
  const [visible, setVisible] = useState(false);
  const auth = getAuth();

  const loginxd = async () => {
    if (!isEmpty(email) && !isEmpty(password)) {
      setShowMessage({email: "", password:""});
      setVisible(true);
      try {
        const response = await signInWithEmailAndPassword(auth,email,password);
        navigation.navigate("UserLogged");
      } catch (error) {
        setShowMessage({email: "Usuario o contraseña incorrecto", password: "Usuario o contraseña incorrecto"});
      } finally {
        setVisible(false);
      }
    } else {
      setShowMessage({email: "Campo obligatorio", password: "Campo obligatorio"});
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Input
        placeholder="max@gmail.com"
        label="Correo electronico"
        keyboardType="email-address"
        labelStyle={styles.label}
        containerStyle={styles.input}
        onChange={({ nativeEvent: { text } }) => setEmail(text)}
        rightIcon={
          <Icon type="material-community" name="email-outline" color="tomato" />
        }
        errorMessage={showMessage.email}
      />
      <Input
        placeholder="********"
        label="Contraseña: *"
        labelStyle={styles.label}
        containerStyle={styles.input}
        onChange={({ nativeEvent: { text } }) => setPassword(text)}
        secureTextEntry={showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            color="tomato"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        errorMessage={showMessage.password}
      />
      <Button
        title="Iniciar Sesion"
        onPress={loginxd}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTitle}
        errorMessage={showMessage}
      />
      <Button
        title="Registrar"
        type="clear"
        onPress={() => navigation.navigate("CreateAccount")}
      />
      <Loading visible={visible} title="Iniciando Sesión" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  label: {
    color: "tomato",
  },
  input: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  btnContainer: {
    width: "80%",
  },
  btnStyles: {
    backgroundColor: "#FCD562",
  },
  btnTitle: {
    color: "black",
  },
});
