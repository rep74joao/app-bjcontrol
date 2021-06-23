import React, { useState, useEffect, useContext } from 'react';
import {Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {useRoute, useNavigation} from '@react-navigation/native'
import styled from 'styled-components/native'
import Loading from "../../components/preloader";
import {primary} from '../../config'
import Api from '../../Api';
import {NserieContext} from '../../contexts/NserieContext';

const { width } = Dimensions.get('window');

export default () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const navigation = useNavigation();
    const {dispatch, state} = useContext(NserieContext);


    useEffect(() => {
        setLoading(true);
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        setLoading(false);
    }, []);


    async function handleBarCodeScanned({ type, data }){
        setScanned(true);
        setLoading(true);
     
       
        const index = state.nseries.findIndex((obj => obj.numero === data));

           if(index){
                navigation.navigate('NserieId', {nserie: state.nseries[index]})
           }else{
            Alert.alert('Produto nao encontrado!');
                navigation.goBack();
           }
       

        setLoading(false);

    };

    if (hasPermission === false) {
        return Alert.alert('Sem premissao de acesso a camera!');
    }

    return (
        <Container>
            {loading && <Loading/>}

            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                style={[StyleSheet.absoluteFillObject, styles.container]}
            >
                
                <View style={styles.layerTop} />
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused} />
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom} />
            </BarCodeScanner>
        </Container>
    );
}
const Back = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  left: 10px;
  z-index: 9999999;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: black;
  
`;

const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  z-index: 9999999;
  margin: auto;
  top: 30px;
  left: 70px;
  position: absolute;
`

const opacity = 'rgba(0, 0, 0, .5)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    layerTop: {
        flex: 2,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 3,
        flexDirection: 'row',

    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 10,
        borderBottomWidth:2,
        borderBottomColor:primary,
        borderTopWidth:2,
        borderTopColor:primary,
        borderLeftWidth:2,
        borderRightWidth:2,
        borderLeftColor:primary,
        borderRightColor:primary,

    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 2,
        backgroundColor: opacity
    },
});


