/* eslint-disable prettier/prettier */
// import { Realm } from '@realm/react';


export const Farmland = {
    name: 'Farmland',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        plantingYear: 'int',
        description: 'string?',
        consociatedCrops: 'string[]',
        density: 'Density',
        trees: 'int',
        declaredArea: 'float?',
        auditedArea: 'float?',
        extremeCoordinates: 'Coordinates[]',
        middleCoordinates: 'Coordinates?',
        plantTypes: 'PlantTypes',
        farmer: 'string',
        createdAt: { type: 'date', default: Date()},
        district: 'string?'
    },
}
