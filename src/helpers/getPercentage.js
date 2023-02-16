
export const getPercentage = (num1, num2)=>{

    const newNum1 = parseInt(num1);
    const newNum2 = parseInt(num2);
    const percent = (newNum1 / num2) * 100;
    return percent.toFixed(2);

}