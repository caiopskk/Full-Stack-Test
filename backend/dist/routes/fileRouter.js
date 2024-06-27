"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileController_1 = require("../controllers/fileController");
const router = (0, express_1.Router)();
router.post('/files', fileController_1.uploadFile);
exports.default = router;
