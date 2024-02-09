import { createContext, useState } from "react";
import PropTypes from "prop-types";


export const AuthContext = createContext(null);

function UserAuthContext ({ children }) {
    const [ user, setUser ] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

UserAuthContext.propTypes = {
    children: PropTypes.node.isRequired
}

export default UserAuthContext;
