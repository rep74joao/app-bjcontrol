import React, {useEffect, useState} from 'react';
import Api from '../../Api'
import Preloader from '../../components/preloader';
import {FlatList, TouchableOpacity} from 'react-native'
import { Container, Search, SearchArea } from './styles';
import {secundary} from '../../config'
import ClientesList from '../../components/cliente'
import SearchIcon from '../../assets/search.svg'
import {useRoute, useNavigation} from '@react-navigation/native'
import {useStateValue} from '../../contexts/StateContext'


const ClientesAll = () => {
    const [context, dispatch] = useStateValue();
    
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState([]);
    const [preloader, setPreloader] = useState(true);
    const [search, setSearch] = useState(false)
    const [searchCliente, setSearchcliente] = useState('');

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        async function getClientes(){
           
            if(context.clientes.clientes){
                setClientes(context.clientes.clientes);
                setPreloader(false);
            }else{
            
            const formData = new FormData();
                    
            formData.append('token', context.user.user.token);
            formData.append('id', context.user.user.id);
            formData.append('usuarios_id', context.user.user.usuarios_id);

            const res = await Api.GetClientes(formData);

            if (res){
                dispatch({
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
            setClientes(context.clientes.clientes)
        }else{
            setClientes(
                context.clientes.clientes.filter((c) => 
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