import BidStatus from './BidStatus'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { get } from 'lodash'
import titleAndYear from 'desktop/apps/auction2/utils/titleAndYear'

function ListArtwork (props) {
  const artwork = props.artwork.artwork
  const artists = artwork.artists
  const artistDisplay = artists && artists.length > 0 ? artists.map((aa) => aa.name).join(', ') : null
  const artworkImage = get(artwork, 'images.0.image_url', '/images/missing_image.png')

  const auctionArtworkClasses = classNames(
    'auction2-page-list-artwork',
    { 'auction2-open': props.isClosed }
  )

  return (
    <a className={auctionArtworkClasses} key={artwork._id} href={`/artwork/${artwork.id}`}>
      <div className='auction2-page-list-artwork__image-container'>
        <div className='auction2-page-list-artwork__image'>
          <img src={artworkImage} alt={artwork.title} />
        </div>
      </div>
      <div className='auction2-page-list-artwork__metadata'>
        <div className='auction2-page-list-artwork__artists'>
          {artistDisplay}
        </div>
        <div
          className='auction2-page-list-artwork__title'
          dangerouslySetInnerHTML={{
            __html: titleAndYear(artwork.title, artwork.date)
          }}
        />
      </div>
      <div className='auction2-page-list-artwork__lot-number'>
        Lot {artwork.lot_label}
      </div>
      { !props.isClosed &&
        <BidStatus
          artworkItem={props.artwork}
        /> }
    </a>
  )
}

ListArtwork.propTypes = {
  isClosed: PropTypes.bool.isRequired,
  artwork: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    isClosed: state.auctionArtworks.isClosed
  }
}

export default connect(
  mapStateToProps
)(ListArtwork)
