
export const errorMessages = {

    farmlandAndBlockConformity : {
        title: 'Dados Inconsistentes',
        message: 'O total dos cajueiros e a área do pomar não correspondem com os dados desta parcela.',
        logFlag: 'Farmland data inconsistencies',
        showCancelButton: false,
        showConfirmButton: true,
        cancelText: '',
        confirmText: '  OK  ',
        // invalidationMessage: 'O sistema invalidou este registo porque verificou-se a inconsistência entre o total dos cajueiros e a soma dos cajueiros dos blocos.',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },

    blockTreesConformityError : {
        title: 'Parcelas com cajueiros',
        message: 'O registo das parcelas com cajueiros não terminou ainda. Pretendes adicionar outra parcela?',
        logFlag: 'Farmland data inconsistencies',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: '  Não  ',
        confirmText: '  Sim  ',
        invalidationMessage: 'Connect Caju detectou que este pomar tem parcelas de cajueiros que não foram registadas e incentiva o usuário a completar o registo, adicionando mais parcelas com cajueiros.',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },

    farmlandWithNoBlockError : {
        title: 'Parcelas com cajueiros',
        message: 'Este pomar não tem ainda parcelas de cajueiros. Pretendes adicionar parcela?',
        logFlag: 'Farmland with no blocks',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: '  Não  ',
        confirmText: '  Sim  ',
        invalidationMessage: 'Connect Caju detectou que este pomar possui dados incompletos e incetiva o usuário a completar o registo, adicionando dados sobre as parcelas deste pomar.',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },


    blockAreaConformityError : {
        title: 'Área do pomar',
        message: 'A área total é inferior à soma das áreas das parcelas. Pretendes corrigir essa inconsistência?',
        logFlag: 'Farmland data inconsistencies',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: '  Não  ',
        confirmText: '  Sim  ',
        invalidationMessage: 'Connect Caju detectou que a área total deste pomar é inferior à soma das áreas das parcelas e incentiva o usuário a corrigir os dados, rectificando a área por parcela com cajueiros.',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },


    farmlandError : {
        title: 'Dados Inválidos',
        message: 'Corrija dados não válidos!',
        // logFlag: 'Network request failed',
        showCancelButton: true,
        showConfirmButton: false,
        cancelText: '  OK  ',
        confirmText: '',
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
        confirmText: '  OK  ',
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
        confirmText: '  OK  ',
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
        confirmText: '  OK  ',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },
    signUp: {
        title: 'Credenciais Reconhecidas',
        message: 'Já tens uma conta. Fazer o login?',
        logFlag: 'name already in use',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: '  Não  ',
        confirmText: '  Sim  ',
        onCancelPressed: ()=>{},
        onConfirmPressed: ()=>{},
    },
    addPhoto: {
        title: 'Fotografia',
        message: 'Pretendes carregar uma nova fotografia?',
        logFlag: 'photo',
        showCancelButton: true,
        showConfirmButton: true,
        cancelText: '  Não  ',
        confirmText: '  Sim  ',
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