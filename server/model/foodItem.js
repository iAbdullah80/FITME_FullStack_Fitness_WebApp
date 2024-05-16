const mongoose=require('mongoose')

const foodItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    calories:{
        type:Number,
        required:true
    },
    fat:{
        type:Number,
        required:true
    },
    protein:{
        type:Number,
        required:true
    },
    carbs:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});

const FoodItem=mongoose.model('FoodItem', foodItemSchema)

module.exports=FoodItem