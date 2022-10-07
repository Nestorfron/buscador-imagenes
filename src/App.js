import { useState } from 'react';
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({ photos })
  return (
    <div>
      <header>
        <Formik 
        initialValues={{search:''}}
        onSubmit={async values => {
          const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
            headers: {
              'Authorization': 'Client-ID 1ttZyjQBgq-YptYfXBC9N1QBwKbU_FH6mR3KeO54kpk'
            }
          })
          const data = await response.json()
          setPhotos(data.results)
        }}>
        <Form>
          <Field name= "search"></Field>
        </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo =>
            <article key={photo.id} onClick={()=>open(photo.links.html)}>
              <img src={photo.urls.thumb} alt={[photo.description, photo.alt_description].join('-')}></img>
              <p>{[photo.description, photo.alt_description].join('-')}</p>
            </article>)}
        </div>
      </div>
    </div>
    
  );
}

export default App;
