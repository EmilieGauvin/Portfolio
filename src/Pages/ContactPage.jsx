import React, { useMemo, useState, useEffect } from "react";
import Experience from "../Experience/Experience";
import "./ContactPage.css";

export default function ContactPage({ english, changeLanguage }) {
  const [showContent, setShowContent] = useState(false)

  const experience = useMemo(() => {
    const experience = new Experience
    return experience
  })

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100)

    experience.navigation.on('notContactPage', () => {
      setShowContent(false)
    })

    return () => experience.navigation.off('notContactPage', () => { })
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

  const handleChangeLanguage = () => {
    changeLanguage()
  }

  return (
    <div className={showContent === false ? "contact-page hide" : "contact-page show"}>
      <section className='title '>
        <h1 className="title">{english === true ? englishTitle : frenchTitle}</h1>
        <button className="title" onClick={handleChangeLanguage}>{english === true ? 'en français ?' : 'in english?'}</button>
      </section>

      <section className='main '>
        <div className="line"></div>
        <section className='text '>
          <h4 className='text'>{english === true ? englishText : frenchText}</h4>
          <br />
          <h5 className=" email textButton">contact@emiliegauvin.com</h5>
          <br />
          <div className="social">
            <a className="textButton" href="https://twitter.com/EmilieGauvin_" target="_blank">Twitter</a>
            <a className='textButton' href="https://github.com/EmilieGauvin" target="_blank">GitHub</a>
            <a className='textButton' href="https://www.linkedin.com/in/emilie-gauvin" target="_blank">LinkedIn</a>
          </div>
        </section>
        <div></div>
      </section>
    </div>
  );
}