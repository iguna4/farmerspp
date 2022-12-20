/* eslint-disable prettier/prettier */
import { Realm } from '@realm/react';
import { Address, Contacts, IdDocument, Name } from './DependentSchemas';
import { Farmland } from './Farmland';


export const Group = {
    name: 'Group',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        type: 'string',
        name: 'string',
        affiliationYear: 'int',
        address: 'Address',
        members: 'Members',
        manager: 'Manager',
        licence: 'string?',
        nuit: { type: 'int?', default: 0},
        farmlands: 'Farmland[]',
        createdAt: { 
            type: 'date', default: Date()
        },
    },
}

