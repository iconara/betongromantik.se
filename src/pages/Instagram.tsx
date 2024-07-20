import ConcreteromanticIgQr from '../media/concreteromantic_qr.png'
import BetongromantikIgQr from '../media/betongromantik_qr.png'
import './Instagram.css'

function Instagram() {
  return (
    <>
      <div className="container">
        <section>
          <a href="https://instagram.com/concreteromantic">
            <img src={ConcreteromanticIgQr} alt="@concreteromantic på Instagram"/>
          </a>
          <p>Dagliga bilder</p>
        </section>
        <section>
          <a href="https://instagram.com/betongromantik">
          <img src={BetongromantikIgQr} alt="@betongromantik på Instagram"/>
          </a>
          <p>Bakom kulisserna</p>
        </section>
      </div>
    </>
  )
}

export default Instagram
