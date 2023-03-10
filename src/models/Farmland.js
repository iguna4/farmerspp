/**
 *  Farmland schema for each farmland that is to be registered
 */

export const Farmland = {
    name: 'Farmland',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        farmerId: 'string',
        description: 'string?',
        consociatedCrops: 'string[]',
        extremeCoordinates: 'Coordinates[]',
        middleCoordinates: 'Coordinates?',
        auditedArea: 'float?',
        totalArea: 'float?',
        trees: 'int?',
        
        blocks: 'FarmlandBlock[]',

        userDistrict: 'string?',
        userProvince: 'string?',
        userId: 'string',
        userName: 'string?',

        status: { type: 'string', default: 'pending'},
        checkedBy: 'string?',

        createdAt: { type: 'date', default: Date()},
        modifiedAt: { type: 'date', default: Date()},

    },
}
