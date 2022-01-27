//Estructura de la aplicación
//Index.js 
//    --> <App /> 
//          --> <ShoppingCart />
//               --> <ProductItem/> 
//               --> <CartItem/>        
// 

//Estructura del Reducer
//ShoppingCart.js

const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
const { products, cart } = state;

//state: estado de la aplicación
//dispatch: función que dispara las acciones
//shoppingReducer: función que contiene la lógica de cada acción
//shoppingInitialState: estado inicial definido en shoppingReducer.js
//actions: objeto que se pasa cono argumento cuando se dispara el dispatch
//  action: {
//      "type": 'ADD_TO_CART',
//      "payload": 5    
//  } 

//acción ADD_TO_CART

case TYPES.ADD_TO_CART: {
    let newItem = state.products.find(product => product.id === action.payload);
    //newItem recibe el item encontrado a partir de buscar en Products por el
    //id pasado como argumento en action.payload
    let itemInCart = state.cart.find(item => item.id === newItem.id);
    //este código verifica si en el estado.carrito ya existe el item seleccionado

    return itemInCart
        ? {
            ...state,
            cart: state.cart.map(item => item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item)
        }
        //si itemInCart es distinto de null es que el elemento ya
        // existe en el carrito y hay que acumularlo
        //se trae una copia del estado y se busca en el estado.carrito el id pasado por payload
        //cuando se lo encuentra se trae una copia de los items del carrito y se agrega una 
        //propiedad mas que es quantity a la que se suma en 1
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
        }

        //si no existe el elemento ya en el carrito se trae una copia del estado
        //se le agrega a Cart una copia de lo que traia antes, se le agrega el nuevo item y 
        //la propiedad quantity en 1


}

//Como llamar al dispatch para eliminar elementos del carrito

const delFromCart = (id, all = false) => {
    console.log(id, all);
    if (all) {
        dispatch({type: TYPES.REMOVE_ALL_FROM_CART, payload: id});
    } else {
        dispatch({type: TYPES.REMOVE_ONE_FROM_CART, payload: id});
    }

} 

//Como eliminar un solo elemento del carrito contemplando si hay mas de uno y si hay que 
//eliminarlo completamente del carrito

case TYPES.REMOVE_ONE_FROM_CART: {
    let itemToDelete = state.cart.find(item => item.id === action.payload);

    return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) => item.id === action.payload) 
                ? {
                     ...item, quantity: item.quantity - 1
                  }
                
                : item
          }
        
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload)
          }
}