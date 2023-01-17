
const validateFarmlandData = (
    {   plantingYear, 
        description, 
        consociatedCrops, 
        trees,
        declaredArea,
        densityMode,
        densityLength,
        densityWidth,
        plantTypes,
        clones,
        // farmer,
 
    }, errors, setErrors,
    ) => {
    const retrievedPlantingYear = plantingYear ? parseInt(plantingYear) : ''; 
    const retrievedFarmlandDescription = description?.trim();
    const retrievedConsociatedCrops = [...consociatedCrops];
    const retrievedTreesNumber = trees ? parseInt(trees) : '';
    const retrievedDeclaredArea = declaredArea ? parseFloat(declaredArea): '';
    const retrievedDensityMode = densityMode?.trim();
    const retrievedDensityLength = densityLength ? parseInt(densityLength) : 0;
    const retrievedDensityWidth = densityWidth ? parseInt(densityWidth): 0;
    const retrievedPlantTypes = [...plantTypes];
    const retrievedClones = [...clones];
    // const retrievedFarmerId = farmer._id;

       
    if (!retrievedPlantingYear){
        setErrors({ ...errors,
            plantingYear: 'Selecciona ano de plantio',
        });
        return false;
    }

    if (!retrievedFarmlandDescription) { 
        setErrors({ ...errors,
            description: 'Descreva a localização deste pomar.',
        });
        return false;
    }

    if (!retrievedTreesNumber){
        setErrors({ ...errors,
            trees: 'Indica número de cajueiros.',
        });
        return false;
    }

    if (!retrievedDeclaredArea){
        setErrors({ ...errors,
            declaredArea: 'Área declarada.',
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
            densityMode: 'Indica comprimento e largura.',
        });
        return false;
    }

    if ( retrievedDensityMode === 'Regular' && (
        ( retrievedDensityLength > 20 ||  retrievedDensityWidth > 20 ) 
        ||  
        ( retrievedDensityLength < 5 ||  retrievedDensityWidth < 5 ))
        ) {      
        setErrors({ ...errors,
            densityMode: 'Comprimento e Largura inválidos.',
        });
        return false;                   
    }

    if (retrievedPlantTypes?.length === 0 ){
        setErrors({ ...errors,
            plantTypes: 'Selecciona o tipo de plantio.',
        });
        return false;               
    }
    // else if (
    //         retrievedPlantTypes.some(el=>el.includes('enxert')) 
    //     &&  retrievedClones?.length === 0
    //     ){
    //     setErrors({ ...errors,
    //         plantTypes: 'Selecciona clones.',
    //     });
    //     return false;
    // }


    const farmlandData = {
        plantingYear: retrievedPlantingYear, 
        description: retrievedFarmlandDescription,
        consociatedCrops: [...retrievedConsociatedCrops],
        density: {
            mode: retrievedDensityMode,
            length: retrievedDensityLength,
            width: retrievedDensityWidth,
        },
        trees: retrievedTreesNumber,
        declaredArea: retrievedDeclaredArea,
        plantTypes: {
            plantType: retrievedPlantTypes,
            clones: retrievedClones,
        },
        // farmer: retrievedFarmerId,
    }
        
    return farmlandData;

};

export default validateFarmlandData;