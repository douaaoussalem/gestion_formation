import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import '../Employes/emp.css'
import { useDispatch, useSelector } from "react-redux";
import { setEmploye, setParticipation } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Employe() {
  const [sortedEmployes, setSortedEmployes] = useState([]);
  const [msg, setMsg] = useState('');
  const [sortByNomChecked, setSortByNomChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [searchBy, setSearchBy] = useState('nom');
  const [filter, setFilter] = useState('');
  const [employees, setEmploye] = useState([]);
  
  const nav = useNavigate();
  const participations = useSelector(state => state.participations);
  const dispatch = useDispatch();
  const url = 'http://localhost:8001/employees';

  useEffect(() => {
    axios.get(url)
      .then(res => {
        dispatch(setEmploye(res.data));
        setSortedEmployes(res.data);
      })
      .catch(err => console.error("Erreur lors de la récupération des employés :", err));

    axios.get('http://localhost:8001/participations')
      .then(res => {
        dispatch(setParticipation(res.data));
      })
      .catch(err => console.error("Erreur lors de la récupération des participations :", err));
  }, [dispatch]);

  useEffect(() => {
    if (searchBy === 'nom') {
      sortByNom();
    } else {
      setSortedEmployes(employees);
    }
  }, [searchBy, employees]);
  
  const sortByNom = () => {
    const sorted = [...employees].sort((a, b) => a.nom.localeCompare(b.nom));
    setSortedEmployes(sorted);
  };

  const getNombreDeFormation = (cin) => {
    const formations = participations.filter(participation => participation.cin === cin);
    return formations.length;
  };

  const handleSortByNomChange = (e) => {
    setSortByNomChecked(e.target.checked);
  };

  const handleEditClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setShowModal(true);
  };

  const handleEditConfirmation = () => {
    if (selectedEmployeeId) {
      nav(`/Update/${selectedEmployeeId}`);
      setShowModal(false);
      setSelectedEmployeeId(null);
    }
  };
  const handleDeleteClick = (id) => {
    const confirmation = window.confirm('Voulez-vous supprimer cet employé?');
    if (confirmation) {
        axios.delete(`${url}/${id}`)
            .then(response => {
                // Optionally handle success response
                // For example, redirecting to another page:
                window.location.href = '/';
            })
            .catch(error => {
                // Handle error
                console.error('Erreur lors de la suppression de l\'employé:', error);
            });
    }
}


  const handleChange = e => {
    setFilter(e.target.value);
  };
  const handleSelectChange = e => {
    setSearchBy(e.target.value);
  };
  const filteredEmployees = employees.filter(employee =>
    employee[searchBy].toLowerCase().includes(filter.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="d-flex no-print">
        <Navbar />
        <div >
          <div style={{marginLeft:40,marginTop:179}}>
          <div style={{ marginTop: '20px'}}>
          <Link
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    marginRight: 810,
                  }}
                  className="btn btn-success"
                  to="/Add"
                >
                  Ajouter +
                </Link>

              <button  onClick={handlePrint} className="btn btn-primary no-print">Imprimer</button>
            </div>
            <div className="mt-4">
              <div className="row mb-3">
                <div className="col">
                  <select
                    className="form-control no-print"
                    value={searchBy}
                    onChange={handleSelectChange}
                  >
                    <option value="nom">Nom</option>
                    <option value="prénom">Prénom</option>
                    <option value="département">Département</option>
                    <option value="poste">Poste</option>
                    <option value="diplôme">Diplôme</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control no-print"
                    placeholder={`Rechercher par ${searchBy}`}
                    value={filter}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {msg && <p className="alert alert-danger">{msg}</p>}
            
            <table className="table table-striped table-hover " style={{width:1200}}>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Département</th>
                  <th scope="col">Poste</th>
                  <th scope="col">Nombre de formation</th>
                  <th scope="col">Diplôme</th>
                  <th scope="col">Email</th>
                  <th scope="col" className="no-print">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employe) => (
                  <tr key={employe.id}>
                    <td>{employe.nom}</td>
                    <td>{employe.prénom}</td>
                    <td>{employe.département}</td>
                    <td>{employe.poste}</td>
                    <td>{getNombreDeFormation(employe.nom)}</td>
                    <td>{employe.diplôme}</td>
                    <td>{employe.email}</td>
                    <td>
                      <button onClick={() => handleEditClick(employe.id)} className="btn btn-primary no-print">Modifier</button>
                      <button onClick={() => handleDeleteClick(employe.id)} className="btn btn-danger mx-2 no-print">Supprimer</button>
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    
           
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir éditer cet employé ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleEditConfirmation}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}