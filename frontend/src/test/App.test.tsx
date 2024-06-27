import React from 'react'; // React imported for testing
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUpload from '../components/FileUpload';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import { CSVData } from '../types/csvData';
import App from '../App';


test('renders upload input', () => {
  render(<FileUpload onFileUpload={() => {}} />);
  const uploadInput = screen.getByLabelText(/upload CSV file/i);
  expect(uploadInput).toBeInTheDocument();
});

test('renders search bar', () => {
  render(<SearchBar onSearch={() => {}} data-testid="search-input" />);
  const searchBar = screen.getByPlaceholderText(/search/i);
  expect(searchBar).toBeInTheDocument();
});

const testData: CSVData = {
  name: 'John Doe',
  city: 'New York',
  country: 'USA',
  favorite_sport: 'Basketball'
};

test('renders card component', () => {
  render(<Card data={testData} data-testid="info-card" />);
  const card = screen.getByTestId('info-card');
  expect(card).toBeInTheDocument();
  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/New York/i)).toBeInTheDocument();
  expect(screen.getByText(/USA/i)).toBeInTheDocument();
  expect(screen.getByText(/Basketball/i)).toBeInTheDocument();
});

test('search functionality', async () => {
  render(<App />);
  const searchBar = screen.getByPlaceholderText(/search/i);
  const testData = 'John Doe,New York,USA,Basketball';
  const file = new File([`name,city,country,favorite_sport\n${testData}`], 'test.csv', { type: 'text/csv' });

  const uploadInput = screen.getByLabelText(/upload csv file/i);
  fireEvent.change(uploadInput, { target: { files: [file] } });

  await screen.findByText('File uploaded successfully');

  fireEvent.change(searchBar, { target: { value: 'John' } });

  expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
});




