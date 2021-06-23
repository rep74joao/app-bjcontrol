import React, { useEffect, useState, useContext} from "react";
import Preloader from '../../components/preloader';
import {Container, 
    ContainerNserie,
    Imagens, 
    Close,
    TextClose, 
    Lote, 
    ContainerFilial, 
    Filial,
    ContainerRastreio,
    Rastreio, 
    ContainerProduto, 
    Editar,
    Timeline,
    StatusOk,
    StatusFalse,
    StatusFalse1,
    Status,
    StatusText,
    ContainerTimeline,
    Produto } from './styles';
import styled from 'styled-components'
import {useRoute, useNavigation} from '@react-navigation/native'
import {UserContext} from "../../contexts/UserContext";
import SearchIcon from '../../assets/search.svg'
import {secundary} from '../../config'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'

import Api from '../../Api'
import { primary } from "../../config";
import { View, Alert, FlatList, StyleSheet, Modal, TouchableOpacity } from "react-native";



const LoteId = () => {
    const {dispatch, state} = useContext(UserContext);
    const [preloader, setPreloader] = useState(true);
    const [lote, setLote] = useState();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [camera, setCamera] = useState(false);

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity  onPress={() => setCamera(true)}>
                    <SearchIcon
                    fill={secundary}
                    style={{marginRight:12}}
                />
                </TouchableOpacity>
            ),
        })
     
    },[camera])

    useEffect(() => {
        async function getLote(){
            setLote('')    
            if(route.params){
               setLote(route.params.lote);
               setPreloader(false);
            } 
        }
        getLote();
     },[route.params]);

 
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
               
        setStatusNserieId(data, 'Recebido')
       
        setLoading(false);
        setCamera(false);
        setScanned(false);

    };

    if (hasPermission === false) {
        return Alert.alert('Sem premissao de acesso a camera!');
    }

   
     const sombra = {
        shadowOpacity: 0.5,
        shadeColor: '#000',
        shadowRadius: 50,
        shadowOffset: {
            height: 10,
            width: 10
        },

        elevation: 10
    }

    
    async function verifyPermissions(){
        const res = await Permissions.askAsync(Permissions.CAMERA_ROLL);
           if (res.status !== 'granted'){
                 Alert.alert('Sem permissões para usar a camera');
                 return false;
             }
        return true;
     }
 
    
     function setStatus(){
        Alert.alert('Atenção!','Quer mesmo alterar o status!',[
            {text:'Cancelar', cancelable: false},
            {text:'Alterar', onPress: () => setStatusLote()},
        
        ],)
     }

     async function setStatusLote(){
        const formData = new FormData();

            formData.append('token', state.user.token);
            formData.append('id', state.user.id);
            formData.append('lote_id', lote.id);
            
            const res = await Api.SetStatusLote(formData);

            setLote(res[0]);
     }

     function setStatusNserie(numero, valor){
        Alert.alert('Atenção!','Quer mesmo alterar o status!',[
            {text:'Cancelar', cancelable: false},
            {text:'Alterar', onPress: () => setStatusNserieId(numero, valor)},
        
        ],)
     }

    function setStatusNserieId(numero, valor){

            const index = lote.nseries.findIndex((obj => obj.numero === numero));
            
            if(index !== ''){
              lote.nseries[index].status = valor;
              const loteNew = lote;
              setLote(loteNew)
              navigation.navigate('LoteId', {lote: loteNew})
            }else{
                Alert.alert('Atenção', 'Numero de serie nao encontrado!')
  
            }
           
    }


    return (
        <>
            {preloader && <Preloader/>}
            {lote && (
                <>
             <Modal 
                    animationType={'slide'}
                    visible={camera}
                >
                    
                        <ContainerCamera>
                        
                        <Close onPress={() => setCamera(false)}>
                            <TextClose>X</TextClose>
                        </Close>
            
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
                    </ContainerCamera>
             </Modal>
                

                <Container>
                    {lote.status == 'Recebido' 
                    ? <Status>
                        <StatusText>{lote.status}</StatusText>
                    </Status>
                    : <StatusFalse1 onPress={() => setStatus()}>
                         <StatusText>{Lote.status === 'Recebido' ? 'Recebido' : 'Transporte'}</StatusText>
                      </StatusFalse1>}
                    <ContainerNserie>
                        <Lote>Lote: {lote.lote}</Lote>
                    </ContainerNserie>
                    <ContainerFilial>
                     {lote.filial && (
                            <Filial>Filial: {lote.filial.cidade} / {lote.filial.estado}</Filial>
                     )}
                    </ContainerFilial>
                    <ContainerProduto>
                        <Produto>Produto: {lote.produto.nome}</Produto>
                    </ContainerProduto>
                    <ContainerRastreio>
                        <Rastreio>Numeros de serie</Rastreio>
                        {lote.nseries && 
                            lote.status === 'Recebido' ?
                            <FlatList 
                                data={lote.nseries}
                                renderItem={({item, index}) => 
                                                        <ContainerTimeline key={index}>
                                                            <Timeline>
                                                                {item.numero}
                                                            </Timeline>
                                                            <StatusOk style={sombra}/>                                                 
                                                        </ContainerTimeline>
                                               }
                            keyExtractor={(item, index) => index.toString()}
                            />
                            :
                            <FlatList
                                data={lote.nseries}
                                renderItem={({item, index}) => 
                                    <ContainerTimeline key={index}>
                                        <Timeline>
                                            {item.numero}
                                        </Timeline>
                                            {item.status === 'Recebido' ? 
                                            <StatusOk onPress={() => setStatusNserie(item.numero, 'Transporte')} style={sombra}/> : 
                                            <StatusFalse onPress={() => setStatusNserie(item.numero, 'Recebido')} style={sombra}/>}                                                 
                                    </ContainerTimeline>
                               }
                            keyExtractor={(item, index) => index.toString()}
                            />
                            
                    }
                    </ContainerRastreio>
                  
                   
                </Container>    
                
               
                </>
            )}
        </>
    );
};


const Back = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  left: 10px;
  z-index: 9999999;
`;

const ContainerCamera = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: black;
  
`;


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

export default LoteId;
