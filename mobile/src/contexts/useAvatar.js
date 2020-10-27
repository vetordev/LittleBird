import React, { createContext, useState, useEffect, useContext } from 'react';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
   const [avatar, setAvatar] = useState(1);
   
   const avatares = [
      {
         id: 1,
         url: 'https://image.freepik.com/vetores-gratis/ilustracao-de-fatia-de-pizza_179407-45.jpg'
      },
      {
         id: 2,
         url: 'https://i.pinimg.com/originals/90/1d/45/901d45d05461495b1c0700ce47517135.jpg'
      },
      {
         id: 3,
         url: 'https://www.nicepng.com/png/detail/147-1477699_hand-drawn-smiling-sun-vector-encapsulated-postscript.png', 
      },
      {
         id: 4,
         url: 'https://cdn.dribbble.com/users/2172174/screenshots/10754281/image7344.png'
      }
   ]

   return (
      <AvatarContext.Provider value={{ avatares, avatar, setAvatar }}>
         {children}
      </AvatarContext.Provider>
   )
}

export function useAvatar() {
   const context = useContext(AvatarContext);

   return context;
}