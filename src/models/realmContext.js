
import 'react-native-get-random-values';
import {  createRealmContext } from "@realm/react";
import { PlantTypes, Address, Contact, Density, IdDocument, Members, Name, Manager, Coordinates } from "./DependentSchemas";
import { Farmer } from "./Farmer";
import { Farmland } from "./Farmland";
import { Institution } from "./Institution";
import { User } from "./User";
import { Group } from "./Group";
import { Achievement } from './Achievement';

export const realmContext = createRealmContext({
    schema: [
        Farmer, 
        Group, 
        Institution, 
        Members, 
        Address, 
        Manager, 
        Name, 
        Contact, 
        IdDocument, 
        Farmland, 
        Density,
        PlantTypes,
        Coordinates,
        Achievement,
        User,
    ],
    schemaVersion: 3,
    deleteRealmIfMigrationNeeded: true,
})

