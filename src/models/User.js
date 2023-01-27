/* eslint-disable prettier/prettier */
// import { Realm } from '@realm/react';

export const User = {
    name: 'User',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        userId: 'string?',
        name: 'string',
        email: 'string',
        password: 'string',
        primaryPhone: 'int?',
        province: 'string?',
        district: 'string?',
        lastLoginAt: {type: 'date', default: Date() },
        createdAt: { type: 'date', default: Date() },
    }
}




