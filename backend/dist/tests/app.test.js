"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('File Upload API', () => {
    it('should upload a CSV file successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/files')
            .attach('file', Buffer.from('name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball'), 'test.csv');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('The file was uploaded successfully.');
    }));
    it('should return error if no file is uploaded', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/files');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('No file uploaded');
    }));
    it('should return error if uploaded file is not a CSV', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/files')
            .attach('file', Buffer.from('This is not a CSV'), 'test.txt');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Only CSV files are allowed.');
    }));
    it('should search through uploaded CSV data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/files')
            .attach('file', Buffer.from('name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball'), 'test.csv');
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/users?q=John');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([
            {
                name: 'John Doe',
                city: 'New York',
                country: 'USA',
                favorite_sport: 'Basketball'
            }
        ]);
    }));
    it('should return all data if no query is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/files')
            .attach('file', Buffer.from('name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball'), 'test.csv');
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([
            {
                name: 'John Doe',
                city: 'New York',
                country: 'USA',
                favorite_sport: 'Basketball'
            }
        ]);
    }));
});
