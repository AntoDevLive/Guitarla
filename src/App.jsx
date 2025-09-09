import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";


function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExists = cart.findIndex( guitar => guitar.id === item.id ); //cuando un elemento no existía aún en el array retorna -1
      if(itemExists >= 0) { //si retorna >= 0 significa que ya existía en el arreglo
        if(cart[itemExists].cantidad >= MAX_ITEMS) return;
        const updateCart = [...cart]; //hacemos una copia de cart para no mutarlo directamente
        updateCart[itemExists].cantidad++;  //incrementamos la cantidad
        setCart(updateCart); //aplicamos la mutación
      } else { // Agregamos el item por primera vez al array
        item.cantidad = 1; //Esto también agrega la propiedad "cantidad" al item
        setCart([...cart, item]);
      }  

  }

  function removeFromCart(id) {
    setCart( prevCart => prevCart.filter(guitar => guitar.id != id))
  }

  function clearCart() {
    setCart([]);
  }

  function IncreaseCant(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.cantidad < MAX_ITEMS) {
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
      if(item.id === id && item.cantidad > MIN_ITEMS) {
        return {
          ...item,
          cantidad: item.cantidad -1
        }
      }
      return item;
    });
    setCart(updatedCart);
  }

  return (
    <>

      <Header //Renderizar el componente Header */
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        IncreaseCant={IncreaseCant}
        decreaseCant={decreaseCant}
      /> 

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              key={guitar.id}
              guitar = {guitar}
              addToCart = {addToCart}
              setCart = {setCart}
            />
          ))}
          
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
