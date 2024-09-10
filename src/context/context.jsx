import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import run from "../config/geminiApi";

export const Context = createContext();

const ContextProvider = (props) => {
   const [input, Setinput] = useState("");
   const [recentPrompt, SetrecentPrompt] = useState("");
   const [prevPrompts, SetprevPrompt] = useState([]);
   const [showResult, SetshowResult] = useState(false);
   const [loading, SetLoading] = useState(false);
   const [resultData, SetresultData] = useState(" ");

  const delay= (index , nextWord)=>{
     setTimeout(()=>{
      SetresultData(prev=>prev+nextWord)
     },75*index)
  }
  const newChat = ()=>{
   SetLoading(false)
   SetshowResult(false)
  }

   const onSent = async (prompt) => {
      SetresultData("");
      SetLoading(true);
      SetshowResult(true);
      let response ;
      if(prompt!==undefined){
         response= await run(prompt)
         SetrecentPrompt(prompt)
      }
      else{
         SetprevPrompt(prev=>[...prev , input])
         SetrecentPrompt(input)
          response = await run(input);
      }

      try {
         const responseArray = response.split("**");
         let newArray = ""; // تهيئة newArray كـ "" 
         for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
               newArray += responseArray[i];
            } else {
               newArray += `<b>${responseArray[i]}</b>`;
            }
         }
         const newArray2 = newArray.split("*").join("</br>")
         const newResponseArray = newArray2.split(" ")
         for(let i =0 ; i<newResponseArray.length ; i++){
            const nextWord = newResponseArray[i]
            delay(i , nextWord+" ")
         }
      } catch (error) {
         console.error("Error fetching response:", error.message); // سجل رسالة الخطأ
         console.error("Error details:", error); // سجل تفاصيل الخطأ
         SetresultData("Error fetching data");
      } finally {
         SetLoading(false);
         Setinput("");
      }
   };
   

   const contextValue = {
      prevPrompts,
      SetprevPrompt,
      onSent,
      SetrecentPrompt,
      recentPrompt,
      showResult,
      loading,
      resultData,
      input,
      Setinput ,
      newChat
   };

   return (
      <Context.Provider value={contextValue}>
         {props.children}
      </Context.Provider>
   );
};

// إضافة التحقق من النوع لـ children
ContextProvider.propTypes = {
   children: PropTypes.node.isRequired,
};

export default ContextProvider;
