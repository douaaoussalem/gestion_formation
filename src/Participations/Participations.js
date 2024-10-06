import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../Employes/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmploye, setParticipation } from "../Redux/actions";
import { Link } from "react-router-dom";

export default function Employe() {
  const participations = useSelector((state) => state.participations);
  const dispatch = useDispatch();
  const url = 'http://localhost:8001/participations';

  useEffect(() => {
    axios.get(url)
      .then(res => {
        dispatch(setParticipation(res.data))
      })
      .catch(err => console.error("Erreur lors de la récupération des employés :", err));
  }, []);

  const handleDeleteClick = (id) => {
    const confirmation = window.confirm('Voulez-vous supprimer cette participation?');
    if (confirmation) {
      axios.delete(`${url}/${id}`)
        .then(response => {
          // Optionally handle success response
          // For example, redirecting to another page:
          window.location.href = '/participations';
        })
        .catch(error => {
          // Handle error
          console.error('Erreur lors de la suppression de l\'employé:', error);
        });
    }
  }
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="d-flex">
      <Navbar />
      <div style={{ marginLeft: 150, marginTop: 179 }}>
        <Link
          style={{
            textDecoration: "none",
            color: "#fff",
            marginRight: 700,
          }}
          className="btn btn-success" 
          to="/AddParticipations"
        >
          Ajouter +
        </Link>
        <button  onClick={handlePrint} className="btn btn-primary no-print">Imprimer</button>

        <div style={{ marginTop: '20px' }}>
          <table className="table table-striped table-hover" style={{ width: 879 }}>
            <thead>
              <tr>
                <th scope="col">Nom Employes</th>
                <th scope="col">Nom Formations</th>
                <th scope="col" colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {participations.map((participation) => (
                <tr key={participation.id}>
                  <td>{participation.cin}</td>
                  <td>{participation.id_formation}</td>
                  <td>
                    <Link to={`/UpdateP/${participation.id}`} className="btn btn-primary">Modifier</Link>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteClick(participation.id)} className="btn btn-danger mx-2 no-print">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
