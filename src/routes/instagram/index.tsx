import {component$} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'
import styles from './instagram.module.css'
import ConcreteromanticQr from '~/media/concreteromantic_qr.png?jsx'
import BetongromantikQr from '~/media/betongromantik_qr.png?jsx'

export const head: DocumentHead = {
  title: 'Instagram',
  meta: [
    {
      name: 'description',
      content: 'Hitta Betongromantik på Instagram',
    },
  ],
}

export default component$(() => {
  return (
    <div class={styles.container}>
      <section>
        <a href="https://instagram.com/concreteromantic">
          <ConcreteromanticQr />
        </a>
        <p>Dagliga bilder</p>
      </section>
      <section>
        <a href="https://instagram.com/betongromantik">
          <BetongromantikQr />
        </a>
        <p>Bakom kulisserna</p>
      </section>
    </div>
  )
})
