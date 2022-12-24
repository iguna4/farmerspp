/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// import Realm from "realm";
import 'react-native-get-random-values';
import {  createRealmContext } from "@realm/react";
import { Achievement, Address, Contact, Density, IdDocument, Members, Name, Manager } from "./DependentSchemas";
import { Farmer } from "./Farmer";
import { Farmland } from "./Farmland";
import { Institution } from "./Institution";
import { User } from "./User";
import { Group } from "./Group";

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
        Density
    ],
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true,
})


// export const realm = await Realm.open({
//   path: "realm-files/myrealm",
  // schema: [
  //   Farmer, 
  //   Group, 
  //   Institution, 
  //   Members, 
  //   Address, 
  //   Manager, 
  //   Name, 
  //   Contact, 
  //   IdDocument, 
  //   Farmland, 
  //   Density],
// });



// export const AppContext = createRealmContext({
//     schema: [
//         User, 
//         Address, 
//         Achievement, 
//         Farmer, 
//         Name,  // individual farmer
//         Contact, 
//         IdDocument, 
//         Farmland,  // the farm field (cashew farmfield)
//         Density,
//         Institution, // private or public institutions
//         Members,
//         Manager,  // association/cooperative or institutions representatives
//         Group, // assocation or cooperatives
//     ],
//     deleteRealmIfMigrationNeeded: true,
//     schemaVersion: 3,
//     // onFirstOpen(realm) {
//     //     realm.write(()=>{
//     //         realm.create('User', User.generate(
//     //             "Juliana Marifo",
//     //             "juliana@gmail.com",
//     //             "evariste",
//     //             860943567,
//     //             {
//     //                 province: "Nampula",
//     //                 district: "Mogovolas",
//     //             },
//     //         ))

//     //     })
//     // }
// })