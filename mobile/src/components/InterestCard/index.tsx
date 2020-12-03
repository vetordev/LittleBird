import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';

import api from '../../services/api';

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
   content?: {}
}

const InterestCard: React.FC<InterestCardProps> = ({ img_url, name, content, notDelete, type, idContent, isContent, idTheme }) => {
   const { token } = useAuth();
   const { navigate } = useNavigation();

   async function navigateToContent() {
      if (token) {
         if (type == 'article') {
            const article_id = idContent;

            let articleParam;

            if (content) {
               articleParam = content;
               navigate('Articles', { articleParam });
            } else {
               const responseArticle = await api.get(`article/${article_id}`);

               articleParam = responseArticle.data;
               navigate('Articles', { articleParam });
            }
            
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
                     <InterestDelete onPress={() => { console.log('vai man fpv') }}>
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