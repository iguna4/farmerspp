import { capitalize } from "./capitalize";

const validateUserData = (
    {   
        name, 
        email, 
        password, 
        passwordConfirm, 
        phone,
        userDistrict,
        userProvince  
    }, errors, setErrors,
    ) => {

    const retrievedName = capitalize(name?.trim());
    const retrievedEmail = email.trim();
    const retrievedPassword = password?.trim();
    const retrievedPasswordConfirm = passwordConfirm?.trim();
    const retrievedPhone = phone?.trim();
    const retrievedUserDistrict = userDistrict?.trim();
    const retrievedUserProvince = userProvince?.trim();
   
    // if (isLoggingIn) {
        
        if ((!retrievedName) || (retrievedName?.split(' ')?.length <= 1)) {
            setErrors({ ...errors,
                name: 'Nome não completo.'
            });
            return false;
        } 

        // if (!retrievedEmail || !retrievedEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        //     setErrors({ ...errors,
        //         errorMessage: 'Credenciais inválidas!',
        //     });
        //     return false;
        // }
        // else if ('savedPassword' && 'savedPassword' !== retrievedPassword) { // compare the provided pass with the saved one
        //     setErrors({ ...errors,
        //         errorMessage: 'Credenciais inválidas!',
        //     });
        //     return false;
        // }
        
        // return {
        //     email: retrievedEmail,
        //     password: retrievedPassword,
        // };
    // }
    // else {


        if (!retrievedEmail || !retrievedEmail?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            setErrors({ ...errors,
                email: 'Endereço electrónico inválido.'
            });
            return false;
        }

        if (!(retrievedPassword.includes(retrievedPasswordConfirm) && retrievedPasswordConfirm.includes(retrievedPassword))) {
            setErrors({ ...errors,
                password: 'Senhas não iguais.',
                passwordConfirm: 'Senhas não iguais.'
            });
            return false;
        }
        else if (retrievedPassword?.length < 6) {
            setErrors({ ...errors,
                password: 'Pelo menos 6 caracteres.',
            });
            return false;
        }

        if (!retrievedPhone || retrievedPhone === 0) {
            setErrors({ ...errors,
                phone: 'Número de telefone.',
            });
            return false;            
        }
        else if ( retrievedPhone &&
            (!Number.isInteger(parseInt(retrievedPhone))  || 
            retrievedPhone?.toString().length !== 9       ||
            parseInt(retrievedPhone.toString()[0]) !== 8 ||
            [2,3,4,5,6,7].indexOf(parseInt(retrievedPhone?.toString()[1])) < 0)
            ) {      
            setErrors({ ...errors,
                phone: 'Número de telefone inválido.',
            });
            return false;                   
        }

        if (!retrievedUserProvince) {
             setErrors({ ...errors,
                userProvince: 'Indica a província',
            });
            return false;                
        }

        if (!retrievedUserDistrict) {
             setErrors({ ...errors,
                userDistrict: 'Indica o distrito',
            });
            return false;                
        }

        return {
            name: retrievedName,
            email: retrievedEmail,
            password: retrievedPassword,
            phone: retrievedPhone ? parseInt(retrievedPhone) : 0,
            userProvince: retrievedUserProvince,
            userDistrict: retrievedUserDistrict,
        };     
    // }     
};

export default validateUserData;