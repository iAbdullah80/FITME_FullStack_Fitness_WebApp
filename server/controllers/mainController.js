// GET / homepage

exports.homepage=async(req,res)=>{

    const locals={
        title:'Homepage',
        description:'Home page to the FITME application'
    }
    if(req.session.user){
        res.render('index', {
            userName:req.session.user,
            locals,
            layout: '../views/layouts/homePage'
        })
    }else if(req.user){
        res.render('index', {
            userName:req.user.displayName,
            locals,
            layout: '../views/layouts/homePage'
        })
    }
    else{
        res.render('index', {
            locals,
            layout: '../views/layouts/homePage'
        })
    }
}
exports.signup=async(req,res)=>{
    const locals={
        title:'Sign Up',
        description:'Sign up page'
    }
    res.render('signUp', {
        locals,
        layout: '../views/layouts/signup_page'
    })
}
exports.signin=async(req,res)=>{
    const locals={
        title:'Sign In',
        description:'Sign in page'
    }
    res.render('signIn', {
        locals,
        layout: '../views/layouts/signin_page'
    })
}
exports.reset=async(req,res)=>{
    const locals={
        title:'Reset Password',
        description:'Reset password page'
    }
    res.render('resetPassword', {
        locals,
        layout: '../views/layouts/resetPassword_page'
    })
}