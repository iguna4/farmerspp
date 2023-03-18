
// get the number of trees per hectar by their width and length
const getTreeNumberThreshold = (trees, area, width, length)=>{
    //calculate number of trees by their density (spaces) by hectar
    const estimatedNumberOfTrees = area * (10000 / (width * length));
    const {
        lowerBound, upperBound
    } = treeNumberInterval(trees, width, length)


    // if ((trees >= (estimatedNumberOfTrees - 20)) && (trees <= (estimatedNumberOfTrees + 20) )) {
    //     return true;
    // }    

    if ((area >= lowerBound) && (area <= upperBound)) {
        return true;
    } 
    return false;
};

const treeNumberInterval = (trees, width, length)=>{
    //calculate number of trees by their density (spaces) by hectar
    const estimatedArea = (trees * width * length) / 10000;
    return {
        lowerBound: (estimatedArea - 0.3).toFixed(2),
        upperBound: (estimatedArea + 0.3).toFixed(2),

    }
}


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
 const retrievedUsedArea = !usedArea ? '' : !isNaN(usedArea) ? Number(parseFloat(usedArea).toFixed(2)) : '';
 const retrievedRemainingArea = !remainingArea ? 0 : !isNaN(remainingArea) ? Number(remainingArea.toFixed(2)) : 0;
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
// console.log('here')
 
 if (!retrievedUsedArea){
     setErrors({ ...errors,
         usedArea: 'Indica área.',
     });
     return false;
 }

//  if (retrievedUsedArea){
//     setErrors({ ...errors,
//         usedArea: 'Indica área.',
//     });
//     return false;
// }

 if(retrievedRemainingArea !== 0 && retrievedRemainingArea < retrievedUsedArea) {
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

 if ( retrievedDensityMode === 'Regular' && !getTreeNumberThreshold(retrievedTreesNumber, retrievedUsedArea, retrievedDensityWidth, retrievedDensityLength)) {      
    setErrors({ ...errors,
        usedArea: `Para ${retrievedTreesNumber} cajueiros e compasso de ${retrievedDensityWidth}x${retrievedDensityLength} metros, a área pode variar entre ${treeNumberInterval(retrievedTreesNumber, retrievedDensityWidth, retrievedDensityLength).lowerBound} e ${treeNumberInterval(retrievedTreesNumber, retrievedDensityWidth, retrievedDensityLength).upperBound} hectares.`,
        blockTrees: `Para ${retrievedTreesNumber} cajueiros e compasso de ${retrievedDensityWidth}x${retrievedDensityLength} metros, a área pode variar entre ${treeNumberInterval(retrievedTreesNumber, retrievedDensityWidth, retrievedDensityLength).lowerBound} e ${treeNumberInterval(retrievedTreesNumber, retrievedDensityWidth, retrievedDensityLength).upperBound} hectares.`,
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