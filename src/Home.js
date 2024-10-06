import './Home.css';
import Navbar  from './Employes/Navbar'; 
import img from './téléchargement (11).png';
export default function Home(){
return(
    <div className='d-flex'>
    <Navbar />
    <img src={img} style={{height:900,width:1200}}></img>
</div>
    )
}