// GalleryScreen.js

import React, { useState, useEffect, useRef } from 'react'
import {
  FlatList,
  Dimensions,
  TextInput,
  View,
  Button,
  Alert,
  Text,
} from 'react-native'
import styled from 'styled-components/native'
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot'

const StyledImage = styled.Image`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').width}px;
`

const StyledViewShot = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').width}px;
`

const StyledTextInputContainer = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  width: ${Dimensions.get('window').width - 40}px;
  height: ${Dimensions.get('window').width - 40}px;
  align-items: center;
  justify-content: center;
`

const StyledTextInput = styled.TextInput`
  color: white;
  font-size: 24px;
  text-align: center;
`

const GalleryScreen = ({ route }) => {
  const [images, setImages] = useState([])
  const [texts, setTexts] = useState({})
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const viewShotRef = useRef()
  // Declare textInputRef
  const textInputRef = useRef(null)

  useEffect(() => {
    if (route.params?.imageUri) {
      setImages((currentImages) => [...currentImages, route.params.imageUri])
    }
  }, [route.params?.imageUri])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const saveImage = async () => {
    if (!imageLoaded) {
      return
    }

    requestAnimationFrame(async () => {
      try {
        const imageURI = await captureRef(viewShotRef.current, {
          format: 'jpg',
          quality: 0.9,
        })

        const { status } = await MediaLibrary.requestPermissionsAsync()
        if (status === 'granted') {
          const asset = await MediaLibrary.createAssetAsync(imageURI)
          await MediaLibrary.createAlbumAsync('Expo', asset, false)
          Alert.alert('Saved', 'Image has been saved to your gallery.')
        }
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          <StyledViewShot ref={viewShotRef}>
            <StyledImage source={{ uri: item }} onLoad={handleImageLoad} />
            {imageLoaded && (
              <StyledTextInputContainer>
                <StyledTextInput
                  ref={textInputRef}
                  value={texts[item]}
                  onChangeText={(text) =>
                    setTexts((currentTexts) => ({
                      ...currentTexts,
                      [item]: text,
                    }))
                  }
                  onFocus={() => setIsEditing(true)}
                  onBlur={() => setIsEditing(false)}
                  placeholder="Write something..."
                  placeholderTextColor="white"
                />
                {isEditing && (
                  <Button
                    title="Done"
                    onPress={() => textInputRef.current.blur()}
                  />
                )}
              </StyledTextInputContainer>
            )}
          </StyledViewShot>
          <Button title="Save Image" onPress={saveImage} />
        </View>
      )}
    />
  )
}

export default GalleryScreen
