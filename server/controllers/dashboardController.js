const Item = require('../model/foodItem');

// GET / dashboard
exports.dashboard=async(req,res)=>{
    const locals={
        title:'Dashboard',
        description:'The dashboard of the FITME application'
    }
    if(req.session.user){
        res.render('dashboard/index', {
            userName:req.session.user,
            locals,
            layout: '../views/layouts/dashboard'
        })
    }else if(req.user){
        res.render('dashboard/index', {
            userName:req.user.displayName,
            locals,
            layout: '../views/layouts/dashboard'
        })
    }
    else{
    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard'
    })}
}

// GET / workouts
exports.pushDay=async(req,res)=>{
    const locals={
        title:'Push Day',
        description:'Push day workout plan page'
    }
    if (req.session.user){
        res.render('dashboard/pushDay', {
            userName:req.session.user,
            locals,
            layout: '../views/layouts/workouts_page'
        })
    }else if(req.user){
        res.render('dashboard/pushDay', {
            userName:req.user.displayName,
            locals,
            layout: '../views/layouts/workouts_page'
        })
    }
    else{
        res.render('dashboard/pushDay', {
            locals,
            layout: '../views/layouts/workouts_page'
        })
    }
}
exports.pullDay=async(req,res)=>{
    const locals={
        title:'Pull Day',
        description:'Pull day workout plan page'
    }
    if (req.session.user){
        res.render('dashboard/pullDay', {
            userName:req.session.user,
            locals,
            layout: '../views/layouts/workouts_page'
        })
    }else if(req.user){
        res.render('dashboard/pullDay', {
            userName:req.user.displayName,
            locals,
            layout: '../views/layouts/workouts_page'
        })
    }
    else{
        res.render('dashboard/pullDay', {
            locals,
            layout: '../views/layouts/workouts_page'
        })
    }
}
exports.legsDay=async(req,res)=>{
    const locals={
        title:'Legs Day',
        description:'Legs day workout plan page'
    }
    if (req.session.user){
        res.render('dashboard/legsDay', {
            userName:req.session.user,
            locals,
            layout: '../views/layouts/workouts_page'
        })
    }else if(req.user){
        res.render('dashboard/legsDay', {
            userName:req.user.displayName,
            locals,
            layout: '../views/layouts/workouts_page'
        })
    }
    else{
        res.render('dashboard/legsDay', {
            locals,
            layout: '../views/layouts/workouts_page'
        })
    }
}

// GET / diet
exports.diet=async(req,res)=>{
    const locals={
        title:'Diet',
        description:'Diet meals page'
    }
    const item = await Item.aggregate([
        { $sort: { updatedAt: 1 } },
        ]); 
    if (req.session.user){
        res.render('dashboard/diet', {
            userName:req.session.user,
            locals,
            item,
            layout: '../views/layouts/diet_page'
        })
    } else if(req.user){
        res.render('dashboard/diet', {
            userName:req.user.displayName,
            locals,
            item,
            layout: '../views/layouts/diet_page'
        })
    }
    else {
        res.render('dashboard/diet', {
            locals,
            item,
            layout: '../views/layouts/diet_page'
        })
    }
}