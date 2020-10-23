import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';

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
   type: string;
   idContent?: number;
   isContent?: boolean;
   idTheme: number;
}

const InterestCard: React.FC<InterestCardProps> = ({ img_url, name, notDelete, type, idContent, isContent, idTheme }) => {
   const { token } = useAuth();
   const { navigate } = useNavigation();

   function navigateToContent() {
      if (token) {
         if (type == 'article') {
            const article_id = idContent;
            navigate('Articles', { article_id });
         } else {
            const forum_id = idContent;
            navigate('Forums', { forum_id });
         }
      }
   }

   function navigateToSubjects() {
      if (token) {
         const theme_id = idTheme;
         navigate('Subjects', { theme_id });   
      }
      
   }

   return (
      <Container onPress={isContent ? navigateToContent : navigateToSubjects}>
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