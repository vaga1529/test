import React, { useState, useEffect } from 'react';
import { Image, FlatList, Dimensions } from 'react-native';

const GalleryScreen = ({ route }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (route.params?.imageUri) {
      setImages((currentImages) => [...currentImages, route.params.imageUri]);
    }
  }, [route.params?.imageUri]);

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} />
      )}
    />
  );
};

export default GalleryScreen;
