
// update coordinates by their position
export const updateCoordinates = (coordinates, point, position=-1)=>{
    
    // sort coordinates by their position
    const sortCoordinates = (coordinates)=>{
        return coordinates.sort((a, b)=>a.position - b.position);
    }

    let updatedCoordinates = [];

    // check to find it the position already exists
    let foundPoint = coordinates.find((p)=>p?.position == position);

    // update the coordinates if that position already exists
    if (foundPoint) {
        updatedCoordinates = coordinates.map((p)=>{
            if (p.position == foundPoint.position) {
                p.latitude = point.latitude;
                p.longitude = point.longitude;
            }
            return p;
        })
    }
    else {
        // just assign the same coordinates if the position was not found
        updatedCoordinates = [...coordinates, point];
    }
    // return a sorted array of coordinates
    return sortCoordinates(updatedCoordinates);
}
