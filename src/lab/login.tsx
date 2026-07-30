
import {useContext} from 'react';
import {UserContext} from '../context/usercontext';

const Login = () => {
    const {setUser}=useContext(UserContext);

    return(
        <button
        type="button"
         onClick={()=>
            setUser({
            username:'username',
            email:'123@gmail.com',
        })}>login</button>
    ) 
};

export default Login;
