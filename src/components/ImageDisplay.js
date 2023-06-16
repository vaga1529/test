import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'

const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
`

const ImageDisplay = ({ image }) => {
  return image ? <StyledImage source={{ uri: image }} /> : null
}

export default ImageDisplay
