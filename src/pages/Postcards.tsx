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

function Postcard(series: PostcardSeries, postcard: PostcardInfo) {
  const [selected, setSelected] = useState(false)
  const toggleSelected = () => setSelected(!selected)
  return (
    <div key={postcard.id} className={["postcard", selected ? "selected" : undefined].join(" ")}>
      <figure onClick={toggleSelected}>
        <img src={`/vykort/${series.id}/${postcard.id}-sm.jpg`} alt={postcard.description}/>
        <figcaption>{postcard.description}</figcaption>
      </figure>
    </div>
  )
}

function PostcardSeries(series: PostcardSeries) {
  return (
    <section key={series.id} className="series">
      <div className="details">
        <h2>{series.name}</h2>
        <h3>{series.release}</h3>
        <p>{series.description}</p>
      </div>
      <div className="images">
        {series.images.map((postcard) => Postcard(series, postcard))}
      </div>
    </section>
  )
}

function Postcards() {
  const postcards = POSTCARDS.slice().reverse()
  return (
    <div className="postcards">
      <h1>Vykort</h1>
      <p>
        Sen 2018 har jag gjort vykort med motiv från norra Gotland. Här hittar du alla motiv, klicka på bilderna för att läsa mer om vad de föreställer.
      </p>
      <div className="gallery">
        {postcards.map(PostcardSeries)}
      </div>
    </div>
  )
}

export default Postcards
