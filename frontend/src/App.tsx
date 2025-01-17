import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import SearchBar from './components/SearchBar';
import Card from './components/Card';
import { CSVData } from './types/csvData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './index.css';
import useDebounce from './hooks/useDebounce';
import { API_URL } from './utils/env';

const App: React.FC = () => {
  const [data, setData] = useState<CSVData[]>([]);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/api/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        toast.success('File uploaded successfully');
        fetchData();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { message } = error.response.data;
        toast.error(`Error: ${message}`);
      } else {
        toast.error('Error uploading file');
      }
      console.error('Error uploading file:', error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`, {
        params: { q: debouncedSearch }
      });
      if (response.status === 200) {
        const filteredData = response.data.data.filter(
          (item: CSVData) =>
            item.name && item.city && item.country && item.favorite_sport
        );
        setData(filteredData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  }, [debouncedSearch]);

  const handleClearData = async () => {
    if (data.length === 0) {
      toast.warn('No data to clear');
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/api/clear`);
      if (response.status === 200) {
        toast.success('Data cleared successfully');
        setData([]);
      }
    } catch (error) {
      toast.error('Error clearing data');
      console.error('Error clearing data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container">
      <ToastContainer />
      <div className="header">
        <SearchBar onSearch={setSearch} data-testid="search-input" />
        <button className="btn-clear" onClick={handleClearData}>
          Clear Data
        </button>
        <FileUpload
          onFileUpload={handleFileUpload}
          data-testid="upload-button"
        />
      </div>
      <div className="grid">
        {data.length > 0 ? (
          data.map((item, index) => (
            <Card
              key={index}
              data={item}
              data-testid={`info-card-${index + 1}`}
            />
          ))
        ) : (
          <p className="no-data">No data available</p>
        )}
      </div>
    </div>
  );
};

export default App;
