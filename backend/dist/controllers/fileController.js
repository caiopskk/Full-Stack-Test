"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.uploadFile = void 0;
const papaparse_1 = require("papaparse");
let csvData = [];
const uploadFile = (req, res) => {
    if (!req.files || !req.files.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    const file = req.files.file;
    if (Array.isArray(file)) {
        res.status(400).json({ message: 'Only single file upload is supported.' });
        return;
    }
    if (file.mimetype !== 'text/csv') {
        res.status(400).json({ message: 'Only CSV files are allowed.' });
        return;
    }
    const fileContent = file.data.toString('utf8');
    (0, papaparse_1.parse)(fileContent, {
        header: true,
        complete: (result) => {
            csvData = result.data;
            res.status(200).json({ message: 'The file was uploaded successfully.' });
        },
        error: (error) => {
            res.status(500).json({ message: error.message });
        }
    });
};
exports.uploadFile = uploadFile;
const getUsers = (req, res) => {
    var _a;
    const query = (_a = req.query.q) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
    if (!query) {
        // Return all data if no query is provided
        res.status(200).json({ data: csvData });
        return;
    }
    const filteredData = csvData.filter(item => Object.values(item).some(value => value.toLowerCase().includes(query)));
    res.status(200).json({ data: filteredData });
};
exports.getUsers = getUsers;
