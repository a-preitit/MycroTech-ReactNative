import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, KeyboardAvoidingView, StatusBar, TextInput, Alert} from 'react-native'

export default class Register extends Component{

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,   
    };

    constructor(props){

        super( props );
        this.state = {
            email: "",
            username: "",
            password: "",
            validatePassword: "",

            wrongEmail: false,
            wrongUsername: false,
            wrongPassword: false,
        };
    }

    registerUser = () => {
        if (this.state.password === this.state.validatePassword){
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(this.state.email)){
                fetch('http://'+ global.IP + '/register', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email,
                    })
                })
                    .then((response) => response.json())
                        .then((responseJson) => {

                            this.setState({ wrongEmail: false});
                            this.setState({ wrongPassword: false });
                            this.setState({ wrongUsername: false });

                            if(responseJson.msg === "Listo"){
                                global.nombre = this.state.username;
                                Alert.alert("Registro realizado correctamente");
                                this.props.navigation.navigate('Menu');
                            }
                            else if(responseJson.msg === "Error"){
                                this.setState({ wrongUsername: true });
                                Alert.alert("ERROR", "El de nombre de usuario ya fue utilizado");
                            }
                            else if(responseJson.msg === "Error, mail"){
                                this.setState({ wrongEmail: true });
                                Alert.alert("ERROR", "El email ya fue utilizado");
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
            }
            else{
                Alert.alert("Email no válido");
                this.setState({ wrongEmail: true });
            }
        }        
        else{
            this.setState({ wrongPassword: true });
            Alert.alert("Las contraseñas no son iguales");
        }
    }

    onChangeEmail = (email) => {
        this.setState({ email });
    }

    onChangeUsername = (username) => {
        this.setState({ username });
    }

    onChangePassword = (password) => {
        this.setState({ password });
    }

    onChangeValidatePassword = (validatePassword) => {
        this.setState({ validatePassword });
    }

    checkWrongEmail(){
        if(this.state.wrongEmail){
            return true
        }
    }

    checkWrongUsername(){
        if(this.state.wrongUsername){
            return true
        }
    }

    checkWrongPassword(){
        if(this.state.wrongPassword){
            return true
        }
    }

    render(){
        return(

                
                <KeyboardAvoidingView style={styles.container}>
                  
                    <StatusBar barStyle="light-content" />

                    <View style={styles.titleView}>
                        <Text style={styles.title}>Registro</Text>
                    </View>

                    <View style={styles.formView}>  
                            <TextInput
                                    placeholder="E-mail" 
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={this.checkWrongEmail() ? styles.formStyle2 : styles.formStyle1}
                                    keyboardType={"email-address"}
                                    email={this.state.email}
                                    onChangeText={this.onChangeEmail}

                            />

                            <TextInput
                                    placeholder="Nombre" 
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={this.checkWrongUsername() ? styles.formStyle2 : styles.formStyle1}
                                    username={this.state.username}
                                    onChangeText={this.onChangeUsername}

                            />

                            <TextInput
                                    placeholder="Contraseña" 
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={this.checkWrongPassword() ? styles.formStyle2 : styles.formStyle1}
                                    secureTextEntry
                                    password={this.state.password}
                                    onChangeText={this.onChangePassword}
                            />

                            <TextInput
                                    placeholder="Validar Contraseña" 
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={this.checkWrongPassword() ? styles.formStyle2 : styles.formStyle1}
                                    secureTextEntry
                                    password={this.state.validatePassword}
                                    onChangeText={this.onChangeValidatePassword}
                            />

                    </View>


                    <View style={styles.buttonView}>  
                        <TouchableOpacity style={styles.btn} onPress={this.registerUser}>  
                            <Text style = {styles.txtBtn}>Registrarse</Text>   
                        </TouchableOpacity>
                    </View>

                
                </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'

    },
    titleView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 50,
        justifyContent: 'center',
        marginTop: 50,

    },
 
    formView: {
        flex: 1.5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        color: '#A82574',

   //     fontFamily: 'sans-serif'
    },
    logo: {
        marginTop: 20,
        width: 130,
        height: 130
    },
    txtForm: {
        fontSize: 20,
        borderRadius: 20,
        color: '#fff',
        marginBottom: 20,
    //    fontFamily: 'sans-serif'
    },
    formStyle1: {
        backgroundColor: '#fff',
        width: 250,
        borderBottomWidth: 3,
        borderBottomColor: '#A82574',
        padding: 2,
        fontSize: 18
    },
    formStyle2: {
        backgroundColor: 'rgba(255,0,0,0.08)',
        width: 250,
        borderBottomWidth: 3,
        borderBottomColor: 'red',
        padding: 2,
        fontSize: 18
    },
    btn: {
        height: 50,
        width: 230,
        marginTop: 16,
        overflow: 'hidden',
        backgroundColor: '#A82574',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
        borderBottomWidth: 5, 
    },
    txtBtn: {
        fontSize: 20,
        color: '#fff',
    },
   
});