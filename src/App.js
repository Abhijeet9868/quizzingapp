import { useState, useEffect } from "react";
import QuizBrain from './QuizBrain';
// import { FaYoutube, FaGithub, FaInstagram } from 'react-icons/fa';

//! Root app 
function App() {
  

  const [startbtn, setstartbtn] = useState(false);
  const [QuesJson, setQuesJson] = useState(null);
  const [starttext, setstarttext] = useState("START");
  const [title, settitle] = useState("Quiz");
  // const [reset, setreset] = useState(false);


  function selectinputs(){
    setstartbtn(!startbtn);
    setstarttext("Loading") 
  };

  function ResetBtn() {
    setstartbtn(false);
    setQuesJson(null);
    // setreset(false);
    setstarttext("START");
  };



  //! Effect Function 
  useEffect(() => {
    let dblink = 'https://opentdb.com/api.php?amount=10'

    if (startbtn) {

      const catagory = document.getElementById("ctgy");
      const diffculty = document.getElementById("diff");
      
      dblink += `&category=${catagory.value}`;
      dblink += `&difficulty=${diffculty.value}`;

      fetch(dblink)
        .then((result) => {
          settitle("Quiz")
          return result.json();
        })
        .then((result) => {
          setQuesJson(result.results);
        })
        .catch((error) => {
          setstarttext("Retry")
          settitle("Error")
        })
    }
  }, [ startbtn])

  return (
    <div className="mainQuiz">

      <div className="header">
        <h1>{title}</h1>
      </div>
      {QuesJson === null
        ?
        <button className="start" type="button" onClick={selectinputs} > {starttext} </button>
        :
        <div >
          {QuesJson && <QuizBrain Ques={QuesJson} ResetBtn={ResetBtn} />}
        </div>
      }
      {!QuesJson &&  
      <div >
      <div className="OptionBox">

        <div className="category">
          <p>Category:</p>

          <div className="select">
            <select name="option" id="ctgy">
                <option value="9">General Knowledge</option>
                <option value="18">Computer Science</option>
                <option value="17">Science & Nature</option>
                <option value="19">Mathematics</option>
                <option value="30">Gadgets</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="27">Animals</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
            </select>
          </div>
        </div>

        <div className="diffculty">
          <p>Diffculty:</p>

          <div className="select">
            <select id="diff">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        

      </div>
        <p style={{color:"white", lineHeight:"30px"}}>I am excited to unveil my newest endeavor, an engaging and straightforward quiz game! With a single button press, this game fetches 10 random questions from a reliable database for the player. The player has the option to bypass questions and return to them at a later time. Once all questions have been answered, the game reveals the final score. It's an excellent method to challenge your Knowledgewhile enjoyeing yourself</p>
      </div>
          }
    </div>
  );
}

export default App;
