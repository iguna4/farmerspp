/**
 *  User schema (custom user data)
 */

export const User = {
    name: 'User',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        userId: 'string?',
        name: 'string',
        email: 'string',
        password: 'string',
        phone: 'int?',
        province: 'string?',
        district: 'string?',
        lastLoginAt: {type: 'date', default: Date() },
        createdAt: { type: 'date', default: Date() },
    }
}




