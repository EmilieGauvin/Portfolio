import React, { useState, useEffect } from "react";
import Experience from "../Experience/Experience";
import "./ContactPage.css";


export default function ContactPage(props) {
  const experience = new Experience()
  const navigation = experience.navigation
  const [showContent, setShowContent] = useState(false)
  const [english, setEnglish] = useState(props.english)

  useEffect(() =>
  {
    props.onChange(english)
  }, [english])

  navigation.on('notContactPage', () =>
  {
    setShowContent(false)
  })

  useEffect(() => {
    setShowContent(true)
  }, [])

  const englishTitle = 'Contact';
  const englishText = `Want to tell me about your project 
or learn more about what I do ? 
Get in touch !
`


  const frenchTitle = `Contact`;
  const frenchText = `Vous souhaitez me parler de votre projet
ou en apprendre plus sur ce que je fais ?
Contactez-moi !
`

const handleChange = () => 
{
    setEnglish(prevState=> !prevState);
}

  return (
    <div className={showContent === false ? "contact-page hide" : "contact-page show"}>
    <section className='title '>
      <h1 className="title">{english === true ? englishTitle : frenchTitle}</h1>
      <button className="title" onClick={handleChange}>{english === true ? 'en français ?' : 'in english?'}</button>
    </section>
    
    <section className='main '>
      <div className="line"></div>
      <section className='text '>
        <h4 className='text'>{english === true ? englishText : frenchText}</h4>
        <br/>
        <h5 className=" email textButton"><i>contact@emiliegauvin.com</i></h5>
        <br/>
        <div className="social">
          {/* <h5 className="textButton"><i>instagram</i></h5> */}
          {/* <h5 className="textButton"><i>malt</i></h5> */}
          <a className='textButton' href="https://github.com/EmilieGauvin" target="_blank"><i>github</i></a>
        </div>
      </section>
      <div></div>
    </section>
  </div>
);
}