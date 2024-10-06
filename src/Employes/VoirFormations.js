// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Navbar from "./Navbar";

// export default function Voir() {
//   const [formations, setFormations] = useState([]);
//   const { employeId } = useParams(); // Obtenez l'identifiant de l'employé à partir des paramètres d'URL

//   useEffect(() => {
//     axios.get(`http://localhost:8001/employees/${employeId}/formations`)
//       .then(res => {
//         setFormations(res.data);
//       })
//       .catch(err => console.error("Erreur lors de la récupération des formations de l'employé :", err));
//   }, [employeId]);

//   return (
//     <div className="d-flex">
//       <Navbar />
//       <div>
//         <h2>Formations de l'employé</h2>
//         <ul>
//           {formations.map((formation, index) => (
//             formation.etat === 'Terminer' && (
//               <li key={index}>{formation.titre}</li>
//             )
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
