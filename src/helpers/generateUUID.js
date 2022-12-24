
export const generateUUID = ({
    birthDate, surname, birthAdminPost 
})=>{

    let eigthRandomDigits = '';
    for (let i = 0; i < 8; i++) {
        const newNumber = (Math.floor(Math.random() * 100) + 100) % 10;
        eigthRandomDigits = eigthRandomDigits + newNumber;
    }
    return `${surname}-${birthDate}-${birthAdminPost}-${eigthRandomDigits}`;
}