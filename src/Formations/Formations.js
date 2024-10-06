import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../Employes/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormation, setParticipation } from "../Redux/actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function Formation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mesg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFormationeId, setSelectedFormationId] = useState(null);
  const formations=useSelector(state=>state.formations);
  const participations = useSelector((state) => state.participations);
  const nav = useNavigate();

  const dispatch = useDispatch();
  const url = 'http://localhost:8001/formations';

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        dispatch(setFormation(res.data));
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des formations :", err));
    axios
      .get("http://localhost:8006/participations")
      .then((res) => {
        dispatch(setParticipation(res.data));
      })
      .catch((err) =>
        console.error(
          "Erreur lors de la récupération des participations :",
          err
        )
      );    
  }, [dispatch]);
     const handleRechercher = (e) => {
       const query = e.target.value;
       setSearchQuery(query);
       // axios.get(`${url}/?q=${query}`)
       axios
         .get(`${url}`)
         .then((res) => {
           dispatch(
             setFormation(
               res.data.filter(
                 (frm) =>
                   frm["titre"]
                     .toUpperCase()
                     .includes(e.target.value.toUpperCase()) ||
                  frm["description"]
                     .toUpperCase()
                     .includes(e.target.value.toUpperCase())
               )
             )
           );
           console.log(e.target.value);
           if (res.data.length === 0) {
             setMsg("Aucun employé trouvé");
           } else {
             setMsg("");
           }
         })
         .catch((err) =>
           console.error("Erreur lors de la recherche des employés :", err)
         );
     };
     const handlePrint = () => {
      window.print();
    };
    const handleDeleteClick = (id) => {
      const confirmation = window.confirm('Voulez-vous supprimer cet employé?');
      if (confirmation) {
          axios.delete(`${url}/${id}`)
              .then(response => {
                  // Optionally handle success response
                  // For example, redirecting to another page:
                  window.location.href = '/formations';
              })
              .catch(error => {
                  // Handle error
                  console.error('Erreur lors de la suppression de l\'employé:', error);
              });
      }
  }
  const handleEditClick = (formationId) => {
    setSelectedFormationId(formationId);
    setShowModal(true);
  };

  const handleEditConfirmation = () => {
    if (selectedFormationeId) {
      nav(`/UpdateF/${selectedFormationeId}`);
      setShowModal(false);
      setSelectedFormationId(null);
    }
  };
  return (
    <>
      <div>
        {
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
          to="/AddFormations"
        >
          Ajouter +
        </Link>
        <button  onClick={handlePrint} className="btn btn-primary no-print">Imprimer</button>
            </div>
             
              <table className="table table-striped table-hover "
              >
                <thead className="thead-dark">
                  <tr>
                    <th
                     scope="col"
                    >
                      ID formation
                    </th>
                    <th
                     scope="col"
                    >
                      Titre
                    </th>
                    <th
                     scope="col"
                    >
                      Description
                    </th>
                    <th
                     scope="col"
                    >
                      Date début
                    </th>
                    <th
                      scope="col"
                    >
                      Date fin
                    </th>
                    <th
                     scope="col"
                    >
                      Etat
                    </th>
                    <th
                    scope="col"
                    >
                      Durée
                    </th>
                    <th
                    
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formations.map((formation) => (
                    <tr key={formation.id}>
                      <td>{formation.id}</td>
                      <td>{formation.titre}</td>
                      <td>{formation.description}</td>
                      <td>{formation.date_début}</td>
                      <td>{formation.date_fin}</td>
                      <td>{formation.etat}</td>
                      <td>{formation.durée}</td>
                      <td>
                      <button onClick={() => handleEditClick(formation.id)} className="btn btn-primary no-print">Modifier</button>
                      <button onClick={() => handleDeleteClick(formation.id)} className="btn btn-danger mx-2 no-print">Supprimer</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>

        }
          <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir éditer cette formation ?
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
    </>
  );
}
