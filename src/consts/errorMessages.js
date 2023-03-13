import { TurboModuleRegistry } from "react-native";

export const errorMessages = {

    blockTreesConformityError : {
        title: 'Inconsistências de Dados dos Cajueiros',
        message: 'O total dos cajueiros não é igual à soma dos cajueiros dos blocos. Se continuares, o presente registo será invalido.',
        logFlag: 'Farmland data inconsistencies',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: 'Corrigir',
        confirmText: 'Continuar',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },

    blockAreaConformityError : {
        title: 'Inconsistências de Dados da Área',
        message: 'A área total é inferior à soma das áreas dos blocos. Se continuares, o presente registo será invalido.',
        logFlag: 'Farmland data inconsistencies',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: 'Corrigir',
        confirmText: 'Continuar',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },


    farmlandError : {
        title: 'Dados Inválidos',
        message: 'Corrija dados não válidos!',
        // logFlag: 'Network request failed',
        showCancelButton: false,
        showConfirmButton: true,
        cancelText: '',
        confirmText: '  OK!  ',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },


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
    },

    resourceValidation: {
        title: 'Validação do Registo',
        message: `Após a validação, não será possível alterar dados associados a este registo. Pretendes validar este registo?`,
        logFlag: 'dataValidation',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: '  Não  ',
        confirmText: '  Sim  ',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },
    resourceInvalidation: {
        title: 'Invalidação do Registo',
        message: `Após a invalidação, o usuário irá alterar dados deste registo para uma revalidação a posterior. Pretendes invalidar o registo?`,
        logFlag: 'dataInvalidation',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: '  Não  ',
        confirmText: '  Sim  ',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    }

    
}