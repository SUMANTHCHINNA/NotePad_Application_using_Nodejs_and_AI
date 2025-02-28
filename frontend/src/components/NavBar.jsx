import '../index.css'

const NavBar = () => {
    return (
        <nav className='Navbar'>
            <h1 className='Nav-title'> NotePad Application </h1>
            <div className='Nav-link'>
                <a href="/">HOME</a>  |  <a href="/Add-Note">ADD NOTE</a>
            </div>
        </nav>
    )
}
export default NavBar