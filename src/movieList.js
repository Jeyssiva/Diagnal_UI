import React, { useState, useEffect, useCallback } from 'react';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

import { connect } from 'react-redux';
import compose from 'recompose/compose';

import {
    withStyles
  } from '@material-ui/core';
import { movieList, updatePage } from './actions';
const withCustomStyle = withStyles(() => ({
    setHeight : {
      height: '94vh'
    }
  }));

function MovieList({
    classes, 
    fetchMovieList, 
    movies, 
    page,
    totalCount, 
    pagesReturned, 
    updatePage}) {

    useEffect(() => {
      fetch(`./api/contentpage${page}.json`)
      .then(response => response.json())
      .then(data => {
        fetchMovieList(data.page)
      })
      .catch((err) => console.log(err))
    }, [page])

    const getNextPage = useCallback(() => {
      if(pagesReturned <= totalCount){
        updatePage()
      }
    }, [pagesReturned])

    const breakWord = word => {
      if(word.length <= 11) return word
      return `${word.slice(0,9)}...`
    }

    return ( 
        <div>
          <BottomScrollListener onBottom={getNextPage}>
            {(scrollRef) => 
              <div ref={scrollRef} id='movieList' class={`container mx-auto overflow-y-auto ${classes.setHeight}`}>
                {
                  movies.map((movie,i) => ( 
                  <div class="inline-block pl-2 w-34 h-40 " key = {`main_${movie['poster-image']}_${i}}`}>
                      <div class="bg-black overflow-hidden py-2" key={`${movie['poster-image']}_${i}`}>
                          <img data-src={`./slices/${movie['poster-image']}`}  onError={(e)=>{e.target.onerror = null; e.target.src="./slices/placeholder_for_missing_posters.png"}}
                          src= {`./slices/${movie['poster-image']}`} 
                          class="image-lazy w-34 h-40" alt={movie.name}/>
                          <div class="pr-2 pb-2 pt-2">
                              <span class="text-left text-white font-light" title = {`${movie.name}`}>{breakWord(movie.name)}</span>
                          </div>
                      </div>
                  </div> 
            ))}
              </div>
            }
          </BottomScrollListener>
        </div>
    );
}

const mapState = state => {
    return {
        totalCount: state.totalCount,
        page: state.page,
        pagesReturned: state.pagesReturned
    }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMovieList: (data) => dispatch(movieList(data)),
    updatePage: () => dispatch(updatePage())
  }
}

export default compose (
  (withCustomStyle),
  connect(mapState,mapDispatchToProps)
) (MovieList);