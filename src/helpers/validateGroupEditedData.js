

import { assetTypes } from "../consts/assetTypes";
import categories from "../consts/categories";
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

const validateGroupEditedData = (
    {   

        groupNuit, oldGroupNuit,
        groupLicence, oldGroupLicence,
        groupManagerName, oldGroupManagerName,
        groupManagerPhone, oldGroupManagerPhone,
    }, errors, setErrors, dataToBeUpdated, resourceName,
    ) => {

    // sanitizing recieved data
    if (dataToBeUpdated === 'groupManager' && resourceName === 'Group') {

        const retrievedGroupManagerName = groupManagerName ? capitalize(groupManagerName?.trim()) : '';
        const retrievedGroupManagerPhone = groupManagerPhone ? Number(parseInt(groupManagerPhone)) : 0;

        const retrievedOldGroupManagerName = oldGroupManagerName ? capitalize(oldGroupManagerName?.trim()) : '';
        const retrievedOldGroupManagerPhone = oldGroupManagerPhone ? Number(parseInt(oldGroupManagerPhone)) : 0;

        if ((retrievedGroupManagerName === retrievedOldGroupManagerName) 
            &&
            (retrievedGroupManagerPhone === retrievedOldGroupManagerPhone)
        ){
            setErrors({
                ...errors,
                groupManagerName: 'O nome do responsável actual não deve ser igual ao do anterior.',
                groupManagerPhone: 'O Número de telefone actual não deve ser igual ao anterior.'
            });
            return false;
        }

        if (!retrievedGroupManagerName && retrievedOldGroupManagerName) {
            setErrors({
                ...errors,
                groupManagerName: 'Indica um novo nome ou mantenha o anterior.'
            });
            return false;
        } 

        if (!retrievedGroupManagerPhone && retrievedOldGroupManagerPhone) {
            setErrors({
                ...errors,
                groupManagerPhone: 'Indica um novo número ou mantenha o anterior.'
            });
            return false;
        } 

        if ( retrievedGroupManagerPhone && (
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

        return {
            fullname: retrievedGroupManagerName,
            phone: retrievedGroupManagerPhone,
        };
    
    }





    // if ( dataToBeUpdated === 'institutionDocument' && resourceName == 'Institution') {

    //   const retrievedInstitutionNuit = institutionNuit ?  Number(parseInt(institutionNuit)) : 0;
    //   const retrievedInstitutionLicence = institutionLicence ? institutionLicence?.trim(): '';

    //   const retrievedOldInstitutionNuit = oldInstitutionNuit ? Number(parseInt(oldInstitutionNuit)) : 0;
    //   const retrievedOldInstitutionLicence = oldInstitutionLicence ? oldInstitutionLicence.trim() : '';

    //   if (
    //    (retrievedInstitutionNuit === retrievedOldInstitutionNuit) 
    //    &&
    //    (retrievedInstitutionLicence === retrievedOldInstitutionLicence)
      
    //   ) {
    //    setErrors({
    //     ...errors,
    //     institutionNuit: 'O NUIT actual não deve ser igual ao anterior',
    //     institutionLicence: 'O alvará actual não deve se igual ao anterior',
    //    });

    //    return false;
    //   }

    //   if (!retrievedInstitutionNuit && retrievedOldInstitutionNuit) {
    //     setErrors({
    //         ...errors,
    //         institutionNuit: 'Indica um novo NUIT ou mantenha o anterior.'
    //     });
    //     return falase;
    //   }


    //   if (!retrievedInstitutionLicence && retrievedOldInstitutionLicence) {
    //     setErrors({
    //         ...errors,
    //         institutionNuit: 'Indica um novo alvará ou mantenha o anterior.'
    //     });
    //     return falase;
    //   }

    //   if (retrievedInstitutionNuit &&
    //     (
    //     !Number.isInteger(parseInt(retrievedInstitutionNuit))  || 
    //     retrievedInstitutionNuit?.toString().length !== 9   
    //     )
    //     ){
    //     setErrors({ ...errors,
    //         institutionNuit: 'NUIT inválido.',
    //     });
    //     return false;
    // }

    // return {
    //        nuit: retrievedInstitutionNuit ? retrievedInstitutionNuit : 0, 
    //        licence: retrievedInstitutionLicence ? retrievedInstitutionLicence : '', 
    //    }
      
      
    //  }

    //  if ( dataToBeUpdated === 'idDocument' && resourceName == 'Farmer') {
    //   const retrievedDocType = docType;
    //   const retrievedDocNumber = docNumber;
    //   const retrievedNuit = nuit; 

    //   const retrievedOldDocType = oldDocType;
    //   const retrievedOldDocNumber = oldDocNumber;
    //   const retrievedOldNuit = oldNuit; 

    //   if(
    //    (retrievedDocType === retrievedOldDocType) 
    //    &&
    //    (retrievedDocNumber === retrievedOldDocNumber)
    //    &&
    //    (retrievedNuit === retrievedOldNuit)
    //   )
    //   {
    //    setErrors({
    //     ...errors,
    //     docType: 'Os documentos actuais não devem ser iguais aos anteriores.',
    //     docNumber: 'Os documentos actuais não devem ser iguais aos anteriores.',
    //     nuit: 'Os documentos actuais não devem ser iguais aos anteriores.',
    //    });
    //    return false;
    //   }


    //   if (retrievedDocNumber && !retrievedDocType){
    //       setErrors({ ...errors,
    //           docType: 'Tipo de documento do produtor.',
    //       });
    //       return false;
    //   }
    //   else if (!retrievedDocNumber && retrievedDocType !== 'Não tem'){
    //       setErrors({ ...errors,
    //           docType: 'Número de documento do produtor.',
    //       });
    //       return false;        
    //   }
  
      
   
      
    //  }




};

export default validateGroupEditedData;