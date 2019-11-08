import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput, Button, Alert, Picker, StatusBar } from 'react-native';
import { NavigationEvents } from 'react-navigation'

import MenuButton from '../components/MenuButton'

export default class NuevaCancion extends Component{

    constructor(props){
        super(props);

        this.state = {
            cancion: "",

            wrongSongName: false,
            temaNegro: false,
        };
    } 
   
    agregarCancion = () => {
        if (global.bandaActual == ""){
            Alert.alert("Error", "No se indicó la banda, por favor seleccione una");
        }
        else if (this.state.cancion === ""){
            Alert.alert("Error", "No se indicó el nombre de la canción");
        }
        else{
            let nuevaCancion = this.state.cancion; 
            fetch('http://'+ global.IP + '/newSong', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: global.nombre,
                    band: global.bandaActual,
                    song: nuevaCancion,
                })
            })
            .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.msg === "Listo"){
                        global.bandas.forEach(function(item, index){
                            if (item === global.bandaActual){
                                nuevaCancion = index.toString() + "." + nuevaCancion;
                                global.canciones.push(nuevaCancion);
                            }
                        })
                        Alert.alert("Cancion agregada existosamente");
                    }
                    else if(responseJson.msg === "Cancion ya existente"){
                        this.setState({ wrongSongName: true });
                        Alert.alert("ERROR", "Ya existe una cancion con ese nombre");
                    }
                    else if(responseJson.msg === "Error, usuario"){
                        Alert.alert("ERROR", "El usuario no existe");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });  
        }
    }

    onChangeCancion = (cancion) => {
        this.setState({ cancion });
    }

    checkWrongSongName(){
        if(this.state.wrongSongName){
            return true
        }
    }
    
    render(){
        
        return(

            <View style={this.state.temaNegro ? styles.darkContainer : styles.container}>

                <NavigationEvents
                    onDidFocus={() => this.setState({
                        temaNegro: global.temaNegro

                    })}
                />

                <StatusBar hidden/>

                <View style={styles.header}>
                        <TouchableOpacity style={styles.btnStyle} onPress={() => this.props.navigation.goBack()} >
                            <Image source={require('../images/icons/goBackIcon.png')} style={styles.menuIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.titulo}>Canciones</Text>
                        <MenuButton navigation={this.props.navigation} />
                </View>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nombre" 
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        returnKeyType="next"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={this.state.temaNegro ? styles.darkFormStyle1 : styles.formStyle1}
                        cancion={this.state.cancion}
                        onChangeText={this.onChangeCancion}
                    />
                </View>
                <View style={styles.noseContainer}>

                </View>
                <View style={styles.hechoContainer}>
                        <TouchableOpacity style={styles.btn} onPress={this.agregarCancion}>  
                            <Text style = {styles.txtBtn}>Hecho</Text>   
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
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noseContainer: {
        flex: 1
    },
    hechoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flex: 0.4,
        backgroundColor: 'rgba(235,235,235,1)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: '400'
    },  
    txtStyle: {
        fontSize: 20,
        color: 'white'
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
    formStyle1: {
        backgroundColor: '#fff',
        width: 250,
        borderBottomWidth: 3,
        borderBottomColor: '#A82574',
        padding: 2,
        fontSize: 30,
        borderRadius: 10,
    },
    darkFormStyle1: {
        backgroundColor: 'rgba(40,35,35,1)',
        width: 250,
        padding: 2,
        fontSize: 30,
        borderRadius: 10,
        color: 'white'
    },
    btn: {
        height: 50,
        width: 230,
        marginTop: 16,
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: '#A82574',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85
    },
    txtBtn: {
        fontSize: 20,
        color: '#fff',
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
    }
});

