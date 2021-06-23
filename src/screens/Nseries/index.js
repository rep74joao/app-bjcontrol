import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Preloader from '../../components/preloader';
import Nserie from '../../components/nserie';
import { Container, Search, SearchArea } from './styles';
import {FlatList} from 'react-native'
import {UserContext} from "../../contexts/UserContext";
import {NserieContext} from '../../contexts/NserieContext'
import SearchIcon from '../../assets/search.svg'
import Api from '../../Api'


const Nseries = ({navigation}) => {
    const user = useContext(UserContext);
    const nserieAll = useContext(NserieContext);
    const [preloader, setPreloader] = useState(true);
    const [nseries, setNseries] = useState([]);
    const [nserie, setNserie] = useState([]);

    useEffect(() => {
        async function getNseries(){
            if(nserieAll.state.nseries){
                setNseries(nserieAll.state.nseries);
                setPreloader(false);
            }else{
             
                const formData = new FormData();

                formData.append('token', user.state.user.token);
                formData.append('id', user.state.user.id);
                
                const res = await Api.GetNseries(formData);
                
                setNseries(res);
     
                

                if (res){
                    nserieAll.dispatch({
                        type: 'setNseries',
                        payload: {
                            nseries: res,
                        }
                    });
                    
                }
                setPreloader(false);
           
            }
        
        }
        getNseries();             

     },[]);

    function getNserie(e){
        const res = nseries.filter(n => {
            return n.numero.indexOf(e) > -1;
        })
        setNserie(res);
   }


    return (
        <>
            {preloader && <Preloader/>}
            <Container>
            <SearchArea >
                <SearchIcon width={29} height={29} fill={'#000'}/>
                <Search
                    keyboardType={'number-pad'}
                    placeholder={'Buscar numero serie'}
                    onChangeText={e => getNserie(e)}/>   
            </SearchArea>
           {nserie.length < 1 ? 
                <FlatList
                data={nseries}
                renderItem={({item}) => <Nserie item={item}/> }
                keyExtractor={(item, index) => index.toString()}
            />
            : 
                <FlatList
                data={nserie}
                renderItem={({item}) => <Nserie item={item}/> }
                keyExtractor={(item, index) => index.toString()}/>
           }
          
            </Container>
        </>
    );
};
export default Nseries;
