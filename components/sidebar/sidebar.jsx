import './sidebar.css' ;
import {assets} from '../../src/assets/assets'
import { useContext, useState } from 'react';
import { Context } from '../../src/context/context';
const Sidebar1 =()=>{
 const [extended , setExtended] = useState(false)
 const {onSent , prevPrompts ,SetrecentPrompt, newChat } = useContext(Context)
 const loadprompt = async (prompt)=>{
  SetrecentPrompt(prompt)
  await onSent(prompt)
 }
const ExtendHandler = ()=>{
  setExtended(!extended)
}
  return(
   <div className="sidebar">
      <div className="top">
        <img  className="menu" onClick={ExtendHandler} src={assets.menu_icon} alt="" />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended?<p>New Chat</p>:null}
        </div>
      {extended?
        <div className="recent">  
          <p className='recent-title'>Recent</p>
          {prevPrompts.map((item)=>{
          return(
            <>
            <div onClick={()=>loadprompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0,18)}....</p>
            </div>
            </>
            )
          })}

        </div>
        :null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended?<p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Settings</p>:null}
        </div>
      </div>
   </div>
  )

}

export default Sidebar1