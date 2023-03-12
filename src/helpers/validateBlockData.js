
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

     sameTypeTreesList,
     // farmer,

 }, errors, setErrors,
 ) => {
 const retrievedPlantingYear = plantingYear ? parseInt(plantingYear) : ''; 
 const retrievedDensityMode = isDensityModeRegular ? 'Regular' : isDensityModeIrregular ?  'Irregular' : '';
 const retrievedTreesNumber = blockTrees ? parseInt(blockTrees) : '';
 const retrievedUsedArea = usedArea ? parseFloat(usedArea): '';
 const retrievedDensityLength = densityLength ? parseInt(densityLength) : 0;
 const retrievedDensityWidth = densityWidth ? parseInt(densityWidth): 0;
 const retrievedPlantTypes = [...plantTypes];
 const retrievedClones = [...clones];
 const retrievedSameTypeTreesList = [...sameTypeTreesList];
    
 if (!retrievedPlantingYear){
     setErrors({ ...errors,
         plantingYear: 'Selecciona ano de plantio',
     });
     return false;
 }
 

 if (!retrievedUsedArea){
     setErrors({ ...errors,
         usedArea: 'Indica área total.',
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
//  else if (            
//      retrievedPlantTypes.some(el=>el.includes('enxert')) 
//  &&  retrievedClones?.length > 1 && retrievedClones.find((clone)=>clone.includes('Desconhecido'))
//  ) {
//      setErrors({ ...errors,
//          clones: 'Clones seleccionados inválidos.',
//      });
//      return false;
//  }


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
 console.log('sumOfTrees:', sumOfTrees);
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
     // farmer: retrievedFarmerId,
 }
     
 return farmlandData;

};

export default validateBlockData;