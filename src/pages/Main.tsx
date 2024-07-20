import {Link, NavLink, Outlet} from 'react-router-dom'
import Logo from '../media/betongromantik.svg'

function Main() {
  return (
    <>
      <header>
        <Link to={"/"}><img src={Logo} alt="Betongromantik" className="logo"/></Link>
        <nav>
          <NavLink to={"/vykort"} className={({isActive}) => isActive ? "selected" : ""}>Vykort</NavLink>
          <NavLink to={"/instagram"} className={({isActive}) => isActive ? "selected" : ""}>Instagram</NavLink>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        &copy; Theo Tolv 2016–{new Date().getUTCFullYear()}
      </footer>
    </>
  )
}

export default Main
