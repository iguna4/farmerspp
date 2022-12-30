
import { capitalize } from "./capitalize";
/**
 * 
 * @param {*} farmerData 
 * @param {*} errors 
 * @param {*} setErrors 
 * @returns false if invalid data found, farmerdata if no invalid data found
 * 
 * This function sanitizes, and validates all the farmer data before they
 * are persisted. 
 * Invalid data trigger errorMessages to the respective input component
 * in the form.
 */

const validateIndividualFarmerData = (
    {   isSprayingAgent,
        surname, 
        otherNames, 
        gender, 
        familySize,
        birthDate, 
        birthProvince,
        birthDistrict,
        birthAdminPost,
        // birthVillage,
        // addressProvince,
        // addressDistrict,
        addressAdminPost,
        addressVillage,
        primaryPhone,
        secondaryPhone,
        docType, docNumber, nuit,  
    }, errors, setErrors,
    ) => {

    // sanitizing recieved data
    const retrievedisSprayingAgent = isSprayingAgent;
    const retrievedSurname = capitalize(surname?.trim()); 
    const retrievedOtherNames = capitalize(otherNames?.trim());
    const retrievedGender = gender;
    const retrievedFamilySize = familySize;
    const retrievedBirthDate = birthDate;
    const retrievedBirthProvince = birthProvince?.trim();
    const retrievedBirthDistrict = birthDistrict?.trim();
    const retrievedBirthAdminPost = birthAdminPost?.trim();
    // const retrievedBirthVillage = birthVillage?.trim();
    // const retrievedAddressProvince = addressProvince?.trim();
    // const retrievedAddressDistrict = addressDistrict?.trim();
    const retrievedAddressAdminPost = addressAdminPost?.trim();
    const retrievedAddressVillage = addressVillage?.trim();
    const retrievedPrimaryPhone = primaryPhone;
    const retrievedSecondaryPhone = secondaryPhone;
    const retrievedDocType = docType;
    const retrievedDocNumber = docNumber;
    const retrievedNuit = nuit; 
       
    // validating each data and sending back
    // errorMessages if invalid data is found
    if (!retrievedSurname){
        setErrors({ ...errors,
            surname: 'Apelido do produtor.',
        });
        return false;
    }
    else if (retrievedSurname?.split(' ').length > 1) { 
        setErrors({ ...errors,
            surname: 'Apenas 1 nome como apelido.',
        });
        return false;
    }

    if (!retrievedOtherNames){
        setErrors({ ...errors,
            otherNames: 'Outros nomes do produtor.',
        });
        return false;
    }

    if (!retrievedGender){
        setErrors({ ...errors,
            gender: 'Género do produtor.',
        });
        return false;
    }

    if (!retrievedFamilySize || retrievedFamilySize === 0 || retrievedFamilySize > 30) {
        setErrors({ ...errors, 
            familySize: 'Agregado familiar'
        })
        return false;
    }

    if (!retrievedBirthDate){
        setErrors({ ...errors,
            birthDate: 'Data de nascimento.',
        });
        return false;
    }

    if (!retrievedAddressAdminPost){
        setErrors({ ...errors,
            addressAdminPost: 'Posto Administrativo onde o produtor reside.',
        });
        return false;
    }

    if ( retrievedPrimaryPhone && (
        !Number.isInteger(parseInt(retrievedPrimaryPhone))  || 
        retrievedPrimaryPhone?.toString().length !== 9       ||
        parseInt(retrievedPrimaryPhone.toString()[0]) !== 8 ||
        [2,3,4,5,6,7].indexOf(parseInt(retrievedPrimaryPhone?.toString()[1])) < 0 )
        ) {      
        setErrors({ ...errors,
            primaryPhone: 'Número de telefone inválido.',
        });
        return false;                   
    }

    if ((retrievedSecondaryPhone === 0) || retrievedSecondaryPhone && 
        (
        !Number.isInteger(parseInt(retrievedSecondaryPhone))  || 
        retrievedSecondaryPhone?.toString().length !== 9       ||
        parseInt(retrievedSecondaryPhone?.toString()[0]) !== 8 ||
        [2,3,4,5,6,7].indexOf(parseInt(retrievedSecondaryPhone?.toString()[1])) < 0   
        )
    ){
        setErrors({ ...errors,
            secondaryPhone: 'Número de telefone inválido.',
        });
        return false;               
    }
    if (!retrievedBirthProvince){
        setErrors({ ...errors,
            birthProvince: 'Província onde o produtor nasceu.',
        });
        return false;
    }

    if (!retrievedBirthDistrict){
        const errorMessage = 
            (retrievedBirthProvince === "País Estrangeiro") 
            ? "Indica país onde nasceu."
            : "Indica distrito onde nasceu."

        setErrors({ ...errors,
            birthDistrict: errorMessage,
        });
        return false;
    }

    if (
        !retrievedBirthAdminPost 
        && retrievedBirthProvince !== "País Estrangeiro" 
        && !retrievedBirthDistrict?.includes('Cidade')
        && retrievedBirthProvince !== 'Maputo'
        && !retrievedBirthProvince?.includes('Cidade')
        ){
        setErrors({ ...errors,
            birthAdminPost: 'Posto Administrativo onde o produtor nasceu.',
        });
        return false;
    }


    if (retrievedDocNumber && !retrievedDocType){
        setErrors({ ...errors,
            docType: 'Tipo de documento do produtor.',
        });
        return false;
    }
    else if (!retrievedDocNumber && retrievedDocType){
        setErrors({ ...errors,
            docType: 'Número de documento do produtor.',
        });
        return false;        
    }

    if (retrievedNuit &&
        (
        !Number.isInteger(parseInt(retrievedNuit))  || 
        retrievedNuit?.toString().length !== 9   
        )
        ){
        setErrors({ ...errors,
            nuit: 'NUIT inválido.',
        });
        return false;
    }
    
    // binding all the sanitized and validated data within an object
    // that's returned for persistence's purpose.
    const farmerData = {
        names: {
            surname: retrievedSurname,   
            otherNames: retrievedOtherNames, 
        }, 
        isSprayingAgent: retrievedisSprayingAgent,
        gender: retrievedGender,
        familySize: retrievedFamilySize ? parseInt(retrievedFamilySize) : 0,
        birthDate: retrievedBirthDate, 
        birthPlace: {
            province: retrievedBirthProvince,
            district: retrievedBirthDistrict,
            adminPost: retrievedBirthAdminPost,
            // village: retrievedBirthVillage,
        },
        address: {
            province: "retrievedAddressProvince",
            district: "retrievedAddressDistrict",
            adminPost: retrievedAddressAdminPost,
            village: retrievedAddressVillage,
        },
        contact: {
            primaryPhone: retrievedPrimaryPhone ? parseInt(retrievedPrimaryPhone): 0, 
            secondaryPhone: retrievedSecondaryPhone ? parseInt(retrievedSecondaryPhone): 0,
        },
        idDocument: {
            docType: retrievedDocType ? retrievedDocType : 'Nenhum', 
            docNumber: retrievedDocNumber ? retrievedDocNumber : 'Nenhum', 
            nuit: retrievedNuit ? parseInt(retrievedNuit) : 0,
        }
    }       
    return farmerData;

};

export default validateIndividualFarmerData;