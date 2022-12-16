/* eslint-disable prettier/prettier */
import { Realm } from '@realm/react';

// export class Farmland extends Realm.Object {

//     static schema = {
//         name: 'Farmland',
//         primaryKey: '_id',
//         properties: {
//             _id: 'objectId',
//             description: 'string?',
//             consociatedCrops: 'string[]',
//             density: 'Density?',
//             farmer: {
//                 type: 'linkingObjects',
//                 objectType: 'Farmland',
//                 property: 'farmlands',
//             },
//         }
//     };
// };

export const Farmland = {
    name: 'Farmland',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        description: 'string',
        consociatedCrops: 'string[]',
        density: 'Density',
        // cashewTrees: ''
        createdAt: { type: 'date', default: Date()},
    },
}
