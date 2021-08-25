import React, { useState, useEffect } from 'react';
import { VehiclesService } from '../vehicles.service';
import { IVehicle } from '../interfaces/IVehicle';
import { IBrand } from '../../brands/interfaces/IBrand';
import { BrandsService } from '../../brands/brands.service';

export const VehiclesMain = () => {
    const [vehicles, setVehicles] = useState<IVehicle[]>()
    const [filteredVehicles, setFilteredVehicles] = useState<IVehicle[]>()
    const [brands, setBrands] = useState<IBrand[]>()
    const [sold, setSold] = useState()
    const [decades, setDecades] = useState([
        1980, 1990, 2000, 2010, 2020
    ])
    const [filter, setFilter] = useState({
        brandFilter: '',
        decadeFilter: '',
        soldFilter: ''
    })

    const handleFilterDecade = (vehicle: IVehicle, decade: string) => {
        if (!decade) return true;
        const lowDecade: number = vehicle.ano - vehicle.ano % 10;
        const highDecade: number = vehicle.ano + vehicle.ano % 10;
        return +decade >= lowDecade && +decade < highDecade
    }

    const vehiclesService = new VehiclesService();
    const brandsService = new BrandsService();

    useEffect(() => {
        vehiclesService.findAll()
            .then(res => {
                setVehicles(res);
                setFilteredVehicles(res);
            })

        brandsService.findAll()
            .then(res => {
                setBrands(res);
            })
    }, [])

    useEffect(() => {
        setFilteredVehicles(
            vehicles?.filter(vehicle => vehicle.marca.nome && vehicle.marca.nome.includes(filter.brandFilter) && handleFilterDecade(vehicle, filter.decadeFilter) && String(vehicle.vendido).includes(filter.soldFilter))
        );
    }, [filter])


    return (
        <div className="flex">
            <nav className="w-80 h-screen p-2 col-span-1">
                <div className="flex flex-col w-full h-1/6 p-2 border-solid border-2 rounded-lg mb-10 mt-3">
                    <p className="m-auto text-lg font-bold">Veículos:</p>
                    <p className="m-auto text-lg font-bold">{filteredVehicles?.length}</p>
                </div>

                <ul>
                    <label htmlFor="marcas"> Marcas </label>
                    <select className="w-full mb-10 rounded-md"
                        name="marcas" id="marcas"
                        onChange={e => {
                            setFilter({ ...filter, brandFilter: e.target.value });
                        }}
                    >
                        <option value=''></option>
                        {
                            brands?.map(
                                (brand, id) => <option value={brand.nome} key={id}>{brand.nome}</option>
                            )
                        }
                    </select>

                    <label htmlFor="decadas"> Décadas </label>
                    <select className="w-full mb-14 rounded-md" name="decadas" id="decadas"
                        onChange={e => {
                            setFilter({ ...filter, decadeFilter: e.target.value });
                        }}
                    >
                        <option></option>
                        {
                            decades.map((decade, id) => <option value={decade} key={id}>{decade}</option>)
                        }
                    </select>

                    <label htmlFor="vendido"> Vendido: </label>
                    <select className="w-full mb-14 rounded-md" name="vendido" id="vendido"
                        onChange={e => {
                            setFilter({ ...filter, soldFilter: e.target.value });
                        }}
                    >
                        <option></option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>


                </ul>

            </nav>
            <section className="w-full flex flex-wrap justify-items-center justify-between">
                {filteredVehicles?.map((vehicle) =>
                    <div key={vehicle.id}
                        className="m-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-4 flex flex-col 
                        items-center justify-center justify-between rounded-lg h-80"
                    >
                        <div className="flex flex-col">
                            <p className="text-lg font-bold">Veículo</p>
                            <p>{vehicle.veiculo}</p>

                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">Descrição</p>
                            <p>{vehicle.descricao}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">Ano</p>
                            <p>{vehicle.ano}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">Fabricante</p>
                            <p>{vehicle.marca.nome}</p>
                        </div>


                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">Vendido</p>
                            <p>{vehicle.vendido ? "Sim" : "Não"}</p>
                        </div>
                    </div>

                )}


            </section>
        </div>
    )
}