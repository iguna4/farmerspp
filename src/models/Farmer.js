/**
 *  Farmer schema for each individual farmer that owns
 *  cashew farmland
 */

export const Farmer = {
    name: 'Farmer',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        names: 'Name',
        ufid: 'string', //ufid: unique farmer id  => <Firstname first 2 characters>.<birthDate in milliseconds>.<birthPlace CEP>.<Lastname first 2 characters>
        isSprayingAgent: {type: 'bool', default: 'false', },
        gender: 'string',
        familySize: 'int',
        birthDate: 'date',
        birthPlace: 'Address',
        address: 'Address',
        category: { type: 'string', default: 'Não-categorizado' },
        contact: 'Contact?',
        idDocument: 'IdDocument?',
        image: { type: 'string', default: '' },
        farmlands: 'string[]',
        createdAt: { type: 'date', default: Date()},
        userDistrict: 'string?',
        userId: 'string',
        userName: 'string?'

        // user: 'string?',
    },
}

