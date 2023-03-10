
import 'react-native-get-random-values';
import {  createRealmContext } from "@realm/react";
import { PlantTypes, Assets, FarmlandBlock, SprayingServiceBeneficiary, Address, Contact, Density, IdDocument, Members, Name, Manager, Coordinates, InvalidationMessage } from "./EmbbededSchemas";
import { Actor } from "./Actor";
// import { ActorCategory } from './ActorCategory';
import { Farmland } from "./Farmland";
import { Institution } from "./Institution";
import { User } from "./User";
import { Group } from "./Group";
import { UserStat } from './UserStat';
import { InvalidationMotive } from './InvalidationMotive';
import { SprayingServiceProvider } from './SprayingServiceProvider';

export const realmContext = createRealmContext({
    schema: [
        Actor,
        // ActorCategory,
        Assets,
        SprayingServiceBeneficiary,
        SprayingServiceProvider,
        FarmlandBlock,
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
        InvalidationMotive,
        InvalidationMessage,
        UserStat,
        User,
    ],
    schemaVersion: 11,
    // deleteRealmIfMigrationNeeded: true,
})

