import React, { useState, useEffect } from "react";
import Experience from "../Experience/Experience";
import "./HomePage.css";
import LoadingAnim from "../LoadingAnim/LoadingAnim";


export default function HomePage(props) {
  const experience = new Experience()
  const navigation = experience.navigation
  const [showContent, setShowContent] = useState(false)
  const [english, setEnglish] = useState(props.english)
  const [showInstuction, setShowInstruction] = useState(false);


  useEffect(() =>
  {
    props.onChange(english)
  }, [english])

  navigation.on('notHomePage', () =>
  {
    setShowContent(false)
  })

  useEffect(() => {
    setShowContent(true)
  }, [])

  const englishTitle = 'Hello';
  const englishText = `I’m Emilie, a creative developer 
with a background in architecture, 
graphic design, and mathematics.`


  const frenchTitle = `Bonjour`;
  const frenchText = `Je suis Émilie, développeuse créative
avec un background en architecture, 
design graphique et mathématiques. `

  const handleChange = () => 
  {
      setEnglish(prevState=> !prevState);
  }

  return (
    <div className={showContent === false ? "home-page hide" : "home-page show"}>
      <div onMouseEnter={() => setShowInstruction(true)} onMouseLeave={() => setShowInstruction(false)}>
        {<LoadingAnim />}
      </div>
      <div className={showInstuction === false ? 'instruction hideInstuction' : 'instruction showInstuction'}> 
        <p><i>{english === true ? 'Grab the shapes and match them to the drawing' : 'Déplace les formes dans les dessins correspondants'}</i></p>
      </div>

    <section className='title home'>
      <h1 className="title">{english === true ? englishTitle : frenchTitle}</h1>
      <button className="title" onClick={handleChange}>{english === true ? 'Bonjour ?' : 'Hello?'}</button>
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
