import React, { usestate, createContext} from 'react'

const ParametriStampaContext = createContext()

const ParametriStampaProvider = ({children})=>{
 const [datiStampa, setDatiStampa]=usestate([])
 const updatedati = (newDati)=>{
    setDatiStampa(newDati)
 }
 return (
   <ParametriStampaContext.Provider value={{datiStampa, updatedati}}>
    {children}
   </ParametriStampaContext.Provider>
 )
}
export {ParametriStampaProvider,ParametriStampaContext}