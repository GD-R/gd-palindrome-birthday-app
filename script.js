let userDate = document.querySelector("#date");
let btn = document.querySelector("#btn");
let output = document.querySelector("#output");

function getDateAsString(date) {
  var dateInStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
}

function getDateInAllFormats(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindrome(str) {
  let reverseStr =  str.split("").reverse().join("");
  return reverseStr === str;
}

function checkPalindromeForAllFormat(date) {
    let allDateFormats = getDateInAllFormats(date);
    let dateResult = [];
    

    for(let i = 0; i < allDateFormats.length; i++) {
        let res = checkPalindrome(allDateFormats[i]);
        dateResult.push(res);
    }
    return dateResult;
  
}

function LeapYear(year) {
    if(year % 400 === 0) return true;

    if(year % 100 === 0) return false;

    if(year % 10 === 0) return true;
     
    return false;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (LeapYear(year)) {
          if (day > 29) {
            day = 1;
            month = 3;
          }
        } else {
          if (day > 28) {
            day = 1;
            month = 3;
          }
        }
      } else {
        if (day > months[month - 1]) {
          day = 1;
          month++;
        }
      }
    
      if (month > 12) {
        month = 1;
        year++;
      }
    
      return {
        day: day,
        month: month,
        year: year,
      };
    }

function nextDatePalindrome(date) {
    let nextDate = getNextDate(date);
    let count = 0;
    
    while(1) {
        count++;
        let dateStr = getDateAsString(nextDate);
        let nxtPalindromeList = checkPalindromeForAllFormat(dateStr);

        for(let i = 0; i < nxtPalindromeList.length; i++){
          if(nxtPalindromeList[i]) {
            return [count, nextDate];
          }
        }
        nextDate = getNextDate(nextDate);
    }
}

function clickAction() {
  let enteredDate = userDate.value;
  enteredDate = enteredDate.split("-");

  let date = {
    day: Number(enteredDate[2]),
    month: Number(enteredDate[1]),
    year: Number(enteredDate[0]),
  };

  let dateStr = getDateAsString(date);
  let resultList = checkPalindromeForAllFormat(dateStr);
  let flag = false;

  for(let i = 0; i < resultList.length; i++) {
    if(resultList[i]) {
      flag = true;
      break;
    }
  }

  if(!flag) {
    let [count, palindromeDate] = nextDatePalindrome(date);
    output.innerHTML = `The next Palindrome Date is ${palindromeDate.day}-${palindromeDate.month}-${palindromeDate.year}, missed by ${count} days`
  }
  else {
    output.innerHTML = `Yes Your Date is Palindrome`;
  }
}

btn.addEventListener("click", clickAction);