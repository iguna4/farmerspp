
const validateBlockData = (
 {   plantingYear, 
     // description, 
     // consociatedCrops, 
     blockTrees,
     // declaredArea,
     usedArea,
     isDensityModeRegular,
     isDensityModeIrregular,
     // totalArea,
     // densityMode,
     densityLength,
     densityWidth,
     plantTypes,
     clones,
     remainingArea,

     sameTypeTreesList,
     // farmer,

 }, errors, setErrors,
 ) => {
 const retrievedPlantingYear = plantingYear ? parseInt(plantingYear) : ''; 
 const retrievedDensityMode = isDensityModeRegular ? 'Regular' : isDensityModeIrregular ?  'Irregular' : '';
 const retrievedTreesNumber = blockTrees ? parseInt(blockTrees) : '';
 const retrievedUsedArea = usedArea ? parseFloat(usedArea): '';
 const retrievedRemainingArea = remainingArea ? parseFloat(remainingArea) : '';
 const retrievedDensityLength = densityLength ? parseInt(densityLength) : 0;
 const retrievedDensityWidth = densityWidth ? parseInt(densityWidth): 0;
 const retrievedPlantTypes = [...plantTypes];
 const retrievedClones = [...clones];
 const retrievedSameTypeTreesList = [...sameTypeTreesList].map(object=>{
    return {
        treeType: object?.treeType,
        trees: parseInt(object?.trees),
    }
 });
    
 if (!retrievedPlantingYear){
     setErrors({ ...errors,
         plantingYear: 'Selecciona ano de plantio',
     });
     return false;
 }
 

 if (!retrievedUsedArea){
     setErrors({ ...errors,
         usedArea: 'Indica área.',
     });
     return false;
 }

 if(retrievedRemainingArea !== '' && retrievedRemainingArea < retrievedUsedArea) {
    setErrors({
        ...errors,
        usedArea: 'Área aproveitada é superior a área disponível.'
    });
    return false;
 }


 if (!retrievedTreesNumber){
     setErrors({ ...errors,
         blockTrees: 'Indica número de cajueiros.',
     });
     return false;
 }


 if (retrievedPlantTypes?.length === 0 ){
     setErrors({ ...errors,
         plantTypes: 'Selecciona o tipo de plantas.',
     });
     return false;               
 }
 else if (
         retrievedPlantTypes.some(el=>el.includes('enxert')) 
     &&  retrievedClones?.length === 0
     ){
     setErrors({ ...errors,
         clones: 'Selecciona clones.',
     });
     return false;
 }


 if (!retrievedDensityMode){
     setErrors({ ...errors,
         densityMode: 'Indica o compasso',
     });
     return false;
 }

 if (retrievedDensityMode === 'Regular' && (retrievedDensityLength === '' || retrievedDensityWidth === '')){
     setErrors({ ...errors,
         density: 'Indica comprimento e largura.',
     });
     return false;
    }

 if ( retrievedDensityMode === 'Regular' && (
     ( retrievedDensityLength > 20 ||  retrievedDensityWidth > 20 ) 
     ||  
     ( retrievedDensityLength < 5 ||  retrievedDensityWidth < 5 ))
     ) {      
     setErrors({ ...errors,
         density: 'Comprimento e Largura inválidos.',
     });
     return false;                   
 }

 const sumOfTrees = retrievedSameTypeTreesList.map(object=>parseInt(object?.trees)).reduce((acc, el)=>acc + el, 0);

 if (sumOfTrees !== retrievedTreesNumber){
    setErrors({
        ...errors,
        sameTypeTrees: 'A soma dos tipos de plantas não é igual ao total dos cajueiros deste bloco.'
    });

    return false;
 }



 const farmlandData = {
     plantingYear: retrievedPlantingYear, 
     // description: retrievedFarmlandDescription,
     // consociatedCrops: [...retrievedConsociatedCrops],
     density: {
         mode: retrievedDensityMode,
         length: retrievedDensityLength,
         width: retrievedDensityWidth,
     },
     trees: retrievedTreesNumber,
     usedArea: retrievedUsedArea,
     // totalArea: retrievedTotalArea,
     plantTypes: {
         plantType: retrievedPlantTypes,
         clones: retrievedClones,
     },
     sameTypeTrees: retrievedSameTypeTreesList,
     // farmer: retrievedFarmerId,
 }
     
 return farmlandData;

};

export default validateBlockData;