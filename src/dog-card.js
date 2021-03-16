import React from 'react'

import './dog-card.css'

export class DogCard extends React.PureComponent {
  state = {}

  deriveBreedFromImageUrl = (imageURL) => {
    const urlWithoutFirstPart = imageURL.split('https://images.dog.ceo/breeds/')[1]
    const unformattedBreed = urlWithoutFirstPart.split('/')[0]
    const formattedBreed = unformattedBreed.split('-').map(i => i.capitalize()).reverse().join(' ')
    
    return formattedBreed
  }

  render() {
    const { imageUrl } = this.props
    return (
      <div className={`dog-card-container`}>
        <div className='dog-card'>
          <img src={imageUrl} style={{ width: '100%' }} />
          <strong className='breed'>Breed: {this.deriveBreedFromImageUrl(imageUrl)}</strong>
        </div>
      </div>
    )
  }
}