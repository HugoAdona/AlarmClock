const time = document.querySelector('.time');
const date = document.querySelector('.date');
const alarmTime = document.querySelector('#alarmTime');
const setAlarm = document.querySelector('#setAlarm');
const alarmSound = document.querySelector('#alarmSound');
const stopAlarm = document.querySelector('#stopAlarm');

let alarmSet = false;
let alarmTimeValue;
let audioPlayed = false;
let alarmStopped = false;

function setAlarmTime() {
    if (alarmTime.value) {
        alarmTimeValue = new Date(alarmTime.value);
        alarmSet = true;
        alarmStopped = false; // reset alarmStopped variable
    }
}

function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) {
        hours = 12;
    }
    time.textContent = `${hours.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} ${ampm}`;
    date.textContent = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

    if (alarmSet && now > alarmTimeValue && !audioPlayed && !alarmStopped) {
        alarmSound.play();
        audioPlayed = true;
    } else if (alarmStopped) {
        return; // exit the function if the alarm has been stopped
    }
}

function stopAlarmTime() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    audioPlayed = false;
    alarmStopped = true; // set the alarmStopped flag to true
}

document.addEventListener('DOMContentLoaded', () => {
    setAlarm.addEventListener('click', setAlarmTime);
    stopAlarm.addEventListener('click', stopAlarmTime);
});

setInterval(updateTime, 1000);