import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, StatusBar } from 'react-native'

export default class Bienvenida extends Component{

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        header: null,   
    };

    render(){
        return(

                
                <ImageBackground style={styles.container} source={require('../images/fondo.png')} imageStyle={{opacity: 1}}>
                  

                    <View style={styles.titleView}>
                        <Text style={styles.title}>MYCROTECH</Text>
                        <Image style={styles.logo} source={require('../images/Micro2.png')} />

                    </View>

                    <View style={styles.textView}>  
                            <Text style={styles.txtWelcome}>¡Bienvenido, {global.nombre}!</Text>     
                            <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Conexion')}>  
                            <Text style = {styles.txtBtn}>Continuar </Text>   
                            </TouchableOpacity>
                    </View>


                    <View style={styles.buttonView}>  
                        <TouchableOpacity style={styles.changeView} onPress={() => this.props.navigation.navigate('Bienvenida')}>  
                            <Text style = {styles.txtChange}>Cambiar de usuario</Text>   
                        </TouchableOpacity>
                    </View>

                
                </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000'

    },
    titleView: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
 
    textView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 40,
        color: '#fff',
   //     fontFamily: 'sans-serif'
    },
    logo: {
        marginTop: 20,
        width: 130,
        height: 130
    },
    txtWelcome: {
        fontSize: 25,
        color: '#fff',
        marginBottom: 20,
    //    fontFamily: 'sans-serif'
    },
    btn: {
        height: 40,
        width: 230,
        marginTop: 16,
        overflow: 'hidden',
        borderColor: '#fff',
        borderRadius: 50,
        borderWidth: 1.8, 
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85
    },
    txtBtn: {
        fontSize: 20,
        color: '#fff'
    },
    icons: {
        width: 70,
        height: 70
    },
    changeView: {
        marginBottom: 23,
        backgroundColor: 'rgba(0,0,0,0)',

    },
    txtChange: {
        fontSize: 17,
        color: '#fff',
        textDecorationLine: 'underline',
        opacity: 0.85
    }
});