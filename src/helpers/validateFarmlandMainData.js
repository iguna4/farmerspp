
const validateFarmlandMainData = (
 {   
     description, 
     consociatedCrops, 
     trees,
     totalArea,
 }, errors, setErrors,
 ) => {
 const retrievedFarmlandDescription = description?.trim();
 const retrievedConsociatedCrops = [...consociatedCrops];
 const retrievedTreesNumber = trees ? parseInt(trees) : '';
 const retrievedTotalArea = totalArea ? parseFloat(totalArea): '';

 if (!retrievedFarmlandDescription) { 
     setErrors({ ...errors,
         description: 'Descreva a localização deste pomar.',
     });
     return false;
 }

 if (retrievedConsociatedCrops.length === 0) { 
     setErrors({ ...errors,
         consociatedCrops: 'Selecciona culturas consociadas.',
     });
     return false;
 }
 else if(retrievedConsociatedCrops.find((crop)=>crop.includes('Nenhuma')) && retrievedConsociatedCrops.length > 1){
     setErrors({ ...errors,
         consociatedCrops: 'Culturas seleccionadas inválidas.',
     });
     return false;
 } 

 if (!retrievedTreesNumber){
     setErrors({ ...errors,
         trees: 'Indica número de cajueiros.',
     });
     return false;
 }

 if (!retrievedTotalArea){
     setErrors({ ...errors,
         declaredArea: 'Área total.',
     });
     return false;
 }

 const farmlandMainData = {
     description: retrievedFarmlandDescription,
     consociatedCrops: [...retrievedConsociatedCrops],
     trees: retrievedTreesNumber,
     totalArea: retrievedTotalArea,
 }
     
 return farmlandMainData;

};

export default validateFarmlandMainData;