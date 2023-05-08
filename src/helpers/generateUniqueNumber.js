import { actorCategory } from "../consts/actorCategories";
import { ceps } from "../consts/ceps";

export const generateUniqueNumber = (birthPlace, category) => {

 let birthPlaceCode;
 if (
     birthPlace?.province?.includes('Estrangeiro') || 
     birthPlace?.province === 'Maputo' || 
     birthPlace?.district?.includes('Cidade')
 ) {
     birthPlaceCode = ceps[`${birthPlace?.district}`]
 }
 else if (birthPlace?.province?.includes('Cidade')) {
     birthPlaceCode = ceps[`${birthPlace?.province}`]
 }
 else  {
     birthPlaceCode = ceps[`${birthPlace?.adminPost}`]
 }


 let secondDigit = birthPlaceCode.substr(1, 1);
 let fourthDigit = birthPlaceCode.substr(3, 1);
 let timestamp = JSON.stringify(Date.now()).substr(-5, 4);
 let random = JSON.stringify(Math.floor(Math.random() * 100000000)); // generate a random number between 0 and 999999
 let uniqueNumber = Number(`${timestamp}${random}`.substr(0, 6)); // combine the timestamp and random number and take the first 9 digits
 let categoryNumber;
 
 // console.log('random:', random);
 // console.log('timestamp:', timestamp);
 // console.log('secondDigit:', secondDigit);
 // console.log('fourthDigit', fourthDigit);
 if(category === actorCategory.single){
  categoryNumber = '1';
 }
 else if (category === actorCategory.organization) {
  categoryNumber = '2';
 }
 else if (category === actorCategory.company){
  categoryNumber = '3';
 }
 else if (category === actorCategory.processor){
  categoryNumber = '3';
 }
 else {
  categoryNumber = '7';
 }

 let identifier = `${categoryNumber}${secondDigit}${fourthDigit}${uniqueNumber}`;
 while(identifier.length !== 9){

    const newRandom = JSON.stringify(Math.floor(Math.random() * 1000000)); // generate a random number between 0 and 999999
    identifier = `${identifier}${newRandom}`.substr(0, 9);

 }

 return identifier
}
