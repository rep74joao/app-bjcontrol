import axios from 'axios'
import {Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ip} from './config'

const api = axios.create({
    baseURL: `https://api.bjcontrol.com.br/api`,

    headers:{
        Authorization: 'Basic VNXlclNCRkFDSw6UGFzc1NCRkFDSUw',
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-url-urlencoded'
    }
})

const apiImg = axios.create({
    baseURL: `http://erp.bjcontrol.com.br`,

    headers:{
        Authorization: 'Basic VNXlclNCRkFDSw6UGFzc1NCRkFDSUw',
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-url-urlencoded'
    }
})

//vitor-mkt2
//re007123A147258#


export default {
    Dashboard: async (data) => {
        try{
            const res = await api.post('/dashboard', data);
           
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'servidor fora do ar!');
            return;
        }
    },
    DashboardContasReceber: async (data) => {
        try{
            const res = await api.post('/dashboard-contasreceber', data);
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'servidor fora do ar!');
            return;
        }
    },
    DashboardContasPagar: async (data) => {
        try{
            const res = await api.post('/dashboard-contaspagar', data);
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'servidor fora do ar!');
            return;
        }
    },
    GetProdutos: async (data) => {
        try{
            const res = await api.post('/get-produtos', data);
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'servidor fora do ar!');
            return;
        }
    },
    Login: async (data) => {
        try {
            const res = await api.post('/auth/login', data);
                if (res.data.error){
                   return Alert.alert('Atenção', 'Senha ou usuário incorreto!');
                }else{
                    await AsyncStorage.setItem('userData', JSON.stringify({
                        user: res.data,
                    }));
                    return res.data;
                }
        } catch (e) {
            Alert.alert('Atenção', 'Erro tente novamente mais tarde!');
            return;
        }
    },
    GetLotes: async (data) => {
        try{
            const res = await api.post('/get-lotes', data);
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'servidor fora do ar!');
            return;
        }
    },
    SetStatusLote: async (data) => {
        try{
            const res = await api.post('/set-status-lote', data);
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'servidor fora do ar!');
            return;
        }
    },
    GetNseries: async (data) => {
        try{
            const res = await api.post('/get_nseries', data);
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'servidor fora do ar!');
            return;
        }
    },
    GetNserieId: async (data) => {
        try{
            const res = await api.post('/get_nserie_id', data);
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'Servidor fora do ar!');
            return;
        }
    },
    SetImgNserie: async (data) => {
        try{
            const res = await apiImg.post('/Nserie/upload_img', data)
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
        }catch(e){
            Alert.alert('Atenção', 'Servidor fora do ar!');
            return;
        }
    },
    SetNerieRastreio: async (data) => {
        try{
            const res = await api.post('/set_rastreio_nserie', data);
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'Servidor fora do ar!');
            return;
        }
    },
    GetClientes: async (data) => {
        try{
            const res = await api.post('/get-clientes', data);
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'servidor fora do ar!');
            return;
        }
    },
    GetOrdemservicoCliente: async (data) => {
        try{
            const res = await api.post('/get-ordemservico', data);
            if(res.data.error){
                return Alert.alert('Atenção', 'Usuario sem permissao!');
            }else{
                return res.data;
            }
           
        }catch (e){
            Alert.alert('Atenção', 'servidor fora do ar!');
            return;
        }
    },
    GetCliente: async (type, value) => {
      try{
          //const res = api.get(`/TServerModuleCaixaMobile/GetCliente/n${type}/${value}`);
          //const res = api.get(`/TServerModuleCaixaMobile/GetCliente/${type}/${value}`);
          //const res = api.get(`/TServerModuleCaixaMobile/GetCliente/${type}/${value}`);

          if (type === 'nome'){
              const res = clientes.filter(c => {
                  return c.NOME.indexOf(value) >- 1;
              })

              setTimeout(() => {}, 2000)
              return res;
          }else{
              const res = clientes.filter(c => {
                  return c.CPF_CNPJ.indexOf(value) >- 1;
              })

              setTimeout(() => {}, 2000)
              return res;
          }




      }catch (e){
          Alert.alert('Atenção', 'Falta de conexão com o servidor')
      }
    },

}

