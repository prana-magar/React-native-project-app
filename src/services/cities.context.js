import React, { useState, createContext, useEffect, useMemo} from 'react';

export const CityContext = createContext();
export const CityContextProvider = ({children}) => {
    return (
        <CityContext.Provider value= {{ cityData: ["asdas","aa"]}}>
            {children}
        </CityContext.Provider>
    )
       
    
}