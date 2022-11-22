import React, { useReducer } from 'react';
import axios from 'axios';

export const productsContext = React.createContext();

const INIT_STATE = {
    products: [],
    pages: 0,
    categories: [],
    oneProduct: null
};

function reducer(state=INIT_STATE, action) {
    switch(action.type){
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload.results,
                pages: Math.ceil(action.payload.count / 5)
            };
        case 'GET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'GET_ONE_PRODUCT':
            return { ...state, oneProduct: action.payload };
        default:
            return state;
    };
};

const API = 'https://backend-for-fs-makers.herokuapp.com/api/v1';

const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    async function getCategories() {
        try {
            const tokens = JSON.parse(localStorage.getItem('tokens'));
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization
                }
            };
            const res = await axios(`${API}/category/list/`, config);
            // console.log(res);
            dispatch({
                type: 'GET_CATEGORIES',
                payload: res.data.results
            });
        } catch(err) {
            console.log(err);
        };
    };

    async function createProduct(newProduct, navigate){
        try {
            const tokens = JSON.parse(localStorage.getItem('tokens'));
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization
                }
            };
            const res = await axios.post(`${API}/products/`, newProduct, config);
            // console.log(res);
            navigate('/products');
            // getProducts();
        } catch(err) {
            console.log(err);
        };
    };

    async function getProducts(){
        try {
            const tokens = JSON.parse(localStorage.getItem('tokens'));
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization
                }
            };
            const res = await axios(`${API}/products/${window.location.search}`, config);
            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            });
            console.log(res.data);
        } catch(err) {
            console.log(err);
        };
    };

    async function getOneProduct(id){
        try {
            const tokens = JSON.parse(localStorage.getItem('tokens'));
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization
                }
            };
            const res = await axios(`${API}/products/${id}`, config);
            dispatch({
                type: 'GET_ONE_PRODUCT',
                payload: res.data
            });
        } catch(err) {
            console.log(err);
        };
    };

    async function updateProduct(id, editedProduct, navigate){
        try {
            const tokens = JSON.parse(localStorage.getItem('tokens'));
            const Authorization = `Bearer ${tokens.access}`;
            const config = {
                headers: {
                    Authorization
                }
            };
            const res = await axios.patch(
                `${API}/products/${id}/`,
                editedProduct,
                config
            );
            navigate('/products');
            getProducts();
        } catch(err) {
            console.log(err);
        };
    };

    return (
        <productsContext.Provider value={{
            products: state.products,
            pages: state.pages,
            categories: state.categories,
            oneProduct: state.oneProduct,

            getCategories,
            createProduct,
            getProducts,
            getOneProduct,
            updateProduct
        }}>
            { children }
        </productsContext.Provider>
    );
};

export default ProductsContextProvider;