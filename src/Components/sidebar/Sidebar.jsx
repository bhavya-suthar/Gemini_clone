import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  console.log("🚀 ~ Sidebar ~ extended:", extended);

  const { onSend, prevPrompt, setRecentPrompt ,newChat} = useContext(Context);

  const loadPrompt =async(prompt)=>{
    setRecentPrompt(prompt)
    await onSend(prompt)
  }

  return (
    <>
      <div className="sidebar">
        <div className="top">
          <img
            className="menu"
            src={assets.menu_icon}
            alt=""
            onClick={() => setExtended((prev) => !prev)}
          />
          <div className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended ? <p onClick={()=>newChat()}>New Chat</p> : null}
          </div>

          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompt.map((item, index) => {
                return (
                  <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index}>
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,20)}...</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended ? <p>Setting</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
