import React from 'react';
import { SvgUri } from 'react-native-svg';

import TagsThemes from '../../components/Tags';

import {
   ModalTitle,
   ModalDescription,
   ModalContent,
   ModalSubtitle,
   ModalSubtitleText,
   ModalRuleTitle,
   ModalRule,
   ModalRuleImg,
   ModalRuleDescription,
} from './styles';

const ContentModalForumRules = ({ forum }) => {
  return (
      <>
         <ModalTitle>Informações importantes</ModalTitle>
         <ModalDescription>
            {forum.forum_description}
         </ModalDescription>

         <TagsThemes data={forum.themes} />

         <ModalContent>
            <ModalSubtitle>
               <ModalSubtitleText>Regras do chat</ModalSubtitleText>
            </ModalSubtitle>

            <ModalRuleTitle>Não compartilhe notícias falsas ou spam</ModalRuleTitle>
            <ModalRule>
               <ModalRuleImg color="#D49EFF">
                  <SvgUri uri={'https://www.flaticon.com/svg/static/icons/svg/2867/2867041.svg'} width={60} height={60} />
               </ModalRuleImg>
               <ModalRuleDescription>
                  Se você não tem certeza sobre uma informação, não compartilhe-a. Além disso, links externos ou mensagens repetitivas não são bem-vindas.
               </ModalRuleDescription>
            </ModalRule>

            <ModalRuleTitle>Proteja informações privadas</ModalRuleTitle>
            <ModalRule>
               <ModalRuleImg color="#FFBF9E">
                  <SvgUri uri={'https://www.flaticon.com/svg/static/icons/svg/1691/1691925.svg'} width={60} height={60} />
               </ModalRuleImg>
               <ModalRuleDescription>
                  O anonimato é uma das coisas que mantém as salas de conversa seguras. Não compartilhe informações sobre a sua identidade ou a de outras pessoas.
               </ModalRuleDescription>
            </ModalRule>

            <ModalRuleTitle>Não desrespeite outros usuários</ModalRuleTitle>
            <ModalRule>
               <ModalRuleImg color="#9ECAFE">
                  <SvgUri uri={'https://www.flaticon.com/svg/static/icons/svg/3843/3843011.svg'} width={60} height={60} />
               </ModalRuleImg>
               <ModalRuleDescription>
                  É normal ter opiniões diferentes, mas lembre-se de que opiniões não devem ferir a liberdade de indivíduos ou grupos de pessoas.
               </ModalRuleDescription>
            </ModalRule>

            <ModalRuleTitle>Se mantenha no assunto da sala de conversa</ModalRuleTitle>
            <ModalRule>
               <ModalRuleImg color="#9EFEB9">
                  <SvgUri uri={'https://www.flaticon.com/svg/static/icons/svg/745/745205.svg'} width={60} height={60} />
               </ModalRuleImg>
               <ModalRuleDescription>
                  Se houver outro assunto de educação sexual de seu interesse, seja paciente! Logo teremos um espaço para conversarmos sobre isso.
               </ModalRuleDescription>
            </ModalRule>

            <ModalRuleTitle>Respeite a proposta do aplicativo</ModalRuleTitle>
            <ModalRule>
               <ModalRuleImg color="#FCFE9E">
                  <SvgUri uri={'https://www.flaticon.com/svg/static/icons/svg/610/610413.svg'} width={60} height={60} />
               </ModalRuleImg>
               <ModalRuleDescription>
                  Nossa intenção é promover discussões sobre educação sexual. Comentários sobre temas não relacionados podem ser mais bem aproveitados em outros ambientes.
               </ModalRuleDescription>
            </ModalRule>

         </ModalContent>
      </>
  );
}

export default ContentModalForumRules;