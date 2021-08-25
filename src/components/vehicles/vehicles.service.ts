import { ENV } from '../../config-env';
import { IVehicle } from '../vehicles/interfaces/IVehicle';

export class VehiclesService {
    private path = `${ENV.SERVER_PATH}/vehicles`

    async create(vehicle: Partial<IVehicle>): Promise<IVehicle> {
        const config = {
            method: 'POST',
            body: JSON.stringify(vehicle),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        const newVehicle: IVehicle = await (await fetch(this.path, config)).json();
        return newVehicle;
    }

    async findAll(): Promise<IVehicle[]> {
        return (await fetch(this.path)).json();
    }

    async findOne(id: number): Promise<IVehicle> {
        return (await fetch(`${this.path}/${id}`)).json();
    }

    async update(id: number, updatevehicle: Partial<IVehicle>): Promise<IVehicle> {
        const config = {
            method: 'PATCH',
            body: JSON.stringify(updatevehicle),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        const updatedVehicle: IVehicle = await (await fetch(this.path, config)).json();
        return updatedVehicle;
    }

    async remove(id: number): Promise<IVehicle> {
        const config = {
            method: 'DELETE',
        }
        const deletedVehicle: IVehicle = await (await fetch(`${this.path}/${id}`, config)).json();
        return deletedVehicle;
    }
}
