import React, { useEffect, useState } from "react";
import Navbar from "../Employes/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Edit() {
    const url = 'http://localhost:8001/participations';
    const nav = useNavigate();
    const { id } = useParams();
    const [employes, setEmployes] = useState([]);
    const [formations, setFormations] = useState([]);
    const [participation, setParticipation] = useState({
        id: '',
        cin: '',
        id_formation: ''
    });

    useEffect(() => {
        axios.get(`${url}/${id}`)
            .then(res => setParticipation(res.data))
            .catch(error => console.log(error));
    }, [id]);

    useEffect(() => {
        fetch("http://localhost:8001/employees")
            .then(res => res.json())
            .then(data => setEmployes(data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8001/formations")
            .then(res => res.json())
            .then(data => setFormations(data))
            .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParticipation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${url}/${id}`, participation)
            .then(res => {
                console.log("Participation updated successfully");
                nav('/Participations');
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="d-flex">
            <Navbar />
            <form onSubmit={handleSubmit}style={{ height: 397, marginTop: 140 }} className='w-75 p-4 mx-auto border rounded shadow' >
            <h2 className="mb-4">Modifier un employé</h2>
               
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID:</label>
                    <input type="text" className="form-control" id="id" name="id" value={participation.id} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>ID Employe:</label>
                    <select className="form-select" name="cin" value={participation.cin} onChange={handleChange}>
                        <option value=''>Sélectionnez le nom de l'employé</option>
                        {employes.map(employe => (
                            <option key={employe.id} value={employe.cin}>
                                {employe.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label>ID Formation:</label>
                    <select className="form-select" name="id_formation" value={participation.id_formation} onChange={handleChange}>
                        <option value=''>Sélectionnez le nom de la formation</option>
                        {formations.map(formation => (
                            <option key={formation.id} value={formation.titre}>
                                {formation.titre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Soumettre</button>
                <Link to='/Participations' className="mt-4 btn btn-danger ms-2">Annuler</Link>
            </form>
        </div>
    );
}
