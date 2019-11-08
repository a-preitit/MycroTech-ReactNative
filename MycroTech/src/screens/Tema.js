import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation'

import MenuButton from '../components/MenuButton'


export default class Tema extends Component{

    constructor(props){
        super(props)

        this.state = {
            temaNegroActual: false
        }
    }

    chequearTema(){
       this.setState({
           temaNegroActual: global.temaNegro
       })

    }

    mostrarImg(){
        if (this.state.temaNegroActual == true){
            return <Image source={require('../images/temaNegro2.jpg')} style={styles.temaImage}/>
        }else{
            return <Image source={require('../images/temaBlanco2.jpg')} style={styles.temaImage}/>
        }
    }

    cambiarTemaABlanco(){
        this.setState({
            temaNegroActual: false
        });
        global.temaNegro = false
        fetch('http://' + global.IP + '/tema', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: global.nombre,
                temaNegro: false,
            })
        })
            .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.msg === "Listo"){
                        console.log("Cambiado en el db")
                    }        
                    else if(responseJson.msg === "Error, usuario"){
                        Alert.alert("ERROR", "El usuario no existe");
                    }
                })
    }

    cambiarTemaANegro(){
        this.setState({
            temaNegroActual: true
        });
        global.temaNegro = true
        console.log(this.state.temaNegroActual)
        fetch('http://' + global.IP + '/tema', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: global.nombre,
                temaNegro: true,
            })
        })
            .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.msg === "Listo"){
                        console.log("Cambiado en el db")
                    }        
                    else if(responseJson.msg === "Error, usuario"){
                        Alert.alert("ERROR", "El usuario no existe");
                    }
                })
    }

    render(){
        
        return(

            <View style={global.temaNegro ? styles.darkContainer : styles.container}>
                
                <NavigationEvents 
                    onDidFocus={() => this.chequearTema()}
                />

                <StatusBar hidden/>

                <View style={styles.header}>
                        <TouchableOpacity style={styles.btnStyle} onPress={() => this.props.navigation.goBack(null)} >
                            <Image source={require('../images/icons/goBackIcon.png')} style={styles.menuIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.titulo}>Tema</Text>
                        <MenuButton navigation={this.props.navigation} />
                </View>
                
                <View style={styles.imgContainer}>
                    {this.mostrarImg()}
                  
                </View>

                <View style={styles.changeContainer}>
                    <TouchableOpacity onPress={() => this.cambiarTemaABlanco()} style={styles.btnStyle}>
                        <Image source={this.state.temaNegroActual ? require('../images/icons/darkSun.png') : require('../images/icons/whiteSun.png')} style={styles.moonsunStyle}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.cambiarTemaANegro()} style={styles.btnStyle}>
                        <Image source={this.state.temaNegroActual ? require('../images/icons/darkMoon.png') : require('../images/icons/whiteMoon.png')} style={styles.moonsunStyle} />
                    </TouchableOpacity>
                </View>
              

            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'

    },
    darkContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000'

    },
    bandasContainer: {
        marginTop: 15,
        width: 350,
        height: 450,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    imgContainer: {
        marginTop: 10,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 3,
        borderColor: '#707070',
        borderRadius: 10,  
    },
    moonsunStyle: {
        
    },
    header: {
        flex: 0.4,
        backgroundColor: 'rgba(200,200,200,1)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10
    },
    titulo: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: '400'
    },  
    txtStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    addBtn: {
        width: 70,
        height: 70
    },
    addBtnContainer: {
        position: 'absolute',
        top: 560,
        left: 150,
    },
    menuIcon: {
        zIndex: 9,
        position: 'absolute',
        left: 13,
        top: 9,
        width: 50,
        height: 50
    },
    imageStyle: {
        width: 50,
        height: 50
    },
    btnStyle: {
        width: 50,
        height: 50
    },
    temaImage: {
        width: 350,
        height: 450
        
    }
});

