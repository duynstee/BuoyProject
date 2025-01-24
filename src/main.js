import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";

loadFonts();

createApp(App).use(vuetify).use(router).mount("#app");

const fetchData = async () => {
  const url =
    "https://gec13051aa051a2-boei3.adb.eu-amsterdam-1.oraclecloudapps.com/ords/admin/metingen/";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Tells the server you're expecting JSON
        //'Authorization': 'Bearer your_api_token', // Optional: Include if your API requires a token
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse the JSON response
    const tempArray = data.items;

    for (const element of tempArray) {
      console.log(element);
      console.log(element.temperatuur);
      if (element.temperatuur > 35 || element.temperatuur < 5) {
        let message =
          "Kritiek waarde gevonden! Meting: " +
          element.meting_id +
          " Boei ID: " +
          element.boei_id +
          " Grenswaarde overschreden" +
          " Temperatuur: " +
          element.temperatuur +
          " op tijdstip: " +
          element.tijd;
        let div = document.getElementById("log");
        let p = document.createElement("p");
        let l = document.createElement("hr");
        let b = document.createElement("br");
        div.append(message, p);
        div.append(l);
        div.append(b);
      } else if (element.phwaarde > 9 || element.phwaarde < 6) {
        let message =
          "Kritiek waarde gevonden! Meting: " +
          element.meting_id +
          " Boei ID: " +
          element.boei_id +
          " Grenswaarde overschreden" +
          " pH Waarde: " +
          element.phwaarde +
          " op tijdstip: " +
          element.tijd;

        let div = document.getElementById("log");
        let p = document.createElement("p");
        let l = document.createElement("hr");
        let b = document.createElement("br");
        div.append(message, p);
        div.append(l);
        div.append(b);
      } else if (element.turbiditeit > 40 || element.turbiditeit < 10) {
        let message =
          "Kritiek waarde gevonden! Meting: " +
          element.meting_id +
          " Boei ID: " +
          element.boei_id +
          " Grenswaarde overschreden" +
          " Turbidity: " +
          element.turbiditeit +
          " op tijdstip: " +
          element.tijd;

        let div = document.getElementById("log");
        let p = document.createElement("p");
        let l = document.createElement("hr");
        let b = document.createElement("br");
        div.append(message, p);
        div.append(l);
        div.append(b);
      } else if (element.ecvoltage > 30 || element.ecvoltage < 1) {
        let message =
          "Kritiek waarde gevonden! Meting: " +
          element.meting_id +
          " Boei ID: " +
          element.boei_id +
          " Grenswaarde overschreden" +
          " EC Waarde: " +
          element.ecvoltage +
          " op tijdstip: " +
          element.tijd;

        let div = document.getElementById("log");
        let p = document.createElement("p");
        let l = document.createElement("hr");
        let b = document.createElement("br");
        div.append(message, p);
        div.append(l);
        div.append(b);
      }
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};

// Call the function
fetchData();
