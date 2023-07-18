import {component$} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'
import Main from '~/components/main/main'

export const head: DocumentHead = {
  title: 'Betongromantik',
  meta: [
    {
      name: 'description',
      content: 'Betongromantik, foton, vykort',
    },
  ],
}

export default component$(() => {
  return (
    <Main />
  )
})
