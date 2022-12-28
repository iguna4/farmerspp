

export const addFarmland = async (farmlandData, realm)=>{
        const {
        plantingYear, 
        description,
        consociatedCrops,
        density,
        trees,
        declaredArea,
        plantTypes,
        farmerId,
    } = farmlandData;

    // find farmer by they primaryKey
    const farmer = realm.objectForPrimaryKey('Farmer', farmerId);

    if (!farmer) {
        return {
            status: 'FAILED',
            code: 404,
            message: 'O proprietário desta parcela ainda não foi registado!',
        };
    }

    try {
        await realm.write(()=>{
            const newFarmland = realm.create('Farmland', {
                _id: uuidv4(),
                plantingYear,
                description,
                consociatedCrops,
                density,
                trees,
                declaredArea,
                plantTypes,
                farmer: farmer._id,
            })
            farmer.farmlands.push(newFarmland);
            console.log('updatedfarmer:', farmer);
        })
        
    } catch (error) {
        console.log('something went wrong');
        return ;
    }



}