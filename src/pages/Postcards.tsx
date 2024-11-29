import {useState} from 'react'
import POSTCARDS from '../media/postcards.json'
import './Postcards.css'

type PostcardSeries = {
  id: string
  name: string
  release: string
  description: string
  images: PostcardInfo[]
}

type PostcardInfo = {
  id: string
  description: string
}

type PostcardProps = {
  series: PostcardSeries
  postcard: PostcardInfo
  selected: boolean
  onSelected: (p: PostcardInfo | undefined) => void
}

function Postcard({series, postcard, selected, onSelected}: PostcardProps) {
  function toggleSelected() {
    onSelected(selected ? undefined : postcard)
  }
  return (
    <div className={`postcard ${selected && 'selected'}`}>
      <figure onClick={toggleSelected}>
        <img src={`/vykort/${series.id}/${postcard.id}-sm.jpg`} alt={postcard.description}/>
        <figcaption>{postcard.description}</figcaption>
      </figure>
    </div>
  )
}

type PostcardSelectionEvent = {
  series: PostcardSeries
  postcard: PostcardInfo
}

type PostcardSeriesProps = {
  series: PostcardSeries
  selectedPostcard: PostcardInfo | undefined
  onPostcardSelected: (e: PostcardSelectionEvent | undefined) => void
}

function PostcardSeries({series, selectedPostcard, onPostcardSelected}: PostcardSeriesProps) {
  return (
    <section className="series">
      <div className="details">
        <h2>{series.name}</h2>
        <h3>{series.release}</h3>
        <p>{series.description}</p>
      </div>
      <div className="images">
        {series.images.map((postcard) => (
          <Postcard key={postcard.id}
                    series={series}
                    postcard={postcard}
                    selected={selectedPostcard === postcard}
                    onSelected={(postcard) => onPostcardSelected(postcard !== undefined ? {series, postcard} : undefined)}/>))}
      </div>
    </section>
  )
}

function Postcards() {
  const postcards = POSTCARDS.slice().reverse()
  const [selectedPostcard, setSelectedPostcard] = useState(undefined as PostcardSelectionEvent | undefined)
  return (
    <div className="postcards">
      <h1>Vykort</h1>
      <p>
        Sen 2018 har jag gjort vykort med motiv från norra Gotland, och sedan 2024 också Stockholm. Här hittar du alla motiv, klicka på bilderna för att läsa mer om vad de föreställer.
      </p>
      <div className="gallery">
        {postcards.map((series) => (
          <PostcardSeries key={series.id}
                          series={series}
                          selectedPostcard={selectedPostcard?.series === series ? selectedPostcard.postcard : undefined}
                          onPostcardSelected={setSelectedPostcard}/>))}
      </div>
    </div>
  )
}

export default Postcards
