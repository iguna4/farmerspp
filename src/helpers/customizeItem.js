import { months } from "./dates";
import { getInitials } from "./getInitials";

import { realmContext } from '../models/realmContext';
import { useObject } from '@realm/react';
import { BSON } from "realm";
const { useRealm } = realmContext;


export const customizeItem = (farmersList, farmlandsList,  customUserData, flag) => {

        return farmersList?.map((item) => {
                
                const farmlands = farmlandsList?.filter(farmland=>farmland.farmer === item._id);

                if (flag === 'Indivíduo') {

                        const newItem = {
                                _id: item?._id,
                                image:
                                        item?.image
                                                ? item?.image
                                                : 'htt://localhost/not-set-yet',
                                imageAlt: getInitials(item?.names.surname),
                                name: item?.names.otherNames + ' ' + item?.names.surname,
                                category: item?.category,
                                isSprayingAgent: item?.isSprayingAgent,
                                phone:
                                        (item?.contact.primaryPhone && item?.contact.primaryPhone > 0 && item?.contact.secondaryPhone && item?.contact.secondaryPhone > 0)
                                                ? `${item?.contact.primaryPhone}/${item?.contact.secondaryPhone}`
                                                : (item?.contact.primaryPhone && item?.contact.primaryPhone)
                                                        ? `${item?.contact.primaryPhone}`
                                                        : (item?.contact.secondaryPhone && item?.contact.secondaryPhone)
                                                                ? `${item?.contact.secondaryPhone}`
                                                                : 'Nenhum',

                                farmlands: item?.farmlands?.length,
                                farmlandsList: farmlands,
                                // createdAt: `${new Date(item?.createdAt).getDate()}-${months[new Date(item?.createdAt).getMonth()]}-${new Date(item?.createdAt).getFullYear()}`,
                                createdAt: `${new Date(item?.createdAt).getDate()}-${new Date(item?.createdAt).getMonth() + 1}-${new Date(item?.createdAt).getFullYear()}`,
                                user: (item?.userName === customUserData?.name)
                                        ? 'mim'
                                        : item?.userName,
                                validated: item?.validated,
                                validatedBy: item?.validatedBy,
                                flag: flag,


                        }
                        return newItem;

                }
                else if (flag === 'Grupo') {
                        const newItem = {
                                _id: item?._id,
                                image: item?.image ? item?.image : 'htt://localhost/not-set-yet',
                                imageAlt: getInitials(item?.manager.fullname),
                                name: item?.name,
                                type: item?.type,
                                manager: item?.manager?.fullname,
                                phone:
                                        (item?.manager.phone && item?.manager.phone)
                                                ? `${item?.manager.phone}`
                                                : 'Nenhum',

                                farmlands: item?.farmlands?.length,
                                farmlandsList: farmlands,
                                // createdAt: `${new Date(item?.createdAt).getDate()}-${months[new Date(item?.createdAt).getMonth()]}-${new Date(item?.createdAt).getFullYear()}`,
                                createdAt: `${new Date(item?.createdAt).getDate()}-${new Date(item?.createdAt).getMonth() + 1}-${new Date(item?.createdAt).getFullYear()}`,
                                user: (item?.userName === customUserData?.name)
                                        ? 'mim'
                                        : item?.userName,
                                validated: item?.validated,
                                validatedBy: item?.validatedBy,
                                flag: flag,

                        }
                        return newItem;
                }
                else if (flag === 'Instituição') {
                        const newItem = {
                                _id: item?._id,
                                image: item?.image ? item?.image : 'htt://localhost/not-set-yet',
                                imageAlt: getInitials(item?.manager.fullname),
                                name: item?.name,
                                type: item?.type,
                                isPrivate: item?.isPrivate,
                                manager: item?.manager?.fullname,
                                phone:
                                        (item?.manager.phone && item?.manager.phone)
                                                ? `${item?.manager.phone}`
                                                : 'Nenhum',

                                farmlands: item?.farmlands?.length,
                                farmlandsList: farmlands,
                                // createdAt: `${new Date(item?.createdAt).getDate()}-${months[new Date(item?.createdAt).getMonth()]}-${new Date(item?.createdAt).getFullYear()}`,
                                createdAt: `${new Date(item?.createdAt).getDate()}-${new Date(item?.createdAt).getMonth() + 1}-${new Date(item?.createdAt).getFullYear()}`,
                                user: (item?.userName === customUserData?.name)
                                        ? 'mim'
                                        : item?.userName,
                                validated: item?.validated,
                                validatedBy: item?.validatedBy,
                                flag: flag,

                        }
                        return newItem;
                }
                //         item['flag'] = flag;
                //     return item;
        })

}