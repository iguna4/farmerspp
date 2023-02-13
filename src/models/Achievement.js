/**
 *  Achievement schema for user performance reports
 *  
 */

export const Achievement = {
   
    name: 'Achievement',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        month: 'string',
        year: { type: 'int', default: ()=> new Date().getFullYear() },
        registeredFarmers: { type: 'int',  default: 0},
        registeredFarmlands: { type: 'int', default: 0},
        farmersRegistrationGoal: { type: 'int',  default: 0},
        farmlandsRegistrationGoal: { type: 'int', default: 0},
        userDistrict: 'string?',
        userId: 'string',
        userName: 'string?'
    },
};