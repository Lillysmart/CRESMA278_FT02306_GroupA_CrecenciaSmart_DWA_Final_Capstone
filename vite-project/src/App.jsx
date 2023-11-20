import React ,{useState , useEffect} from "react"
import {Routes , Route} from "react-router-dom"

import { ShowPreview } from "./Components/Preview"

 const App =()=>{
    return (


        <div>
        <Routes>
            <Route path="/" element ={<ShowPreview/>}/>
            <Route path="/books" element ={<h1> Hello there</h1>}/>
        </Routes>
        </div>
    )
 }

 export default App