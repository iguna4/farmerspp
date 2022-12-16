/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// import Realm from "realm";
import {  createRealmContext } from "@realm/react";
import { Achievement, Address, Contact, Density, IdDocument, Name } from "./DependentSchemas";
import { Farmer } from "./Farmer";
import { Farmland } from "./Farmland";
import { User } from "./User";




export const AppContext = createRealmContext({
    schema: [
        User, 
        Address, 
        Achievement, 
        Farmer, 
        Name, 
        Contact, 
        IdDocument, 
        Farmland,
        Density,
    ],
    deleteRealmIfMigrationNeeded: true,
    schemaVersion: 1,
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