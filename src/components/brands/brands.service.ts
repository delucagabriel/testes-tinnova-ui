import { IBrand } from '../brands/interfaces/IBrand';
import { ENV } from '../../config-env';


export class BrandsService {
    private path = `${ENV.SERVER_PATH}/brands`

    async create(brand: IBrand): Promise<IBrand> {
        const config = {
            method: 'POST',
            body: JSON.stringify(brand),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        const newBrand: IBrand = await (await fetch(this.path, config)).json()
        return newBrand;
    }

    async findAll(): Promise<IBrand[]> {
        return (await fetch(this.path)).json()
    }

    async findOne(id: number): Promise<IBrand> {
        return (await fetch(`${this.path}/${id}`)).json()
    }

    async update(id: number, updateBrand: Partial<IBrand>): Promise<IBrand> {
        const config = {
            method: 'PATCH',
            body: JSON.stringify(updateBrand),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        const newBrand: IBrand = await (await fetch(this.path, config)).json()
        return newBrand;
    }

    async remove(id: number): Promise<IBrand> {
        const config = {
            method: 'DELETE',
        }
        const deletedBrand: IBrand = await (await fetch(`${this.path}/${id}`, config)).json()
        return deletedBrand;
    }
}
