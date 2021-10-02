import React, { useState, useEffect } from 'react';
import {
    withStyles,
    Card,
    CardContent
  } from '@material-ui/core';
import StickyHeader from './stickyHeader';
import MovieList from './movieList';
import Autocomplete from 'react-autocomplete'
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const withCustomStyle = withStyles(() => ({  
    cardStyle: {
        width: '27.7%'
      }
  }));

function MainPage({classes, movieNames, movies}) {
  const [searching, setSearching] = useState(false)
  const [filterMovies, setFilterMovies] = useState([])
  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    setFilterMovies(movies)
  }, [movies])

  const onSearchTextChange = val => {
      setInputSearch(val)
      const fMovies = movies.filter(f => f.name.includes(val))
      setFilterMovies(fMovies)
  }

  const onHandleSearch = () => {
    setSearching(!searching)
    if(!searching === false) setFilterMovies(movies)
    setInputSearch('')
  }
    return (
        <div>
        <header class = 'flex flex-col items-center justify-items-center'>
          <Card class = {`bg-black rounded-none h-screen ${classes.cardStyle}`}>
            <CardContent class= {'p-px'}>
                <StickyHeader>
                  <div class= 'w-screen h-8 mt-2 flex flex-row'>       
                    <img src='./slices/back.png' class = "w-8 mr-4" alt='Back'/>
                    {
                      searching ?
                      <Autocomplete
                        id='autocomplete'
                        getItemValue={(item) => item}
                        items={movieNames}
                        renderItem={(item, isHighlighted) =>
                          <div style={{ background: isHighlighted ? 'lightgray' : 'white', padding: '3px' }}>
                            {item}
                          </div>
                        }
                        value={inputSearch}
                        onChange={(e) => onSearchTextChange(e.target.value)}
                        onSelect={(val) => onSearchTextChange(val)}
                        inputProps = {{ placeholder: 'Search Movie Here...', style: {width: '16rem'} }}
                        wrapperStyle = {{display: 'inline-flex', width: '16rem', marginRight: '6px'}}
                    /> 
                    : <span class="font-normal text-white text-lg mr-32">Romantic Comedy</span>
                    }
                    
                    <img src='./slices/search.png' class = 'w-8' alt='Search' onClick={onHandleSearch}/>
                  </div>
                </StickyHeader>
                <MovieList movies= {filterMovies}/>
            </CardContent>
          </Card>
        </header>
      </div>
    );
}

const mapState = state => {
  return {
      movieNames : state.movieNames,
      movies : state.movieList
  }
}
export default compose (
(withCustomStyle),
connect(mapState)
) (MainPage);