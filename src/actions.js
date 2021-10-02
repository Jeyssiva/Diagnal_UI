export function movieList(data) {
    return dispatch => {
        dispatch({       
            type: 'FETCH_MOVIE_LIST',
            data
        })
    };
  }
  
  export function updatePage(data) {
    return dispatch => {
        dispatch({       
            type: 'NEXT_PAGE'
        })
    };
  }