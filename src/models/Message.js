/**
 *  Farmer schema for each individual farmer that owns
 *  cashew farmland
 */

export const Message = {
 name: 'Message',
 primaryKey: '_id',
 properties: {
     _id: 'string',
     resourceId: 'string',
     resourceName: 'string',
     messages: 'InvalidationMessage[]',
     createdAt: { type: 'date', default: ()=>new Date()},    
 },
}

