import React, { useEffect, useState } from "react";
import Navbar from "../Employes/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Add() {
    const url = 'http://localhost:8001/participations';
    const nav = useNavigate();
    const [employes, setEmployes] = useState([]);
    const [formations, setFormations] = useState([]);
    const [participation, setParticipation] = useState({
        id: '',
        cin: '',
        diplome: '',
        id_formation: ''
    });
    const [filteredEmployes, setFilteredEmployes] = useState([]);
    const [diplomes, setDiplomes] = useState([]); // Liste distincte de diplômes

    useEffect(() => {
        fetch("http://localhost:8001/employees")
            .then(res => res.json())
            .then(data => {
                setEmployes(data);
                // Créer une liste distincte de diplômes
                const distinctDiplomes = [...new Set(data.map(employe => employe.diplôme))];
                setDiplomes(distinctDiplomes);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:8001/formations")
            .then(res => res.json())
            .then(data => {
                // Filtrer les formations pour ne récupérer que celles qui ont été programmées
                const formationsProgrammees = data.filter(formation => formation.etat === 'Programmée');
                setFormations(formationsProgrammees);
            });
    }, []);

    const filterEmployesByDiplome = (diplome) => {
        const filtered = employes.filter(employe => employe.diplôme === diplome);
        setFilteredEmployes(filtered);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(url, participation)
            .then(res => {
                console.log(res);
                nav('/Participations');
                console.log(participation);
            })
            .catch(err => console.error("Erreur lors de l'ajout de l'employé :", err));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setParticipation({ ...participation, [name]: value });

        if (name === "diplome") {
            filterEmployesByDiplome(value);
        }
    };

    return (
        <div className="d-flex">
            <Navbar />
            <form onSubmit={handleSubmit} className='w-75 p-4 mx-auto border rounded shadow' style={{ height: 390, marginTop: 140 }}>
                <h2 className="mb-4">Ajouter un employé</h2>
                <div className="mb-3">
                    <label>Diplome d'Employé</label>
                    <select className="form-select" name="diplome" value={participation.diplome} onChange={handleChange}>
                        <option value=''>Sélectionnez le diplôme de l&apos;employé</option>
                        {diplomes.map((diplome, index) => (
                            <option key={index} value={diplome}>{diplome}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Nom d'Employé</label>
                    <select className="form-select" name="cin" value={participation.cin} onChange={handleChange}>
                        <option value=''>Sélectionnez le nom de l&apos;employé</option>
                        {filteredEmployes.map((employe) => (
                            <option key={employe.id} value={employe.nom}>{employe.nom}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Nom de Formation</label>
                    <select className="form-select" name="id_formation" value={participation.id_formation} onChange={handleChange}>
                        <option value=''>Sélectionnez le nom de la formation</option>
                        {formations.map((formation) => (
                            <option key={formation.id} value={formation.titre}>{formation.titre}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Soumettre</button>
                <Link to='/Participations' className="mt-4 btn btn-danger ms-2">Annuler</Link>
            </form>
        </div>
    )
}
