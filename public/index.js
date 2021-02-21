//Listen for the submit event
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.querySelector(".form-control").value;
  if (location === "") {
    document.querySelector("#alert").style.visibility = "visible";
  } else {
    async function getWeather() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=530ba79edcfe27707be3ef88a091520d&units=metric`
      );
      const data = await response.json();
      return data;
    }

    getWeather()
      .then((data) => {
        if (data.cod === "404") {
          document.querySelector("#alert").style.visibility = "visible";
          document.querySelector("#err_message").innerHTML = data.message;
        } else {
          // fetch temperature data for one day
          let tempData = {
            temperature_one: data.list[0].main.temp,
            temperature_two: data.list[1].main.temp,
            temperature_three: data.list[2].main.temp,
            temperature_four: data.list[3].main.temp,
            temperature_five: data.list[4].main.temp,
            temperature_six: data.list[5].main.temp,
            temperature_seven: data.list[6].main.temp,
            temperature_eight: data.list[7].main.temp,
          };
          //fetch humidity data for one day
          let humidityData = {
            humidity_one: data.list[0].main.humidity,
            humidity_two: data.list[1].main.humidity,
            humidity_three: data.list[2].main.humidity,
            humidity_four: data.list[3].main.humidity,
            humidity_five: data.list[4].main.humidity,
            humidity_six: data.list[5].main.humidity,
            humidity_seven: data.list[6].main.humidity,
            humidity_eight: data.list[7].main.humidity,
          };
          //Save the weather info
          let weather_info = {
            lat: data.city.coord.lat,
            long: data.city.coord.lon,
            id: data.city.id,
            name: data.city.name,
            temperature: data.list[0].main.temp,
            humidity: data.list[0].main.humidity,
            pressure: data.list[0].main.pressure,
          };
          //Put the fetched data in a table
          document.querySelector("#table").style.visibility = "visible";
          document.querySelector("#chart").style.opacity = "1";
          document.querySelector("#name").innerHTML = weather_info.name;
          document.querySelector("#city_id").innerHTML = weather_info.id;
          document.querySelector("#long").innerHTML = weather_info.long;
          document.querySelector("#lat").innerHTML = weather_info.lat;
          document.querySelector("#humidity").innerHTML = weather_info.humidity;
          document.querySelector("#temp").innerHTML = weather_info.temperature;
          document.querySelector("#pressure").innerHTML = weather_info.pressure;
          //Initialize the graph and add the data
          var ctx = document.getElementById("myChart").getContext("2d");

          var myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: [
                "0000Hrs",
                "0300Hrs",
                "0600Hrs",
                "0900Hrs",
                "1200Hrs",
                "1500Hrs",
                "1800Hrs",
                "2100Hrs",
              ],
              datasets: [
                {
                  label: "Temperature in ° Celsius",
                  data: [
                    tempData.temperature_one,
                    tempData.temperature_two,
                    tempData.temperature_three,
                    tempData.temperature_four,
                    tempData.temperature_five,
                    tempData.temperature_six,
                    tempData.temperature_seven,
                    tempData.temperature_eight,
                  ],
                  backgroundColor: "rgba(255, 199, 132,0.7)",
                  borderWidth: 1,
                },
                {
                  label: "Humidity in %",
                  data: [
                    humidityData.humidity_one,
                    humidityData.humidity_two,
                    humidityData.humidity_three,
                    humidityData.humidity_four,
                    humidityData.humidity_five,
                    humidityData.humidity_six,
                    humidityData.humidity_seven,
                    humidityData.humidity_eight,
                  ],
                  backgroundColor: "rgba(187, 16, 230,0.7)",
                },
              ],
            },
          });
          //Initialize mapbox
          mapboxgl.accessToken =
            "pk.eyJ1IjoiaWFubXVnZW55YSIsImEiOiJja2s2bWluZWswNWYzMm9wYmNpMjNnejI1In0.yV-AIxNvNkzay7hgcYjoXw";
          var map = new mapboxgl.Map({
            container: "map", // container ID
            style: "mapbox://styles/mapbox/streets-v11", // style URL
            center: [weather_info.long, weather_info.lat], // starting position [lng, lat]
            zoom: 5, // starting zoom
          });
          map.flyTo({
            center: [weather_info.long - 0.5, weather_info.lat - 0.5],
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });

          var marker = new mapboxgl.Marker({
            color: "#d2691e",
            draggable: true,
          })
            .setLngLat([weather_info.long, weather_info.lat])
            .addTo(map);
          
        }
      })
      .catch((err) => {
        document.querySelector("#alert").style.visibility = "visible";
        document.querySelector("#err_message").innerHTML =
          "Please check your connection";
      });
  }
});
