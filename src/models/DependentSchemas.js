/* eslint-disable prettier/prettier */
import { Realm } from '@realm/react';

export const Name = {
    name: 'Name',
    embedded: true,
    properties: {
        surname: 'string',
        otherNames: 'string',
    },
};

// address for each users and farmers
export const Address = {
    name: 'Address',
    embedded: true,
    properties: {
        province: 'string',
        district: 'string',
        adminPost: { type: 'string', default: 'NA'},
        village: { type: 'string', default: 'NA'},
    }, 
}


export const Contact = {
    name: 'Contact',
    embedded: true,
    properties: {
        primaryPhone: 'int?',
        secondaryPhone: 'int?',
        email: 'string?',
    },
};


export const IdDocument= {
    name: 'IdDocument',
    embedded: true,
    properties: {
        docType: 'string',
        docNumber: 'string?',
        nuit: 'int?',
    },
};


export const Achievement = {
   
        name: 'Achievement',
        embedded: true,
        properties: {
            registeredFarmers: { type: 'int',  default: 0},
            registeredFarmlands: { type: 'int', default: 0},
            targetFarmers: { type: 'int',  default: 0},
            targetFarmlands: { type: 'int', default: 0},
        },
};


export const Density = {
    name: 'Density',
    embedded: true,
    properties: {
        mode: 'string',
        x: 'int?',
        y: 'int?',
    },
};









