import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
 
import MainPage from './mainPage.js';
 
const mockStore = configureStore([]);
 
describe('MainPage Component Load', () => {
  let store;
  let component;
 
  beforeEach(() => {
    store = mockStore({
      movieList: [
        {
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
        }
    ]
    });
 
    component = renderer.create(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
  });
 
  it('Render Main page component from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
 
});