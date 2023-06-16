import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

const useGallery = () => {
  const [image, setImage] = useState(null)

  const getPermissionAsync = async () => {
    const { status: mediaLibraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (mediaLibraryStatus !== 'granted') {
      alert('갤러리 접근 권한이 필요합니다.')
    }
  }

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    } catch (E) {
      console.log(E)
    }
  }

  return { image, getPermissionAsync, pickImage }
}

export default useGallery
