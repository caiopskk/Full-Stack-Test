import { Request, Response } from 'express';
import { parse, ParseResult } from 'papaparse';
import { UploadedFile } from 'express-fileupload';
import { CSVRecord } from '../types/csvRecord';

let csvData: CSVRecord[] = [];

export const uploadFile = (req: Request, res: Response): void => {
  if (!req.files || !req.files.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  const file = req.files.file as UploadedFile | UploadedFile[];

  if (Array.isArray(file)) {
    res.status(400).json({ message: 'Only single file upload is supported.' });
    return;
  }

  if (file.mimetype !== 'text/csv') {
    res.status(400).json({ message: 'Only CSV files are allowed.' });
    return;
  }

  const fileContent = file.data.toString('utf8');

  parse<CSVRecord>(fileContent, {
    header: true,
    complete: (result: ParseResult<CSVRecord>) => {
      csvData = result.data;
      res.status(200).json({ message: 'The file was uploaded successfully.' });
    },
    error: (error: Error) => {
      res.status(500).json({ message: error.message });
    }
  });
};

export const getUsers = (req: Request, res: Response): void => {
  const query = req.query.q?.toString().toLowerCase();
  if (!query) {
    // Return all data if no query is provided
    res.status(200).json({ data: csvData });
    return;
  }

  const filteredData = csvData.filter(item =>
    Object.values(item).some(value =>
      (value as string).toLowerCase().includes(query)
    )
  );

  res.status(200).json({ data: filteredData });
};
