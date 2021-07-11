import React, {useEffect, useState, useContext} from 'react';
import { Text } from 'react-native';
import Api from '../../Api'
import {UserContext} from "../../contexts/UserContext";

const Produtos = () => {
    const {state} = useContext(UserContext);
    useEffect(() => {
      async function getProdutos(){
        const formData = new FormData();

        formData.append('token', state.user.token);
        formData.append('id', state.user.id);

        const produtos = Api.GetProdutos(formData);


        console.tron.log(produtos)
      }

      getProdutos()
    },[])

    return (
        <>
            <Text>Produtos</Text>
        </>
    );
}

export default Produtos;