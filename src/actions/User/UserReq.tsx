import axios from 'axios'
const URL = process.env.URL

class UserReq{
    public async createUser(data:any){
        console.log(URL);
        
        const RegisterRequest = await axios.post(
            `http://localhost:8080/register`,
            data
            );
        return RegisterRequest.data.message
    }
}

export const userReq = new UserReq();
 
