// import React, { Children, createContext, useEffect, useState } from 'react';

// import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { app } from '../../../firebase/firebase.config';

// export const authContext= createContext(null);

    

// const AuthProviders = ({ children }) => {
//     const [user,setUser]=useState(null);
//     const [loading,setLoading]=useState(true);

//     const createUser=(email,password)=>{
//          setLoading(true);
//         return createUserWithEmailAndPassword(auth,email,password);
//     }

//     const signIn=(email,password)=>{
//           setLoading(true);
//         return signInWithEmailAndPassword(email,password);
//     }
//     const logOut=()=>{
//         setLoading(true);
//         return signOut(auth);
//     }

//     useEffect(()=>{const unSubscribe=onAuthStateChanged(auth,currentUser=>{
//         setUser(currentUser);
//         setLoading(false);
        
//     });
//     return ()=>{
//         return unSubscribe();
//     }
// },[]);
// const auth=getAuth(app);

//     const authInfo ={
       
//         user,loading,createUser,signIn,logOut

//     }
//     return (
//         <AuthContext.Provider value={authInfo}>
//             {Children}
//         </AuthContext.Provider>
//     );
// };



// export default AuthProviders;

import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from '../../../firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;
