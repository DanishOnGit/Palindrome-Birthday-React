import React, { useState } from "react";
import "./styles.css";
import clock from "./clock.gif"
var date,finalOutput;

export default function App() {
const[outputDiv,setOutputDiv]=useState("")

function btnClickHandler(){

if(date){
setOutputDiv(<img style={{marginTop:"1.5rem"}}src={clock} alt="Clock gif"></img>)

setTimeout(() => {
  checkPalindrome();
  
}, 2000);

}else{
  setOutputDiv(<p>Please enter date!</p>)
}
}

function checkPalindrome(){
  var inputDateArray=date.split("-")
   var inputYear=inputDateArray[0];
   var inputMonth=inputDateArray[1];
   var inputDate=inputDateArray[2];

   var flag=checkDiffCombo(inputYear,inputMonth,inputDate)

   if(flag){
     finalOutput=`Yayy! Your birthday is a palindrome in ${flag} format`
   }
   else{
     finalOutput=`Oh noo! Your birthday is not a palindrome in any format`
   }
   setOutputDiv(finalOutput)

}

function checkDiffCombo(yyyy,mm,dd){
var format1= yyyy+mm+dd;
var format2= dd+mm+yyyy;
var format3= mm+dd+yyyy.substring(2);
var format4= Number(mm)+dd+yyyy;

if(itisPalindrome(format1)){
  return `${yyyy}-${mm}-${dd}`
}else if(itisPalindrome(format2)){
return `${dd}-${mm}-${yyyy}`
}else if(itisPalindrome(format3)){
  return `${mm}-${dd}-${yyyy.substring(2)}`
}else if(itisPalindrome(format4)){
  return `${Number(mm)}-${dd}-${yyyy}`

}else{
  return null;
}
}

function itisPalindrome(combo){
var length=Math.floor(combo.length/2);
for(var i=0;i<length;i++){
  if(combo[i]!==combo[combo.length-(i+1)]){
        return false;
  }
}
return true;
}




  return (
    <div className="App">
      <h1>Let's find out if your DOB is a palindrome or not</h1><br/>
      <p className="instruction">It will check your the birthdate in dd-mm-yyyy, mm-dd-yy, m-dd-yyyy, yyyy-mm-dd formats.</p>
      
      <input onChange={(event)=>{date=event.target.value}} required type="date" /><br/>
      <button className="check" onClick={btnClickHandler} >Check</button>
       <div>{outputDiv}</div>
    
      
    </div>
  );
}
