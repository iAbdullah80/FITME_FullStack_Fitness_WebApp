exports.authenticated = (req, res, next) => {
    if (req.session.user){
        res.redirect('/dashboard');
    }
    else{
        next();
    }
}

exports.adminAuthenticatedForLogin = (req, res, next) => {
    try{
        if (req.session.user.role === 'admin'){
            res.redirect('/admin/dashboard');
        }
        else{
            next();
            
        }
    }
    catch{
        next();

    }
}

exports.adminAuthenticatedForDashboard = (req, res, next) => {
    try{
        if (req.session.user.role === 'admin'){
            next();
        }
        else{
            res.redirect('/admin/signin');

        }
    }
    catch{
        res.redirect('/admin/signin');
    }
}