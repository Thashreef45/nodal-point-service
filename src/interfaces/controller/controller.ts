import nodalHome from '../../application/usecase/nodal-home'
import login from '../../application/usecase/login'
import createNodal from '../../application/usecase/create-nodal'
// import findNodal from '../../application/usecase/findnodal';


export default {


    // findNodal : async(req:Request,res:Response) => {
    //     const nodalFound = await findNodal(String(req.params))
    //     if(nodalFound?.message == 'success'){
    //         res.status(200).json(nodalFound)
    //     }else{
    //         res.status(404).json(nodalFound)
    //     }
    // },

    createNodal: async (call:any , callback :any) => {
        const response = await createNodal(call.request)
        callback(null,response)
    },

    login: async (call: any, callback: any) => {
        const data = call.request
        let response = await login(data)
        callback(null, response)
    },


    home: async (call: any, callback: any) => {
        const response = await nodalHome(call.request.id)
        callback(null, response)
    }

}