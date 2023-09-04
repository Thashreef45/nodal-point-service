import {Schema,model} from 'mongoose'



const nodalSchema : Schema = new Schema({
    address:{
        pincode:Number,
        address:String
    },
    channelPartners : Array,
    id:String,
    name:String,
    apex:String,
    employee:Array,
    phone:Number,
    email:String,
    password:String,
    fdm:Array
})

const Model = model('nodal',nodalSchema)
export default Model
