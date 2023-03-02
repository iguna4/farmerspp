
import 'react-native-get-random-values';
import {  createRealmContext } from "@realm/react";
import { PlantTypes, Address, Contact, Density, IdDocument, Members, Name, Manager, Coordinates, DistrictalStats, UserStats, InvalidationMessage } from "./EmbbededSchemas";
import { Farmer } from "./Farmer";
import { Farmland } from "./Farmland";
import { Institution } from "./Institution";
import { User } from "./User";
import { Group } from "./Group";
// import { Achievement } from './Achievement';
// import { ProvincialStats } from './ProvincialStats';
import { UserStat } from './UserStat';
import { Message } from './Message';
import { InvalidationMotive } from './InvalidationMotive';

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
        // Message,
        InvalidationMotive,
        InvalidationMessage,
        UserStat,
        User,
    ],
    schemaVersion: 11,
    // deleteRealmIfMigrationNeeded: true,
})

