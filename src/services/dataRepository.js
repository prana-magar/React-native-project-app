import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButton } from "react-native-gesture-handler";
import { URLS } from "./urls";
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

export const treeData = [{
  name: "Earth",
  children: [
    {
      name: "Canada",
      children: [
        {
          name: "Ontario",
          children: [
            {
              name: "Toronto",
            },
          ],
        },
      ],
    },
    {
      name: "Nepal",
      children: [
        {
          name: "Bagmati",
          children: [
            {
              name: "Kathmandu",
            },
          ],
        },
      ],
    },
  ],
}];

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

export const getAllLeaf = (country, province) => {
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

const generateUniqueKey = (pathToCurrentLeaf) => {
  return pathToCurrentLeaf.join(">");
};

export const isLeafPresent = async (leafKey) => {
  try {
    const selectedLeafKeys = await AsyncStorage.getItem("selectedLeaf");
    const selectedLeafKeysArray = JSON.parse(selectedLeafKeys);
    let leafKeyFound = selectedLeafKeysArray.find((key) => key === leafKey);
    if (leafKeyFound == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    // error reading value
  }
};

const removeLeaf = async (leafKey) => {
  try {
    const selectedLeafKeys = await AsyncStorage.getItem("selectedLeaf");
    const selectedLeafKeysArray = JSON.parse(selectedLeafKeys);

    const filteredLeafArray = selectedLeafKeysArray.filter(
      (curLeafKey) => curLeafKey != leafKey
    );
    await AsyncStorage.setItem(
      "selectedLeaf",
      JSON.stringify(filteredLeafArray)
    );
  } catch (e) {
    console.log(e);
  }
};

const addLeaf = async (leafKey) => {
  if (leafKey === null)
  {
      return
  }
    try {
      const selectedLeafKeys = await AsyncStorage.getItem("selectedLeaf");
      let selectedLeafKeysArray = [];
      if (selectedLeafKeys === null) {
        selectedLeafKeysArray = [];
      } else {
        selectedLeafKeysArray = JSON.parse(selectedLeafKeys);
      }

      const newSelectedLeafArray = [...selectedLeafKeysArray, leafKey];
      console.log("added: " + JSON.stringify(newSelectedLeafArray));
      await AsyncStorage.setItem(
        "selectedLeaf",
        JSON.stringify(newSelectedLeafArray)
      );
    } catch (e) {
      console.log(e);
    }
};

export const toggleLeafSelection = async (pathToCurrenLeaf) => {
 const leafKey = generateUniqueKey(pathToCurrenLeaf);
  const isAlreadySaved = await isLeafPresent(leafKey);
  if (isAlreadySaved) {
    removeLeaf(leafKey);
  } else {
    addLeaf(leafKey);
  }
};

export const getAllSelectedLeaf = async () => {
  try {
    const selectedLeaf = await AsyncStorage.getItem("selectedLeaf");
    let selectedLeafArray = [];
    if (selectedLeaf != null) {
      selectedLeafArray = JSON.parse(selectedLeaf);
    }
    return selectedLeafArray;
  } catch (e) {
    console.log(e);
  }
};

const extractNames = (nodeObjs) =>{
    let names = []
    nodeObjs.map( (val) => names.push(val.name) )
    return names;
}

export const getAllChildToPath =  (pathToNode, nodeObjsList = treeData) => {

     console.log(pathToNode);
      if (pathToNode.length === 0) {
        // we have reached our path
        return extractNames(nodeObjsList);
      }

    currentNodes = nodeObjsList;
    currentLevelSelectedNode = currentNodes.find(
      (nodeObj) => nodeObj.name === pathToNode[0]
    );
     
    console.log("selected: " + currentLevelSelectedNode.name);
    if (!currentLevelSelectedNode.hasOwnProperty('children')){
            // no children means we are at leaf node
            return extractNames(currentNodes)
        }
    
    // recursively traverse below till some exit condition
    let newPathToNode = []
    if(pathToNode.length === 1){
        newPathToNode = []
    }
    else{
        newPathToNode = pathToNode.slice(1);
    }
    console.log("sendinf in: " + JSON.stringify(currentLevelSelectedNode["children"]));
    console.log("new path in"+ JSON.stringify(newPathToNode))
    return getAllChildToPath(newPathToNode,currentLevelSelectedNode['children'] )
};

export const getGeoLocationInfo = async () => {
  try {
    const respose = await fetch(URLS.GEO_LOCATION_URL);
    const data = await respose.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
