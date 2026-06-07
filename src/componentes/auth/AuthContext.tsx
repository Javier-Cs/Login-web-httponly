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
  login: (email: string, password: string) => Promise<boolean>;
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
      },
    );

    if (!response.ok) return false;

    await refreshUser();

    return true;
  }

  async function logout() {
    await fetch("https://apidatospr.cedesystem.com/Api/Auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUsuario(null);
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
