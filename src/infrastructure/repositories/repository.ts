import connectDB from "../../utils/dbConnection";
import Model from "../../domain/entities/nodalModel";
connectDB()

export default {
    findNodal: async (id: string) => {
        return await Model.findOne({ id: id })
    },
    
    createNodal: async (data: {id:string,phone:number,email:string,password:string,apex:string,address:{address:string,pincode:number}}) => {
        const { id, phone, email, password, apex ,address} = data
        const newNodal = new Model({
            id, phone, email, password, apex , 
            address : {address:address.address,pincode:address.pincode}
        })
        await newNodal.save()
        return data
    }
}



