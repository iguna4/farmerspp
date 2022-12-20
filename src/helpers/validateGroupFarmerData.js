import { capitalize } from "./capitalize";



const validateGroupFarmerData = (
    {   
        groupType,
        groupName,
        groupMembersNumber,
        groupWomenNumber,
        groupAffiliationYear,
        groupOperatingLicence,
        groupNuit,
        groupAdminPost,
        groupVillage,
        // userAddressProvince,
        // userAddressDistrict,  
        groupManagerName,
        groupManagerPhone, 
    }, errors, setErrors,
    ) => {
    const retrievedGroupType = groupType?.trim(); 
    const retrievedGroupName = capitalize(groupName?.trim());
    const retrievedGroupMembersNumber = parseInt(groupMembersNumber);
    const retrievedGroupWomenNumber = parseInt(groupWomenNumber);
    const retrievedGroupAffiliationYear = parseInt(groupAffiliationYear);
    const retrievedGroupOperatingLicence = groupOperatingLicence?.trim();
    const retrievedgroupNuit = parseInt(groupNuit); 
    // const retrievedAddressProvince = userAddressProvince?.trim();
    // const retrievedAddressDistrict = userAddressDistrict?.trim();
    const retrievedGroupAdminPost = groupAdminPost?.trim();
    const retrievedGroupVillage = groupVillage?.trim();
    const retrievedGroupManagerName = capitalize(groupManagerName.trim());
    const retrievedGroupManagerPhone = parseInt(groupManagerPhone);
       
    if (!retrievedGroupType){
        setErrors({ ...errors,
            groupType: 'Indica tipo de grupo.',
        });
        return false;
    }

    if (!retrievedGroupName){
        setErrors({ ...errors,
            groupName: 'Indica designação de grupo.',
        });
        return false;
    }

    if (!retrievedGroupMembersNumber && retrievedGroupMembersNumber !== 0){
        setErrors({ ...errors,
            groupMembersNumber: 'Número total de membros.',
        });
        return false;
    }

    if (!retrievedGroupWomenNumber && retrievedGroupWomenNumber !== 0){
        setErrors({ ...errors,
            groupWomenNumber: 'Número total de mulheres.',
        });
        return false;
    }
    else if (parseInt(retrievedGroupWomenNumber) > parseInt(retrievedGroupMembersNumber)) {
        setErrors({ ...errors,
            groupWomenNumber: 'Número mulheres superior ao total.',
        });
        return false;        
    }

    if (!retrievedGroupAffiliationYear){
        setErrors({ ...errors,
            groupAffiliationYear: 'Indica ano de afiliação.',
        });
        return false;
    }

    if (!retrievedGroupAdminPost){
        setErrors({ ...errors,
            groupAdminPost: 'Indica Posto Administrativo.',
        });
        return false;
    }

    if ((!retrievedGroupManagerName) || (retrievedGroupManagerName?.split(' ').length <= 1)){
        setErrors({ ...errors,
            groupManagerName: 'Indica nome completo do gerente.',
        });
        return false;
    }


    if ((retrievedGroupManagerPhone === 0) || retrievedGroupManagerPhone  && (
        !Number.isInteger(parseInt(retrievedGroupManagerPhone))  || 
        retrievedGroupManagerPhone?.toString().length !== 9       ||
        parseInt(retrievedGroupManagerPhone.toString()[0]) !== 8 ||
        [2,3,4,5,6,7].indexOf(parseInt(retrievedGroupManagerPhone?.toString()[1])) < 0 )
        ) {      
        setErrors({ ...errors,
            groupManagerPhone: 'Número de telefone inválido.',
        });    
        return false;                   
    }    
    

    const farmerData = {
        type: retrievedGroupType,
        name: retrievedGroupName,
        address: {
            province: "user-retrievedGroupProvince",
            district: "user-retrievedGroupDistrict",
            adminPost: retrievedGroupAdminPost,
            village: retrievedGroupVillage,
        },
        affiliationYear: retrievedGroupAffiliationYear ? parseInt(retrievedGroupAffiliationYear): 0,
        members: {
            total: retrievedGroupMembersNumber ? parseInt(retrievedGroupMembersNumber) : 0,
            women: retrievedGroupWomenNumber ? parseInt(retrievedGroupWomenNumber) : 0,
        },
        manager: {
            fullname: retrievedGroupManagerName,
            phone: retrievedGroupManagerPhone ? parseInt(retrievedGroupManagerPhone) : 0,
        },
        licence: retrievedGroupOperatingLicence,
        nuit: retrievedgroupNuit ? parseInt(retrievedgroupNuit) : 0,
    }
        return farmerData;

};

export default validateGroupFarmerData;