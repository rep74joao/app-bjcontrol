import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Preloader from '../../components/preloader';
import Nserie from '../../components/nserie';
import { Container, Search, SearchArea } from './styles';
import {FlatList} from 'react-native'
import {useStateValue} from '../../contexts/StateContext'
import SearchIcon from '../../assets/search.svg'
import Api from '../../Api'


const Nseries = ({navigation}) => {
    const [context, dispatch] = useStateValue();
    
    const [preloader, setPreloader] = useState(true);
    const [nseries, setNseries] = useState([]);
    const [nserie, setNserie] = useState([]);

    useEffect(() => {
        async function getNseries(){
            if(context.nseries.nseries){
                setNseries(context.nseries.nseries);
                setPreloader(false);
            }else{
             
                const formData = new FormData();

                formData.append('token', context.user.user.token);
                formData.append('id', context.user.user.id);
                
                const res = await Api.GetNseries(formData);
                
                setNseries(res);
     
                if (res){
                    dispatch({
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
