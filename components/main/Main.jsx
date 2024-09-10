import './Main.css'
import { assets } from '../../src/assets/assets'
import { useContext } from 'react'
import { Context } from '../../src/context/context'
const Main=()=>{
   
   const { onSent , recentPrompt , showResult , loading , resultData , Setinput , input} = useContext(Context)
    return(
        <div className='main'>
            <div className="nav">
           <p>Gemini</p>
           <div className='wrap'>
           <img style={{width:"60px"}} src={assets.user_icon} alt="" />
           </div>
            </div>
            <div className="main-container">

                {!showResult?<>
                                <div className="greet">
                                <p><span>Hello , dev.</span></p>
                                <p>How Can I help You Today?</p>
                                </div>
                                <div className="cards">
                                    <div className="card">
                                        <p>Suggest Beautiful Places To See On An Upcoming Road Trip</p>
                                        <img src={assets.compass_icon} alt="" />
                                    </div>
                                    <div className="card">
                                        <p>Briefly Summarize This Concept : Urban Planning</p>
                                        <img src={assets.bulb_icon} alt="" />
                                    </div>
                                    <div className="card">
                                        <p>Brainstorm Team Bonding Activities For Our Work Restart </p>
                                        <img src={assets.message_icon} alt="" />
                                    </div>
                                    <div className="card">
                                        <p>Improve The Readability Of The Following Code</p>
                                        <img src={assets.code_icon} alt="" />
                                    </div>
                                </div>
                                </>
                                : <div className='result'>
                                    <div className="result-title">
                                        <img src={assets.user_icon} alt="" />
                                        <p>{recentPrompt}</p>
                                    </div>
                                    <div className="result-data">
                                        <img src={assets.gemini_icon} alt="" />
                                        {loading? <div className="loader">
                                            <hr />
                                            <hr />
                                            <hr />
                                        </div>
                                        :<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                                    </div>
                                    
                                </div>
                                  }

              <div className="main-bottom">
                <div className="search-box">
                <input onChange={(e)=>Setinput(e.target.value)} value={input} type="text" placeholder='Enter Your Prompt Here...' />
              <div className="inputicons">
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                {input?<img id='tran' onClick={()=>onSent()} src={assets.send_icon} alt=""/>:<div style={{display:'none'}}> </div>}
                </div>
               </div> 
              <div className='bottom-info'>
                <p>Gemini may offer inaccurate information, including those related to people, so we advise you to verify his responses. Your privacy on "Gemini App"</p>
              </div>    
              </div>
            </div>
        </div>
        


    )
}
export default Main