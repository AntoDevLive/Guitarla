import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";


function App() {

  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemExists = cart.findIndex( guitar => guitar.id === item.id ); //cuando un elemento no existía aún en el array retorna -1
      if(itemExists >= 0) { //si retorna >= 0 significa que ya existía en el arreglo
        const updateCart = [...cart]; //hacemos una copia de cart para no mutarlo directamente
        updateCart[itemExists].cantidad++;  //incrementamos la cantidad
        setCart(updateCart); //aplicamos la mutación
      } else { // Agregamos el item por primera vez al array
        item.cantidad = 1; //Esto también agrega la propiedad "cantidad" al item
        setCart([...cart, item]);
      }  
  }

  return (
    <>

      <Header //Renderizar el componente Header */
        cart={cart}
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
