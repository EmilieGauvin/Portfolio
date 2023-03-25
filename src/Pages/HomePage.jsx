import React, { useMemo, useState, useEffect } from "react";
import Experience from "../Experience/Experience";
import "./HomePage.css";
import LoadingAnim from "../LoadingAnim/LoadingAnim";


export default function HomePage({ english, changeLanguage }) {
  const [showContent, setShowContent] = useState(false)
  const [showInstuction, setShowInstruction] = useState(false);

  const experience = useMemo(() => {
    const experience = new Experience
    return experience
  })

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100)

    experience.navigation.on('notHomePage', () => {
      setShowContent(false)
    })

    return () => experience.navigation.off('notHomePage', () => { })
  }, [])

  const englishTitle = 'Hello';
  const englishText = `I’m Emilie, a creative developer 
with a background in architecture`


  const frenchTitle = `Bonjour`;
  const frenchText = `Je suis Émilie, développeuse créative
avec un background en architecture`

  const handleChangeLanguage = () => {
    changeLanguage()
  }

  return (
    <div className={showContent === false ? "home-page hide" : "home-page show"}>
      <div onMouseEnter={() => setShowInstruction(true)} onMouseLeave={() => setShowInstruction(false)}>
        {<LoadingAnim />}
      </div>
      <div className={showInstuction === false ? 'instruction hideInstuction' : 'instruction showInstuction'}>
        <p>{english === true ? 'Grab the shapes and match them to the drawing' : 'Déplace les formes dans les dessins correspondants'}</p>
      </div>

      <section className='title home'>
        <h1 className="title">{english === true ? englishTitle : frenchTitle}</h1>
        <button className="title" onClick={handleChangeLanguage}>{english === true ? 'Bonjour ?' : 'Hello?'}</button>
      </section>
      <section className='main '>
        <div className="line"></div>
        <section className='text home'>
          <h4 className={english === true ? 'text english' : 'text french'}>{english === true ? englishText : frenchText}</h4>
        </section>
      </section>
    </div>
  );
}
