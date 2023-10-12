import connectDB from "../../utils/dbConnection";
import Model from "../../domain/entities/nodalModel";
import { createNewNodal } from "../types/interfaces";
connectDB()

export default {
    findNodal: async (id: string) => {
        return await Model.findOne({ id: id })
    },

    createNodal: async (data: createNewNodal) => {
        const { id, phone, email, password, apex, address, pincode, name, consignmentPrefix } = data

        const newNodal = new Model({
            id, phone, email, password, apex,
            address, pincode, name, consignmentPrefix
        })
        return await newNodal.save()
    },

    findByPin: async (pin: number) => {
        return await Model.findOne({ pincode: pin })
    },

    //
    setCreatedCP: async (id: string, nodalId: string) => {
        return await Model.updateOne({ id: nodalId }, { $push: { channelPartners: id } })
    },

    nodalData: async (id: string) => {
        return await Model.findOne({ id: id }, { password: 0, fdm: 0 })
    },

    getSendingFdms: async (id: string) => {
        return await Model.findOne({ id: id }, { _id: 0, 'fdm.sending': 1 })
    },

    assignCpBookedFdms: async (id: string, data: [string]) => {
        return await Model.updateOne(
            { id: id },
            { $set: { 'fdm.sending': data } })
    },

    removeAFdmFromSending: async (id: string, awb: string) => {
        return await Model.updateOne(
            { id: id },
            { $pull: { 'fdm.sending': awb } }
        )
    }

}



