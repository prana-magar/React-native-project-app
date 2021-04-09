import AsyncStorage from "@react-native-async-storage/async-storage";

export const cityData = {
  countries: [
    {
      name: "Canada",
      provinces: [
        {
          name: "Ontario",
          cities: [
            {
              name: "Toronto",
            },
          ],
        },
      ],
    },
    {
      name: "Nepal",
      provinces: [
        {
          name: "Bagmati",
          cities: [
            {
              name: "Kathmandu",
            },
          ],
        },
      ],
    },
  ],
};

export const getAllCountries = () => {
  let countries = [];
  cityData["countries"].map((countryObj) => countries.push(countryObj.name));
  return countries;
};

export const getAllProvince = (country) => {
  let countryObj = cityData["countries"].find(
    (currCountry) => currCountry.name == country
  );
  if (countryObj === undefined) {
    return [];
  } else {
    let provinces = [];
    countryObj["provinces"].map((provinceObj) =>
      provinces.push(provinceObj.name)
    );
    return provinces;
  }
};

export const getAllCities = (country, province) => {
  let countryObj = cityData["countries"].find(
    (currCountry) => currCountry.name == country
  );
  if (countryObj === undefined) {
    return [];
  }

  console.log(countryObj);
  let provinceObj = countryObj["provinces"].find(
    (currProvince) => currProvince.name == province
  );
  if (provinceObj === null) {
    return [];
  }

  let cities = [];
  provinceObj["cities"].map((city) => cities.push(city.name));
  return cities;
};

const generateUniqueKey = (country, province, city) => {
  return `${country}-${province}-${city}`;
};

export const isCityPresent = async (country, province, city) => {
  try {
    const selectedCities = await AsyncStorage.getItem("selectedCities");
    const selectedCitiesArray = JSON.parse(selectedCities);
    const cityKey = generateUniqueKey(country, province, city);
    let cityKeyFound = selectedCitiesArray.find((key) => key === cityKey);
    if (cityKeyFound == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    // error reading value
  }
};

const removeCity = async (country, province, city) => {
  try {
    const selectedCities = await AsyncStorage.getItem("selectedCities");
    const selectedCitiesArray = JSON.parse(selectedCities);
    const cityKey = generateUniqueKey(country, province, city);

    const filteredCitiesArray = selectedCitiesArray.filter(
      (curCityKey) => curCityKey != cityKey
    );
    console.log(filteredCitiesArray);
    await AsyncStorage.setItem(
      "selectedCities",
      JSON.stringify(filteredCitiesArray)
    );
  } catch (e) {
    console.log(e);
  }
};

const addCity = async (country, province, city) => {
  try {
    const selectedCities = await AsyncStorage.getItem("selectedCities");
    let selectedCitiesArray = []
    if(selectedCities === null){
        selectedCitiesArray = [];
    }
    else{
         selectedCitiesArray = JSON.parse(selectedCities);
    }
   
    
    console.log(selectedCitiesArray);
    const cityKey = generateUniqueKey(country, province, city);
    const newSelectedCitiesArray = [...selectedCitiesArray, cityKey];
    console.log(newSelectedCitiesArray);
    await AsyncStorage.setItem(
      "selectedCities",
      JSON.stringify(newSelectedCitiesArray)
    );
  } catch (e) {
    console.log(e);
  }
};

export const toggleCitySelection = async (country, province, city) => {
  const isAlreadySaved = await isCityPresent(country, province, city);
  if (isAlreadySaved) {
    removeCity(country, province, city);
  } else {
    addCity(country, province, city);
  }
};


export const getAllSelectedCities = async () => {
  try {
    const selectedCities = await AsyncStorage.getItem("selectedCities");
    let selectedCitiesArray = []
    if(selectedCities  != null){
        selectedCitiesArray = JSON.parse(selectedCities);
    }
    return selectedCitiesArray
  } catch (e) {
    console.log(e);
  }
};