import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw Error('Oops - we do not seem to be inside the provider');
    }
    return context;
}

const StoreProvider = ({ children }: PropsWithChildren<unknown>) => {

    const [basket, setBasket] = useState<Basket | null>(null);

    const removeItem = (productId: number, quantity: number = 1) => {
        if (!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity <= 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                return { ...prevState!, items }
            });
        }
    };

    return (
        <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </StoreContext.Provider>
    );

}

export {
    StoreContext,
    useStoreContext,
    StoreProvider
};