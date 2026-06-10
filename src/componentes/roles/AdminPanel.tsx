import { useAuth} from "../auth/AuthContext";

export default function AdminPanel() {

  const {usuario} = useAuth();
  
  return (
    <div>
      <h2 className=" dark:bg-amber-300">
        Panel Administrador
      </h2>

      <button className="text-amber-200">
        Gestionar Usuarios
      </button>
      <p className="font-bold text-amber-300">
                hola admin {usuario?.nombre}
                <p>{usuario?.idUsuario}</p>
            </p>
    </div>
  );
}