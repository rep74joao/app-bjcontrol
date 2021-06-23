import React, {useState} from 'react'
import styled from 'styled-components/native'
import Back from '../assets/back.svg';
import {FlatList, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import Gradient from './gradientHome'
import {secundary} from '../config'

export default function({modalVisible, setModalvisible, cliente}){
   
    const [selected, setSelected] = useState('');
    const [preloader, setPreloader] = useState(true);
    const navigation = useNavigation();

    
    return(
        <Modal
            animationType={'slide'}
            transparent={true}
            visible={modalVisible}
        >
            <ModalContainer>
            <Gradient/>
                    <BackButton onPress={setModalvisible}>
                        <BackText>X</BackText>
                    </BackButton>
                    <Title>Dados do cliente</Title>
                    <Container>
                    <Dados>
                        <Nome><Span>Nome: </Span> {cliente.nome !== '' ? cliente.nome : '-'}</Nome> 
                        <Nome><Span>Nome fantasia: </Span> {cliente.nomefantasia ? cliente.nomefantasia : '-'}</Nome>
                        {cliente.tipo &&  <Tipo><Span>{cliente.tipo.toUpperCase()}:</Span> {cliente.documento}</Tipo> }
                        <Info><Span>Telefone: </Span> {cliente.telefone ? cliente.telefone : '-'}</Info>
                        <Info><Span>Celular: </Span> {cliente.celular ? cliente.celular : '-'}</Info>
                        <Info><Span>Email: </Span> {cliente.email ? cliente.email : '-'}</Info>
                    </Dados>
                    <Endereco>
                        <End><Span>Rua: </Span> {cliente.logradouro ? `${cliente.logradouro}, ${cliente.numero}` : '-'}</End>
                        <End><Span>Bairro: </Span> {cliente.bairro ? cliente.bairro : '-'}</End>
                        <End><Span>CEP: </Span> {cliente.cep ? cliente.cep : '-'}</End>
                        <End><Span>Cidade: </Span> {cliente.cidade ? `${cliente.cidade}, ${cliente.uf}` : '-'}</End>
                        <End><Span>Complemento: </Span> {cliente.complemento ? cliente.complemento : '-'}</End>
                    </Endereco>
                </Container>
              
            </ModalContainer>

        </Modal>
    )
}

const BackText = styled.Text`
 font-weight: bold;
 color: #fff;
`

const Title = styled.Text`
    margin-top: 10px;
    font-size: 17px;
    font-weight: bold;
    color: ${secundary};
`

const BackButton = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  align-items:center;
  justify-content: center;
  position: absolute;
  top: 9px;
  background-color:rgba(0,0,0,0.3);
  border-radius:20px;
  left: 9px;
  z-index:99;
`

const Container = styled.View`
    margin-top: 30px;
    width: 100%;
    padding: 3px 9px 9px 9px;
    border-radius: 5px;
    
`
const Endereco = styled.View`
    margin-top: 25px;
    background-color: rgba(255,255,255,0.2);
    padding: 3px 9px 9px 9px;
    border-radius: 5px;
`

const End = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-top: 8px;
`
const Nome = styled.Text`
    font-size: 16px;
    color: #fff;
    margin-top: 8px;
`
const Span = styled.Text`
    font-size: 17px;
    color: ${secundary};
    font-weight: bold;
    margin-right: 8px !important;
    margin-top: 8px;
    padding-right: 5px;
`

const Tipo = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-top: 8px;

`

const Info = styled.Text`
 font-size: 16px;
  color: #fff;
  margin-top: 8px;
`

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 0;
  width: 100%;
`

const Dados = styled.View`
    flex-direction: column;
    width: 100%;
    height: auto;
    background-color:  rgba(255,255,255,0.2);
    padding: 3px 9px 9px 9px;
    border-radius: 5px;
    
`
