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

  const englishTitle = 'Contact me';
  const englishText = `I’m Emilie, a creative developer 
with a background in architecture,
graphic design, and mathematics.`


  const frenchTitle = `Me contacter`;
  const frenchText = `Je suis Emilie, une creative developpeuse
avec un background en architecture,
design graphique et mathématiques. `

const handleChange = () => 
{
    setEnglish(prevState=> !prevState);
}

  return (
    <div className={showContent === false ? "contact hide" : "contact show"}>
    <section className='title '>
      <h1 className="title">{english === true ? englishTitle : frenchTitle}</h1>
      <button className="title" onClick={handleChange}>{english === true ? 'Bonjour ?' : 'Hello?'}</button>
    </section>
    
    <section className='main '>
      <div className="line"></div>
      <section className='text '>
        <h4 className='text'>{english === true ? englishText : frenchText}</h4>
      </section>
    </section>
  </div>
);
}