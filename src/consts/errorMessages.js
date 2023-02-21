
export const errorMessages = {

    
    network: {
        title: 'Conexão Internet',
        message: 'Verifique a sua Internet!',
        logFlag: 'Network request failed',
        showCancelButton: false,
        showConfirmButton: true,
        cancelText: '',
        confirmText: '  OK!  ',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },
    server: {
        title: 'Erro do serviço',
        message: 'O servidor não respondeu positivamente. Volte a tentar mais tarde!',
        logFlag: 'Host',
        showCancelButton: false,
        showConfirmButton: true,
        cancelText: '',
        confirmText: '  OK!  ',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },
    signIn: {
        title: 'Credenciais Inválidas',
        message: 'O endereço electrónico ou a senha  inválido!',
        logUsernameFlag: 'username',
        logPasswordFlag: 'password',
        showCancelButton: false,
        showConfirmButton: true,
        cancelText: '',
        confirmText: '  OK!  ',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },
    signUp: {
        title: 'Credenciais Reconhecidas',
        message: 'Já tens uma conta. Fazer o login?',
        logFlag: 'name already in use',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: '  Não!  ',
        confirmText: '  Sim!  ',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },
    addPhoto: {
        title: 'Fotografia',
        message: 'Pretendes carregar uma nova fotografia?',
        logFlag: 'photo',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: '  Não!  ',
        confirmText: '  Sim!  ',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    }

    
}