/**
 *  Farmer schema for each individual farmer that owns
 *  cashew farmland
 */

export const SprayingServiceProvider = {
 name: 'SprayingServiceProvider',
 primaryKey: '_id',
 properties: {
     _id: 'string',
     actorId: 'string',
     actorName: 'string?',
     year: { type: 'int', default: ()=>new Date().getFullYear()},
     beneficiaries: 'SprayingServiceBeneficiary[]',
     status: 'string?', // active, inactive
     assets: 'Assets[]',

     status: { type: 'string', default: 'pending'}, // pending; active; inactive
     checkedBy: 'string?',

     userDistrict: 'string?',
     userProvince: 'string?',
     userId: 'string',
     userName: 'string?',

     createdAt: { type: 'date', default: Date()},
     modifiedAt: { type: 'date', default: Date()},

 },
}

