// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  dayofweek = document.querySelector('.day_of_week'),
  city = document.querySelector('.city'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  humidity = document.querySelector('.humidity'),
  speed = document.querySelector('.speed'),
  quote = document.querySelector('.qoute'),
  author = document.querySelector('.author')
  
// Options
const showAmPm = false;
let i = 0;
let quote_counter = 0;

// Other
const baseimgUrl = '../momentum/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
var dayTime = 'morning';

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  /*img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; */
  return src;
}

function getImage() {
  const index = i % images.length;
  const imageSrc = `${baseimgUrl}${dayTime}/${images[index]}`;
  var res = viewBgImage(imageSrc);
  i++;
  return res;
} 



// Show Time
function showTime() {
  
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();
      weekDayNumber = today.getDay();
  

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  var formatHour = convertTimeto24(hour, amPm);

  // Output Time
  time.innerHTML = `${ showAmPm ? hour : formatHour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


function setNewPhrase() {
  if (localStorage.getItem('quotenum')) {
    quote_counter =parseInt(localStorage.getItem('quotenum'))+1;
    localStorage.setItem('quotenum',quote_counter);
  } else {
    localStorage.setItem('quotenum',quote_counter);
  }
  getPhrase(quote_counter);
}


// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12 && hour >= 6) {
    // Morning
    greeting.textContent = 'Good Morning, ';
    dayTime = 'morning';
    var url = getImage();
    document.body.style.backgroundImage =
      `url('${url}')`;
  } else if (hour < 18 && hour >= 12) {
    // Afternoon
    dayTime = 'day';
    var url = getImage();
    document.body.style.backgroundImage =
      `url('${url}')`;
    greeting.textContent = 'Good Afternoon, ';
    
  } else if (hour <= 23 && hour >= 18)  {
    // Evening
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
    dayTime = 'evening';
    var url = getImage();
    document.body.style.backgroundImage =
      `url('${url}')`;
    
  } else {
    greeting.textContent = 'Good Nigth, ';
    dayTime = 'night';
    var url = getImage();
    document.body.style.backgroundImage =
      `url('${url}')`;
  }

  setTimeout(setBgGreet, 3600000);
}

// Get City
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter City]'
  } else  {
    city.textContent = localStorage.getItem('city');
    getWeather(localStorage.getItem('city'));
  }
}

function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {

      if (e.target.innerText.trim().length === 0) {
        if (localStorage.getItem('city')) {
          city.textContent = localStorage.getItem('city')
        } else {
          city.textContent = '[Enter City]'
        }  
      } else  {
        localStorage.setItem('city', e.target.innerText);
        city.blur();
        getWeather(e.target.innerText);
      }
      
    }
  } else {

    if (e.target.innerText.trim().length === 0) {
      if (localStorage.getItem('city')) {
        city.textContent = localStorage.getItem('city')
      } else {
        city.textContent = '[Enter City]'
      }  
    } else {
      localStorage.setItem('city', e.target.innerText);
      getWeather(e.target.innerText);
    }
    
  }

}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
  
      if (e.target.innerText.trim().length === 0) {
        if (localStorage.getItem('name')) {
          name.textContent = localStorage.getItem('name')
        } else {
          name.textContent = '[Enter Name]'
        }  
      } else {
        localStorage.setItem('name', e.target.innerText);
      //  document.querySelector('.name_wrapper').style.border = "none";
        name.blur();
      }

    }
  } else {
    if (e.target.innerText.trim().length === 0) {
      if (localStorage.getItem('name')) {
        name.textContent = localStorage.getItem('name')
      } else {
        name.textContent = '[Enter Name]'
      }  
    } else {
      localStorage.setItem('name', e.target.innerText);
      //document.querySelector('.name_wrapper').style.border = "none";
    }
    
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      
      if (e.target.innerText.trim().length === 0) {
        if (localStorage.getItem('focus')) {
          focus.textContent = localStorage.getItem('focus')
        } else {
          focus.textContent = '[Enter Focus]'
        }  
      } else {
        
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      }
    }
  } else {
    if (e.target.innerText.trim().length === 0) {
      if (localStorage.getItem('focus')) {
        focus.textContent = localStorage.getItem('focus')
      } else {
        focus.textContent = '[Enter Focus]'
      }
    } else {
      localStorage.setItem('focus', e.target.innerText);
    }  
    
  }
  //getWeather(e.target.innerText);

}

function setDayOfWeek() {
  var arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var arrayOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"]
  let today = new Date();
  let weekdayName = arrayOfWeekdays[today.getDay()];
  let monthName = arrayOfMonths[today.getMonth()];
  let day = today.getDate();
  dayofweek.innerHTML = `${weekdayName}, ${day} of ${monthName} `;
}

function convertTimeto24(currentTime, ampm) {
  var newTime;
  var currTime = parseInt(currentTime);
  if (ampm === 'PM') {
    if (currTime !== 12) {
      newTime = currTime+12;
    }  else {
      newTime = currTime;
    }
  } else {
    newTime = currentTime;
  }

  return newTime;

}

async function getPhrase(quote_counter) {
  console.log(quote_counter)
  const url = 'https://type.fit/api/quotes';
  const res = await fetch(url);
  const data = await res.json();
  quote.textContent = data[quote_counter].text;
  author.textContent = data[quote_counter].author;
}

async function getWeather(cityname) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&lang=en&appid=e2f0b3e8b8b462ce82bd96481d782a00&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod !== 200) {
    //alert(`Sorry, we have not found this city :( ${data.cod}`);
    document.querySelector('.temperature').style.display = "none";
    document.querySelector('.weather-description').style.display = "none";
    document.querySelector('.humidity_wrapper').style.display = "none";
    document.querySelector('.wind_wrapper').style.display = "none";
    document.querySelector('.weather-error').style.display = "block";

  } else {
    document.querySelector('.temperature').style.display = "block";
    document.querySelector('.weather-description').style.display = "block";
    document.querySelector('.humidity_wrapper').style.display = "block";
    document.querySelector('.wind_wrapper').style.display = "block";
    document.querySelector('.weather-error').style.display = "none";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}`;
    speed.textContent = `${data.wind.speed}`;
  }

}


document.addEventListener('click', function(event) {
  var element = event.target;
  if (element.matches('.name')) {
    name.textContent = '';
  } else if (element.matches('.focus')) {
    focus.textContent = ''
  } else if (element.matches('.city')) {
    city.textContent = ''
  }
  /*
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter City]'
  } else  {
    city.textContent = localStorage.getItem('city');
    getWeather(localStorage.getItem('city'));
  }*/
})



name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

// Run
showTime();
setBgGreet();
getName();
getFocus();
setDayOfWeek();
getCity();
//getWeather();
//getPhrase();
setNewPhrase();