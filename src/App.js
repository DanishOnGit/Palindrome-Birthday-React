import React, { useState } from "react";
import "./styles.css";
import clock from "./newclock.gif";

var date, finalOutput;

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function App() {
  const [outputDiv, setOutputDiv] = useState("");

  function btnClickHandler() {
    if (date) {
      setOutputDiv(
        <img style={{ marginTop: "1.5rem" }} src={clock} alt="Clock gif"></img>
      );

      setTimeout(() => {
        checkPalindrome();
      }, 3000);
    } else {
      setOutputDiv(<p>Please enter date!</p>);
    }
  }

  function checkPalindrome() {
    var inputDateArray = date.split("-");
    var inputYear = inputDateArray[0];
    var inputMonth = inputDateArray[1];
    var inputDate = inputDateArray[2];

    var flag = checkDiffCombo(inputYear, inputMonth, inputDate);

    if (flag) {
      finalOutput = `Yayy! Your birthday is a palindrome in ${flag} format`;
    } else {
      var nextDate = nextPalCheck(inputDate, inputMonth, inputYear);
      
      finalOutput = `Oh noo! Your birthday is not a palindrome in any format. The nearest palindrome date is ${nextDate[0]}. You missed by ${nextDate[1]} days`;
    }
    setOutputDiv(<p className="outputText">{finalOutput}</p>);
  }

  function checkDiffCombo(yyyy, mm, dd) {
    var format1 = yyyy + mm + dd;
    var format2 = dd + mm + yyyy;
    var format3 = mm + dd + yyyy.substring(2);
    var format4 = Number(mm) + dd + yyyy;

    if (itisPalindrome(format1)) {
      return `${yyyy}-${mm}-${dd}`;
    } else if (itisPalindrome(format2)) {
      return `${dd}-${mm}-${yyyy}`;
    } else if (itisPalindrome(format3)) {
      return `${mm}-${dd}-${yyyy.substring(2)}`;
    } else if (itisPalindrome(format4)) {
      return `${Number(mm)}-${dd}-${yyyy}`;
    } else {
      return null;
    }
  }

  function itisPalindrome(combo) {
    var length = Math.floor(combo.length / 2);
    for (var i = 0; i < length; i++) {
      if (combo[i] !== combo[combo.length - (i + 1)]) {
        return false;
      }
    }
    return true;
  }

  function nextPalCheck(date, month, year) {
    var date1 = Number(date);
    var month1 = Number(month);
    var year1 = Number(year);
    var date2 = Number(date);
      var month2 = Number(month);
      var year2= Number(year);

    //for checking ahead of input DOB
    for (let i = 1; i > 0; i++) {
      date1 = date1 + 1;
      console.log(date1);
      if (date1 > monthDays[month1 - 1]) {
        month1 = month1 + 1;
        date1 = 1;
        if (month1 > 12) {
          year1 = year1 + 1;
        }
      }

      var date1String = date1.toString(),
        month1String = month1.toString(),
        year1String = year1.toString();

      if (date1String.length === 1) {
        date1String = "0" + date1String;
      }
      if (month1String.length === 1) {
        month1String = "0" + month1String;
      }

      let newFlag = checkDiffCombo(year1String, month1String, date1String);
      if (newFlag) {
        return [newFlag,i];
      }
// for checking before the input DOB
     

      if(year2>1){
        date2=date2-1;
if(date2<1){
  month2=month2-1;
  if(month2<1){
    month2=12;
    year2=year2-1;
    if(year2<1){
      break;
    }
    date2=monthDays[month2-1]
  }
}
let date2String=date2.toString();
let month2String=month2.toString();
let year2String=year2.toString();

if(date2String.length===1){
  date2String="0"+date2String;
}
if(month2String.length===1){
month2String="0"+month2String;
}
let newFlag=checkDiffCombo(year2String,month2String,date2String)
if(newFlag){
  return [newFlag,i]
}

      }

    }



  }

  return (
    <div className="App">
      <h1>Let's find out if your DOB is a palindrome or not</h1>
      <br />
      <p className="instruction">
        It will check your the birthdate in dd-mm-yyyy, mm-dd-yy, m-dd-yyyy,
        yyyy-mm-dd formats.
      </p>

      <input
        onChange={(event) => {
          date = event.target.value;
        }}
        required
        type="date"
      />
      <br />

      <button className="check" onClick={btnClickHandler}>
        Check
      </button>

      <div className="outputDiv">{outputDiv}</div>
    </div>
  );
}
