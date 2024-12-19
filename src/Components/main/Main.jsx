import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSend,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);
  // console.log("🚀 ~ Main ~ input:", input)

  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini</p>
          <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello,Bhavya.</span>
                </p>
                <p>How can I help you Today?</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>
                    Suggest beautiful places to see on an upcoming road trip
                  </p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                  <p>Briefly Summerize this concept: urban planning</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                  <p>
                    Brainstrom team boanding activities for our work retreat
                  </p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                  <p>Improve the readebility of the following code</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}
          <div className="main-bottom">
            <div className="search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Enter a Prompt Here"
              />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img onClick={() => onSend()} src={assets.send_icon} alt="" />
              </div>
            </div>
            <p className="bottom-info">
              Gemini may display inaccurate info, including about people,so
              double check its response,Your privacy and gemini Apps.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
