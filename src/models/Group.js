/* eslint-disable prettier/prettier */
// import { Realm } from '@realm/react';
// import { Address, Contacts, IdDocument, Name } from './DependentSchemas';
// import { Farmland } from './Farmland';


export const Group = {
    name: 'Group',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        type: 'string',
        name: 'string',
        affiliationYear: 'int',
        address: 'Address',
        members: 'Members',
        manager: 'Manager',
        registeredMembers: 'Farmer[]',
        licence: 'string?',
        nuit: { type: 'int?', default: 0},
        image: { type: 'string', default: '' },
        farmlands: 'string[]',
        createdAt: { 
            type: 'date', default: Date()
        },
        district: 'string?',
        user: 'string?',
        owner_id: 'string?',
    },
}

