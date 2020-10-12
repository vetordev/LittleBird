import React from 'react';
import { View } from 'react-native';

import { Tags, Tag, TagSessionTitle, TagTitle } from './styles';

const TagsThemes = () => {
  return (
      <View style={{ width: '100%' }}>
         {/* <TagSessionTitle>Tags:</TagSessionTitle> */}
         <Tags 
            horizontal
            showsHorizontalScrollIndicator={false}
         >
            <Tag>
               <TagTitle>Adolescência</TagTitle>
            </Tag>
            <Tag>
               <TagTitle>Puberdade</TagTitle>
            </Tag>
            <Tag>
               <TagTitle>Sexo</TagTitle>
            </Tag>
         </Tags>
      </View>
  )
}

export default TagsThemes;