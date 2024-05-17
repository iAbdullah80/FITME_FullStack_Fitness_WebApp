const FoodItem = require('../model/foodItem');
const User = require('../model/User');

// GET / adminDashboard
exports.adminDashboard=async(req,res)=>{
    const name = req.session.user.displayName;
    const item = await FoodItem.aggregate([
        { $sort: { updatedAt: 1 } },
        ]); 
    const locals={
        title:'Admin Dashboard',
        description:'Admin dashboard page'
    }
    res.render('admin/dashboard', {
        locals,
        item,
        name,
        layout: '../views/layouts/admin'
    })
}

// GET / adminLogin
exports.adminLogin=async(req,res)=>{
    const locals={
        title:'Admin signin',
        description:'Admin signin page'
    }
    res.render('admin/signin', {
        locals,
        layout: '../views/layouts/adminSignin'
    })
}

// POST / adminLogin
exports.adminLoginPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (!user.isAdmin) {
            return res.status(401).json({ message: 'User is not an admin' });
        }

        req.session.user ={ 'id':user._id, 'displayName': user.name, 'role': user.role};
        res.status(200).json({ message: 'Admin logged in' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error, could not login' });
    }
};

// GET / add item
exports.addItem=async(req,res)=>{
    const locals={
        title:'Add Item',
        description:'Add item page'
    }
    res.render('admin/add', {
        locals,
        layout: '../views/layouts/adminAddItem'
    })
}

// POST / add item
exports.addItemPost=async(req,res)=>{
    const { name, weight, calories, fat, carbs, protein, image } = req.body;
    try{
        const foodItem = new FoodItem({
            name,
            weight,
            calories,
            fat,
            carbs,
            protein,
            image
        });
        await foodItem.save();
        console.log('Item added successfully');
        res.redirect('/admin/dashboard');
    }
    catch(error){
        res.status(500).json({ message: 'Internal Server Error, could not add item' });
    }
}

// GET / edit item
exports.editItem=async(req,res)=>{
    const locals={
        title:'Edit Item',
        description:'Edit item page'
    }
    const itemId = req.params.id;
    const item = await FoodItem.findById(req.params.id);
    res.render('admin/edit', {
        locals,
        item,
        itemId,
        layout: '../views/layouts/adminEditItem'
    })
}

// PUT / edit item
exports.editItemPut=async(req,res)=>{
    const { name, weight, calories, fat, carbs, protein, image } = req.body;
    try{
        await FoodItem.findByIdAndUpdate(req.params.id, {
            name,
            weight,
            calories,
            fat,
            carbs,
            protein,
            image
        });
        console.log('Item updated successfully');
        res.redirect('/admin/dashboard');
    }
    catch(error){
        res.status(500).json({ message: 'Internal Server Error, could not update item' });
    }
}

// DELETE / delete item
exports.deleteItem=async(req,res)=>{
    try{
        await FoodItem.findByIdAndDelete(req.params.id);
        console.log('Item deleted successfully');
        res.redirect('/admin/dashboard');
    }
    catch(error){
        res.status(500).json({ message: 'Internal Server Error, could not delete item' });
    }
}