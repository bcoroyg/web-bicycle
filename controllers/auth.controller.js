export const get_login = (req, res) => {
    return res.render('auth/login', {
        title:"Iniciar sesión",
        errors: {}
    });
};

export const get_create_account = async  (req, res) => {
    return res.render('auth/create-account', { 
        title: 'Crear cuenta',
        errors: {}
    });
};