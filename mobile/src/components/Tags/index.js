import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Tags, Tag, TagSessionTitle, TagTitle } from './styles';

const TagsThemes = ({ data }) => {
   const { navigate } = useNavigation();

   function navigateToSubjects(theme_id) {
      navigate('Subjects', { theme_id });
   }

   return (
      <View style={{ width: '100%' }}>
         {/* <TagSessionTitle>Tags:</TagSessionTitle> */}
         <Tags 
            horizontal
            showsHorizontalScrollIndicator={false}
         >
            {data.map(item => (
               <Tag key={item.theme_id} onPress={() => navigateToSubjects(item.theme_id)}>
                  <TagTitle>{item.theme_name}</TagTitle>
               </Tag>
            ))}
         </Tags>
      </View>
   )
}

export default TagsThemes;