import repository from "../../infrastructure/repositories/repository";
import {hash} from 'bcrypt'

const nodalSignup = async(data:any) =>{
    const nodalExist = await repository.findNodal(data.id)
    if(!nodalExist) {
        data.password = await hash(data.password,10)
        const resData = await repository.createNodal(data)
        return await {message:'success',data:resData}
    }else{
        return {message:'Nodal Point Already Exist'}
    }
}

export default nodalSignup