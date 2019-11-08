import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, KeyboardAvoidingView, StatusBar, TextInput, Alert} from 'react-native'

export default class NuevaContra extends Component{

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,   
    };

    constructor(props){

        super( props );
        this.state = {
            password: "",
            validatePassword: "",

            wrongPassword: false,
        };
    }

    onChangePassword = (password) => {
        this.setState({ password });
    }

    onChangeValidatePassword = (validatePassword) => {
        this.setState({ validatePassword });
    }

    checkWrongPassword(){
        if(this.state.wrongPassword){
            return true
        }
    }

    onPressEnviar = () => {
        if (this.state.validatePassword === this.state.password){
            fetch('http://' + global.IP + '/newPassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userData: global.recuperar,
                    password: this.state.password,
                })
            })
                .then((response) => response.json())
                    .then((responseJson) => {
                        
                        this.setState({ wrongPassword: false });

                        if(responseJson.msg === "Listo"){
                            global.recuperar = null;
                            Alert.alert("Contraseña actualizada correctamente");
                            this.props.navigation.navigate('Login');
                        }
                        else if(responseJson.msg === "Error, no solicitado"){
                            Alert.alert("ERROR", "No se ha solicitado un cambio de contraseña");
                        }    
                        else if(responseJson.msg === "Error, usuario"){
                            Alert.alert("ERROR", "El usuario no existe");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
        }
        else {
            this.setState({ wrongPassword: true });
            Alert.alert("Las contraseñas no coinciden");
        }
        
    }

    render(){
        return(

                
                <KeyboardAvoidingView style={styles.container}>
                  
                    <StatusBar barStyle="light-content" />

                    <View style={styles.titleView}>
                        <Text style={styles.title}>Éxito</Text>
                    </View>

                    <View style={styles.txtView}>
                        <Text style={styles.txtStyle}>Introduce la nueva contraseña.</Text>
                    </View>

                    <View style={styles.formView}>  

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
                        <TouchableOpacity style={styles.btn} onPress={this.onPressEnviar}>  
                            <Text style = {styles.txtBtn}>Listo</Text>   
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