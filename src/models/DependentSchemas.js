/**
 *  This file contains embbeded schemas:
 *  The project has 9 embbeded schemas that are found in this file
 */

// Embedded Name schema
export const Name = {
    name: 'Name',
    embedded: true,
    properties: {
        surname: 'string',
        otherNames: 'string',
    },
};

// Embedded Address schema 
export const Address = {
    name: 'Address',
    embedded: true,
    properties: {
        province: 'string',
        district: 'string',
        adminPost: { type: 'string', default: 'NA'},
        village: { type: 'string', default: 'NA'},
    }, 
}

// Embedded Members schema 
export const Members = {
    name: 'Members',
    embedded: true,
    properties: {
        total: { type: 'int?', default: 0},
        women: { type: 'int?', default: 0},
    }, 
}

// Embedded Manager schema
export const Manager = {
    name: 'Manager',
    embedded: true,
    properties: {
        fullname: { type: 'string'},
        phone: { type: 'int?', },
    }, 
}

// Embedded Contact schema
export const Contact = {
    name: 'Contact',
    embedded: true,
    properties: {
        primaryPhone: 'int?',
        secondaryPhone: 'int?',
        email: 'string?',
    },
};

// Embedded IdDocument schema
export const IdDocument= {
    name: 'IdDocument',
    embedded: true,
    properties: {
        docType: 'string',
        docNumber: 'string?',
        nuit: { type: 'int?', default: 0},
    },
};

// Embedded Density schema
export const Density = {
    name: 'Density',
    embedded: true,
    properties: {
        mode: 'string',
        length: {type: 'int?', default: 0},
        width: {type: 'int?', default: 0},
    },
};

// Embedded PlantTypes schema
export const PlantTypes = {
    name: 'PlantTypes',
    embedded: true,
    properties: {
        plantType: 'string[]',
        clones: 'string[]',
    },
};

// Embedded Coordinates schema
export const Coordinates = {
    name: 'Coordinates', 
    embedded: true,
    properties: {
        position: 'int?',
        latitude: 'double',
        longitude: 'double'
    },
};









