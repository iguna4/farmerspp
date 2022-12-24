import { useCallback } from "react";
import { uuid as uuidv4 } from 'uuid';
import Realm from "realm";
import { realmContext } from '../models/realm';
const {useRealm} = realmContext;


export const createFarmer = (farmerData, realm) =>{
    const {
        names, isSprayingAgent, gender, 
        birthDate, birthPlace, address,
        contact, idDocument,
    } = farmerData;

    realm.write(()=>{
        realm.create('Farmer', {
            _id: uuidv4(),
            names,
            isSprayingAgent,
            gender,
            birthDate,
            birthPlace,
            address,
            contact,
            idDocument,
            ufid: '4843jf',

        })
    })
}