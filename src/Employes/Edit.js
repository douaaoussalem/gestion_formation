import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
export default function Edit() {
    const url = 'http://localhost:8001/employees';
    const nav = useNavigate();
    const [formations, setFormation] = useState([]);
    const { id } = useParams();
    const [employes, setEmployes] = useState({
        id: '',
        nom: '',
        prénom: '',
        département: '',
        poste: '',
        id_formation: '',
        nombre_de_formation: '',
        email: ''
    });

    useEffect(() => {
        fetch("http://localhost:8001/formations")
            .then(res => res.json())
            .then(data => setFormation(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(`${url}/${id}`)
            .then(res => setEmployes(res.data))
            .catch(error => console.log(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployes(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${url}/${id}`, employes)
            .then(res => {
                console.log("Employee updated successfully");
                nav('/');
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="d-flex">
            <Navbar />
            <form onSubmit={handleSubmit} className='mt-4 w-75 p-4 mx-auto border rounded shadow'>
                <h2 className="mb-4">Modifier un employé</h2>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom:</label>
                    <input type="text" className="form-control" id="nom" name="nom" value={employes.nom} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom:</label>
                    <input type="text" className="form-control" id="prenom" name="prénom" value={employes.prénom} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="departement" className="form-label">Département:</label>
                    <input type="text" className="form-control" id="departement" name="département" value={employes.département} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="poste" className="form-label">Poste:</label>
                    <input type="text" className="form-control" id="poste" name="poste" value={employes.poste} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="nbFormation" className="form-label">Nombre de formation:</label>
                    <input type="text" className="form-control" id="nbFormation" name="nombre_de_formation" value={employes.nombre_de_formation} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" value={employes.email} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Éditer</button>
                <Link to='/Employes' className="btn btn-danger mx-2">Annuler</Link>
           
            </form>
        </div>
    );
}
