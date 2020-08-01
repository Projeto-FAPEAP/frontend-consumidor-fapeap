import React, { useState, useCallback, createContext, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface CartContextData {
  cart: object | null;
  addCart(product: object): void;
  removeCart(product: object): void;
  clearCart(): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<object[] | null>([]);

  useEffect(() => {
    /* async function loadData(): Promise<void> {
      const userLoaded = await AsyncStorage.getItem(
        '@QueroAçaí-Consumidor:user',
      );
    }
    loadData(); */
  }, []);

  const addCart = useCallback(
    (product) => {
      const filter = cart.filter((item) => item.id == product.id);

      if (filter.length > 0) {
        if (filter[0].quantity == product.estoque_produto) {
          return;
        }

        const newData = cart.map((item) =>
          item.id == product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        setCart(newData);
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    },
    [cart],
  );

  const removeCart = useCallback(
    (product) => {
      const filter = cart.filter((item) => item.id == product.id);
      if (filter.length > 0) {
        if (filter[0].quantity == 1) {
          const filter = cart.filter((item) => item.id != product.id);
          setCart(filter);
        } else {
          const newData = cart.map((item) =>
            item.id == product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
          setCart(newData);
        }
      }
    },
    [cart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
