
const validateData = (
    {   email, 
        password, 
        passwordConfirm, 
        fullname, 
        primaryPhone,
        secondaryPhone,
        district,
        province  
    }, isLoggingIn, errors, setErrors,
    ) => {
    const retrievedEmail = email.trim();
    const retrievedPassword = password.trim();
   
    if (isLoggingIn) {
        
        if (!retrievedEmail || !retrievedEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            setErrors({ ...errors,
                errorMessage: 'Credenciais inválidas!',
            });
            return false;
        }
        else if ('savedPassword' && 'savedPassword' !== retrievedPassword) { // compare the provided pass with the saved one
            setErrors({ ...errors,
                errorMessage: 'Credenciais inválidas!',
            });
            return false;
        }
        
        return {
            email: retrievedEmail,
            password: retrievedPassword,
        };
    }
    else {
        const retrievedFullname = fullname?.trim();
        const retrievedPasswordConfirm = passwordConfirm?.trim();
        const retrievedPrimaryPhone = primaryPhone?.trim();
        const retrievedSecondaryPhone = secondaryPhone?.trim();
        const retrievedProvince = province?.trim();
        const retrievedDistrict = district?.trim();

        if ((!retrievedFullname) || (retrievedFullname?.split(' ')?.length <= 1)) {
            setErrors({ ...errors,
                fullname: 'Nome não completo.'
            });
            return false;
        } 

        if (!retrievedEmail || !retrievedEmail?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            setErrors({ ...errors,
                email: 'Endereço electrónico inválido.'
            });
            return false;
        }

        if (retrievedPassword !== retrievedPasswordConfirm) {
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

        if (!retrievedPrimaryPhone && !retrievedSecondaryPhone) {
            setErrors({ ...errors,
                primaryPhone: 'Pelo menos um número de telefone.',
            });
            return false;            
        }
        else if ( retrievedPrimaryPhone &&
            (!Number.isInteger(parseInt(retrievedPrimaryPhone))  || 
            retrievedPrimaryPhone?.toString().length !== 9       ||
            parseInt(retrievedPrimaryPhone.toString()[0]) !== 8 ||
            [2,3,4,5,6,7].indexOf(parseInt(retrievedPrimaryPhone?.toString()[1])) < 0)
            ) {      
            setErrors({ ...errors,
                primaryPhone: 'Número de telefone inválido.',
            });
            return false;                   
        }

        if (retrievedSecondaryPhone && 
            (
            !Number.isInteger(parseInt(retrievedSecondaryPhone))  || 
            retrievedSecondaryPhone?.toString().length !== 9       ||
            parseInt(retrievedSecondaryPhone?.toString()[0]) !== 8 ||
            [2,3,4,5,6,7].indexOf(parseInt(retrievedSecondaryPhone?.toString()[1])) < 0   
            )
        ){
            setErrors({ ...errors,
                secondaryPhone: 'Número de telefone inválido.',
            });
            return false;               
        }

        if (!retrievedProvince) {
             setErrors({ ...errors,
                province: 'Indica a província',
            });
            return false;                
        }

        if (!retrievedDistrict) {
             setErrors({ ...errors,
                province: 'Indica o distrito',
            });
            return false;                
        }

        return {
            fullname: retrievedFullname,
            email: retrievedEmail,
            password: retrievedPassword,
            primaryPhone: retrievedPrimaryPhone ? parseInt(retrievedPrimaryPhone) : 0,
            secondaryPhone: retrievedSecondaryPhone ? parseInt(retrievedSecondaryPhone) : 0,
            province: retrievedProvince,
            district: retrievedDistrict,
        };     
    }     
};

export default validateData;