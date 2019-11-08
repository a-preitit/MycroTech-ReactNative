import React, { Component } from 'react'
import { StyleSheet, View, Alert, Text, TouchableOpacity, StatusBar, TextInput, KeyboardAvoidingView } from 'react-native'

export default class Recuperar extends Component{

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,   
    };

    constructor(props){

        super( props );
        this.state = {
            email: "",
            wrongEmail: false,

        };
    }

    onPressEnviar = () => {
        fetch('http://' + global.IP + '/newPasswordRequest', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userData: this.state.email,
            })
        })
            .then((response) => response.json())
                .then((responseJson) => {
                    
                    this.setState({ wrongEmail: false });

                    if(responseJson.msg === "Listo"){
                        global.recuperar = responseJson.username;
                        Alert.alert("Se ha enviado un mail con el codigo de verificación");
                        this.props.navigation.navigate('Pin');
                    }
        
                    else if(responseJson.msg === "Error, usuario"){
                        this.setState({ wrongEmail: true });
                        Alert.alert("ERROR", "El usuario no existe");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });  
    }

    onChangeEmail = (email) => {
        this.setState({ email });
    }

    checkWrongEmail(){
        if(this.state.wrongEmail){
            return true
        }
    }

    render(){
        return(

                
                <KeyboardAvoidingView style={styles.container}>
                  
                    <StatusBar barStyle="light-content" />

                    <View style={styles.titleView}>
                        <Text style={styles.title}>Recupera tu cuenta</Text>
                    </View>

                    <View style={styles.txtView}>
                        <Text style={styles.txtStyle}>Ingresa tu e-mail o nombre de usuario y recibirás automáticamente un correo de recuperación</Text>
                    </View>
                    <View style={styles.formView}>  
                            <TextInput
                                    placeholder="Ingresa tu email/nombre de usuario" 
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={this.checkWrongEmail() ? styles.formStyle2 : styles.formStyle1}
                                    keyboardType={"email-address"}
                                    email={this.state.email}
                                    onChangeText={this.onChangeEmail}
                            />


                    </View>

                    <View style={styles.buttonView}>  
                        <TouchableOpacity style={styles.btn} onPress={this.onPressEnviar}>  
                            <Text style = {styles.txtBtn}>Enviar correo</Text>   
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
    txtView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 25,
    },
    txtStyle: {
        fontSize: 20,
        textAlign: 'left',
        marginHorizontal: 25,
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