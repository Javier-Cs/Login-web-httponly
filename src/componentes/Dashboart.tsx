import { useAuth } from "./auth/AuthContext";

import AdminPanel from "./roles/AdminPanel";

export default function Dashboard() {
  const { usuario, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!usuario) {
    return <p>Debe iniciar sesión</p>;
  }

  switch (usuario.rol.toLowerCase()) {
    case "administrador":
      return <AdminPanel />;
  }
}
