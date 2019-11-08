import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';

import { NavigationEvents } from 'react-navigation'

import MenuButton from '../components/MenuButton'


export default class Canciones extends Component{

    constructor(props){
        super(props)

        this.state = {
            bandasList: [],

            cancionesList: global.canciones,
            cancionesBandaActual: [],

            temaNegro: false
        }
    } 
   
    chequearCanciones(){
        this.setState({
            cancionesList: global.canciones,
            temaNegro: global.temaNegro
        })
        for(let i = 0; i < this.state.cancionesList.length; i++){
            const res = this.state.cancionesList[i].split('.');

            if(res[0] == global.bandaActual){
                this.state.cancionesBandaActual.push(res[1])
            }
        }
    }

    render(){
        
        return(

            <View style={this.state.temaNegro ? styles.darkContainer : styles.container}>
                
                <NavigationEvents 
                    onDidFocus={() => this.chequearCanciones()
                    
                    }
                />

                <StatusBar hidden/>

                <View style={styles.header}>
                            <TouchableOpacity style={styles.btnStyle} onPress={() => this.props.navigation.goBack()} >
                                <Image source={require('../images/icons/goBackIcon.png')} style={styles.menuIcon}/>
                            </TouchableOpacity>
                            <Text style={styles.titulo}>Canciones</Text>
                            <MenuButton navigation={this.props.navigation} />
                </View>
                
                <View style={styles.bandaContainer}>
                        <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.navigate('Control')}>
                        </TouchableOpacity>
                        <Text style={this.state.temaNegro ? styles.darkBandaTxt : styles.bandaTxt}>{global.bandaActual}</Text>
                </View>

                <View style={styles.cancionesContainer}>
                    <FlatList
                        data={this.state.cancionesBandaActual}
                        contentContainerStyle={{
                            flexDirection: 'column',
                            flexWrap: 'wrap'
                        }}
                        renderItem={({item}) =>                 
                            <View style={styles.temaContainer}>
                                <TouchableOpacity style={this.state.temaNegro ? styles.darkBtnCancion : styles.btnCancion}>  
                                    <Text style = {this.state.temaNegro ? styles.darkTxtBtnCancion : styles.txtBtnCancion}>{item}</Text>   
                                </TouchableOpacity>
                            </View>
                        }
                        ListEmptyComponent={
                                <Text style={styles.vacioTxt}>Actualmente no tienes canciones.</Text>
                        }
                    />
                </View> 

                <View style={styles.addBtnContainer}>
                    <TouchableOpacity style={styles.btnAgregar} onPress={() => this.props.navigation.navigate('NuevaCancion')}>  
                            <Text style = {styles.txtBtnAgregar}>Agregar</Text>   
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
    bandaContainer: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'space-around',
       alignItems: 'center',
       borderBottomWidth: 2,
       borderBottomColor: '#707070'
    },
    cancionesContainer: {
       flex: 2
    },
    cartContainer: {
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: 'rgba(168,37,116,1)',
        width: 100,
        height: 100,
        borderBottomWidth: 4,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: 'rgba(0,0,0,0.14)',
        borderRadius: 90
    },
    temaContainer: {
        height: 80,
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
    darkBtnCancion: {
        height: 55,
        width: 276,
        marginTop: 20,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1.8, 
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85,
        borderBottomWidth: 4, 
        borderColor: '#A82574', 
    },
    btnCancion: {
        height: 55,
        width: 276,
        marginTop: 20,
        overflow: 'hidden',
        borderColor: 'black',
        borderRadius: 50,
        borderWidth: 1.8, 
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85,
        borderBottomWidth: 5, 
        borderBottomColor: '#A82574', 
    },
    txtBtnCancion: {
        fontSize: 20,
        color: '#000',
    },
    darkTxtBtnCancion: {
        fontSize: 20,
        color: '#fff',
    },
    titulo: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: '400'
    },  
    btnAgregar: {
        height: 40,
        width: 230,
        marginTop: 16,
        overflow: 'hidden',
        borderBottomColor: 'rgba(0,0,0,0.4)',
        borderRadius: 50,
        borderBottomWidth: 1.8, 
        backgroundColor: '#A82574',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85
    },
    txtBtnAgregar: {
        fontSize: 20,
        color: '#fff',
    },
    addBtn: {
        width: 70,
        height: 70
    },
    addBtnContainer: {
        position: 'absolute',
        top: '90%',
        left: '27%',
    },
    btn: {
        height: 50,
        width: 230,
        marginTop: 16,
        overflow: 'hidden',
        backgroundColor: '#A82574',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
        borderBottomWidth: 5, 
    },
    txtBtn: {
        fontSize: 20,
        color: '#fff',
    },
    bandaTxt: {
        fontSize: 30,
        fontWeight: '200',
        textAlign: 'center',
        marginRight: 45
    },
    darkBandaTxt: {
        fontSize: 20,
        fontWeight: '200',
        textAlign: 'center',
        marginRight: 35,
        color: 'white'
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

