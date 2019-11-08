import React, { Component } from 'react'
import { StyleSheet, View, Alert, Text, TouchableOpacity, StatusBar, TextInput, Platform, KeyboardAvoidingView } from 'react-native'

export default class Pin extends Component{

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,   
    };

    constructor(props){

        super( props );
        this.state = {
            PIN: "",
            wrongPIN: false,

        };
    }

    onChangePIN = (PIN) => {
        this.setState({ PIN });
    }

    checkWrongPIN(){
        if(this.state.wrongPIN){
            return true
        }
    }

    onPressEnviar = () => {
        fetch('http://' + global.IP + '/verifySecurityCode', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userData: global.recuperar,
                securityCode: this.state.PIN,
            })
        })
            .then((response) => response.json())
                .then((responseJson) => {
                    
                    this.setState({ wrongPIN: false });

                    if(responseJson.msg === "Correcto"){
                        Alert.alert("Codigo de seguridad ingresado correctamente");
                        this.props.navigation.navigate('NuevaContra');
                    }
                    else if(responseJson.msg === "Error, no solicitado"){
                        this.setState({ wrongPIN: true });
                        Alert.alert("ERROR", "No se ha solicitado un cambio de contraseña");
                    }
                    else if(responseJson.msg === "Error, codigo"){
                        this.setState({ wrongPIN: true });
                        Alert.alert("ERROR", "Codigo de seguridad ingresado incorrecto");
                    }        
                    else if(responseJson.msg === "Error, usuario"){
                        Alert.alert("ERROR", "El usuario no existe");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });  
    }

    render(){
        return(

                
                <KeyboardAvoidingView style={styles.container}>
                  
                    <StatusBar barStyle="light-content" />

                    <View style={styles.titleView}>
                        <Text style={styles.title}>Recupera tu cuenta</Text>
                    </View>

                    <View style={styles.txtView}>
                        <Text style={styles.txtStyle}>Verifica tu bandeja de entrada e ingresa el PIN de cuatro dígitos.</Text>
                    </View>
                    <View style={styles.formView}>  
                            
                            <TextInput
                                    placeholder="Ingresa el PIN" 
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={this.checkWrongPIN() ? styles.formStyle2 : styles.formStyle1}
                                    keyboardType={"numeric"}
                                    PIN={this.state.PIN}
                                    onChangeText={this.onChangePIN}
                            />
                            
                    </View>

                    <View style={styles.buttonView}>  
                        <TouchableOpacity style={styles.btn} onPress={this.onPressEnviar}>  
                            <Text style = {styles.txtBtn}>Verificar</Text>   
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
        marginHorizontal: 5,
    },
    txtStyle: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 5,
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
    normal: {
        width: 40,
        height: 40,
        borderWidth: 0.5,
        borderColor: '#D5D5D5',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderRadius: 20,
      },
      focus: {
        width: 40,
        height: 40,
        borderWidth: 0.5,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderRadius: 20,
        ...Platform.select({
          ios: {
            shadowOffset: {width: 0, height: 1},
            shadowRadius: 2,
            shadowOpacity: 0.5,
            shadowColor: 'red',
          },
          android: {
            elevation: 4,
          },
        }),
      },
      blur: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
      },
   
});