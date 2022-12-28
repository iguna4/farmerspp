
// import { realmContext } from '../../models/realm';
// const {useRealm} = realmContext;
// import React, {useCallback, useEffect, useState} from 'react';

import { v4 as uuidv4 } from 'uuid';


export const addFarmland = (farmlandData, realm) =>{
    const {
        plantingYear, 
        description,
        consociatedCrops,
        density,
        trees,
        declaredArea,
        plantTypes,
        farmerId,
    } = farmlandData;

    if (!farmerId) {
        return {
            status: 'FAILED',
            code: 404,
            message: 'Indica o proprietário desta parcela!',
        };
    }


    const farmer = realm.objectForPrimaryKey('Farmer', farmerId);

    if (!farmer) {
        return {
            status: 'FAILED',
            code: 404,
            message: 'O proprietário desta parcela ainda não foi registado!',
        };
    }

    realm.write(()=>{
        const newFarmland = realm.create('Farmland', {
            _id: uuidv4(),
            plantingYear,
            description,
            consociatedCrops,
            density,
            trees,
            declaredArea,
            plantTypes,
            farmer: farmer._id,
        })
        console.log('newFarmland:', newFarmland);
        farmer.farmlands.push(newFarmland);
        console.log('updatedfarmer:', farmer);
    })


    // setModalVisible(false);
    // setAddDataModalVisible(true);

    // setPlantingYear('');
    // setDescription('');
    // setConsociatedCrops([]);
    // setClones([]);
    // setTrees('');
    // setDeclaredArea('');
    // setDensityLength('');
    // setDensityWidth('');
    // setPlantTypes([]);
    // setDensityMode('');
};



export const addFarmland2 = (farmlandData, realm)=>{
    //     const {
    //     plantingYear, 
    //     description,
    //     consociatedCrops,
    //     density,
    //     trees,
    //     declaredArea,
    //     plantTypes,
    //     farmerId,
    // } = farmlandData;


    console.log('farmerId:', farmerId)

    if (!farmerId) {
        return {
            status: 'FAILED',
            code: 404,
            message: 'Indica o proprietário desta parcela!',
        };
    }


    // find farmer by they primaryKey
    const farmer = realm.objectForPrimaryKey('Farmer', farmerId);

    if (!farmer) {
        return {
            status: 'FAILED',
            code: 404,
            message: 'O proprietário desta parcela ainda não foi registado!',
        };
    }

    try {
        realm.write(()=>{
            const newFarmland = realm.create('Farmland', {
                _id: uuidv4(),
                plantingYear,
                description,
                consociatedCrops,
                density,
                trees,
                declaredArea,
                plantTypes,
                farmer: farmer._id,
            })
            farmer.farmlands.push(newFarmland);
            console.log('updatedfarmer:', farmer);
        })
        
    } catch (error) {
        console.log('something went wrong');
        return ;
    }



}