import React from 'react'
import { InputNumber, Select, Button } from 'antd'

import './dog-finder.css'

const { Option } = Select
const DEFAULT_NUM_DOGS = 3

export class DogFinder extends React.PureComponent {

  state = {
    numDogs: DEFAULT_NUM_DOGS,
    breedList: ["<none>"],
    selectedBreed: "<none>"
  }

  async fetchBreeds() {
    const fetchRes = await fetch("https://dog.ceo/api/breeds/list/all")
    return (await fetchRes.json()).message
  }

  async componentDidMount() {
    const breeds = await this.fetchBreeds()

    // sorting breeds
    const allBreedsArray = Object.keys(Object.keys(breeds).reduce((acc, item) => {
      if (breeds[item].length) breeds[item].forEach(prefix => acc[`${prefix} ${item}`] = null)
      else acc[item] = null
      return acc
    }, {}))

    this.setState({ breedList: this.state.breedList.concat(allBreedsArray) })
  }

  numDogFormatter = (value) => value != 0 ? Math.abs(Number(value.replace(/-/g, '').split(".")[0])) : 1

  render() {
    const { numDogs, breedList, selectedBreed } = this.state
    const { getDogPics } = this.props
    return (
      <div className={`dog-finder-container`}>
        <div className='inputs-section'>
          <div className='num-dog-secion each-input-section'>
            <div className='input-title'>Number of Dogs*</div>
            <InputNumber 
              onChange={e => this.setState({ numDogs: e })}
              value={numDogs}
              defaultValue={DEFAULT_NUM_DOGS}
              autoFocus
              formatter={this.numDogFormatter}
              required
            />
          </div>
          <div className='num-dog-secion each-input-section'>
            <div className='input-title'>Breed</div>
            <Select 
              defaultValue={breedList[0]} 
              style={{ width: 120 }} 
              onChange={e => this.setState({ selectedBreed: e })}
            >
              {
                breedList.map(breed => (
                  <Option 
                    key={breed} 
                    value={breed}
                  >
                    {breed.split(' ').map(i => i.capitalize()).join(' ')}
                  </Option>
                ))
              }
            </Select>
          </div>
          <div className='submit-button'>
            <Button 
              onClick={() => getDogPics({ numDogs, breed: selectedBreed === '<none>' ? null : selectedBreed })} 
              type='primary'
            >
              SUBMIT!
            </Button>
          </div>
        </div>
      </div>
    )
  }
}