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
        creationYear: 'int?',
        affiliationYear: 'int?',
        legalStatus: 'string?',
        operationalStatus: { type: 'bool', default: false},
        address: 'Address',
        numberOfMembers: 'Members',
        members: 'string[]',
        manager: 'Manager',

        licence: 'string?',
        nuit: { type: 'int?', default: 0}, 
        image: { type: 'string', default: '' },

        assets: 'Assets[]',
        geolocation: 'Coordinates?',

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
