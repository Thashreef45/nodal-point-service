import { Request, Response } from 'express'
import nodalHome from '../../application/usecase/nodal-home'
// import nodalSignup from '../../application/usecase/create-nodal'
// import findNodal from '../../application/usecase/findnodal';
// import login from '../../application/usecase/login';

export default {

    // createNodal : async(req:Request, res:Response)=> {
    //     const ret:{message:string,data?:{}} = await nodalSignup(req.body,String(req.headers.token));
    //     if(ret?.message === 'success'){
    //         res.status(201).json(ret)
    //     }else if(ret.message == 'Apex not authorized'){
    //         res.status(401).json(ret)
    //     }
    //     else res.status(409).json(ret)
    // },

    // login : async(req:Request , res:Response) =>{
    //     const data = req.body
    //     const response =  await login(data)
    //     if(response?.message == "success"){
    //         res.status(200).json(response)
    //     }else if(response?.message == 'Wrong password'){
    //         res.status(401).json(response)
    //     }else res.status(404).json(response)
    // },

    // findNodal : async(req:Request,res:Response) => {
    //     const nodalFound = await findNodal(String(req.params))
    //     if(nodalFound?.message == 'success'){
    //         res.status(200).json(nodalFound)
    //     }else{
    //         res.status(404).json(nodalFound)
    //     }
    // },

    home : async (call:any,callback:any) =>{
        const id = call.request.id
        const response = await nodalHome(id)
        callback(null,response)
    }

}