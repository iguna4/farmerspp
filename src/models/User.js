/**
 *  User schema (custom user data)
 */
 import { BSON } from "realm"

export const User = {
    name: 'User',
    primaryKey: '_id',
    properties: {
        _id: { type: 'objectId', default: ()=> new BSON.ObjectId()  },
        userId: 'string',
        name: 'string',
        email: 'string',
        password: 'string',
        phone: 'int?',
        image: 'string?',
        role: 'string?',
        userProvince: 'string?',
        userDistrict: 'string?',
        lastLoginAt: {type: 'date', default: Date() },
        createdAt: { type: 'date', default: Date() },
    }
}




