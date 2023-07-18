import {component$, useResource$, Resource, useSignal} from '@builder.io/qwik'
import type {PropFunction} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'
import {useLocation} from '@builder.io/qwik-city'
import styles from './postcards.module.css'

export const head: DocumentHead = {
  title: 'Vykort',
  meta: [
    {
      name: 'description',
      content: 'Information om vad vykorten föreställer',
    },
  ],
}

type PostcardSeries = {
  id: string
  name: string
  release: string
  description: string
  images: Postcard[]
}

type Postcard = {
  id: string
  description: string
}

interface PostcardDisplayProps {
  postcardSeries: PostcardSeries
  postcard: Postcard
  showDescription: boolean
  onSelected$: PropFunction<() => void>
}

const PostcardDisplay = component$<PostcardDisplayProps>(({postcardSeries, postcard, showDescription, onSelected$: selectedHandler}) => {
  return (
    <div class={styles.postcard} onClick$={selectedHandler}>
      <img
        class={showDescription ? styles.selected : undefined}
        src={`/postcards/${postcardSeries.id}/${postcard.id}-sm.jpg`}
        width="100"
        height="100"
        alt={postcard.description} />
      {showDescription && <div class={styles['postcard-description']}>{postcard.description}</div>}
    </div>
  )
})

interface PostcardSeriesDisplayProps {
  postcardSeries: PostcardSeries
}

const PostcardSeriesDisplay = component$<PostcardSeriesDisplayProps>(({postcardSeries}) => {
  const selectedPostcard = useSignal<Postcard | null>(null)
  return <section class={styles['postcard-series']}>
    <div class={styles['postcard-series-meta']}>
      <h2>{postcardSeries.name}</h2>
      <h3>{postcardSeries.release}</h3>
      <p>{postcardSeries.description}</p>
    </div>
    <div class={styles.postcards}>
      {postcardSeries.images.map((postcard) => {
        return <PostcardDisplay
          key={postcard.id}
          showDescription={selectedPostcard.value === postcard}
          postcardSeries={postcardSeries}
          postcard={postcard}
          onSelected$={() => {
            selectedPostcard.value = selectedPostcard.value === postcard ? null : postcard
          }}/>
      })}
    </div>
  </section>
})

export default component$(() => {
  const location = useLocation()
  const postcardSeriesResource = useResource$<PostcardSeries[]>(async () => {
    const response = await fetch(`${location.url.origin}/postcards/meta.json`)
    const postcardMeta = await response.json() as PostcardSeries[]
    postcardMeta.sort((a, b) => b.id.localeCompare(a.id))
    return postcardMeta
  })
  return (
    <div class={styles.container}>
      <section class={styles.intro}>
        <h1>Vykort</h1>
        <p>
          Sen 2018 har jag gjort vykort med motiv från norra Gotland. Här hittar du alla motiv,
          klicka på bilderna för att läsa mer om vad de föreställer.
        </p>
      </section>
      <Resource
        value={postcardSeriesResource}
        onResolved={
          (allPostcardSeries) => {
            return (<>
              {allPostcardSeries.map((postcardSeries) =>
                (<PostcardSeriesDisplay key={postcardSeries.id} postcardSeries={postcardSeries} />)
              )}
            </>)
          }} />
    </div>
  )
})
