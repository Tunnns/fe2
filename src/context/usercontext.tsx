import {createContext, useContext, useState} from 'react';

export const UserContext=createContext<any>(null);

function UserProvider({children}: any){
    const [user, setUser] = useState({
        username:'username',
        email:'123@gmail.com',
    });
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
export const useUser = () => useContext(UserContext);