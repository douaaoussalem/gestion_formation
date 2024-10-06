import { useState } from "react";
import Navbar from '../Employes/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Add() {
    const url = 'http://localhost:8001/formations';
    const nav = useNavigate();
    const [formations, setFormations] = useState({
        id:'',
        titre: '',
        description: '',
        date_début: '',
        date_fin: '',
        etat:'',
        durée: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(url, formations)
            .then(res => {
                console.log(res);
                console.log(formations)

            })
            .catch(err => console.error("Erreur lors de l'ajout de l'employé :", err));
            nav('/formations');

    };

    const handleChange = (event) => {
        setFormations({ ...formations, [event.target.name]: event.target.value });
    };

    return (
      <div className="d-flex">
        <Navbar />
        <form
          onSubmit={handleSubmit}
          className='mt-4 w-75 p-4 mx-auto border rounded shadow'
        >
                <h2 className="mb-4">Ajouter une formation</h2>

          <div className="mb-1">
            <label htmlFor="titre" className="form-label">
              Titre:
            </label>
            <input
              type="text"
              className="form-control"
              id="titre"
              name="titre"
              value={formations.titre}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={formations.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="date_début" className="form-label">
              Date début:
            </label>
            <input
              type="date"
              className="form-control"
              id="date_début"
              name="date_début"
              value={formations.date_début}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="date_fin" className="form-label">
              Date fin:
            </label>
            <input
              type="date"
              className="form-control"
              id="date_fin"
              name="date_fin"
              value={formations.date_fin}
              onChange={handleChange}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="etat" className="form-label">
              Etat:
            </label>
            <select className="form-select" name="etat" value={formations.etat} onChange={handleChange}>
            <option value="Choisi votre etat">Choisi votre etat</option>
              <option value="Programmée">Programmée</option>
              <option value="En cours">En cours</option>
              <option value="Annuler">Annuler</option>
              <option value="Terminer">Terminer</option>
            </select>
          </div>
          <div className="mb-1">
            <label htmlFor="durée" className="form-label">
              Durée:
            </label>
            <input
              type="text"
              className="form-control"
              id="durée"
              name="durée"
              value={formations.durée}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
          <Link to='/formations' className="btn btn-danger mx-2">Annuler</Link>
        </form>
      </div>
    );
}
