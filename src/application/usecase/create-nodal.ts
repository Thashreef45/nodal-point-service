import { hash } from 'bcrypt'
import { verify } from "jsonwebtoken";
import repository from '../../infrastructure/repositories/repository';
import publisher from '../events/publisher/publisher';


const createNodal = async (data:any) => {
    try {
        let token: string = data.token.split(" ")[1]

        const nodalExist = await repository.findNodal(data.id)
        const pincodeAvailable = await repository.findByPin(data.pincode)

        const isApex = verify(token, String(process.env.JWT_SIGNATURE))

        if (!nodalExist && !pincodeAvailable) {
            if (typeof isApex === 'object' && isApex.administration == 'apex')
             {
                data.password = await hash(data.password, 10)
                data.apex = isApex.id
                const resData = await repository.createNodal(data)

                //nodal created , then it have to be updated in apex
                publisher.addNewNodal({nodal:data.id,apex:data.apex})

                return { message: 'success', status: 200 }
            } else {
                return { message: 'Apex not authorized', status: 401 }
            }
            
        } else {
            return { message: 'Nodal Point Already Exist', status: 409 }
        }
    } catch (error) {
        console.log(error)
    }
}

export default createNodal