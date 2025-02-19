"use strict";
/*
The index file for the exports
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.Helper_Fun = void 0;
var crud_operartions_1 = require("./crud_operartions"); // the helper_fun for all the sql methods 
Object.defineProperty(exports, "Helper_Fun", { enumerable: true, get: function () { return crud_operartions_1.Helper_Fun; } });
var connector_sql_1 = require("./connector_sql"); // the sql client 
Object.defineProperty(exports, "client", { enumerable: true, get: function () { return connector_sql_1.client; } });
//# sourceMappingURL=index.js.map