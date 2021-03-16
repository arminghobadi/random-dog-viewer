import React from 'react'
import { ResponsiveWrap } from '@blast-engine/responsive-wrap'

import { DogCard } from './dog-card'

import './dog-viewer.css'

export class DogViewer extends React.PureComponent {

  render() {
    return (
      <div className={`dog-viewer-container`}>
        <ResponsiveWrap minWidth={300} maxWidth={400} outerDivClassName='wrapper' >
          {
            this.props.imageURLs.map(url => <DogCard key={url} imageUrl={url} />)
          }
        </ResponsiveWrap>
      
      </div>
    )
  }
}