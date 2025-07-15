import React, { useMemo, useState } from 'react';
const UserContext = React.createContext();  

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const contexValue = useMemo(() => ({  user, setUser }), [user, setUser]);
    return (
        <UserContext.Provider value={contexValue}>
        {children}
        </UserContext.Provider>
    );
}   

export { UserContext, UserContextProvider };
