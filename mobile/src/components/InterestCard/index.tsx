import React from 'react';
import { Feather } from '@expo/vector-icons';

import { 
   Container,
   InterestImageFilter,
   InterestImage,
   InterestTitleContainer,
   InterestTitle,
   InterestDelete,
   DeleteIcon
} from './styles';

interface InterestCardProps {
   img_url: string;
   name: string;
   notDelete?: boolean;
}

const InterestCard: React.FC<InterestCardProps> = ({ img_url, name, notDelete }) => {
  return (
     <Container>
        <InterestImageFilter/>
            <InterestImage 
               resizeMode={'cover'} 
               source={{ uri: img_url }}>
               { !notDelete &&
                  <InterestDelete>
                     <Feather name="x" color="#232323" size={12} />
                  </InterestDelete>
               }
            </InterestImage>
         <InterestTitleContainer>
            <InterestTitle>{name}</InterestTitle>
         </InterestTitleContainer>
     </Container>
  );
}

export default InterestCard;