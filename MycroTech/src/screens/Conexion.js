import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, Button, Alert, Picker, ActivityIndicator, StatusBar } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import MenuButton from '../components/MenuButton';

import fetchTimeout from 'fetch-timeout';
import SubnetmaskModule from 'get-subnet-mask';


export default class Conexion extends Component{

    constructor(props){

        super( props );
        this.state = {
            buscado: false,
            llamados: 0,

            //Acordarse de cambiar el valor de IP cada vez que se cambie de maquina
            valueIP: "10.10.32.151",
            valueMask: "255.255.255.0",

        };
    }

    componentDidMount(){
        // Get IP address
        SubnetmaskModule.getIpV4((ip) => { 
            this.setState({ 
                valueIP: ip 
            });
            //console.log("La dirección IP es " + this.state.valueIP);
        });

        // Get subnet mask
        SubnetmaskModule.getSubnet((sb) => { 
            this.setState({ 
                valueMask: sb 
            });
            //console.log("La máscara de subred es " + this.state.valueMask);
        });
    }

    conectar = () => {
        global.conectado = !global.conectado;
        this.setState({ 
            buscado: false
        });
        setTimeout(function(){
            if(global.conectado){   
                this.state.llamados++;
                if (this.state.llamados == 1){
                    this.buscarBrazosBackEnd();
                }
                else{
                    this.setState({ llamados: 0 })
                }             
            }
        }.bind(this), 1)
    }

    buscarBrazosBackEnd = () => {

        //Alert.alert("Dirección IP y máscara de subred encontrada", "IP: " + this.state.valueIP + "\nMáscara de Subred: " + this.state.valueMask);

        //IPByte es un array que guarda string de la IP, separandolos por el punto
        var IPByte = this.state.valueIP.split(".");
        //MaskByte es un array que guarda string de la Mascara de subred, separandolos por el punto
        var MaskByte = this.state.valueMask.split(".");
        //Convierte el primer byte de la IP en un int

        //Alert.alert("Buscando Brazos...", "Espere por favor");

        var primerByteIP = parseInt(IPByte[0]);
        var segundoByteIP = parseInt(IPByte[1]);
        var tercerByteIP = parseInt(IPByte[2]);
        var cuartoByteIP = parseInt(IPByte[3]);
        var primerByteMask = parseInt(MaskByte[0]);
        var segundoByteMask = parseInt(MaskByte[1]);
        var tercerByteMask = parseInt(MaskByte[2]);
        var cuartoByteMask = parseInt(MaskByte[3]);

        var mascaraSubredPrimerByte = primerByteIP & primerByteMask;
        var mascaraSubredSegundoByte = segundoByteIP & segundoByteMask;
        var mascaraSubredTercerByte = tercerByteIP & tercerByteMask;
        var mascaraSubredCuartoByte = cuartoByteIP & cuartoByteMask;

        var hostsPosiblesPrimerByte = 255 - primerByteMask;
        var hostsPosiblesSegundoByte = 255 - segundoByteMask;
        var hostsPosiblesTercerByte = 255 - tercerByteMask;
        var hostsPosiblesCuartoByte = 255 - cuartoByteMask;

        var ipHostSegundoByte;
        var ipHostTercerByte;
        var ipHostCuartoByte; 
        
        let requests = [];

        
        for (var i = 0; i <= hostsPosiblesSegundoByte; i++){
            ipHostSegundoByte = mascaraSubredSegundoByte + i;
            for (var j = 0; j <= hostsPosiblesTercerByte; j++){
                ipHostTercerByte = mascaraSubredTercerByte + j;
                for (var k = 0; k <= hostsPosiblesCuartoByte; k++){
                    ipHostCuartoByte = mascaraSubredCuartoByte + k;

                    //fetchTimeout('http://' + primerByteIP.toString() + "." + ipHostSegundoByte.toString() + "." + ipHostTercerByte.toString() + "." + ipHostCuartoByte.toString() + ':80/server', {
                    fetchTimeout('http://' + primerByteIP.toString() + "." + ipHostSegundoByte.toString() + "." + ipHostTercerByte.toString() + "." + ipHostCuartoByte.toString() + ':3000/server', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            msg: 'Sos el servidor?',
                            ipEnviado: primerByteIP.toString() + "." + ipHostSegundoByte.toString() + "." + ipHostTercerByte.toString() + "." + ipHostCuartoByte.toString()
                        })
                    }, 6000)
                        .then((response) => response.json())
                            .then((responseJson) => {
                                if(responseJson.msg === "Si"){
                                    console.log(responseJson.direccionIP);
                                    req = new Promise(function (resolve, reject) {
                                        resolve({
                                            ip: responseJson.direccionIP
                                        })
                                    })
                                    req.then(function(value) {
                                        requests.push(value.ip);
                                        console.log(requests[0]);
                                    });
                                }
                            })
                            .catch((error) => {
                                //console.error(error);
                            });
                }
            }
        }

        setTimeout(function(){
            console.log(requests.length);
            if (requests.length === 0){
                this.setState({ verificar: true });
                NetInfo.fetch().then(state => {
                    if (state.type == "none"){
                        Alert.alert("Por favor conectese a una red o utilice datos móviles")
                    }
                    else if (!state.isInternetReachable){
                        Alert.alert("Asegurese de que la red tenga acceso a internet")
                    }
                    else{
                        Alert.alert("No hay brazos en la red", "Verifique que los brazos esten encendidos y conectados a la red o si usted se encuentra en la misma red");
                    }
                });
                requests.push("Empty");
            }
            else{
                Promise.all(requests).then(() => {
                    this.setState({ verificar: true });
                    var servidores = null;
                    for (var i = 0; i < requests.length; i++){
                        if (requests.length === 1){
                            Alert.alert("Brazo encontrado", requests[0]);
                        }
                        else{
                            if (requests[i] !== "Brazos Roboticos"){
                                if (servidores === null){
                                    servidores = requests[i];
                                }
                                else {
                                    servidores = servidores + " y " + requests[i];
                                }
                            }
                        }
                    }
                    if (servidores !== null){
                        Alert.alert("Brazos encontrados", servidores);
                    }
                })
            }

            global.conectado = !global.conectado
            this.setState({ 
                buscado: false
            });

            global.brazos = requests;
            global.pickerValue = global.brazos[0];
            
            this.setState({
                buscado: true,
                llamados: 0
            });

            if (requests[0] != "Empty"){
                global.con = true;
                this.props.navigation.navigate('Control');
            }
            
        }.bind(this), 5000)
    }

    buscarBrazosFrontEnd = () => {
        if(global.conectado && this.state.buscado == false){
            return (
                <View>
                    <Text style={styles.buscandoBrazosTxt}>Buscando brazos robóticos...</Text>
                    <ActivityIndicator size="large" color="#d14ba6" />
                </View>
            )
        }else{
            return( 
                <TouchableOpacity style={styles.buscarBtn} onPress={() => this.conectar()}>  
                    <Text style = {styles.buscarTxt}>Buscar</Text>   
                </TouchableOpacity>
            )
        }
    }

    comprobarConectividad = () => {
        if(global.conectado){
            //Alert.alert("Se ha conectado a la red");
            return <Text style={styles.conectividadTxt}>Se ha conectado a la red</Text>
        }else{
            //Alert.alert("Se ha desconectado de la red");
            return <Text style={styles.conectividadTxt}>Asegurate de estar conectado a tu red WIFI</Text>
        }
    }

    comprobarWifi = () => {
        if(!global.conectado){
            return <Image source={require('../images/nowifi.png')} style={styles.wifiImage}/>
        }else{
            return <Image source={require('../images/yeswifi.png')} style={styles.wifiImage}/>
        }
    }

    comprobarConf = () => {
        if(!global.conectado){
            return <Text style={styles.confTxt}>Si lo estás, ¡busca brazos!</Text>
        }else{
            return <Text style={{color: '#fff', fontSize: 30}}>Si lo estás, ¡busca brazos!</Text>       
        }
    }

    render(){
        
        return(

            <View style={styles.container}>

                    <StatusBar hidden/>
               
                
                   <View style={styles.textContainer}>    
                        { this.comprobarConectividad()}                        
                   </View>

                   <View style={styles.wifiContainer}>
                        { this.comprobarWifi()}
                   </View>

                   <View style={styles.confContainer}>
                        { this.comprobarConf()}
                   </View>

                   <View style={styles.footer}>
                        { this.buscarBrazosFrontEnd()} 
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
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 60,
        marginBottom: 70
        
    },
    wifiContainer: {
        flex: 1.2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    confContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: 0.46,
        backgroundColor: 'rgba(235,235,235,1)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 20,
        marginLeft: 67,
        marginTop: 10
        
    },
    numeros: {
        position: 'absolute'
    }, 
    wifiImage: {
        width: 130,
        height: 100
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 60,
        marginBottom: 70
    },
    conectividadTxt: {
        fontSize: 30,
        color: '#A82574',
        textAlign: 'center'
    },
    confTxt: {
        fontSize: 30,
        color: '#000',
        textDecorationLine: 'underline'
    },
    buscandoBrazosTxt: {
        fontSize: 20,
        color: 'rgba(0,0,0,0.8)',
        opacity: 0.7
    },
    buscarBtn: {
        height: 50,
        width: 230,
        marginTop: 16,
        overflow: 'hidden',
        borderColor: '#fff',
        borderRadius: 50,
        borderWidth: 1.8, 
        backgroundColor: '#A82574',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85
    },
    buscarTxt: {
        fontSize: 20,
        color: '#fff',
    },
    

});