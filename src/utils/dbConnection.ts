import {connect} from "mongoose"
import { config } from "dotenv"
config()

function connectDB(){
    connect(String(process.env.DB_CONNECTION)).then(()=>console.log('nodal-service-db-connected'))
}

export default connectDB