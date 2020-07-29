import React from 'react';
import { WebView } from 'react-native-webview';

const Webview = () => {
  return (
     <WebView style={{ flex: 1 }} source={{ uri: 'https://feathericons.com/' }} />
  );
}

export default Webview;