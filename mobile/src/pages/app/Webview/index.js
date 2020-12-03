import React from 'react';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

const Webview = () => {
   const route = useRoute();
   const { link } = route.params;

   return (
      <WebView 
        style={{ flex: 1 }} 
        source={{ uri: link }} 
        allowFileAccess={true}
        scalesPageToFit={true}
        originWhitelist={['*']} 
      />
   );
}

export default Webview;