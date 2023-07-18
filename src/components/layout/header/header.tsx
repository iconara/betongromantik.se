import {component$} from '@builder.io/qwik'
import {Link, useLocation} from '@builder.io/qwik-city'
import styles from './header.module.css'
import BetongromantikLogo from '~/media/betongromantik.svg?jsx'

const NavLink = component$<{href: string, title: string}>(({href, title}) => {
  const location = useLocation()
  const isSelected = location.url.pathname.startsWith(href)
  return (
    <Link
      href={href}
      class={isSelected && styles.selected}>
      {title}
    </Link>
  )
})

export default component$(() => {
  return (
    <header class={styles.header}>
      <Link href="/">
        <BetongromantikLogo class={styles.logo} />
      </Link>
      <nav class={styles.navigation}>
        <NavLink href="/vykort" title="Vykort" />
        <NavLink href="/instagram" title="Instagram" />
      </nav>
    </header>
  )
})
