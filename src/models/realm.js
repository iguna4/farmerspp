/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// import Realm from "realm";
import {  createRealmContext } from "@realm/react";
import { Achievement, Address, Contact, Density, IdDocument, Members, Name, Manager } from "./DependentSchemas";
import { Farmer } from "./Farmer";
import { Farmland } from "./Farmland";
import { Institution } from "./Institution";
import { User } from "./User";
import { Group } from "./Group";




export const AppContext = createRealmContext({
    schema: [
        User, 
        Address, 
        Achievement, 
        Farmer, 
        Name,  // individual farmer
        Contact, 
        IdDocument, 
        Farmland,  // the farm field (cashew farmfield)
        Density,
        Institution, // private or public institutions
        Members,
        Manager,  // association/cooperative or institutions representatives
        Group, // assocation or cooperatives
    ],
    deleteRealmIfMigrationNeeded: true,
    schemaVersion: 5,
    // onFirstOpen(realm) {
    //     realm.write(()=>{
    //         realm.create('User', User.generate(
    //             "Juliana Marifo",
    //             "juliana@gmail.com",
    //             "evariste",
    //             860943567,
    //             {
    //                 province: "Nampula",
    //                 district: "Mogovolas",
    //             },
    //         ))

    //     })
    // }
})