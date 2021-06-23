import React, {useEffect, useContext, useState} from 'react';
import { Text } from 'react-native';
import Api from '../../Api'
import {UserContext} from "../../contexts/UserContext";
import Preloader from '../../components/preloader';
import {FlatList, TouchableOpacity} from 'react-native'
import { Container, Search, SearchArea } from './styles';
import {secundary} from '../../config'
import ClientesList from '../../components/cliente'
import SearchIcon from '../../assets/search.svg'
import {useRoute, useNavigation} from '@react-navigation/native'
import {ClienteContext} from '../../contexts/ClienteContext'


const ClientesAll = () => {
    const user = useContext(UserContext);
    const client = useContext(ClienteContext);
    
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [preloader, setPreloader] = useState(true);
    const [search, setSearch] = useState(false)
    const [searchCliente, setSearchcliente] = useState('');

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        async function getClientes(){
            if(client.state.clientes){
                setClientes(client.state.clientes);
                setPreloader(false);
            }else{
                const formData = new FormData();

            formData.append('token', user.state.user.token);
            formData.append('id', user.state.user.id);
            formData.append('usuarios_id', user.state.user.usuarios_id);

            const res = await Api.GetClientes(formData);

            if (res){
                client.dispatch({
                    type: 'setClientes',
                    payload: {
                        clientes: res,
                    }
                });
               
            }
                    
            setClientes(res);
            setPreloader(false);
            }
        }

        getClientes();
    },[])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity  onPress={() => setSearch(!search)
                }>
                    <SearchIcon
                    fill={secundary}
                    style={{marginRight:12}}
                />
                </TouchableOpacity>
            ),
        })
     
    },[search])

    //buscar cliente 
    useEffect(() => {
        if(searchCliente === ''){
            setClientes(client.state.clientes)
        }else{
            setClientes(
                client.state.clientes.filter((c) => 
                    c.nome.toLowerCase().indexOf(searchCliente.toLocaleLowerCase()) > -1
                )
            );    
        }
    },[searchCliente])
    

    return (
        <>
             {preloader && <Preloader/>}
             <Container>
             
            {search && (
                <SearchArea >
                    <SearchIcon width={29} height={29} fill={'#000'}/>
                    <Search
                        keyboardType={'default'}
                        placeholder={'Buscar cliente'}
                        onChangeText={(e) => setSearchcliente(e)}/>   
                </SearchArea>
            )}
        
                <FlatList
                    initialNumToRender={10}
                    windowSize={5}
                    maxToRenderPerBatch={5}
                    updateCellsBatchingPeriod={30}
                    removeClippedSubviews={false}
                    onEndReachedThreshold={0.1}
                    data={clientes}
                    renderItem={({item}) => <ClientesList item={item}/> }
                    keyExtractor={(item, index) => index.toString()}
            />
         
            </Container>
        </>
    );
}

export default ClientesAll;