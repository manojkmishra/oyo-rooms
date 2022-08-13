const reducer = (state, action) => {
    console.log('reducer.js1-dispatch action=',action,'state=',state)
    switch (action.type) {
      case 'UPDATE_USER': //Navbar page to click on login
        {   localStorage.setItem('currentUser', JSON.stringify(action.payload));
            let newstate={ ...state, currentUser: action.payload };
            console.log('reducer.js2-action=',action,'newstate=',newstate)
            return newstate;
        }
        case 'OPEN_LOGIN':  
        {   let newstate={ ...state, openLogin: true }
            console.log('reducer.js2-action=',action,'newstate=',newstate)
            return newstate;
            //return { ...state, openLogin: true };
        }
        case 'CLOSE_LOGIN':
            { let newstate={ ...state, openLogin: false };
            console.log('reducer.js2-action=',action,'newstate=',newstate)
            return newstate;
                //return { ...state, openLogin: false };
            } 
      case 'START_LOADING': return { ...state, loading: true };
      case 'END_LOADING': return { ...state, loading: false };
      case 'UPDATE_ALERT': return { ...state, alert: action.payload };
      case 'UPDATE_PROFILE':
          { let newstate={ ...state, profile: action.payload };
            console.log('reducer.js2-action=',action,'newstate=',newstate)
            return newstate;
          };
      //-----------addRoom--add imags step---------
      case 'UPDATE_IMAGES':
            return { ...state, images: [...state.images, action.payload] };
      case 'DELETE_IMAGE':
            return {
              ...state,
              images: state.images.filter((image) => image !== action.payload),
            };
      //----------------addRoom->add details step------
      case 'UPDATE_DETAILS':
        return { ...state, details: { ...state.details, ...action.payload } };
      //----------addRoom--add location
      case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };
      //--------addRoom-------reset data after room inserted----
      case 'RESET_ROOM':
      return { ...state, images: [],
        details: { title: '', description: '', price: 0 }, location: { lng: 0, lat: 0 },
      };
      //------------------first map page--getall rooms--class12-------
      case 'UPDATE_ROOMS':
      //return { ...state, rooms: action.payload };
      return { ...state, rooms: action.payload, addressFilter: null,
        priceFilter: 50, filteredRooms: action.payload, };
      //-----------------------drawr/sidebar -price filter----------------------------
      case 'FILTER_PRICE':
      return  {  ...state,  priceFilter: action.payload,
        filteredRooms: applyFilter( state.rooms, state.addressFilter, action.payload), };
      //-------------------drawr/sidebar--search location------------------------------
      case 'FILTER_ADDRESS':
        return { ...state, addressFilter: action.payload,
          filteredRooms: applyFilter( state.rooms, action.payload, state.priceFilter),};
    case 'CLEAR_ADDRESS':
      return { ...state, addressFilter: null, priceFilter: 50,filteredRooms: state.rooms,};
      //--------------------single room page---------------------
      case 'UPDATE_ROOM':
        {let newstate={ ...state, room: action.payload };
        console.log('reducer.js--UPDATE_ROOM, newstate=',newstate);
        return newstate;
        }
      //------------------------------------------------------------
      default:
        {    throw new Error('No matched action!');     }
    }
  };
  
  export default reducer;

  const applyFilter = (rooms, address, price) => {
    let filteredRooms = rooms;
    if (address) {
      const { lng, lat } = address;
      filteredRooms = filteredRooms.filter((room) => {
        const lngDifference = lng > room.lng ? lng - room.lng : room.lng - lng;
        const latDifference = lat > room.lat ? lat - room.lat : room.lat - lat;
        return lngDifference <= 1 && latDifference <= 1;
      });
    }
  
    if (price < 50) {
      filteredRooms = filteredRooms.filter((room) => room.price <= price);
    }
  console.log('reducer-applyfilter-filteredRooms=',filteredRooms)
    return filteredRooms;
  };