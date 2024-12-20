import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState(""); //save input data
  //   console.log("🚀 ~ ContextProvider ~ input:", input);

  const [recentPrompt, setRecentPrompt] = useState(""); //when click send btn input store in this state
  //   console.log("🚀 ~ ContextProvider ~ recentPrompt:", recentPrompt);

  const [prevPrompt, setPrevPrompt] = useState([]); //store all the inputs
  //   console.log("🚀 ~ ContextProvider ~ prevPrompt:", prevPrompt);

  const [showResult, setShowResult] = useState(false); //hide all card and display reponse
  //   console.log("🚀 ~ ContextProvider ~ showResult:", showResult);

  const [loading, setLoading] = useState(false); // for displaying loading animation
  //   console.log("🚀 ~ ContextProvider ~ loading:", loading);

  const [resultData, setResultData] = useState(""); // for display result in webpage
  //   console.log("🚀 ~ ContextProvider ~ resultData:", resultData);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  //   const onSend = async (prompt) => {
  //     setResultData("");
  //     setLoading(true);
  //     setShowResult(true);
  //     setRecentPrompt(input);
  //     const response = await run(input);
  //     let responseArray = response.split("**");
  //     let newResponse="";
  //     for (let i = 0; i < responseArray.length; i++) {
  //       if (i === 0 || i % 2 !== 1) {
  //         newResponse += responseArray[i];
  //       } else {
  //         newResponse += "<b>" + responseArray[i] + "</b>";
  //       }
  //     }
  //     console.log("🚀 ~ onSend ~ response:", response);
  //     setResultData(response);
  //     setLoading(false);
  //     setInput("");
  //   };

  const newChat =()=>{
    setLoading(false)
    setShowResult(false)
  }

  const onSend = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    const query = prompt || input; // Use prompt if provided, otherwise use input
    let response;
    if (prompt !== undefined) {
      response = await run(query);

      setRecentPrompt(query);
    } else {
      setPrevPrompt((prev) => [...prev, query]);
      setRecentPrompt(query)
      response = await run(query)
    }

    try {
      // const response = await run(query);
      let responseArray = response.split("**");
      let newResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("</br>");
      let newResponseArray = newResponse2.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + "  ");
      }

      // console.log("🚀 ~ onSend ~ response:", response);
      // setResultData(newResponse2);
    } catch (error) {
      console.error("Error in onSend:", error);
      setResultData("An error occurred while fetching the response.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // onSend("what is react js?")

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSend,
    input,
    setInput,
    // run,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
