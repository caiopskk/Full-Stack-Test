import React from 'react';
import { CardProps } from '../types/csvData';

const Card: React.FC<CardProps> = ({ data, 'data-testid': testId }) => {
  return (
    <div className="card" data-testid={testId}>
      <p>
        <strong>Name:</strong>{' '}
        {data.name !== 'Missing field' ? (
          data.name
        ) : (
          <span className="missing-field">Missing field</span>
        )}
      </p>
      <p>
        <strong>City:</strong>{' '}
        {data.city !== 'Missing field' ? (
          data.city
        ) : (
          <span className="missing-field">Missing field</span>
        )}
      </p>
      <p>
        <strong>Country:</strong>{' '}
        {data.country !== 'Missing field' ? (
          data.country
        ) : (
          <span className="missing-field">Missing field</span>
        )}
      </p>
      <p>
        <strong>Favorite Sport:</strong>{' '}
        {data.favorite_sport !== 'Missing field' ? (
          data.favorite_sport
        ) : (
          <span className="missing-field">Missing field</span>
        )}
      </p>
    </div>
  );
};

export default Card;
