import {Link} from 'react-router-dom'
import Logo from '../media/betongromantik.svg'
import './Error.css'

function Error() {
  return (
    <>
      <header></header>
      <main className="error">
        <img src={Logo} alt="Betongromantik" width="100" height="100"/>
        <h1>Pang!</h1>
        <p className="message">Det blev fel! Det är bäst du går <Link to={"/"}>tillbaks till förstasidan</Link> och försöker igen.</p>
      </main>
      <footer></footer>
    </>
  )
}

export default Error
