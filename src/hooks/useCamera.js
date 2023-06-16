//useCamera.js

import { useState, useEffect } from 'react'
import { Camera, CameraType } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'

const useCamera = () => {
  const [type, setType] = useState(CameraType.back)
  const [image, setImage] = useState(null)
  const [permission, requestPermission] = Camera.useCameraPermissions()

  const getPermissionAsync = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      alert('카메라 접근 권한이 필요합니다.')
    }
  }

  useEffect(() => {
    getPermissionAsync()
  }, [])

  const takeImage = async () => {
    if (!permission || !permission.granted) {
      alert('카메라 접근 권한이 필요합니다.')
      return
    }
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  return {
    image,
    getPermissionAsync,
    takeImage,
    toggleCameraType,
    type,
    permission,
  }
}

export default useCamera
