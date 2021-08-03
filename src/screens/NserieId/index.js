import React, { useEffect, useState, useContext} from "react";
import Preloader from '../../components/preloader';
import {Container, 
    ContainerNserie,
    Imagens, 
    Numero, 
    Lote,
    ViewText, 
    ContainerFilial, 
    Filial,
    ContainerRastreio,
    Rastreio, 
    ContainerProduto, 
    Editar,
    Requisicao,
    Garantia,
    Pedido,
    TitleVenda,
    Timeline,
    NTimeline,
    ContainerTimeline,
    Close,
    Imgs,
    ImgRastreio,
    TextClose,
    InputArea,
    BottomSubmit,
    TextSubmit,
    ViewModalImg,
    Title,
    Produto } from './styles';
import {useRoute} from '@react-navigation/native'
import {UserContext} from "../../contexts/UserContext";
import Edit from '../../assets/edit.svg'
import Img from '../../assets/img.svg'
import Input from '../../components/input'
import RastreioIcon from '../../assets/editando.svg'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Api from '../../Api'
import {urlImgNserie } from "../../config";
import { Modal, Alert, Image, View, ScrollView, Platform, KeyboardAvoidingView } from "react-native";


const NserieId = () => {
    const {dispatch, state} = useContext(UserContext);
    const [preloader, setPreloader] = useState(true);
    const [nserie, setNserie] = useState();
    const [rastreio, setRastreio] = useState();
    const [modalRastreio, setModalRastreio] = useState(false);
    const [image1, setImage1] = useState(null);
    const [image, setImage] = useState(null);
    const [modalImgRastreio, setModalimg] = useState(false)
    const [imgnserie, setImg] = useState(false);

    const route = useRoute();

    useEffect(() => {
        async function getNserie(){
            setNserie('')    
            if(route.params){
             
               setNserie(route.params.nserie);
               setPreloader(false);
              
            } 
        }
        console.tron.log(route.params.nserie)
        getNserie();
     },[route.params]);

     useEffect(() => {
        (async () => {
           if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (status !== 'granted') {
                Alert.alert('Sem permissões para acessar!');
            }
          }
        })();
      }, []);

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

    

    async function insertRastreio(){
        const formData = new FormData();

        formData.append('token', state.user.token);
        formData.append('funcionario_id', state.user.id);
        formData.append('numero', nserie.numero);
        formData.append('id', nserie.id);
        formData.append('rastreio', rastreio);


        let fileName = image.split('/').pop();
        if (image1){
            formData.append('files', {
                file: image1,
                uri: image1,
                name: fileName,
                type: 'image/jpeg',

            });
        }

        if(rastreio){
            const res = await Api.SetNerieRastreio(formData);
            setNserie(res);
            setModalRastreio(false);
            setRastreio('');
   
        }else{
            Alert.alert('Rastreio vazio!')
        }
         
    }

    async function verifyPermissions(){
        const res = await Permissions.askAsync(Permissions.CAMERA);
           if (res.status !== 'granted'){
                 Alert.alert('Sem permissões para usar a camera');
                 return false;
             }
        return true;
     }
 
     async function handleImage(){
         const permissions = await verifyPermissions();
 
         if (!permissions){
             return;
         }
         const image = await ImagePicker.launchCameraAsync({
             allowsEditing: true,
             aspect: [1,1],
             quality: 0.5
         });
 
         if (image.uri){
             setImage(image.uri);
             setImage1(image.uri);
         }
         return;
     }
 
     function handlePicture(){
         Alert.alert('Adicione foto no rastreio!','Escolha uma opção',[
             {text:'Cancelar', cancelable: false},
             {text:'Tirar a foto?', onPress: () => handleImage()},
             {text:'Escolher no album de fotos?', onPress: () => handleImageLibrary()},
         ],)
     }
 
     const handleImageLibrary = async () => {
        
         const result = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ImagePicker.MediaTypeOptions.All,
             allowsEditing: true,
             aspect: [1, 1],
             quality: 0.5,
         });
                 
         if (result.uri){
             setImage(result.uri);
             setImage1(result.uri);
             return;
         }
         
     }

     function getImgRastreio(i){
        setModalimg(true)
        setImg(i)
     }

    const ios = Platform.OS === 'ios' ? 17 : 0;

    return (
        <>
            {preloader && <Preloader/>}
            {nserie && (
                <>
                <Modal 
                    animationType={'slide'}
                    visible={modalRastreio}
                    
                >
                    <View style={{padding: ios, flex:1}}>
                        <Close onPress={() => setModalRastreio(false)}>
                            <TextClose>X</TextClose>
                        </Close>
                        <Title>Inserir novo rastreamento</Title>
                        <Imgs>
                            <Image source={{uri: image}} width={100} height={100}/>
                        </Imgs>
                        <Imagens style={sombra} onPress={handlePicture}>
                            <Img width={23} height={23} fill={'#fff'}/>
                        </Imagens>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <InputArea>
                            <Input
                                IconSvg={RastreioIcon} 
                                onChangeText={(e) => setRastreio(e)}
                                keyboardType={'default'}
                                value={rastreio}
                            />
                            <BottomSubmit onPress={() => insertRastreio()}>
                                <TextSubmit>Salvar Rastreio</TextSubmit>
                            </BottomSubmit>
                        </InputArea>
                       
                       </KeyboardAvoidingView>
                    </View>
                </Modal>
                
                <Modal 
                    animationType={'slide'}
                    visible={modalImgRastreio}
                    transparent={true}
                >
                   <View style={{
                       flex:1,
                       backgroundColor:'rgba(0,0,0,0.8)'
                   }}>
                    <ViewModalImg>
                        <Close onPress={() => setModalimg(false)}>
                                <TextClose>X</TextClose>
                            </Close>
                            <Title>Galeria</Title>
                                    <ScrollView
                                        horizontal={true}>
                                        {imgnserie && (
                                            imgnserie.map(i => {
                                                return  <Imgs key={i.id}>
                                                            <Image 
                                                            source={{uri:'https://erp.bjcontrol.com.br/uploads/1/nserie/'+i.img}} 
                                                            style={{ height: 260, width: 280, borderRadius:15, borderColor:'#ccc', borderWidth:3 }}/>
                                                        </Imgs>
                                            })
                                        )}
                                    </ScrollView>
                    </ViewModalImg>
                   </View>
                </Modal>
                <Container>
                    <ContainerNserie>
                        <Numero>Numero de serie: {nserie.numero}</Numero>
                        <Lote>Lote: {nserie.lote_id}</Lote>
                    </ContainerNserie>
                    <ContainerFilial>
                        <Filial>Filial: {nserie.filial.cidade} / {nserie.filial.estado}</Filial>
                    </ContainerFilial>
                    <ContainerProduto>
                        <Produto>Produto: {nserie.produto.nome}</Produto>
                    </ContainerProduto>
                    <ContainerRastreio>
                        <View style={{flexDirection:'row', 
                                      justifyContent:'space-between', 
                                      alignItems:'center',
                                    }}>
                            <Rastreio>Timeline Rastreio</Rastreio>
                            {nserie.garantia && (
                                <Garantia>
                                    <TitleVenda>
                                       Garantia: {nserie.garantia}
                                    </TitleVenda>
                                </Garantia>
                            )}
                            {nserie.pedido && (
                                <Pedido>
                                    <TitleVenda>
                                      Pedido: {nserie.pedido}
                                   </TitleVenda>
                                </Pedido>
                            )}
                            {nserie.requisicao && (
                                <Requisicao>
                                    <TitleVenda>
                                       Requisição: {nserie.requisicao}
                                   </TitleVenda>
                                </Requisicao>
                            )}
                        </View>
                        {nserie.rastreio.map((r, index) => {
                            return  <ContainerTimeline key={index}>
                                        <ViewText>
                                            <NTimeline>{index}</NTimeline>
                                        </ViewText>
                                        <Timeline>
                                            {r.rastreio.replace('</br>', '')} - {r.funcionario}
                                        </Timeline>
                                            {r.img[index] &&
                                            <ImgRastreio onPress={() => getImgRastreio(r.img)}>
                                                        <Img width={25} height={25} fill={'#3a3a3c'}/>
                                            </ImgRastreio>
                                            }
                                    </ContainerTimeline>
                        })}
                    </ContainerRastreio>
                    
                </Container>    
                <Editar style={sombra} onPress={() => setModalRastreio(true)}>
                    <Edit width={23} height={23} fill={'#fff'}/>
                </Editar>
                </>
            )}
        </>
    );
};

export default NserieId;
