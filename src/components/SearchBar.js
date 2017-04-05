import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllListings } from '../actions/listingActions'

class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      sortedListing: []
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.getSearchQuery = this.getSearchQuery.bind(this)
  }

  onInputChange() {
    const allListings = this.props.allListings
    this.setState({ sortedListing: this.getSearchQuery(allListings) })
  }

  getSearchQuery(allListings) {
    return allListings.filter((listing, i) => {
      const position = listing.position.toLowerCase()
      const company = listing.company.toLowerCase()
      const isMatch = ((position.indexOf(this.refs.search.value.toLowerCase()) > -1) || (company.indexOf(this.refs.search.value.toLowerCase()) > -1))

      if (isMatch) return listing
    })
  }

  renderResults() {
    if(this.state.sortedListing.length === 0) return null

    return (
      <div>
        {
          this.state.sortedListing.map((listing, i) => {
            return (
              <div className='search-results card'>
                <h1>{ listing.position } at { listing.company }</h1>
                <h4>{ listing.street },  { listing.city } { listing.state } { listing.zipcode }</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum enim vitae pellentesque fringilla. Vivamus eleifend faucibus ipsum, nec rutrum nulla imperdiet lacinia. Phasellus euismod enim sit amet ante luctus, in rhoncus arcu egestas. Integer eu tempor quam. Fusce nec ante tellus.
                </p>
                <button className='primary'>Apply</button>
                <button>Site</button>
              </div>
            )
          })
        }
      </div>
    )
  }

  componentWillMount() {
    this.props.fetchAllListings()
  }

  componentDidMount() {
    this.setState({ sortedListing: this.props.allListings })
  }

  render() {
    const searchResults = this.renderResults()
    debugger
    return (
      <div className='search-container' >
        <div>
          <input
            ref='search'
            className='search-bar'
            placeholder='Keywords ( Example Fullstack, Backend, Rails ) . . .'
            onChange={ this.onInputChange } />
          <button className='primary'>Search</button>
        </div>

        { searchResults }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allListings: state.listing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllListings: () => {
      let action = fetchAllListings()
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)