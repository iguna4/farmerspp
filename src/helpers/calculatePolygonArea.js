

// calculate the area from the latitude and longitude points
// @params: points (an area of objects where properties are lat and lng)
export const calculatePolygonArea = (points)=>{

 // make sure the array has at least 3 points
 if (points.length < 3) {
  return 0;
 }
 
 const earthRadiusKm = 6371; // Radius of the earth in kilometers
 let area = 0;

 // convert latitude and longitude points from degrees to radians
 const radiansArray = points.map((point)=>{
  return {
   lat: point.lat * Math.PI / 180,
   lng: point.lng * Math.PI / 180,
  };
 });

 // calculate the area using the shoelece formula
 for (let i = 0; i < radiansArray.length - 1; i++) {
  const p1 = radiansArray[i];
  const p2 = radiansArray[i + 1];
  area += (p2.lng - p1.lng) * (2 + Math.sin(p1.lat) + Math.sin(p2.lat));
 }

 // Add the area for the last point and the first point
 const p1 = radiansArray[radiansArray.length - 1];
 const p2 = radiansArray[0];
 area += (p2.lng - p1.lng) * (2 + Math.sin(p1.lat) + Math.sin(p2.lat));

 //  divide the result by 2 and the earth's radius to get the area in square kilometers
 area = Math.abs(area * earthRadiusKm * earthRadiusKm / 2);

 // convert the square kilometers to hectares and return the final result
 return area * 100;

}