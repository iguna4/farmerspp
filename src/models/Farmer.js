/* eslint-disable prettier/prettier */
import { Realm } from '@realm/react';
import { Address, Contacts, IdDocument, Name } from './DependentSchemas';
import { Farmland } from './Farmland';


export const Farmer = {
    name: 'Farmer',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        names: 'Name',
        gender: 'string',
        birthDate: 'date',
        birthPlace: 'Address',
        address: 'Address',
        category: { type: 'string', default: 'não categorizado' },
        contact: 'Contact?',
        idDocument: 'IdDocument',
        photo: { type: 'string', default: 'NA' },
        farmlands: 'Farmland[]',
        createdAt: { type: 'date', default: Date()},
    },
}

