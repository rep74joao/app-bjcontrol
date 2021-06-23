import React, { useEffect, useState, useContext } from "react";
import Preloader from '../../components/preloader';
import Lote from '../../components/lote';
import { Container, Search, SearchArea } from './styles';
import {FlatList, TouchableOpacity} from 'react-native'
import {UserContext} from "../../contexts/UserContext";
import SearchIcon from '../../assets/search.svg'
import Api from '../../Api'
import {secundary} from '../../config'


const Lotes = ({navigation}) => {
    const {dispatch, state} = useContext(UserContext);
    const [preloader, setPreloader] = useState(true);
    const [lotes, setLotes] = useState([]);
    const [lote, setLote] = useState([]);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        async function getLotes(){
        

            const formData = new FormData();

            formData.append('token', state.user.token);
            formData.append('id', state.user.id);
            
            const res = await Api.GetLotes(formData);
            
            setLotes(res);
 
            setPreloader(false);

        }
 
        getLotes();
     },[]);

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

    function getLote(e){
        const res = lotes.filter(n => {
            return n.lote.toString().indexOf(e) > -1;
        })
        setLote(res);
   }


    return (
        <>
            {preloader && <Preloader/>}
            <Container>
           {search && 
             <SearchArea >
             <SearchIcon width={29} height={29} fill={'#000'}/>
             <Search
                 keyboardType={'number-pad'}
                 placeholder={'Buscar lote'}
                 onChangeText={e => getLote(e)}/>   
            </SearchArea>
           }
           {lote.length < 1 ? 
                <FlatList
                data={lotes}
                renderItem={({item}) => <Lote item={item}/> }
                keyExtractor={(item, index) => index.toString()}
            />
            : 
                <FlatList
                data={lote}
                renderItem={({item}) => <Lote item={item}/> }
                keyExtractor={(item, index) => index.toString()}/>
           }
          
            </Container>
        </>
    );
};
export default Lotes;
