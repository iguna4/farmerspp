import { sumTreesOrAreas } from "./sumTreesOrAreas"


export const categorizeFarmer = (farmlands)=> {

    const trees = sumTreesOrAreas(farmlands, 'trees');
    const declaredAreas = sumTreesOrAreas(farmlands, 'declaredAreas');

    console.log('trees:', trees);
    console.log('areas:', declaredAreas);

    if (trees >= 250) {
        return 'Comercial';
    }
    else if (trees > 0 && trees < 250) {
        return 'Familiar'
    }
    else if (declaredAreas >= 5) {
        return 'Comercial';
    }
    else if (declaredAreas > 0 && declaredAreas < 5){
         return 'Familiar';
    }
    else {
        return 'Não-categorizado'
    }
}