import { success } from "astro:schema";
import { createContext, useContext, useEffect, useState } from "react";

type Usuario = {
  idUsuario: string;
  nombre: string;
  email: string;
  rol: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  loading: boolean;
  //login: (email: string, password: string) => Promise<boolean>;
  // para obtener el mensaje de respuesta 
  login: (email: string, password: string) => Promise<{success: boolean, message?: string}>;

  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const response = await fetch(
        "https://apidatospr.cedesystem.com/Api/Auth/me",
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        setUsuario(null);
        return;
      }

      const data = await response.json();

      setUsuario(data);
    } catch {
      setUsuario(null);
    }
  }

  async function login(email: string, password: string) {
    try{
      const response = await fetch(
        "https://apidatospr.cedesystem.com/Api/Auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok){
        return{
          success:false,
          message: data.message || "Error al iniciar sesión",
        };
      }

      await refreshUser();

      return {
        success: true,
      };
    }catch{
      return{
        success: false,
        message: "No fue posible conectar con el servidor",
      };
    }
  
  }




  // logout
  async function logout() {
    try{
      const response = await fetch(
        "https://apidatospr.cedesystem.com/Api/Auth/logOut", 
        {
          method: "POST",
          credentials: "include",
        }
      );

      console.log("Log Out:", response.status);

      if(!response.ok){
        throw new Error("No se pudo cerrar sesión");
      }

      setUsuario(null);
    }catch(error){
      console.error(error);
    }
    
  }




  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
