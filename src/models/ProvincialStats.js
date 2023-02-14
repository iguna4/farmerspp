
// ProvincialStats
export const ProvincialStats = {
    name: 'ProvincialStats',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        name: 'string',
        districtalStats: 'DistrictalStats[]',
        UserStats: 'UserStats[]', // to be removed
        userStats: 'UserStats[]',
        targetFarmers: {type: 'int', default: 0 },
        targetFarmlands: {type: 'int', default: 0 },
        registeredFarmers: {type: 'int', default: 0 },
        registeredFarmlands: {type: 'int', default: 0 },
        createdAt: {type: 'date', default: ()=> new Date()},
    },
};