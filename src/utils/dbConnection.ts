import {connect} from "mongoose"


function connectDB(){
    const dbLink:string = process.env.DB_CONNECTION  || "mongodb://127.0.0.1:27017/nodal-service"
    connect(dbLink).then(()=>console.log('nodal-service-db-connected'))
}

export default connectDB