// import { useContext } from 'react';
import { Button } from 'antd';
// import { UserContext } from '../context/usercontext';
import useAuthStore from './zustand/useAuthStore';

const Login = () => {
    const { setUser } = useAuthStore();

    return (
        <div>
            <h2>Login</h2>
            <Button
                type="primary"
                onClick={() => setUser({ username: "1@1.com", email: "1@1.com" })}>
                Login
            </Button>
        </div>
    )
};

export default Login;
