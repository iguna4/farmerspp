import { capitalize } from "./capitalize";




const validateInstitutionFarmerData = (
    {   institutionType, 
        institutionName, 
        institutionAdminPost,
        institutionVillage,
        // userAddressProvince,
        // userAddressDistrict,
        institutionManagerName,
        institutionManagerPhone,
        institutionNuit,  
        isPrivateInstitution,
    }, errors, setErrors,
    ) => {
    const retrievedInstitutionType = institutionType?.trim(); 
    const retrievedInstitutionName = capitalize(institutionName?.trim());
    const retrievedInstitutionAdminPost = institutionAdminPost?.trim();
    const retrievedInstitutionVillage = institutionVillage?.trim();
    // const retrievedAddressProvince = userAddressProvince?.trim();
    // const retrievedAddressDistrict = userAddressDistrict?.trim();
    const retrievedInstitutionManagerName = capitalize(institutionManagerName?.trim());
    const retrievedInstitutionManagerPhone = institutionManagerPhone;
    const retrievedInstitutionNuit = institutionNuit; 
    const retrievedIsPrivateInstitution = isPrivateInstitution;
       
    if (!retrievedInstitutionType){
        setErrors({ ...errors,
            institutionType: 'Indica tipo de instituição .',
        });
        return false;
    }

    if (!retrievedInstitutionName){
        setErrors({ ...errors,
            institutionName: 'Indica designação da instituição.',
        });
        return false;
    }

    if (!retrievedInstitutionAdminPost){
        setErrors({ ...errors,
            institutionAdminPost: 'Indica Posto Administrativo.',
        });
        return false;
    }

    if ((!retrievedInstitutionManagerName) || (retrievedInstitutionManagerName?.split(' ').length <= 1)){
        setErrors({ ...errors,
            institutionManagerName: 'Indica nome completo',
        });
        return false;
    }

    if ((retrievedInstitutionManagerPhone === 0) ||  retrievedInstitutionManagerPhone && (
        !Number.isInteger(parseInt(retrievedInstitutionManagerPhone))  || 
        retrievedInstitutionManagerPhone?.toString().length !== 9       ||
        parseInt(retrievedInstitutionManagerPhone.toString()[0]) !== 8 ||
        [2,3,4,5,6,7].indexOf(parseInt(retrievedInstitutionManagerPhone?.toString()[1])) < 0 )
        ) {      
        setErrors({ ...errors,
            institutionManagerPhone: 'Número de telefone inválido.',
        });
        return false;                   
    }


    if (retrievedInstitutionNuit &&
        (
        !Number.isInteger(parseInt(retrievedInstitutionNuit))  || 
        retrievedInstitutionNuit?.toString().length !== 9   
        )
        ){
        setErrors({ ...errors,
            nuit: 'NUIT inválido.',
        });
        return false;
    }

    const farmerData = {
        type: retrievedInstitutionType, 
        name: retrievedInstitutionName,
        isPrivate: retrievedIsPrivateInstitution,
        address: {
            province: "retrievedAddressProvince",
            district: "retrievedAddressDistrict",
            adminPost: retrievedInstitutionAdminPost,
            village: retrievedInstitutionVillage,
        },
        manager: {
            fullname: retrievedInstitutionManagerName,
            phone: retrievedInstitutionManagerPhone ? parseInt(retrievedInstitutionManagerPhone): 0,
        },
        nuit: retrievedInstitutionNuit ? parseInt(retrievedInstitutionNuit): 0,
    }
        
        return farmerData;

};

export default validateInstitutionFarmerData;