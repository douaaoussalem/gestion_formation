import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Add() {
    const url = 'http://localhost:8001/employees';
    const nav = useNavigate();
    const [formations, setFormation] = useState([]);
    const [employes, setEmployes] = useState({
        id: '',
        nom: '',
        prénom: '',
        département: '',
        poste: '',
        id_formation: [''],
        nombre_de_formation: 0,
        diplôme:'',
        email: ''
    });
    const [errors, setErrors] = useState({}); // État pour stocker les erreurs de validation

    useEffect(() => {
        fetch("http://localhost:8001/formations")
            .then(res => res.json())
            .then(data => setFormation(data));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateForm(employes);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Met à jour l'état des erreurs
            return;
        }

        axios.post(url, employes)
            .then(res => {
                console.log(res);
                nav('/');
            })
            .catch(err => console.error("Erreur lors de l'ajout de l'employé :", err));
    };

    const validateForm = (formData) => {
        let errors = {};

        if (!formData.nom) {
            errors.nom = "Veuillez entrer le nom de l'employé.";
        }
        if (!formData.prénom) {
            errors.prénom = "Veuillez entrer le prénom de l'employé.";
        }
        if (!formData.département) {
            errors.département = "Veuillez entrer le département de l'employé.";
        }
        if (!formData.poste) {
            errors.poste = "Veuillez entrer le poste de l'employé.";
        }
        if (!formData.diplôme) {
            errors.diplôme = "Veuillez entrer le diplôme de l'employé.";
        }
        if (!formData.email) {
            errors.email = "Veuillez entrer l'email de l'employé.";
        }

        return errors;
    };

    const handleChange = (event) => {
        setEmployes({ ...employes, [event.target.name]: event.target.value });
    };

    return (
        <div className="d-flex">
            <Navbar />
            <form onSubmit={handleSubmit} style={{ height: 899}} className='mt-4 w-75 p-4 mx-auto border rounded shadow'>
                <h2 className="mb-4">Ajouter un employé</h2>
               
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom:</label>
                    <input type="text" className="form-control" id="nom" name="nom" value={employes.nom} onChange={handleChange} />
                    {errors.nom && <div className="text-danger">{errors.nom}</div>} {/* Affiche les erreurs */}
                
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom:</label>
                    <input type="text" className="form-control" id="prenom" name="prénom" value={employes.prénom} onChange={handleChange} />
                    {errors.prénom && <div className="text-danger">{errors.prénom}</div>} {/* Affiche les erreurs */}
                </div>
                <div className="mb-3">
                    <label htmlFor="departement" className="form-label">Département:</label>
                    <input type="text" className="form-control" id="departement" name="département" value={employes.département} onChange={handleChange} />
                    {errors.département && <div className="text-danger">{errors.département}</div>} {/* Affiche les erreurs */}
                </div>
                <div className="mb-3">
                    <label htmlFor="poste" className="form-label">Poste:</label>
                    <input type="text" className="form-control" id="poste" name="poste" value={employes.poste} onChange={handleChange} />
                    {errors.poste && <div className="text-danger">{errors.poste}</div>} {/* Affiche les erreurs */}
                </div>
                <div className="mb-3">
                    <label htmlFor="nbFormation" className="form-label">Nombre de formation:</label>
                    <input type="number" className="form-control" id="nbFormation" name="nombre_de_formation" value={employes.nombre_de_formation} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="poste" className="form-label">Diplôme:</label>
                    <input type="text" className="form-control" id="diplôme" name="diplôme" value={employes.diplôme} onChange={handleChange} />
                    {errors.diplôme && <div className="text-danger">{errors.diplôme}</div>} {/* Affiche les erreurs */}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" value={employes.email} onChange={handleChange} />
                    {errors.email && <div className="text-danger">{errors.email}</div>} {/* Affiche les erreurs */}
                </div>
                <div className="mx-1 gap-2">
                    <button type="submit" className="btn btn-primary mx-3">Soumettre</button>
                    <Link to='/Employes' className="btn btn-danger">Annuler</Link>
                </div>
            </form>
        </div>
    )
}