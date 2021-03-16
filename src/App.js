import React from  'react'
import 'antd/dist/antd.css'

import { DogFinder } from  './dog-finder'
import { DogViewer } from './dog-viewer'

import './App.css'

export class App extends React.Component {
  state = {
    dogImageURLs: []
  }
  getDogPics = ({ numDogs, breed }) => {
    const fetchAPI = `https://dog.ceo/api/breed${breed ? '' : 's'}/${breed ? breed.split(' ').reverse().join('/') + '/' : ''}image${breed ? 's' : ''}/random/${numDogs}`
    console.log(fetchAPI)
    this.fetchDogs(fetchAPI)
  }

  async fetchDogs(api) {
    const fetchRes = await fetch(api)
    const imagesURL = (await fetchRes.json()).message
    console.log(imagesURL)
    this.setState({ dogImageURLs: imagesURL })
  }

  render() {
    return (
      <>
        <DogFinder getDogPics={this.getDogPics} />
        <DogViewer imageURLs={this.state.dogImageURLs} />
      </>
    )
  }
}
