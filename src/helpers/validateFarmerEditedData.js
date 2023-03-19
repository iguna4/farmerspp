

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

const validateIndividualFarmerData = (
    {   

        addressAdminPost,
        addressVillage,
        primaryPhone,
        secondaryPhone,
        docType, docNumber, nuit,  
        addressOldAdminPost,
        addressOldVillage,
        oldPrimaryPhone,
        oldSecondaryPhone,
        oldDocType, oldDocNumber, oldNuit,
    }, errors, setErrors, dataToBeUpdated, resourceName,
    ) => {

    // sanitizing recieved data
     if ( dataToBeUpdated === 'address' && resourceName == 'Farmer') {

      const retrievedAddressAdminPost = addressAdminPost?.trim();
      const retrievedAddressVillage = addressVillage?.trim();

      const retrievedAddressOldAdminPost = addressOldAdminPost?.trim();
      const retrievedAddressOldVillage = addressOldVillage?.trim();

      if (
       (retrievedAddressAdminPost === retrievedAddressOldAdminPost) 
       &&
       (retrievedAddressVillage === retrievedAddressOldVillage)
      
      ) {
       setErrors({
        ...errors,
        addressAdminPost: 'Endereço actual não deve ser igual ao anterior',
        addressVillage: 'Endereço actual não deve se igual ao anterior',
       });

       return false;
      }
      
      
      if (!retrievedAddressAdminPost){
          setErrors({ ...errors,
              addressAdminPost: 'Posto Administrativo onde o produtor reside.',
          });
          return false;
      }
       return {
           adminPost: retrievedAddressAdminPost,
           village: retrievedAddressVillage,
       };
     }

     if ( dataToBeUpdated === 'contact' && resourceName == 'Farmer') {
      const retrievedPrimaryPhone = primaryPhone;
      const retrievedSecondaryPhone = secondaryPhone;

      const retrievedOldPrimaryPhone = oldPrimaryPhone;
      const retrievedOldSecondaryPhone = oldSecondaryPhone;

      if(
       (retrievedPrimaryPhone === retrievedOldPrimaryPhone) 
       &&
       (retrievedSecondaryPhone === retrievedOldSecondaryPhone)
      )
      {
       setErrors({
        ...errors,
        primaryPhone: 'Contacto actual não deve ser igual ao anterior.',
        secondaryPhone: 'Contacto actual não deve ser igual ao anterior.'
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
       return {
           primaryPhone: retrievedPrimaryPhone ? Number(parseInt(retrievedPrimaryPhone)): 0, 
           secondaryPhone: retrievedSecondaryPhone ? Number(parseInt(retrievedSecondaryPhone)): 0,
       };

      
     }

     if ( dataToBeUpdated === 'idDocument' && resourceName == 'Farmer') {
      const retrievedDocType = docType;
      const retrievedDocNumber = docNumber;
      const retrievedNuit = nuit; 

      const retrievedOldDocType = oldDocType;
      const retrievedOldDocNumber = oldDocNumber;
      const retrievedOldNuit = oldNuit; 

      if(
       (retrievedDocType === retrievedOldDocType) 
       &&
       (retrievedDocNumber === retrievedOldDocNumber)
       &&
       (retrievedNuit === retrievedOldNuit)
      )
      {
       setErrors({
        ...errors,
        docType: 'Os documentos actuais não devem ser iguais aos anteriores.',
        docNumber: 'Os documentos actuais não devem ser iguais aos anteriores.',
        nuit: 'Os documentos actuais não devem ser iguais aos anteriores.',
       });
       return false;
      }


      if (retrievedDocNumber && !retrievedDocType){
          setErrors({ ...errors,
              docType: 'Tipo de documento do produtor.',
          });
          return false;
      }
      else if (!retrievedDocNumber && retrievedDocType !== 'Não tem'){
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
      return {
             docType: retrievedDocType ? retrievedDocType : 'Nenhum', 
             docNumber: retrievedDocNumber ? retrievedDocNumber : 'Nenhum', 
             nuit: retrievedNuit ? parseInt(retrievedNuit) : 0,
         }
   
      
     }




};

export default validateIndividualFarmerData;