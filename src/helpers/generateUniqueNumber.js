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


 const secondDigit = birthPlaceCode.substr(1, 1);
 const fourthDigit = birthPlaceCode.substr(3, 1);
 const timestamp = JSON.stringify(Date.now()).substr(-4, 4);
 const random = JSON.stringify(Math.floor(Math.random() * 1000000)); // generate a random number between 0 and 999999
 const uniqueNumber = Number(`${timestamp}${random}`.substr(0, 6)); // combine the timestamp and random number and take the first 9 digits
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

 return `${categoryNumber}${secondDigit}${fourthDigit}${uniqueNumber}`;
}
