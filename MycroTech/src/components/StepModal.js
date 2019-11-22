import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions} from 'react-native';

export default class StepModal extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            width: Dimensions.get('window').width,
            valor: 0
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });
    }

    closeModal = (data) => {
        this.props.setData(data);
        this.props.changeModalVisibility(false);
    }

    onChangeStep = (step) => {
        this.setState({ valor: step });
    }

    render(){
        return(
             <TouchableOpacity activeOpacity={1} disabled={true} style={styles.contentContainer}> 
                 <View style={[styles.modal, {width: this.state.width - 80}]}>
                     <View style={styles.textView}>
                         <Text style={[styles.text, {fontSize: 20}]}> Variación (cm)</Text>
                         <TextInput
                                    placeholder="Introduce variación" 
                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={styles.formStyle1}
                                    keyboardType={"numeric"}
                                    valor={this.state.valor}
                                    onChangeText={this.onChangeStep}

                            />
                     </View>
                     <View stlye={styles.buttonsView}>
                         <TouchableOpacity style={styles.btn} onPress={() => this.closeModal(this.state.valor)} underlayColor={'#f1f1f1'}>  
                            <Text style = {styles.txtBtn}>Hecho</Text>   
                        </TouchableOpacity>
                     </View>
                 </View>
             </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    modal: {
        height: 220,
        paddingTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(235,235,235,1)',
        borderRadius: 20,
    },
    text: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    touchableHighlight: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 10
    },
    textView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around' 
    },
    buttonsView: {
        width: '100%',
        flexDirection: 'row'
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
        marginBottom: 11
        
    },
    txtBtn: {
        fontSize: 20,
        color: '#fff',
    },
    formStyle1: {
        width: 250,
        borderBottomWidth: 3,
        borderBottomColor: '#A82574',
        padding: 2,
        fontSize: 18
    },

});