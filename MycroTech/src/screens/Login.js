import React, { Component } from 'react'
import { StyleSheet, View, Alert, Text, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView } from 'react-native'

export default class Login extends Component{

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,   
    };

    constructor(props){

        super( props );
        this.state = {
            username: "",
            password: "",

            wrongPassword: false,
            wrongUsername: false
        };
    }

    loginUser = () => {        
        fetch('http://' + global.IP + '/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
                .then((responseJson) => {
                    
                    this.setState({ wrongPassword: false });
                    this.setState({ wrongUsername: false });

                    if(responseJson.msg === "Listo"){
                        global.nombre = this.state.username;
                        global.bandas = responseJson.bandasList;
                        global.canciones = responseJson.cancionesList;
                        global.presetZ = responseJson.presetZList;
                        global.presetX = responseJson.presetXList;
                        global.presetR = responseJson.presetRList;
                        global.temaNegro = responseJson.temaNegro;
                        console.log(global.presetZ);
                        console.log(global.presetX);
                        console.log(global.presetR);
                        Alert.alert("Inicio de sesión existoso");
                        this.props.navigation.navigate('Menu');
                    }
                    else if(responseJson.msg === "Error, contra"){
                        this.setState({ wrongPassword: true });
                        Alert.alert("ERROR", "Contraseña incorrecta");
                    }
        
                    else if(responseJson.msg === "Error, usuario"){
                        this.setState({ wrongUsername: true });
                        Alert.alert("ERROR", "El usuario no existe");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });            
    }

    onChangeUsername = (username) => {
        this.setState({ username });
    }

    onChangePassword = (password) => {
        this.setState({ password });
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
                        <Text style={styles.title}>Inicio</Text>
                    </View>

                    <View style={styles.formView}>  
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
                            
                        <View style={styles.olvidoContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Recuperar')}>
                                <Text style={styles.olvidoTxt}>Olvidé mi contraseña</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.buttonView}>  
                        <TouchableOpacity style={styles.btn} onPress={this.loginUser}>  
                            <Text style = {styles.txtBtn}>Iniciar Sesión</Text>   
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
        marginTop: 50
    },
 
    formView: {
        flex: 1,
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
    olvidoContainer: {
        width: 240,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    olvidoTxt: {
        opacity: .6,
        textDecorationLine: 'underline'
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
        fontSize: 18,
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