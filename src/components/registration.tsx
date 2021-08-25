import React, { useState, useEffect } from 'react';
import { IBrand } from './brands/interfaces/IBrand';
import { BrandsService } from './brands/brands.service';
import { VehiclesService } from './vehicles/vehicles.service';


export const Registration = () => {
    const [brands, setBrands] = useState<IBrand[]>()
    const brandsService = new BrandsService();
    const vehiclesService = new VehiclesService();
    const [formVehicle, setFormVehicle] = useState({
        veiculo: '',
        marca: {
            id: 1,
            nome: ''
        },
        ano: 0,
        descricao: '',
        vendido: false
    })

    const [formBrand, setFormBrand] = useState({
        nome: ''
    })

    useEffect(() => {
        brandsService.findAll()
            .then(res => {
                setBrands(res);
            })
    }, [])

    return (
        <div className="w-full grid">
            <div className="m-5 border-2 p-2">
                <label htmlFor="veiculo">Cadastro de Veículos</label>
                <form name="veiculo" id="veiculo"
                    className="flex flex-col"
                    onSubmit={e => {
                        e.preventDefault();
                        vehiclesService.create(formVehicle).then(res => alert(`Veículo cadastrado, id:${res.id}`))

                    }}
                >
                    <label htmlFor="marcas">Marca / Fabricante</label>
                    <select className="bg-gray-50" name="marcas" id="marcas" onChange={e => setFormVehicle({ ...formVehicle, marca: { id: Number(e.target.selectedIndex + 1), nome: String(e.target.value) } })}>
                        {
                            brands?.map(
                                (brand) => <option value={brand.nome} key={brand.id}>{brand.nome}</option>
                            )
                        }
                    </select>

                    <label htmlFor="veiculo">Veículo</label>
                    <input className="bg-gray-50" type="text" name="veiculo" onChange={e => setFormVehicle({ ...formVehicle, veiculo: e.target.value })} />

                    <label htmlFor="ano">Ano</label>
                    <input className="bg-gray-50" type="number" name="ano" minLength={4} onChange={e => setFormVehicle({ ...formVehicle, ano: Number(e.target.value) })} />

                    <label htmlFor="descricao">Descrição</label>
                    <input className="bg-gray-50" type="text" name="descricao" onChange={e => setFormVehicle({ ...formVehicle, descricao: e.target.value })} />


                    <p>Vendido?</p>
                    <div>
                        <input className="bg-gray-50" type="radio" name="vendido" value="1" id="sim" onChange={e => setFormVehicle({ ...formVehicle, vendido: Boolean(e.target.value) })} />
                        <label className="m-2" htmlFor="sim">Sim</label>

                        <input className="bg-gray-50" type="radio" name="vendido" value="0" id="nao" onChange={e => setFormVehicle({ ...formVehicle, vendido: Boolean(Number(e.target.value)) })} />
                        <label className="m-2" htmlFor="nao">Não</label>

                    </div>
                    {console.log(formVehicle)}
                    {console.log(formBrand)}
                    <br /><br />

                    <button className="bg-gray-200" id="btnSubmit">Cadastrar</button>
                </form>
            </div>

            <div className="w-full m-5  border-2 p-2">
                <label htmlFor="marca">Cadastro de fabricantes</label>
                <form name="marca" id="marca" className="flex flex-col"
                    onSubmit={e => {
                        e.preventDefault();
                        brandsService.create(formBrand).then(res => alert(`Marca cadastrada, id:${res.id}`))

                    }}>
                    <label htmlFor="marcas">Nome</label>
                    <input className="bg-gray-50" type="text" onChange={e => setFormBrand({ ...formBrand, nome: e.target.value })} />
                    <br /><br />
                    <button className="bg-gray-200" id="btnSubmit">Cadastrar</button>
                </form>
            </div>

        </div>
    )
}