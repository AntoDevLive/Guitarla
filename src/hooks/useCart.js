import { useState, useEffect } from "react";
import { db } from "../data/db";

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(item) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id); //cuando un elemento no existía aún en el array retorna -1
        if (itemExists >= 0) { //si retorna >= 0 significa que ya existía en el arreglo
            if (cart[itemExists].cantidad >= MAX_ITEMS) return;
            const updateCart = [...cart]; //hacemos una copia de cart para no mutarlo directamente
            updateCart[itemExists].cantidad++;  //incrementamos la cantidad
            setCart(updateCart); //aplicamos la mutación
        } else { // Agregamos el item por primera vez al array
            item.cantidad = 1; //Esto también agrega la propiedad "cantidad" al item
            setCart([...cart, item]);
        }

    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id != id))
    }

    function clearCart() {
        setCart([]);
    }

    function IncreaseCant(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.cantidad < MAX_ITEMS) {
                return {
                    ...item,
                    cantidad: item.cantidad + 1
                }
            }
            return item;
        });
        setCart(updatedCart);
    }

    function decreaseCant(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.cantidad > MIN_ITEMS) {
                return {
                    ...item,
                    cantidad: item.cantidad - 1
                }
            }
            return item;
        });
        setCart(updatedCart);
    }

    // State derivado
    const isEmpty = () => cart.length === 0;
    const cartTotal = () => cart.reduce((total, item) => total + (item.cantidad * item.price), 0)

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        IncreaseCant,
        decreaseCant,
        isEmpty,
        cartTotal
    } // return en los customs hooks con {} y no con ()!!!
}