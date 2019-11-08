import React from 'react';
import { Platform, Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import { NavigationEvents } from 'react-navigation'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class MenuDrawer extends React.Component {

    constructor(props){
        super(props)

        this.state = {
           temaNegro: false
        }
    }


    navLink(nav, text){
        return(
            <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        );
    }

    cerrarSesion(){
        this.props.navigation.navigate('Login')
    }
    brazosConectados = () => {
        if (global.brazos[0] == "Null" || global.brazos[0] == "Empty"){
            return (
                <View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer}>
                        <Image source={require('../images/icons/menuIcon.png')} style={styles.img} />
                        {this.navLink('Menu','Menú')}
                    </View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer}>
                        <Image source={require('../images/icons/controlIcon.png')} style={styles.img} />
                        {this.navLink('Conexion','Control')}
                    </View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer}>
                        <Image source={require('../images/icons/sesionesIcon.png')} style={styles.img} />
                        {this.navLink('Bandas','Sesiones')}
                    </View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer}>
                        <Image source={require('../images/icons/notaIcon.png')} style={styles.img} />
                        {this.navLink('Canciones','Canciones')}
                    </View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer}>
                        <Image source={require('../images/icons/colorIcon.png')} style={styles.img} />
                        {this.navLink('Tema','Tema')}
                    </View>
                    
                    <View style={styles.cerrarBtnContainer}>
                        <TouchableOpacity style={styles.siguienteBtn} onPress={() => this.cerrarSesion()}>  
                            <Text style = {styles.interactivoStyle}>Cerrar sesión</Text>   
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else {
            return(
                <View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer}>
                        <Image source={require('../images/icons/menuIcon.png')} style={styles.img} />
                        {this.navLink('Menu','Menú')}
                    </View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer }>
                        <Image source={require('../images/icons/controlIcon.png')} style={styles.img} />
                        {this.navLink('Control','Control')}
                    </View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer}>
                        <Image source={require('../images/icons/sesionesIcon.png')} style={styles.img} />
                        {this.navLink('Bandas','Sesiones')}
                    </View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer}>
                        <Image source={require('../images/icons/notaIcon.png')} style={styles.img} />
                        {this.navLink('SobreNosotros','Canciones')}
                    </View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer}>
                        <Image source={require('../images/icons/colorIcon.png')} style={styles.img} />
                        {this.navLink('Tutorial','Color')}
                    </View>
                    <View style={this.state.temaNegro ? styles.darkMenuIconsContrainer : styles.menuIconsContrainer}>
                        <TouchableOpacity style={styles.siguienteBtn} onPress={() => this.cerrarSesion()}>  
                            <Text style = {styles.interactivoStyle}>Cerrar sesión</Text>   
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    render(){
        return(
            <View style={styles.container}>

                <NavigationEvents
                    onDidFocus={() => this.setState({
                        temaNegro: global.temaNegro
                    })}
                />

                <View style={styles.topLinks}>
                    <View style={styles.profile}>
                        <View style={styles.imgView}>
                            <Image style={styles.img} source={require('../images/icons/userIcon.png')} />
                        </View>
                        <View style={styles.profileText}>
                            <Text style={styles.name}>{global.nombre}</Text>
                        </View>
                    </View>
                </View>
                <View style={this.state.temaNegro ? styles.darkBottomLinks : styles.bottomLinks}>

                    {this.brazosConectados()}
                </View>
                {/*
                <View style={styles.footer}>
                    <Text style={styles.description}>Mycrotech</Text>
                    <Text style={styles.version}>v1.0</Text>
                </View>
                */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
    menuIconsContrainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    darkMenuIconsContrainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10
    },
    cerrarBtnContainer: {
        height: 150,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777',
    },  
    profileText: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    name: {
        fontSize: 22,
        paddingBottom: 5,
        color: 'black',
        textAlign: 'left',
        fontWeight: '300'    
    },
    imgView: {
        flex: 1,
        paddingLeft: 10,
    },
    img: {
        height: 40,
        width: 40,
    },
    topLinks: {
        height: 90,
        backgroundColor: '#EBEBEB'
    },
    bottomLinks: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 50,
    },
    darkBottomLinks: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 50,
    },
    link: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'left',
    },
    txt: {
        color: 'white',
        paddingTop: 40
    },
    btn: {
        height: 50
    },
    footer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray'
    },
    version: {
        flex: 1,
        textAlign: 'right',
        marginRight: 20,
        color: 'gray'
    },
    description: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16
    },
    interactivoStyle: {
        fontSize: 19,
        color: '#fff',
    },
    siguienteBtn: {
        height: 50,
        width: 180,
        overflow: 'hidden',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
        borderBottomWidth: 5, 
        backgroundColor: '#A82574',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85 
    }
})