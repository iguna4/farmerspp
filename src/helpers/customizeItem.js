import { months } from "./dates";
import { getInitials } from "./getInitials";

import { realmContext } from '../models/realmContext';
import { useObject } from '@realm/react';
import { BSON } from "realm";
const { useRealm } = realmContext;


export const customizeItem = (farmersList, farmlandsList, serviceProviders,  customUserData, flag) => {

        return farmersList?.map((item) => {
                
                const farmlands = farmlandsList?.filter(farmland=>farmland.farmerId === item._id);
                const isServiceProvider = serviceProviders?.filter(provider=>provider?.actorId === item?._id);
                const { assets } = item;
                // console.log('assets: ', JSON.stringify(assets));

                if (flag === 'Indivíduo') {

                        const newItem = {
                                _id: item?._id,
                                image:
                                        item?.image
                                                ? item?.image
                                                : 'htt://localhost/not-set-yet',
                                imageAlt: getInitials(item?.names.surname),
                                name: item?.names.otherNames + ' ' + item?.names.surname,
                                assets: assets,
                                isSprayingAgent: isServiceProvider.length > 0 ? true : false,
                                phone:
                                        (item?.contact.primaryPhone && item?.contact.primaryPhone > 0 && item?.contact.secondaryPhone && item?.contact.secondaryPhone > 0)
                                                ? `${item?.contact.primaryPhone}`
                                                : (item?.contact.primaryPhone && item?.contact.primaryPhone)
                                                        ? `${item?.contact.primaryPhone}`
                                                        : (item?.contact.secondaryPhone && item?.contact.secondaryPhone)
                                                                ? `${item?.contact.secondaryPhone}`
                                                                : 'Nenhum',

                                farmlands: farmlands?.length ? farmlands?.length : 0,
                                farmlandsList: farmlands,
                                // createdAt: `${new Date(item?.createdAt).getDate()}-${months[new Date(item?.createdAt).getMonth()]}-${new Date(item?.createdAt).getFullYear()}`,
                                createdAt: `${new Date(item?.createdAt).getDate()}-${new Date(item?.createdAt).getMonth() + 1}-${new Date(item?.createdAt).getFullYear()}`,
                                modifiedAt: `${new Date(item?.modifiedAt).getDate()}-${new Date(item?.modifiedAt).getMonth() + 1}-${new Date(item?.modifiedAt).getFullYear()}`,
                                user: (item?.userName === customUserData?.name)
                                        ? 'mim'
                                        : item?.userName,
                                status: item?.status,
                                checkedBy: item?.checkedBy,
                                flag: flag,

                        }
                        return newItem;

                }
                else if (flag === 'Grupo') {
                        const newItem = {
                                _id: item?._id,
                                operationalStatus: item?.operationalStatus,
                                image: item?.image ? item?.image : 'htt://localhost/not-set-yet',
                                imageAlt: getInitials(item?.name),
                                name: item?.name,
                                type: item?.type,
                                // manager: 'Nao indicado - customizeItem', //item?.manager?.fullname,
                                // phone: '84444444',
                                        // (item?.manager.phone && item?.manager.phone)
                                        //         ? `${item?.manager.phone}`
                                        //         : 'Nenhum',
                                assets: assets,
                                creationYear: item?.creationYear,
                                legalStatus: item?.legalStatus,
                                affiliationYear: item?.affiliationYear,
                                members: item?.numberOfMembers.total,
                                farmlands: farmlands?.length ? farmlands?.length : 0,
                                farmlandsList: farmlands,
                                // createdAt: `${new Date(item?.createdAt).getDate()}-${months[new Date(item?.createdAt).getMonth()]}-${new Date(item?.createdAt).getFullYear()}`,
                                createdAt: `${new Date(item?.createdAt).getDate()}-${new Date(item?.createdAt).getMonth() + 1}-${new Date(item?.createdAt).getFullYear()}`,
                                modifiedAt: `${new Date(item?.modifiedAt).getDate()}-${new Date(item?.modifiedAt).getMonth() + 1}-${new Date(item?.modifiedAt).getFullYear()}`,
                                user: (item?.userName === customUserData?.name)
                                        ? 'mim'
                                        : item?.userName,
                                status: item?.status,
                                checkedBy: item?.checkedBy,
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
                                isPrivate: item?.private,
                                manager: item?.manager?.fullname,
                                phone:
                                        (item?.manager.phone && item?.manager.phone)
                                                ? `${item?.manager.phone}`
                                                : 'Nenhum',
                                assets: assets,
                                farmlands: farmlands?.length ? farmlands?.length : 0,
                                farmlandsList: farmlands,
                                createdAt: `${new Date(item?.createdAt).getDate()}-${new Date(item?.createdAt).getMonth() + 1}-${new Date(item?.createdAt).getFullYear()}`,
                                modifiedAt: `${new Date(item?.modifiedAt).getDate()}-${new Date(item?.modifiedAt).getMonth() + 1}-${new Date(item?.modifiedAt).getFullYear()}`,
                                user: (item?.userName === customUserData?.name)
                                        ? 'mim'
                                        : item?.userName,
                                status: item?.status,
                                checkedBy: item?.checkedBy,
                                flag: flag,

                        }
                        return newItem;
                }
                //         item['flag'] = flag;
                //     return item;
        })

}