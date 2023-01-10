/* eslint-disable prettier/prettier */
// import { Realm } from '@realm/react';

export const User = {
    name: 'User',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        fullname: 'string',
        email: 'string',
        password: 'string',
        primaryPhone: 'int?',
        secondaryPhone: 'int?',
        province: 'string?',
        district: 'string?',
        achievement: 'Achievement[]',
        createdAt: { type: 'date', default: Date() },
    }
}




