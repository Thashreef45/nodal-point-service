import connectDB from "../../utils/dbConnection";
import Model from "../../domain/entities/nodalModel";
connectDB()

export default {
    // findNodal: async (id: string) => {
    //     return await Model.findOne({ id: id })
    // },
    
    // createNodal: async (data: {id:string,phone:number,email:string,password:string,apex:string,address:string,pincode:number}) => {
    //     const { id, phone, email, password, apex ,address,pincode} = data
    //     const newNodal = new Model({
    //         id, phone, email, password, apex , 
    //         address : {address:address,pincode:pincode}
    //     })
    //     await newNodal.save()
    //     return data
    // },

    // findByPin : async (pin:number) => {
    //     return await Model.findOne({'address.pincode':pin})
    // },

    nodalData : async(id:string) => {
        return await Model.findOne({id:id})
    }

}



