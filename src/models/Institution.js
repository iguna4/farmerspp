/* eslint-disable prettier/prettier */
// import { Realm } from '@realm/react';
// import { Address, Contacts, IdDocument, Name } from './DependentSchemas';
// import { Farmland } from './Farmland';


export const Institution = {
    name: 'Institution',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        type: 'string',
        name: 'string',
        isPrivate: 'bool',
        address: 'Address',
        manager: 'Manager',
        nuit: { type: 'int?', default: 0},
        farmlands: 'string[]',
        createdAt: { type: 'date', default: Date()},
    },
}

