import repository from "../../infrastructure/repositories/repository";

async function findNodal(data:any){
    const {id} = data
    return await repository.findNodal(id)
}