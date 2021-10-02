const initialstate = {
    movieList: [],
    totalCount : 0,
    fetching : false,
    page : 1,
    pagesReturned : 0,
    movieNames : []
  };

  export const mainReducer = (state = initialstate, action) => {
    switch (action.type) {
      case 'FETCH_MOVIE_LIST':
        return {
          ...state,
          totalCount: parseInt(action.data['total-content-items']),
          movieList :  state.movieList.concat(action.data['content-items'].content),
          movieNames : [...new Set([...state.movieNames, ...action.data['content-items'].content.map(c => c.name)])] ,
          pagesReturned : state.pagesReturned + parseInt(action.data['page-size-returned'])
        }
      case 'FETCHING_IMAGES':
        return { ...state, fetching: action.fetching }
      case 'NEXT_PAGE':
        return { ...state, page: state.page + 1}
      default:
        return state;
    }
}