import {component$} from '@builder.io/qwik'
import {Link} from '@builder.io/qwik-city'
import styles from './header.module.css'
import BetongromantikLogo from '~/media/betongromantik.svg?jsx'

export default component$(() => {
  return (
    <header class={styles.header}>
      <Link href="/">
        <BetongromantikLogo class={styles.logo} />
      </Link>
      <nav class={styles.navigation}>
        <Link href="/vykort">Vykort</Link>
        <Link href="/instagram">Instagram</Link>
      </nav>
    </header>
  )
})
