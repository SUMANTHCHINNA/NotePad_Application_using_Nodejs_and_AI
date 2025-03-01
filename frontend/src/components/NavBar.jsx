import '../index.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className='Navbar'>
            <h1 className='Nav-title'> NotePad Application </h1>
            <div className='Nav-link'>
                <Link to={"/"}>Home</Link> | <Link to={"/add-note"}>ADD NOTE</Link>
            </div>
        </nav>
    )
}
export default NavBar