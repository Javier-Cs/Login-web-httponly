import { useAuth } from "../auth/AuthContext";

export default  function VendedorPanel(){
    const {usuario} = useAuth();
    return(
        <div>
            <h2>
                panel de vendedores
            </h2>
            <p className="font-bold text-amber-300">
                hola vendedor {usuario?.nombre}
                <p>{usuario?.idUsuario}</p>
            </p>
        </div>
    );
}
