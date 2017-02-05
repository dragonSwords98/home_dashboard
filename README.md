# Dashboard for Home (Atlasboard)

## Install & Run

**Open Windows Powershell (admin mode), Linux Terminal (sudo), Mac OSX Terminal (AppleID priviledges)**
```terminal
  npm install -g atlasboard
  git clone https://gitlab.com/dragonSwords98/home_dashboard.git
  cd home_dashboard
  npm install
  atlasboard start 3333
```

## API Keys and Personalization
You will need to obtain keys for OpenWeatherAPI, Unsplash API, Google Console Developer APIs (Javascript Maps and Direction API), theysaidso API.

You will need to edit ``` assets/javascripts/google-maps-api.js``` and ```packages/default/dashboards/home_dashboard.json``` to personalize this app to run the features within.

## Features
1. Today's Weather from OpenWeather API
2. Google Maps & Directions API to display commute times to users (map, directions, bus/road route info, depart/arrive time, distance and duration
3. Google Calendar lists
4. ~~Photo of the Day from Unsplash API (random)~~ (Disabled due to space)
5. Time, clocked using Javascript Date() and Moment.js
6. ~~Ping Test (speedtest.net) using Chart.js~~ (Disabled due to WIFI lag)
7. Quote of the Day from theysaidso

All this made possible by Atlassian Project: [Atlasboard](http://atlasboard.bitbucket.org/)

## Current Notice
This project has not fully credited and I am still in the process of correctly giving credits and applying license. I give no permission for it to be used without my consent as it is not ready.
