const getGeo = async () => {
    const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone';
    const response = await fetch(url);
    const data = response.json();
    return data;
}

const getData = async (lat, lon) => {
    api = 'f1c13884b32f29d32d0757b397394d11';
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
    const response = await fetch(url);
    const data = response.json();
    return data;
}

function getSvg(weMain){
    let icon;
    switch (weMain) {
        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break;
        case 'Clear':
            const DayOrNigh = getDayNight();
            icon = `${weMain}-${DayOrNigh}.svg`;
            break;
        case 'Clouds':
            icon = `${weMain}.svg`;
            break;
        case 'Atmosphere':
            icon = `${weMain}.png`;
            break;
    }
    return icon;
}

function getDayNight() {
    let DayOrNigh;
    var d = new Date();
    const hour = d.getHours();
    if (hour >= 6 && hour <= 19) {
        DayOrNigh = 'Day';
    } else {
        DayOrNigh = 'Night';
    }
    return DayOrNigh;
}

function getTemperature(weTemp){
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}

const city = document.querySelector('.timezone');
const count = document.querySelector('.country');
const dese = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');
const tede = document.querySelector('.temperature-description');
let icon = document.querySelector('.icon');

window.addEventListener('load', function(){
    getGeo()
        .then(locData => {
            const timeZone = locData.city;
            count.textContent = "Country: "+locData.country;
            city.textContent = "City: "+timeZone;
            getData(locData.lat, locData.lon)
                .then(weData => {
                    const weTemp = weData.main.temp;
                    const weMain = weData.weather[0].main;
                    const weDes = weData.weather[0].description;
                    const iconName = getSvg(weMain);
                    icon.innerHTML = `<img src='icons/${iconName}'></img>`;
                    deg.textContent = getTemperature(weTemp).can;
                    unit.textContent = '°C';
                    dese.addEventListener('click', function(e){
                         if(unit.textContent == '°F'){
                            deg.textContent = getTemperature(weTemp).can;
                            unit.textContent = '°C';
                        }
                        else if(unit.textContent == '°C'){
                            deg.textContent = getTemperature(weTemp).far;
                            unit.textContent = '°F';
                        }
                    })
                    tede.textContent = weDes;
                    console.log(weTemp, weMain, weDes);
                })
        })
})
