import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('App Component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('renders the search bar and pagination', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Search for a movie')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('renders a list of movies after searching', async () => {
    mockAxios.onGet('http://www.omdbapi.com/').reply(200, {
      Search: [
        { imdbID: '1', Title: 'Movie 1', Poster: 'poster1.jpg', Year: '2021' },
        { imdbID: '2', Title: 'Movie 2', Poster: 'poster2.jpg', Year: '2022' }
      ],
      totalResults: '2',
      Response: 'True'
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search for a movie'), { target: { value: 'Batman' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => expect(screen.getByText('Movie 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Movie 2')).toBeInTheDocument());
  });
});
