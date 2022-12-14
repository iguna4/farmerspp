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
        category: 'string',
        contacts: 'Contact?',
        idDocument: 'IdDocument?',
        photo: 'string?',
        farmlands: 'Farmlands[]?',
        createdAt: { type: 'date', default: Date()},
    },
}

