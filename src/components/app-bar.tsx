import React from 'react';
import { useHistory } from 'react-router-dom'

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
)

const AddIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
)

export const AppBar = () => {
    const history = useHistory();


    return (
        <div className="w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-14 flex justify-center items-center justify-between">
            <div className="m-5 flex" onClick={() => history.push('/')}> <HomeIcon /> <p className="mx-2">Catálogo de veículos</p></div>
            <div className="m-5" onClick={() => history.push('/cadastro')}><AddIcon /></div>
        </div>
    )
}