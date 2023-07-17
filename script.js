const content = document.querySelector('.content');
const selectMenu = document.querySelectorAll('select');
const setAlarmBtn = document.querySelector('button');
let alarmTime, isAlarmSet,
ringtone = new Audio('download.mp3')

for(let i = 12; i > 0; i--){
   i = i < 10 ? `0${i}` : i;
   let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for(let i = 59; i >= 0; i--){
   i = i < 10 ? `0${i}` : i;
   let option = `<option value = "${i}">${i}</option>`;
   selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for(let i = 2; i >= 1; i--){
   let ampm = i==2 ? "PM" : "AM";
   let option = `<option value = "${ampm}">${ampm}</option>`;
   selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(()=>{
    let time = document.getElementsByTagName('h1')
    let d = new Date()
    let hours = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()
    let abbr = "AM"
    if(hours>=12){
        abbr = "PM"
        hours -= 12
    }
    hours = hours == 0 ? hours = 12 : hours;
    hours < 10 ? hours = "0" + hours : hours;
    minutes < 10 ? minutes = "0" + minutes : minutes;
    seconds < 10 ? seconds = "0" + seconds : seconds;
    time[0].innerHTML = hours + ":" + minutes + ":" + seconds + " " + abbr

    if(alarmTime === `${hours}:${minutes} ${abbr}`) {
        ringtone.play();
        ringtone.loop = true;
    }
 }, 1000)   

function setAlarm(){
    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
 }
 setAlarmBtn.addEventListener('click', setAlarm);