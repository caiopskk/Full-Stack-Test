import request from 'supertest';
import app from '../app';

describe('File Upload API', () => {
  it('should upload a CSV file successfully', async () => {
    const response = await request(app)
      .post('/api/files')
      .attach(
        'file',
        Buffer.from(
          'name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball'
        ),
        'test.csv'
      );

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('The file was uploaded successfully.');
  });

  it('should return error if no file is uploaded', async () => {
    const response = await request(app).post('/api/files');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('No file uploaded');
  });

  it('should return error if uploaded file is not a CSV', async () => {
    const response = await request(app)
      .post('/api/files')
      .attach('file', Buffer.from('This is not a CSV'), 'test.txt');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Only CSV files are allowed.');
  });

  it('should search through uploaded CSV data', async () => {
    await request(app)
      .post('/api/files')
      .attach(
        'file',
        Buffer.from(
          'name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball'
        ),
        'test.csv'
      );

    const response = await request(app).get('/api/users?q=John');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([
      {
        name: 'John Doe',
        city: 'New York',
        country: 'USA',
        favorite_sport: 'Basketball'
      }
    ]);
  });

  it('should return all data if no query is provided', async () => {
    await request(app)
      .post('/api/files')
      .attach(
        'file',
        Buffer.from(
          'name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball'
        ),
        'test.csv'
      );

    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([
      {
        name: 'John Doe',
        city: 'New York',
        country: 'USA',
        favorite_sport: 'Basketball'
      }
    ]);
  });
});
