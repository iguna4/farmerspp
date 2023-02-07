/**
 *  Achievement schema for user performance reports
 *  
 */

export const Achievement = {
   
    name: 'Achievement',
    embedded: true,
    properties: {
        month: 'string',
        year: { type: 'int', default: 2023 },
        registeredFarmers: { type: 'int',  default: 0},
        registeredFarmlands: { type: 'int', default: 0},
        farmersRegistrationGoal: { type: 'int',  default: 0},
        farmlandsRegistrationGoal: { type: 'int', default: 0},
        user: 'string?',
        owner_id: 'string?',
    },
};