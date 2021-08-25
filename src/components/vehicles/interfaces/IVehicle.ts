import { IBrand } from "../../brands/interfaces/IBrand";

export interface IVehicle {
    id?: number;
    veiculo: string;
    marca: Partial<IBrand>;
    ano: number;
    descricao: string;
    vendido: boolean;
}