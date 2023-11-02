import { Schema, model } from 'mongoose'



const nodalSchema: Schema = new Schema({
  address: String,
  pincode: Number,
  channelPartners: Array,
  id: String,
  name: String,
  apex: String,
  employee: Array,
  phone: Number,
  email: String,
  password: String,
  consignmentPrefix:String,
  fdm: {
    sending: {
      type: [String],
      default: [],
    },
    recieved: {
      type: [String],
      default: [],
    },
  }
})

const Model = model('nodal', nodalSchema)
export default Model
