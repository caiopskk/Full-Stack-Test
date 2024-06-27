import React from 'react';
import { CardProps } from '../types/csvData';

const Card: React.FC<CardProps> = ({ data, 'data-testid': testId }) => {
  return (
    <div className="card" data-testid={testId}>
      {data.name && data.city && data.country && data.favorite_sport ? (
        <>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>City:</strong> {data.city}</p>
          <p><strong>Country:</strong> {data.country}</p>
          <p><strong>Favorite Sport:</strong> {data.favorite_sport}</p>
        </>
      ) : (
        <p>Invalid data</p>
      )}
    </div>
  );
};

export default Card;
