import React, { useEffect, useRef, useState } from 'react'
import { View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import styled from 'styled-components/native'
import ImageDisplay from '../components/ImageDisplay'
import useCamera from '../hooks/useCamera'
import useGallery from '../hooks/useGallery'
import * as ImagePicker from 'expo-image-picker'

const CameraScreen = () => {
  const navigation = useNavigation()
  const camera = useCamera()
  const gallery = useGallery()
  const cameraRef = useRef(null)
  const [cameraReady, setCameraReady] = useState(false)

  useEffect(() => {
    camera.getPermissionAsync()
    gallery.getPermissionAsync()
  }, [])

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.canceled) {
        setCameraReady(false) // 갤러리 탭으로 이동 시 카메라 준비 상태를 false로 설정
        navigation.navigate('Gallery', { imageUri: result.assets[0].uri })
      }
    } catch (E) {
      console.log(E)
    }
  }

  const takeImage = async () => {
    try {
      setCameraReady(true)
      let options = {
        quality: 1,
        base64: true,
        exif: false,
      }

      let newPhoto = await cameraRef.current.takePictureAsync(options)

      if (newPhoto.uri) {
        setCameraReady(false) // 갤러리 탭으로 이동 시 카메라 준비 상태를 false로 설정
        navigation.navigate('Gallery', { imageUri: newPhoto.uri })
      }
    } catch (E) {
      console.log(E)
    }
  }

  return (
    <Container>
      {cameraReady && (
        <CameraView
          type={camera.type}
          ref={cameraRef}
          onCameraReady={() => setCameraReady(true)}
          ratio="4:3"
        >
          <ButtonContainer>
            <StyledButton title="Flip" onPress={camera.toggleCameraType} />
            <StyledButton title="Take Picture" onPress={takeImage} />
          </ButtonContainer>
        </CameraView>
      )}
      <ButtonContainer>
        <StyledButton
          title="Open camera"
          onPress={() => {
            setCameraReady(true)
          }}
        />
        <StyledButton title="Select an image" onPress={pickImage} />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const CameraView = styled(Camera)`
  flex: 5;
  width: 100%;
`

const ButtonContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
`

const StyledButton = styled(Button)`
  margin-horizontal: 10px;
  margin-vertical: 5px;
`

export default CameraScreen
;``
