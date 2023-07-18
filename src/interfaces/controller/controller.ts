import  {Request,Response} from 'express'
import nodalSignup from '../../application/usecase/create-nodal'

export default {
    createNodal : async(req:Request, res:Response)=> {
        const ret:{message:string,data?:{}} = await nodalSignup(req.body);
        if(ret?.message === 'success'){
            res.status(201).json(ret)
        }else res.status(409).json(ret)
    }
}