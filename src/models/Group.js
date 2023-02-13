/**
 *  Group schema for those groups of individuals who
 *  own common cashew farmlands
 */

export const Group = {
    name: 'Group',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        type: 'string',
        name: 'string',
        affiliationYear: 'int',
        address: 'Address',
        members: 'Members',
        manager: 'Manager',
        registeredMembers: 'string[]',
        licence: 'string?',
        nuit: { type: 'int?', default: 0}, 
        image: { type: 'string', default: '' },
        farmlands: 'string[]',
        createdAt: { 
            type: 'date', default: Date()
        },
        userDistrict: 'string?',
        userId: 'string',
        userName: 'string?'

        // user: 'string?',
    },
}

