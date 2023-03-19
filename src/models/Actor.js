/**
 *  Farmer schema for each individual farmer that owns
 *  cashew farmland
 */

export const Actor = {
    name: 'Actor',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        names: 'Name',
        uaid: 'string', //uaid: unique actor id  => <Firstname first 2 characters>.<birthDate in milliseconds>.<birthPlace CEP>.<Lastname first 2 characters>
        gender: 'string',
        familySize: 'int',
        birthDate: 'date',
        birthPlace: 'Address',
        address: 'Address',
        assets: 'Assets[]',
        contact: 'Contact?',
        idDocument: 'IdDocument?',
        image: { type: 'string', default: '' },

        userDistrict: 'string?',
        userProvince: 'string?',
        userId: 'string',
        userName: 'string?',

        status: { type: 'string', default: 'pending'},
        checkedBy: 'string?',
        
        createdAt: { type: 'date', default: Date()},
        modifiedAt: { type: 'date', default: Date()},
        modifiedBy: 'string?',
    },
}

