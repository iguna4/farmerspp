/**
 *  Institution schema for those institutions that 
 *  own cashew farmlands
 */

export const Institution = {
    name: 'Institution',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        type: 'string',
        name: 'string',
        isPrivate: 'bool',
        address: 'Address',
        manager: 'Manager',
        nuit: { type: 'int?', default: 0},
        licence: {type: 'string?', default: ''},
        image: { type: 'string', default: '' },
        farmlands: 'string[]',
        createdAt: { type: 'date', default: Date()},
        district: 'string?',
        user: 'string?',
        owner_id: 'string?',
    },
}

