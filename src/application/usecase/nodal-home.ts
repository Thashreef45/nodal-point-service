import repository from "../../infrastructure/repositories/repository"


const nodalHome = async(id:string) =>{
    const response = await repository.nodalData(id)
    if(response){
        response.status = 200
        return response
    }else{
        return {status:404}
    }

}

export default nodalHome