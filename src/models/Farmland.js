/* eslint-disable prettier/prettier */
import { Realm } from '@realm/react';

export class Farmland extends Realm.Object {

    static schema = {
        name: 'Farmland',
        primaryKey: '_id',
        properties: {
            description: 'string?',
            consociatedCrops: 'string[]?',
            density: 'Density?',
            farmer: {
                type: 'linkingObjects',
                objectType: 'Farmer',
                property: 'farmlands',
            },
        }
    };
};

