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
      tempData = element.temperatuur;
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};

// Call the function
fetchData();
