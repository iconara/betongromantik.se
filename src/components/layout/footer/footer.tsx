import {component$} from '@builder.io/qwik'
import styles from './footer.module.css'

export default component$(() => {
  return (
    <footer class={styles.footer}>
      &copy; Theo Tolv 2016–{new Date().getUTCFullYear()}
    </footer>
  )
})
