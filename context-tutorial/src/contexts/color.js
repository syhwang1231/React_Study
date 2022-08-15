import React, { createContext, useState } from "react";

const ColorContext = createContext({
    state: { color: 'black', subcolor: 'red'},
    actions: {
        setColor: () => {},
        setSubcolor: () => {}
    }
});

const ColorProvider = ({children}) => {
    const [color, setColor] = useState('black');
    const [subcolor, setSubcolor] = useState('red');

    const value = {
        state: { color, subcolor },
        actions: { setColor, setSubcolor }
    };

    return (
        <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
};

// const ColorConsumer = ColorContext.Conumser와 같은 의미
const { Comsumer: ColorConsumer } = ColorContext;


export default ColorContext;

// ColorProvider와 ColorConsumer 내보내기
export {ColorProvider, ColorConsumer};