import { createContext, useContext, useEffect, useReducer,useRef } from 'react';
import reducer from './reducer';

const initialState = {  currentUser: null,openLogin: false, loading: false, 
                        alert: { open: false, severity: 'info', message: '' },
                        profile: { open: false, file: null, photoURL: '' },
                        images: [],//addroom-add images step
                        details: { title: '', description: '', price: 0 },//addroom-add details step
                        location: { lng: 0, lat: 0 },
                        rooms: [],
                        priceFilter: 50,
                        addressFilter: null,
                        filteredRooms: [],
                        room: null,
                    };
const Context = createContext(initialState);
export const useValue = () => {  return useContext(Context);};

const ContextProvider = ({ children }) => 
{    
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log('contextprovider state=',state,'initialSatate=',initialState)
    const mapRef = useRef(); //for clusterMap
    const containerRef = useRef(); //for drawr-search room per location
    //--------------check if user exist in localstorage--to persist that user------
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {  console.log('contextprovider useEffct dispatch UPDATE_USER to persist with currentUser=',currentUser)
            dispatch({ type: 'UPDATE_USER', payload: currentUser }); }
      }, []);
      //-------------------------------------------------------------------
    return (
    <Context.Provider value={{ state, dispatch,mapRef,containerRef }}>{children}</Context.Provider>
    );
};

export default ContextProvider;