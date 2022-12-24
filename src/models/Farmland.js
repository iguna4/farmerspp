/* eslint-disable prettier/prettier */
// import { Realm } from '@realm/react';


export const Farmland = {
    name: 'Farmland',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        description: 'string',
        consociatedCrops: 'string[]',
        density: 'Density',
        // farmer: {
        //         type: 'linkingObjects',
        //         objectType: 'Farmer',
        //         property: 'farmlands',
        //     },
        createdAt: { type: 'date', default: Date()},
    },
}
