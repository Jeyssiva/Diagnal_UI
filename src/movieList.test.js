import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
 
import MovieList from './movieList';
 
const mockStore = configureStore([]);
 
describe('MovieList Component Load', () => {
  let store;
  let component;
 
  beforeEach(() => {
    store = mockStore({
      
    });

    const movieList = [{
        "name": "The Birds",
        "poster-image": "poster1.jpg"
      },
      {
        "name": "Rear Window",
        "poster-image": "poster2.jpg"
      },
      {
        "name": "Family Pot",
        "poster-image": "poster3.jpg"
    }];
 
    component = renderer.create(
      <Provider store={store}>
        <MovieList movies = {movieList} />
      </Provider>
    );
  });
 
  it('Render movies list from given props', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
 
});