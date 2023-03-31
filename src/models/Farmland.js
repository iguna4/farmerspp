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
        geolocation: 'Coordinates?',
        middleCoordinates: 'Coordinates?', // to be removed. changed from middleCoordinates to geolocation
        auditedArea: 'float?',
        totalArea: 'float?',
        trees: 'int?',
        
        blocks: 'FarmlandBlock[]',

        userDistrict: 'string?',
        userProvince: 'string?',
        userId: 'string',
        userName: 'string?',

        status: { type: 'string', default: 'pending'}, // pending, validated, or invalidated
        checkedBy: 'string?',  // name of the user who validated/invalidated this farmland

        ownerType: 'string?', // Single, Group, or Institution
        createdAt: { type: 'date', default: Date()},
        modifiedAt: { type: 'date', default: Date()},
        modifiedBy: 'string?',
    },
}
