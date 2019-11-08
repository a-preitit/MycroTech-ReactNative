import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, StatusBar, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation'

import MenuButton from '../components/MenuButton'


export default class Bandas extends Component{

    constructor(props){
        super(props)

        this.state = {
            bordered: "",
            bandasList: global.bandas, 
            temaNegro: false 
        }
    }

    checkActual(banda){
        if(banda == this.state.bordered){
            return true
        }
    }

    seleccionBanda(banda){
        this.setState({
            bordered: banda
        });
        global.bandaActual = banda;
    }

    render(){
        
        return(

            <View style={this.state.temaNegro ? styles.darkContainer : styles.container}>

                <NavigationEvents
                    onDidFocus={() => this.setState({
                        bandaSelect: global.bandaActual,
                        temaNegro: global.temaNegro
                    })}
                />
                
                <StatusBar hidden/>

                <View style={styles.header}>
                        <TouchableOpacity style={styles.btnStyle} onPress={() => this.props.navigation.goBack(null)} >
                            <Image source={require('../images/icons/goBackIcon.png')} style={styles.menuIcon}/>
                        </TouchableOpacity>
                        <Text style={styles.titulo}>Bandas</Text>
                        <MenuButton navigation={this.props.navigation} />
                </View>
                
                <View style={styles.bandasContainer}>
                    <FlatList
                        data={this.state.bandasList}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap'
                        }}
                        renderItem={({item}) =>                 
                                    <TouchableOpacity style={this.checkActual(item) ? styles.cartContainerSelected : styles.cartContainer} onPress={() => this.seleccionBanda(item)}>
                                        <Text style={styles.txtStyle}>{item}</Text>     
                                    </TouchableOpacity>
                        }
                        ListEmptyComponent={
                                <Text style={this.state.temaNegro ? styles.darkVacioTxt : styles.vacioTxt}>Actualmente no tienes bandas. Oprime el botón + para agregar una.</Text>
                        }
                        />
                    
                  
                </View>

                <View style={styles.addBtnContainer} >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('NuevaBanda')} >
                        <Image source={this.state.temaNegro ? require('../images/icons/darkAddIcon.png') : require('../images/icons/addIcon.png')} style={styles.addBtn}/>
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
    duoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5
    },
    cartContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(168,37,116,0.55)',
        width: 138,
        height: 138,
        borderBottomWidth: 4,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: 'rgba(0,0,0,0.14)',
        borderRadius: 90,
        marginBottom: 20,
    },
    cartContainerSelected: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(168,37,116,1)',
        width: 138,
        height: 138,
        borderWidth: 5,
        borderColor: 'rgba(0,0,0,1)',
        borderRadius: 90,
        marginBottom: 20,
    },
    vacioContainer: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center'
    },
    vacioTxt: {
        fontSize: 20,
        textAlign: 'center'
    },
    darkVacioTxt: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    header: {
        flex: 0.26,
        backgroundColor: 'rgba(235,235,235,1)',
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
        top: '90%',
        left: '43%',
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

