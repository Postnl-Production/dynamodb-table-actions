"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.REGION = exports.params = void 0;
const core = __importStar(require("@actions/core"));
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const ddbDocClient_1 = require("./ddbDocClient");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
exports.params = {
    region: core.getInput('region'),
    table: core.getInput('table'),
    input: core.getInput('input'),
    action: core.getInput('action'),
    resultSelector: core.getInput('result-selector'),
};
exports.REGION = exports.params.region;
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield ddbDocClient_1.ddbDocClient.send(new client_dynamodb_1.QueryCommand(Object.assign(Object.assign({}, JSON.parse(exports.params.input)), { TableName: exports.params.table })));
        const items = data.Items.map((record) => (0, util_dynamodb_1.unmarshall)(record));
        if (!exports.params.resultSelector) {
            console.log(items);
            core.setOutput("output", items);
        }
        else {
            const itemList = [];
            items.forEach(function (element) {
                console.log(JSON.stringify(element));
                Object.keys(element).forEach((key) => {
                    if (key == exports.params.resultSelector) {
                        itemList.push(element[key]);
                    }
                });
            });
            console.log(itemList);
            core.setOutput("output", itemList);
        }
    }
    catch (err) {
        console.error(err);
    }
});
exports.run = run;
(0, exports.run)();
