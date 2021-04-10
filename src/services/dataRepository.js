import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButton } from "react-native-gesture-handler";
import { URLS } from "./urls";


export const treeData = [
  {
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
              {
                name: "Barrie",
              },
              {
                name: "Brockville",
              },
              {
                name: "Burlington",
              },
            ],
          },
          {
            name: "Alberta",
            children: [
              {
                name: "Airdrie",
              },
              {
                name: "Brooks",
              },
              {
                name: "Camrose",
              },
            ],
          },
          {
            name: "New Foundland",
           
          },
        ],
      },
      {
        name: "USA",
        children: [
          {
            name: "Alabama",
            children: [
              {
                name: "Birmingham",
              },
              {
                name: "Montgomery",
              },
              {
                name: "Huntsville",
              },
              {
                name: "Auburn",
                children: [
                  {
                    name: "Mobile",
                  },
                  {
                    name: "Hoover",
                  },
                ],
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
              {
                name: "Bhaktapur",
              },
              {
                name: "Lalitpur",
              },
            ],
          },
        ],
      },
    ],
  },
];


export const getAllLeaf = (country, province) => {
  let countryObj = cityData["countries"].find(
    (currCountry) => currCountry.name == country
  );
  if (countryObj === undefined) {
    return [];
  }

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

      if (pathToNode.length === 0) {
        return nodeObjsList;
      }
    console.log("path" + JSON.stringify(pathToNode));
    console.log("objects" + JSON.stringify(nodeObjsList));

    let currentNodes = nodeObjsList;
    let currentLevelSelectedNode = currentNodes.find(
      (nodeObj) => nodeObj.name === pathToNode[0]
    );
     
    console.log("current" + JSON.stringify(currentLevelSelectedNode));
    if (!currentLevelSelectedNode.hasOwnProperty('children')){
            // no children means we are at leaf node
            let updatedNodes = []
            return updatedNodes;
        }
    
    // recursively traverse below till some exit condition
    let newPathToNode = []
    if(pathToNode.length === 1){
        newPathToNode = []
    }
    else{
        newPathToNode = pathToNode.slice(1);
    }
    return getAllChildToPath(newPathToNode,currentLevelSelectedNode['children'] )
};

const generateNodeData = async (leafKey,nodeName, isLeaf) => {

  let isLeafSelected = await isLeafPresent(leafKey);
  if (isLeafSelected) {
    return { name: nodeName, isSelected: true ,  isLeaf: isLeaf};
  } else {
    return { name: nodeName, isSelected: false, isLeaf: isLeaf };
  }
};

export const getAllNodesOfPath =  async (pathToNode) => {
   let allNodes = [];
   all_childs = getAllChildToPath(pathToNode);

   for(let i= 0; i< all_childs.length; i++){
     try{
       let nodeName = all_childs[i].name;
       let isLeaf = false
       if( !all_childs[i].hasOwnProperty('children') ){
          isLeaf = true
       }
       const leafKey = generateUniqueKey([...pathToNode, nodeName]);
       allNodes.push( await generateNodeData(leafKey, nodeName, isLeaf))
     }
     catch(e){
       console.log(e)
     }
   }
   return allNodes
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
