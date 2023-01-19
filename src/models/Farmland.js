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
        usedArea: 'float?',
        totalArea: 'float?',
        auditedArea: 'float?',
        extremeCoordinates: 'Coordinates[]',
        // extremeCoordinates: 'Coordinates[]',
        middleCoordinates: 'Coordinates?',
        plantTypes: 'PlantTypes',
        farmer: 'string',
        createdAt: { type: 'date', default: Date()},
        district: 'string?',
        user: 'string?',
    },
}
