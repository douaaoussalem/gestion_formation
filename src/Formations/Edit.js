import { useEffect, useState } from "react";
import Navbar from "../Employes/Navbar";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Edit() {
  const url = "http://localhost:8001/formations";
  const nav = useNavigate();
  const { id } = useParams();
  const [formations, setFormation] = useState({
    id:'',
    titre: "",
    description: "",
    date_début: "",
    date_fin: "",
    etat: "",
    durée: ""
  });


  useEffect(() => {
    axios
      .get(`${url}/${id}`)
      .then((res) => setFormation(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${url}/${id}`, formations)
      .then((res) => {
        console.log("Formation updated successfully");
      })
      .catch((error) => console.log(error));
    nav("/formations");
  };

  return (
    <div className="d-flex">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className='mt-4 w-75 p-4 mx-auto border rounded shadow'        style={{ marginLeft: 40 }}
      >
                <h2 className="mb-4">Modifier une formation</h2>
      
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
            Date Début:
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
        {/* <div>
                <label>ID Formation</label>
                        <select  name="id_formation" value={employes.id_formation} onChange={handleChange}>
                        <option value='Séléctionnez le id de formation'>Séléctionnez le id de formation</option>
                        
                        {
                    formations.map((formation)=>(
                            <option value={employes.id_formation}>{formation.id_formation}</option>
                        ))

                    }
                        </select>

                </div> */}
        {/* <div className="mb-1">
                    <label htmlFor="idFormation" className="form-label">ID Formation:</label>
                    <input type="text" className="form-control" id="idFormation" name="id_formation" value={employes.id_formation} onChange={handleChange} />
                </div> */}
        <div className="mb-1">
          <label htmlFor="etat" className="form-label">
            Etat:
          </label>
          <select className="form-select" name="etat" value={formations.etat} onChange={handleChange}>
              <option value="Programmée">Programmée</option>
              <option value="En cours">En cours</option>
              <option value="Annuler">Annuler</option>
              <option value="Terminer">Terminer</option>  <option value="Achevée">Achevée</option>
            </select>
        </div>
        <div className="mb-2">
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
          Modifier
        </button>
        <Link to='/formations' className="btn btn-danger mx-2">Annuler</Link>

      </form>
    </div>
  );
}
