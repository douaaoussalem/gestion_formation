import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employe from './Employes/Employes';
import AjouterEmploye from './Employes/Ajouter'
import EditerEmploye from './Employes/Edit';
import Formation from './Formations/Formations';
import AjouterFormation from './Formations/Ajouter';
import EditerFormation from "./Formations/Edit";
import Participations from './Participations/Participations';
import AjouterParticipation from './Participations/Ajouter';
import EditerParticipation from './Participations/Edit';
import VoirFormations from './Employes/VoirFormations';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Employes" element={<Employe />} />
          <Route path="/Add" element={<AjouterEmploye />} />
          <Route path="/Update/:id" element={<EditerEmploye />} />
          <Route path="/formations" element={<Formation />} />
          <Route path="/AddFormations" element={<AjouterFormation />} />
          <Route path="/UpdateF/:id" element={<EditerFormation />} />
          <Route path="/Participations" element={<Participations />} />
          <Route path="/AddParticipations" element={<AjouterParticipation />} />
          <Route path="/UpdateP/:id" element={<EditerParticipation />} />
          <Route path="/Voir/:id" element={<VoirFormations />} />
       
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
