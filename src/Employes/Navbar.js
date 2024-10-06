import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCheck, faHandshake, faHome } from '@fortawesome/free-solid-svg-icons'; // Import faHome icon
import '../App.css';
import '../Employes/emp.css';

export default function Navbar() {
  const [employeesDropdownVisible, setEmployeesDropdownVisible] = useState(false);
  const [formationsDropdownVisible, setFormationsDropdownVisible] = useState(false);
  const [participationDropdownVisible, setParticipationDropdownVisible] = useState(false);

  const toggleEmployeesDropdown = () => {
    setEmployeesDropdownVisible(!employeesDropdownVisible);
  };

  const toggleFormationsDropdown = () => {
    setFormationsDropdownVisible(!formationsDropdownVisible);
  };

  const toggleParticipationDropdown = () => {
    setParticipationDropdownVisible(!participationDropdownVisible);
  };

  return (
    <nav style={{ height: 1020, paddingTop: 50, paddingRight: 120 }}>
      <ul style={{ marginTop: 125, listStyle: "none" }}>
        {/* Home */}
        <li>
          <FontAwesomeIcon
            style={{
              color: "#fff",
              fontSize: 25,
              paddingTop: 70,
              marginLeft: 50,
            }}
            icon={faHome}
          />
          <span>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "yellow",
                fontSize: 22,
                color: "#fff",
              }}
              className="m-1 no-print"
            >
              Home
            </Link>
          </span>
        </li>
        {/* Dropdown des employés */}
        <li onClick={toggleEmployeesDropdown}>
          <FontAwesomeIcon
            style={{
              color: "#fff",
              fontSize: 25,
              paddingTop: 70,
              marginLeft: 50,
            }}
            icon={faUserCircle}
          />
          <span>
            <Link
              to="/Employes"
              style={{
                textDecoration: "none",
                color: "yellow",
                fontSize: 22,
                color: "#fff",
              }}
              className="m-1 no-print"
            >
              Employes
            </Link>
          </span>
          {employeesDropdownVisible && (
            <ul className="dropdown">
              <li style={{ listStyleType: "none" }}>
                {/* Ajoutez ici les éléments de la liste déroulante si nécessaire */}
              </li>
            </ul>
          )}
        </li>
        {/* Dropdown des formations */}
        <li onClick={toggleFormationsDropdown}>
          <FontAwesomeIcon
            icon={faCheck}
            style={{
              color: "#fff",
              fontSize: 25,
              paddingTop: 30,
              marginLeft: 50,
            }}
          />
          <span>
            <Link className='no-print'
              style={{ color: "#fff", textDecoration: "none", fontSize: 22 }}
              to="/formations"
            >
              Formations
            </Link>
          </span>
          {formationsDropdownVisible && (
            <ul className="dropdown">
              <li style={{ listStyleType: "none" }}>
                {/* Ajoutez ici les éléments de la liste déroulante si nécessaire */}
              </li>
            </ul>
          )}
        </li>
        {/* Dropdown de la participation */}
        <li onClick={toggleParticipationDropdown}>
          <FontAwesomeIcon
            icon={faHandshake}
            style={{
              color: "#fff",
              fontSize: 25,
              paddingTop: 30,
              marginLeft: 50,
            }}
          />
          <span>
            <Link className=''
              style={{ textDecoration: "none", color: "#fff", fontSize: 22 }}
              to="/participations"
            >
              Participation
            </Link>
          </span>
          {participationDropdownVisible && (
            <ul className="dropdown">
              <li style={{ listStyleType: "none" }}>
                {/* Ajoutez ici les éléments de la liste déroulante si nécessaire */}
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
