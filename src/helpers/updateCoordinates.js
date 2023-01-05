
export const getPosition = (coordinates) =>{
    const length = coordinates.length + 1;
    for (let i = 1; i <= length; i++) {
        const position = coordinates.find(p=>p.position == i);
        if (!position){
            return i;
        }
    }
    return length;
} 

// sort coordinates by their position
const sortCoordinates = (coordinates)=>{
    return coordinates.sort((a, b)=>a.position - b.position);
}

// update/delete coordinates by their position
export const updateCoordinates = (extremeCoordinates, point, position=-1, flag="update")=>{
    
    let updatedCoordinates = [...extremeCoordinates];
    // console.log('existingCoordinates:', JSON.stringify(updatedCoordinates));
    if (flag === 'update'){
        // console.log('position:', position)
        // check to find it the position already exists
        let foundPoint = updatedCoordinates.find((p)=>p?.position == position);


        // update the coordinates if that position already exists
        if (foundPoint) {
            updatedCoordinates = updatedCoordinates.map((p)=>{
                if (p.position == foundPoint.position) {
                    // console.log('here the point: ', point)
                    p = Object.assign({}, point);
                }
                return p;
            })
        }
        else {
            // just assign the same coordinates if the position was not found
            updatedCoordinates = [...updatedCoordinates, point];
        }

        // console.log('updatedCoordinates:', JSON.stringify(updatedCoordinates));
        // return a sorted array of coordinates
    }
    else if (flag === 'delete') {
        updatedCoordinates = updatedCoordinates.filter((coords)=>coords.position != position);
        // console.log('deletingCoordinates:', JSON.stringify(updatedCoordinates));
        // delete coordinates
        // return 
    }
    return sortCoordinates(updatedCoordinates);
}

