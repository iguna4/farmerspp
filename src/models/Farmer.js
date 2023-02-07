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
        ufid: 'string', //ufid: unique farmer id  =>surname:dateOfBirth:cep:8randomNumbers:registrationTimestamp
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
        district: 'string?',
        user: 'string?',
        owner_id: 'string?',
    },
}

