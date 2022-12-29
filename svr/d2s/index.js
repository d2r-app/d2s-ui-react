var d2s =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/binary/bitreader.ts":
/*!*********************************!*\
  !*** ./src/binary/bitreader.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BitReader = void 0;
var BitReader = /** @class */ (function () {
    function BitReader(arrBuffer) {
        var _this = this;
        this.littleEndian = true;
        this.offset = 0;
        var typedArray = new Uint8Array(arrBuffer);
        this.bits = new Uint8Array(typedArray.length * 8);
        typedArray.reduce(function (acc, c) {
            var b = c
                .toString(2)
                .padStart(8, "0")
                .split("")
                .reverse()
                .map(function (e) { return parseInt(e, 2); });
            b.forEach(function (bit) { return (_this.bits[acc++] = bit); });
            return acc;
        }, 0);
    }
    BitReader.prototype.ReadBit = function () {
        return this.bits[this.offset++];
    };
    BitReader.prototype.ReadBitArray = function (count) {
        var bits = new Uint8Array(count);
        for (var i = 0; i < count; i++) {
            bits[i] = this.bits[this.offset++];
        }
        return bits;
    };
    BitReader.prototype.ReadBits = function (bytes, count) {
        var byteIndex = 0;
        var bitIndex = 0;
        for (var i = 0; i < count; i++) {
            if (this.bits[this.offset + i]) {
                bytes[byteIndex] |= (1 << bitIndex) & 0xff;
            }
            bitIndex++;
            if (bitIndex == 8) {
                byteIndex++;
                bitIndex = 0;
            }
        }
        this.offset += count;
        return bytes;
    };
    BitReader.prototype.ReadBytes = function (bytes) {
        return this.ReadBits(new Uint8Array(bytes), bytes * 8);
    };
    BitReader.prototype.ReadArray = function (bytes) {
        return this.ReadBytes(bytes);
    };
    BitReader.prototype.ReadByte = function (bits) {
        if (bits === void 0) { bits = 8; }
        var dataview = new DataView(this.ReadBits(new Uint8Array(1), bits).buffer);
        return dataview.getUint8(0);
    };
    BitReader.prototype.ReadUInt8 = function (bits) {
        if (bits === void 0) { bits = 8; }
        return this.ReadByte(bits);
    };
    BitReader.prototype.ReadUInt16 = function (bits) {
        if (bits === void 0) { bits = 8 * 2; }
        var dataview = new DataView(this.ReadBits(new Uint8Array(2), bits).buffer);
        return dataview.getUint16(0, this.littleEndian);
    };
    BitReader.prototype.ReadUInt32 = function (bits) {
        if (bits === void 0) { bits = 8 * 4; }
        var dataview = new DataView(this.ReadBits(new Uint8Array(4), bits).buffer);
        return dataview.getUint32(0, this.littleEndian);
    };
    BitReader.prototype.ReadString = function (bytes) {
        var buffer = this.ReadBytes(bytes).buffer;
        return new TextDecoder().decode(buffer);
    };
    BitReader.prototype.ReadNullTerminatedString = function () {
        var start = this.offset;
        while (this.ReadByte()) { }
        var end = this.offset - 8;
        var buffer = this.SeekBit(start).ReadBytes((end - start) / 8);
        this.SeekBit(end + 8);
        return new TextDecoder().decode(buffer);
    };
    BitReader.prototype.SkipBits = function (number) {
        this.offset += number;
        return this;
    };
    BitReader.prototype.SkipBytes = function (number) {
        return this.SkipBits(number * 8);
    };
    BitReader.prototype.SeekBit = function (offset) {
        this.offset = offset;
        return this;
    };
    BitReader.prototype.SeekByte = function (offset) {
        return this.SeekBit(offset * 8);
    };
    BitReader.prototype.Align = function () {
        this.offset = (this.offset + 7) & ~7;
        return this;
    };
    return BitReader;
}());
exports.BitReader = BitReader;


/***/ }),

/***/ "./src/binary/bitwriter.ts":
/*!*********************************!*\
  !*** ./src/binary/bitwriter.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BitWriter = void 0;
var BitWriter = /** @class */ (function () {
    function BitWriter(capacity) {
        if (capacity === void 0) { capacity = 8192; }
        this.littleEndian = true;
        this.offset = 0;
        this.length = 0;
        this.bits = new Uint8Array(capacity);
    }
    BitWriter.prototype.WriteBit = function (value) {
        if (this.offset >= this.bits.length) {
            var resized = new Uint8Array(this.bits.length + 8192);
            resized.set(this.bits, 0);
            this.bits = resized;
        }
        this.bits[this.offset++] = value;
        if (this.offset > this.length)
            this.length++;
        return this;
    };
    BitWriter.prototype.WriteBits = function (bits, numberOfBits) {
        for (var i = 0; i < numberOfBits; i++) {
            this.WriteBit(bits[i]);
        }
        return this;
    };
    BitWriter.prototype.WriteBytes = function (bytes, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = bytes.length * 8; }
        var toWrite = new Uint8Array(numberOfBits);
        bytes.reduce(function (acc, c) {
            var b = c
                .toString(2)
                .padStart(8, "0")
                .split("")
                .reverse()
                .map(function (e) { return parseInt(e, 2); });
            b.forEach(function (bit) { return (toWrite[acc++] = bit); });
            return acc;
        }, 0);
        return this.WriteBits(toWrite, numberOfBits);
    };
    BitWriter.prototype.WriteArray = function (bytes, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = bytes.length * 8; }
        return this.WriteBytes(bytes, numberOfBits);
    };
    BitWriter.prototype.WriteByte = function (value, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = 8; }
        var buffer = new Uint8Array(1);
        new DataView(buffer.buffer).setUint8(0, value);
        return this.WriteBytes(buffer, numberOfBits);
    };
    BitWriter.prototype.WriteUInt8 = function (value, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = 8; }
        return this.WriteByte(value, numberOfBits);
    };
    BitWriter.prototype.WriteUInt16 = function (value, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = 8 * 2; }
        var buffer = new Uint8Array(2);
        new DataView(buffer.buffer).setUint16(0, value, this.littleEndian);
        return this.WriteBytes(buffer, numberOfBits);
    };
    BitWriter.prototype.WriteUInt32 = function (value, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = 8 * 4; }
        var buffer = new Uint8Array(4);
        new DataView(buffer.buffer).setUint32(0, value, this.littleEndian);
        return this.WriteBytes(buffer, numberOfBits);
    };
    BitWriter.prototype.WriteString = function (value, numberOfBytes) {
        var buffer = new TextEncoder().encode(value);
        return this.WriteBytes(buffer, numberOfBytes * 8);
    };
    BitWriter.prototype.SeekBit = function (offset) {
        this.offset = offset;
        if (this.offset > this.length) {
            this.length = this.offset;
        }
        return this;
    };
    BitWriter.prototype.SeekByte = function (offset) {
        return this.SeekBit(offset * 8);
    };
    BitWriter.prototype.PeekBytes = function (count) {
        var buffer = new Uint8Array(count);
        var byteIndex = 0;
        var bitIndex = 0;
        for (var i = 0; i < count * 8; ++i) {
            if (this.bits[this.offset + i]) {
                buffer[byteIndex] |= (1 << bitIndex) & 0xff;
            }
            ++bitIndex;
            if (bitIndex >= 8) {
                ++byteIndex;
                bitIndex = 0;
            }
        }
        return buffer;
    };
    BitWriter.prototype.Align = function () {
        this.offset = (this.offset + 7) & ~7;
        if (this.offset > this.length) {
            this.length = this.offset;
        }
        return this;
    };
    BitWriter.prototype.ToArray = function () {
        var buffer = new Uint8Array((this.length - 1) / 8 + 1);
        var byteIndex = 0;
        var bitIndex = 0;
        for (var i = 0; i < this.length; ++i) {
            if (this.bits[i]) {
                buffer[byteIndex] |= (1 << bitIndex) & 0xff;
            }
            ++bitIndex;
            if (bitIndex >= 8) {
                ++byteIndex;
                bitIndex = 0;
            }
        }
        return buffer;
    };
    return BitWriter;
}());
exports.BitWriter = BitWriter;


/***/ }),

/***/ "./src/d2/attribute_enhancer.ts":
/*!**************************************!*\
  !*** ./src/d2/attribute_enhancer.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceItem = exports.enhanceItems = exports.enhancePlayerAttributes = exports.enhanceAttributes = void 0;
var ItemType;
(function (ItemType) {
    ItemType[ItemType["Armor"] = 1] = "Armor";
    ItemType[ItemType["Shield"] = 2] = "Shield";
    ItemType[ItemType["Weapon"] = 3] = "Weapon";
    ItemType[ItemType["Other"] = 4] = "Other";
})(ItemType || (ItemType = {}));
//do nice stuff
//combine group properties (all resists/all stats) and build friendly strings for a ui
//enhanced def/durability/weapon damage.
//lookup socketed compact items (runes/gems) properties for the slot they are in
//compute attributes like str/resists/etc..
function enhanceAttributes(char, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            enhanceItems(char.items, constants, char.attributes.level, config);
            enhanceItems([char.golem_item], constants, char.attributes.level, config);
            enhanceItems(char.merc_items, constants, char.attributes.level, config);
            enhanceItems(char.corpse_items, constants, char.attributes.level, config);
            enhancePlayerAttributes(char, constants, config);
            return [2 /*return*/];
        });
    });
}
exports.enhanceAttributes = enhanceAttributes;
function enhancePlayerAttributes(char, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var items;
        return __generator(this, function (_a) {
            items = char.items.filter(function (item) {
                return item.location_id === 1 && item.equipped_id !== 13 && item.equipped_id !== 14;
            });
            char.item_bonuses = [].concat
                .apply([], items.map(function (item) { return _allAttributes(item, constants); }))
                .filter(function (attribute) { return attribute != null; });
            char.item_bonuses = _groupAttributes(char.item_bonuses, constants);
            _enhanceAttributeDescription(char.item_bonuses, constants, char.attributes.level, config);
            return [2 /*return*/];
        });
    });
}
exports.enhancePlayerAttributes = enhancePlayerAttributes;
function enhanceItems(items, constants, level, config, parent) {
    if (level === void 0) { level = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var _i, items_1, item;
        return __generator(this, function (_a) {
            if (!items) {
                return [2 /*return*/];
            }
            for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                item = items_1[_i];
                if (!item) {
                    continue;
                }
                if (item.socketed_items && item.socketed_items.length) {
                    enhanceItems(item.socketed_items, constants, level, config, item);
                }
                enhanceItem(item, constants, level, config, parent);
            }
            return [2 /*return*/];
        });
    });
}
exports.enhanceItems = enhanceItems;
function enhanceItem(item, constants, level, config, parent) {
    var _a, _b, _c, _d;
    if (level === void 0) { level = 1; }
    if (parent) {
        //socket item.
        var pt = constants.armor_items[parent.type] || constants.weapon_items[parent.type] || constants.other_items[item.type];
        var t = constants.other_items[item.type];
        if (t.m) {
            item.magic_attributes = _compactAttributes(t.m[pt.gt], constants);
        }
    }
    var details = null;
    if (constants.armor_items[item.type]) {
        details = constants.armor_items[item.type];
        item.type_id = ItemType.Armor;
        if (details.maxac) {
            if (item.ethereal == 0) {
                item.defense_rating = details.maxac;
            }
            else if (item.ethereal == 1) {
                item.defense_rating = Math.floor(details.maxac * 1.5);
            }
        }
    }
    else if (constants.weapon_items[item.type]) {
        details = constants.weapon_items[item.type];
        item.type_id = ItemType.Weapon;
        var base_damage = {};
        if (item.ethereal == 0) {
            if (details.mind)
                base_damage.mindam = details.mind;
            if (details.maxd)
                base_damage.maxdam = details.maxd;
            if (details.min2d)
                base_damage.twohandmindam = details.min2d;
            if (details.max2d)
                base_damage.twohandmaxdam = details.max2d;
        }
        else if (item.ethereal == 1) {
            if (details.mind)
                base_damage.mindam = Math.floor(details.mind * 1.5);
            if (details.maxd)
                base_damage.maxdam = Math.floor(details.maxd * 1.5);
            if (details.min2d)
                base_damage.twohandmindam = Math.floor(details.min2d * 1.5);
            if (details.max2d)
                base_damage.twohandmaxdam = Math.floor(details.max2d * 1.5);
        }
        item.base_damage = base_damage;
    }
    else if (constants.other_items[item.type]) {
        item.type_id = ItemType.Other;
        details = constants.other_items[item.type];
    }
    if (details) {
        if (details.n)
            item.type_name = details.n;
        if (details.rs)
            item.reqstr = details.rs;
        if (details.rd)
            item.reqdex = details.rd;
        if (details.i)
            item.inv_file = details.i;
        if (details.ih)
            item.inv_height = details.ih;
        if (details.iw)
            item.inv_width = details.iw;
        if (details.it)
            item.inv_transform = details.it;
        if (details.iq)
            item.item_quality = details.iq;
        if (details.c)
            item.categories = details.c;
        if (details.durability) {
            if (item.ethereal == 0) {
                item.current_durability = details.durability;
                item.max_durability = details.durability;
            }
            else if (item.ethereal == 1) {
                item.current_durability = details.durability - Math.ceil(details.durability / 2) + 1;
                item.max_durability = details.durability - Math.ceil(details.durability / 2) + 1;
            }
        }
        if (item.multiple_pictures) {
            item.inv_file = details.ig[item.picture_id];
        }
        if (item.magic_prefix || item.magic_suffix) {
            if (item.magic_prefix && ((_a = constants.magic_prefixes[item.magic_prefix]) === null || _a === void 0 ? void 0 : _a.tc)) {
                item.transform_color = constants.magic_prefixes[item.magic_prefix].tc;
            }
            if (item.magic_suffix && ((_b = constants.magic_suffixes[item.magic_suffix]) === null || _b === void 0 ? void 0 : _b.tc)) {
                item.transform_color = constants.magic_suffixes[item.magic_suffix].tc;
            }
        }
        else if (item.magical_name_ids && item.magical_name_ids.length === 6) {
            for (var i = 0; i < 6; i++) {
                var id = item.magical_name_ids[i];
                if (id) {
                    if (i % 2 == 0 && constants.magic_prefixes[id] && ((_c = constants.magic_prefixes[id]) === null || _c === void 0 ? void 0 : _c.tc)) {
                        // even is prefixes
                        item.transform_color = constants.magic_prefixes[id].tc;
                    }
                    else if (constants.magic_suffixes[id] && ((_d = constants.magic_suffixes[id]) === null || _d === void 0 ? void 0 : _d.tc)) {
                        // odd is suffixes
                        item.transform_color = constants.magic_suffixes[id].tc;
                    }
                }
            }
        }
        else if (item.unique_id) {
            var unq = constants.unq_items[item.unique_id];
            if (details.ui)
                item.inv_file = details.ui;
            if (unq && unq.i)
                item.inv_file = unq.i;
            if (unq && unq.tc)
                item.transform_color = unq.tc;
        }
        else if (item.set_id) {
            var set = constants.set_items[item.set_id];
            if (details.ui)
                item.inv_file = details.ui;
            if (set && set.i)
                item.inv_file = set.i;
            if (set && set.tc)
                item.transform_color = set.tc;
        }
    }
    if (item.magic_attributes || item.runeword_attributes || item.socketed_items) {
        item.displayed_magic_attributes = _enhanceAttributeDescription(item.magic_attributes, constants, level, config);
        item.displayed_runeword_attributes = _enhanceAttributeDescription(item.runeword_attributes, constants, level, config);
        item.combined_magic_attributes = _groupAttributes(_allAttributes(item, constants), constants);
        item.displayed_combined_magic_attributes = _enhanceAttributeDescription(item.combined_magic_attributes, constants, level, config);
    }
}
exports.enhanceItem = enhanceItem;
function _enhanceAttributeDescription(_magic_attributes, constants, level, config) {
    if (level === void 0) { level = 1; }
    if (!_magic_attributes)
        return [];
    var magic_attributes = __spreadArrays(_magic_attributes.map(function (attr) { return (__assign({}, attr)); }));
    var dgrps = [0, 0, 0];
    var dgrpsVal = [0, 0, 0];
    for (var _i = 0, magic_attributes_1 = magic_attributes; _i < magic_attributes_1.length; _i++) {
        var property = magic_attributes_1[_i];
        var prop = constants.magical_properties[property.id];
        var v = property.values[property.values.length - 1];
        if (prop.dg) {
            if (dgrpsVal[prop.dg - 1] === 0) {
                dgrpsVal[prop.dg - 1] = v;
            }
            if (dgrpsVal[prop.dg - 1] - v === 0) {
                dgrps[prop.dg - 1]++;
            }
        }
    }
    var _loop_1 = function (property) {
        var prop = constants.magical_properties[property.id];
        if (prop == null) {
            throw new Error("Cannot find Magical Property for id: " + property.id);
        }
        var v = property.values[property.values.length - 1];
        if (prop.ob === "level") {
            switch (prop.o) {
                case 1: {
                    v = Math.floor((level * v) / 100);
                    break;
                }
                case 2:
                case 3:
                case 4:
                case 5: {
                    v = Math.floor((level * v) / Math.pow(2, prop.op));
                    break;
                }
                default: {
                    break;
                }
            }
            property.op_stats = prop.os;
            property.op_value = v;
        }
        var descFunc = prop.dF;
        var descString = v >= 0 ? prop.dP : prop.dN;
        //hack for d2r...?
        if (property.id == 39 || property.id == 41 || property.id == 43 || property.id == 45) {
            descString = prop.dP;
        }
        var descVal = prop.dV;
        var desc2 = prop.d2;
        if (prop.dg && dgrps[prop.dg - 1] === 4) {
            v = dgrpsVal[prop.dg - 1];
            descString = v >= 0 ? prop.dgP : prop.dgN ? prop.dgN : prop.dgP;
            descVal = prop.dgV;
            descFunc = prop.dgF;
            desc2 = prop.dg2;
        }
        if (prop.np) {
            //damage range or enhanced damage.
            var count_1 = 0;
            descString = prop.dR;
            if (prop.s === "poisonmindam") {
                //poisonmindam see https://user.xmission.com/~trevin/DiabloIIv1.09_Magic_Properties.shtml for reference
                var min = Math.floor((property.values[0] * property.values[2]) / 256);
                var max = Math.floor((property.values[1] * property.values[2]) / 256);
                var seconds = Math.floor(property.values[2] / 25);
                property.values = [min, max, seconds];
            }
            if (property.values[0] === property.values[1]) {
                count_1++;
                descString = prop.dE;
                //TODO. why???
                if (prop.s === "item_maxdamage_percent") {
                    descString = "+%d% " + descString.replace(/}/gi, "").replace(/%\+?d%%/gi, "");
                }
            }
            property.description = descString.replace(/%d/gi, function () {
                var v = property.values[count_1++];
                return v;
            });
        }
        else {
            _descFunc(property, constants, v, descFunc, descVal, descString, desc2);
        }
    };
    for (var _a = 0, magic_attributes_2 = magic_attributes; _a < magic_attributes_2.length; _a++) {
        var property = magic_attributes_2[_a];
        _loop_1(property);
    }
    if (config === null || config === void 0 ? void 0 : config.sortProperties) {
        //sort using sort order from game.
        magic_attributes.sort(function (a, b) { return constants.magical_properties[b.id].so - constants.magical_properties[a.id].so; });
    }
    for (var i = magic_attributes.length - 1; i >= 1; i--) {
        for (var j = i - 1; j >= 0; j--) {
            if (magic_attributes[i].description === magic_attributes[j].description) {
                magic_attributes[j].visible = false;
            }
        }
    }
    return magic_attributes;
}
function _compactAttributes(mods, constants) {
    var magic_attributes = [];
    for (var _i = 0, mods_1 = mods; _i < mods_1.length; _i++) {
        var mod = mods_1[_i];
        var properties = constants.properties[mod.m] || [];
        for (var i = 0; i < properties.length; i++) {
            var property = properties[i];
            var stat = property.s;
            switch (property.f) {
                case 5: {
                    stat = "mindamage";
                    break;
                }
                case 6: {
                    stat = "maxdamage";
                    break;
                }
                case 7: {
                    stat = "item_maxdamage_percent";
                    break;
                }
                case 20: {
                    stat = "item_indesctructible";
                    break;
                }
                default: {
                    break;
                }
            }
            var id = _itemStatCostFromStat(stat, constants);
            var prop = constants.magical_properties[id];
            if (prop.np)
                i += prop.np;
            var v = [mod.min, mod.max];
            if (mod.p) {
                v.push(mod.p);
            }
            magic_attributes.push({
                id: id,
                values: v,
                name: prop.s,
            });
        }
    }
    return magic_attributes;
}
function _descFunc(property, constants, v, descFunc, descVal, descString, desc2) {
    if (!descFunc) {
        return;
    }
    var sign = v >= 0 ? "+" : "";
    var value = null;
    var desc2Present = descFunc >= 6 && descFunc <= 10;
    switch (descFunc) {
        case 1:
        case 6:
        case 12: {
            value = "" + sign + v;
            break;
        }
        case 2:
        case 7: {
            value = v + "%";
            break;
        }
        case 3:
        case 9: {
            value = "" + v;
            break;
        }
        case 4:
        case 8: {
            value = "" + sign + v + "%";
            break;
        }
        case 5:
        case 10: {
            if (descString.indexOf("%%") < 0) {
                value = (v * 100) / 128 + "%";
            }
            else {
                value = (v * 100) / 128;
            }
            break;
        }
        case 11: {
            property.description = descString.replace(/%d/, (v / 100).toString());
            break;
        }
        case 13: {
            var clazz = constants.classes[property.values[0]];
            property.description = "" + sign + v + " " + clazz.as;
            break;
        }
        case 14: {
            var clazz = constants.classes[property.values[1]];
            var skillTabStr = clazz.ts[property.values[0]];
            descString = _sprintf(skillTabStr, v);
            property.description = descString + " " + clazz.co;
            break;
        }
        case 15: {
            descString = _sprintf(descString, property.values[2], property.values[0], constants.skills[property.values[1]].s);
            property.description = "" + descString;
            break;
        }
        case 16: {
            property.description = descString.replace(/%d/, v.toString());
            property.description = property.description.replace(/%s/, constants.skills[property.values[0]].s);
            break;
        }
        case 17: {
            //todo
            property.description = v + " " + descString + " (Increases near [time])";
            break;
        }
        case 18: {
            //todo
            property.description = v + "% " + descString + " (Increases near [time])";
            break;
        }
        case 19: {
            property.description = _sprintf(descString, v.toString());
            break;
        }
        case 20: {
            value = v * -1 + "%";
            break;
        }
        case 21: {
            value = "" + v * -1;
            break;
        }
        case 22: {
            //todo
            property.description = v + "% " + descString + " [montype]";
            break;
        }
        case 23: {
            //todo
            property.description = v + "% " + descString + " [monster]]";
            break;
        }
        case 24: {
            //charges
            //legacy desc string
            if (descString.indexOf("(") == 0) {
                var count_2 = 0;
                descString = descString.replace(/%d/gi, function () {
                    return property.values[2 + count_2++].toString();
                });
                property.description = "Level " + property.values[0] + " " + constants.skills[property.values[1]].s + " " + descString;
            }
            else {
                property.description = _sprintf(descString, property.values[0], constants.skills[property.values[1]].s, property.values[2], property.values[3]);
            }
            break;
        }
        case 27: {
            var skill = constants.skills[property.values[0]];
            var clazz = _classFromCode(skill.c, constants);
            if (descString) {
                property.description = _sprintf(descString, v, skill === null || skill === void 0 ? void 0 : skill.s, clazz === null || clazz === void 0 ? void 0 : clazz.co);
            }
            else {
                property.description = "" + sign + v + " to " + (skill === null || skill === void 0 ? void 0 : skill.s) + " " + (clazz === null || clazz === void 0 ? void 0 : clazz.co);
            }
            break;
        }
        case 28: {
            var skill = constants.skills[property.values[0]];
            property.description = "" + sign + v + " to " + (skill === null || skill === void 0 ? void 0 : skill.s);
            break;
        }
        case 29: {
            property.description = _sprintf(descString, v.toString());
            break;
        }
        default: {
            throw new Error("No handler for descFunc: " + descFunc);
        }
    }
    if (value) {
        descVal = descVal ? descVal : 0;
        switch (descVal) {
            case 0: {
                property.description = _sprintf(descString, value);
                break;
            }
            case 1: {
                property.description = value + " " + descString;
                break;
            }
            case 2: {
                property.description = descString + " " + value;
                break;
            }
            default: {
                throw new Error("No handler for descVal: " + descVal);
            }
        }
    }
    if (desc2Present) {
        property.description += " " + desc2;
    }
}
function _sprintf(str) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var i = 0;
    return str
        .replace(/%\+?d|%\+?s/gi, function (m) {
        var v = args[i++].toString();
        if (m.indexOf("+") >= 0) {
            v = "+" + v;
        }
        return v;
    })
        .replace("%%", "%");
}
function _itemStatCostFromStat(stat, constants) {
    return constants.magical_properties.findIndex(function (e) { return e.s === stat; });
}
function _classFromCode(code, constants) {
    return constants.classes.filter(function (e) { return e.c === code; })[0];
}
function _allAttributes(item, constants) {
    var socketed_attributes = [];
    if (item.socketed_items) {
        for (var _i = 0, _a = item.socketed_items; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.magic_attributes) {
                socketed_attributes = socketed_attributes.concat.apply(socketed_attributes, JSON.parse(JSON.stringify(i.magic_attributes)));
            }
        }
    }
    var magic_attributes = item.magic_attributes || [];
    var runeword_attributes = item.runeword_attributes || [];
    return __spreadArrays([], JSON.parse(JSON.stringify(magic_attributes)), JSON.parse(JSON.stringify(runeword_attributes)), JSON.parse(JSON.stringify(socketed_attributes))).filter(function (attribute) { return attribute != null; });
}
function _groupAttributes(all_attributes, constants) {
    var combined_magic_attributes = [];
    var _loop_2 = function (magic_attribute) {
        var prop = constants.magical_properties[magic_attribute.id];
        var properties = combined_magic_attributes.filter(function (e) {
            //encoded skills need to look at those params too.
            if (prop.e === 3) {
                return e.id === magic_attribute.id && e.values[0] === magic_attribute.values[0] && e.values[1] === magic_attribute.values[1];
            }
            if (prop.dF === 15) {
                return (e.id === magic_attribute.id &&
                    e.values[0] === magic_attribute.values[0] &&
                    e.values[1] === magic_attribute.values[1] &&
                    e.values[2] === magic_attribute.values[2]);
            }
            if (prop.dF === 16 || prop.dF === 23) {
                return e.id === magic_attribute.id && e.values[0] === magic_attribute.values[0] && e.values[1] === magic_attribute.values[1];
            }
            if (prop.s === "state" || prop.s === "item_nonclassskill") {
                //state
                return e.id === magic_attribute.id && e.values[0] === magic_attribute.values[0] && e.values[1] === magic_attribute.values[1];
            }
            return e.id === magic_attribute.id;
        });
        if (properties && properties.length) {
            for (var i = 0; i < properties.length; i++) {
                var property = properties[i];
                if (prop.np) {
                    //damage props
                    property.values[0] += magic_attribute.values[0];
                    property.values[1] += magic_attribute.values[1];
                    break;
                }
                //only combine attributes if the params for the descFunc are the same.
                var sameParams = true;
                var numValues = prop.e === 3 ? 2 : 1;
                for (var j = 0; j < property.values.length - numValues; j++) {
                    sameParams = property.values[j] === magic_attribute.values[j];
                    if (!sameParams) {
                        break;
                    }
                }
                if (sameParams) {
                    for (var j = 1; j <= numValues; j++) {
                        var idx = property.values.length - j;
                        property.values[idx] += magic_attribute.values[idx];
                    }
                }
                else {
                    combined_magic_attributes.push({
                        id: magic_attribute.id,
                        values: magic_attribute.values,
                        name: magic_attribute.name,
                    });
                }
            }
        }
        else {
            combined_magic_attributes.push({
                id: magic_attribute.id,
                values: magic_attribute.values,
                name: magic_attribute.name,
            });
        }
    };
    for (var _i = 0, all_attributes_1 = all_attributes; _i < all_attributes_1.length; _i++) {
        var magic_attribute = all_attributes_1[_i];
        _loop_2(magic_attribute);
    }
    return combined_magic_attributes;
}


/***/ }),

/***/ "./src/d2/attributes.ts":
/*!******************************!*\
  !*** ./src/d2/attributes.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAttributes = exports.readAttributes = void 0;
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
//todo use constants.magical_properties and csvBits
function readAttributes(char, reader, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var header, classData, bitoffset, id, field, size;
        return __generator(this, function (_a) {
            char.attributes = {};
            header = reader.ReadString(2);
            if (header != "gf") {
                // header is not present in first save after char is created
                if (char.header.level === 1) {
                    classData = constants.classes.find(function (c) { return c.n === char.header.class; }).a;
                    char.attributes = {
                        strength: +classData.str,
                        energy: +classData.int,
                        dexterity: +classData.dex,
                        vitality: +classData.vit,
                        unused_stats: 0,
                        unused_skill_points: 0,
                        current_hp: +classData.vit + +classData.hpadd,
                        max_hp: +classData.vit + +classData.hpadd,
                        current_mana: +classData.int,
                        max_mana: +classData.int,
                        current_stamina: +classData.stam,
                        max_stamina: +classData.stam,
                        level: 1,
                        experience: 0,
                        gold: 0,
                        stashed_gold: 0,
                    };
                    return [2 /*return*/];
                }
                throw new Error("Attribute header 'gf' not found at position " + (reader.offset - 2 * 8));
            }
            bitoffset = 0;
            id = reader.ReadUInt16(9);
            //read till 0x1ff end of attributes is found
            while (id != 0x1ff) {
                bitoffset += 9;
                field = constants.magical_properties[id];
                if (field === undefined) {
                    throw new Error("Invalid attribute id: " + id);
                }
                size = field.cB;
                char.attributes[Attributes[field.s]] = reader.ReadUInt32(size);
                //current_hp - max_stamina need to be bit shifted
                if (id >= 6 && id <= 11) {
                    char.attributes[Attributes[field.s]] >>>= 8;
                }
                bitoffset += size;
                id = reader.ReadUInt16(9);
            }
            reader.Align();
            return [2 /*return*/];
        });
    });
}
exports.readAttributes = readAttributes;
function writeAttributes(char, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, i, property, value, size;
        return __generator(this, function (_a) {
            writer = new bitwriter_1.BitWriter();
            writer.WriteString("gf", 2); //0x0000 [attributes header = 0x67, 0x66 "gf"]
            for (i = 0; i < 16; i++) {
                property = constants.magical_properties[i];
                if (property === undefined) {
                    throw new Error("Invalid attribute: " + property);
                }
                value = char.attributes[Attributes[property.s]];
                if (!value) {
                    continue;
                }
                size = property.cB;
                if (i >= 6 && i <= 11) {
                    value <<= 8;
                }
                writer.WriteUInt16(i, 9);
                writer.WriteUInt32(value, size);
            }
            writer.WriteUInt16(0x1ff, 9);
            writer.Align();
            return [2 /*return*/, writer.ToArray()];
        });
    });
}
exports.writeAttributes = writeAttributes;
//nokkas names
var Attributes = {
    strength: "strength",
    energy: "energy",
    dexterity: "dexterity",
    vitality: "vitality",
    statpts: "unused_stats",
    newskills: "unused_skill_points",
    hitpoints: "current_hp",
    maxhp: "max_hp",
    mana: "current_mana",
    maxmana: "max_mana",
    stamina: "current_stamina",
    maxstamina: "max_stamina",
    level: "level",
    experience: "experience",
    gold: "gold",
    goldbank: "stashed_gold",
};


/***/ }),

/***/ "./src/d2/constants.ts":
/*!*****************************!*\
  !*** ./src/d2/constants.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setConstantData = exports.getConstantData = void 0;
var versionedConstants = new Map();
function getConstantData(version) {
    if (!(version in versionedConstants)) {
        throw new Error("No constant data found for this version " + version);
    }
    return versionedConstants[version];
}
exports.getConstantData = getConstantData;
function setConstantData(version, data) {
    versionedConstants[version] = data;
}
exports.setConstantData = setConstantData;


/***/ }),

/***/ "./src/d2/d2s.ts":
/*!***********************!*\
  !*** ./src/d2/d2s.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeItem = exports.readItem = exports.write = exports.read = exports.writer = exports.reader = void 0;
var header_1 = __webpack_require__(/*! ./header */ "./src/d2/header.ts");
var attributes_1 = __webpack_require__(/*! ./attributes */ "./src/d2/attributes.ts");
var bitreader_1 = __webpack_require__(/*! ../binary/bitreader */ "./src/binary/bitreader.ts");
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
var skills_1 = __webpack_require__(/*! ./skills */ "./src/d2/skills.ts");
var items = __importStar(__webpack_require__(/*! ./items */ "./src/d2/items.ts"));
var constants_1 = __webpack_require__(/*! ./constants */ "./src/d2/constants.ts");
var attribute_enhancer_1 = __webpack_require__(/*! ./attribute_enhancer */ "./src/d2/attribute_enhancer.ts");
var defaultConfig = {
    extendedStash: false,
    sortProperties: true,
};
function reader(buffer) {
    return new bitreader_1.BitReader(buffer);
}
exports.reader = reader;
function read(buffer, constants, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var char, reader, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    char = {};
                    reader = new bitreader_1.BitReader(buffer);
                    config = Object.assign(defaultConfig, userConfig);
                    return [4 /*yield*/, header_1.readHeader(char, reader)];
                case 1:
                    _a.sent();
                    //could load constants based on version here
                    if (!constants) {
                        constants = constants_1.getConstantData(char.header.version);
                    }
                    return [4 /*yield*/, header_1.readHeaderData(char, reader, constants)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, attributes_1.readAttributes(char, reader, constants)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, skills_1.readSkills(char, reader, constants)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, items.readCharItems(char, reader, constants, config)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, items.readCorpseItems(char, reader, constants, config)];
                case 6:
                    _a.sent();
                    if (!char.header.status.expansion) return [3 /*break*/, 9];
                    return [4 /*yield*/, items.readMercItems(char, reader, constants, config)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, items.readGolemItems(char, reader, constants, config)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, attribute_enhancer_1.enhanceAttributes(char, constants, config)];
                case 10:
                    _a.sent();
                    return [2 /*return*/, char];
            }
        });
    });
}
exports.read = read;
function readItem(buffer, version, constants, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var reader, config, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reader = new bitreader_1.BitReader(buffer);
                    config = Object.assign(defaultConfig, userConfig);
                    if (!constants) {
                        constants = constants_1.getConstantData(version);
                    }
                    return [4 /*yield*/, items.readItem(reader, version, constants, config)];
                case 1:
                    item = _a.sent();
                    return [4 /*yield*/, attribute_enhancer_1.enhanceItems([item], constants)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, item];
            }
        });
    });
}
exports.readItem = readItem;
function writer(buffer) {
    return new bitwriter_1.BitWriter();
}
exports.writer = writer;
function write(data, constants, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, writer, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __generator(this, function (_s) {
            switch (_s.label) {
                case 0:
                    config = Object.assign(defaultConfig, userConfig);
                    writer = new bitwriter_1.BitWriter();
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, header_1.writeHeader(data)];
                case 1:
                    _b.apply(_a, [_s.sent()]);
                    if (!constants) {
                        constants = constants_1.getConstantData(data.header.version);
                    }
                    _d = (_c = writer).WriteArray;
                    return [4 /*yield*/, header_1.writeHeaderData(data, constants)];
                case 2:
                    _d.apply(_c, [_s.sent()]);
                    _f = (_e = writer).WriteArray;
                    return [4 /*yield*/, attributes_1.writeAttributes(data, constants)];
                case 3:
                    _f.apply(_e, [_s.sent()]);
                    _h = (_g = writer).WriteArray;
                    return [4 /*yield*/, skills_1.writeSkills(data, constants)];
                case 4:
                    _h.apply(_g, [_s.sent()]);
                    _k = (_j = writer).WriteArray;
                    return [4 /*yield*/, items.writeCharItems(data, constants, config)];
                case 5:
                    _k.apply(_j, [_s.sent()]);
                    _m = (_l = writer).WriteArray;
                    return [4 /*yield*/, items.writeCorpseItem(data, constants, config)];
                case 6:
                    _m.apply(_l, [_s.sent()]);
                    if (!data.header.status.expansion) return [3 /*break*/, 9];
                    _p = (_o = writer).WriteArray;
                    return [4 /*yield*/, items.writeMercItems(data, constants, config)];
                case 7:
                    _p.apply(_o, [_s.sent()]);
                    _r = (_q = writer).WriteArray;
                    return [4 /*yield*/, items.writeGolemItems(data, constants, config)];
                case 8:
                    _r.apply(_q, [_s.sent()]);
                    _s.label = 9;
                case 9: return [4 /*yield*/, header_1.fixHeader(writer)];
                case 10:
                    _s.sent();
                    return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.write = write;
function writeItem(item, version, constants, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    config = Object.assign(defaultConfig, userConfig);
                    writer = new bitwriter_1.BitWriter();
                    if (!constants) {
                        constants = constants_1.getConstantData(version);
                    }
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, items.writeItem(item, version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeItem = writeItem;


/***/ }),

/***/ "./src/d2/header.ts":
/*!**************************!*\
  !*** ./src/d2/header.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixHeader = exports.writeHeaderData = exports.writeHeader = exports.readHeaderData = exports.readHeader = void 0;
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
function readHeader(char, reader) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            char.header = {};
            //0x0000
            char.header.identifier = reader.ReadUInt32().toString(16).padStart(8, "0");
            if (char.header.identifier != "aa55aa55") {
                throw new Error("D2S identifier 'aa55aa55' not found at position " + (reader.offset - 4 * 8));
            }
            //0x0004
            char.header.version = reader.ReadUInt32();
            return [2 /*return*/];
        });
    });
}
exports.readHeader = readHeader;
function readHeaderData(char, reader, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var v;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _versionSpecificHeader(char.header.version)];
                case 1:
                    v = _a.sent();
                    if (v == null) {
                        throw new Error("Cannot parse version: " + char.header.version);
                    }
                    v.readHeader(char, reader, constants);
                    return [2 /*return*/];
            }
        });
    });
}
exports.readHeaderData = readHeaderData;
function writeHeader(char) {
    return __awaiter(this, void 0, void 0, function () {
        var writer;
        return __generator(this, function (_a) {
            writer = new bitwriter_1.BitWriter();
            writer.WriteUInt32(parseInt(char.header.identifier, 16)).WriteUInt32(char.header.version);
            return [2 /*return*/, writer.ToArray()];
        });
    });
}
exports.writeHeader = writeHeader;
function writeHeaderData(char, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, v;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    return [4 /*yield*/, _versionSpecificHeader(char.header.version)];
                case 1:
                    v = _a.sent();
                    if (v == null) {
                        throw new Error("Cannot parse version: " + char.header.version);
                    }
                    v.writeHeader(char, writer, constants);
                    return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeHeaderData = writeHeaderData;
function fixHeader(writer) {
    return __awaiter(this, void 0, void 0, function () {
        var checksum, eof, i, byte;
        return __generator(this, function (_a) {
            checksum = 0;
            eof = writer.length / 8;
            writer.SeekByte(0x0008).WriteUInt32(eof);
            writer.SeekByte(0x000c).WriteUInt32(0);
            for (i = 0; i < eof; i++) {
                byte = writer.SeekByte(i).PeekBytes(1)[0];
                if (checksum & 0x80000000) {
                    byte += 1;
                }
                checksum = byte + checksum * 2;
                //hack make it a uint32
                checksum >>>= 0;
            }
            //checksum pos
            writer.SeekByte(0x000c).WriteUInt32(checksum);
            return [2 /*return*/];
        });
    });
}
exports.fixHeader = fixHeader;
/**
 * Save Version
 * 0x47, 0x0, 0x0, 0x0 = <1.06
 * 0x59, 0x0, 0x0, 0x0 = 1.08 = version
 * 0x5c, 0x0, 0x0, 0x0 = 1.09 = version
 * 0x60, 0x0, 0x0, 0x0 = 1.13c = version
 * 0x62, 0x0, 0x0, 0x0 = 1.2 = version
 * */
function _versionSpecificHeader(version) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = version;
                    switch (_a) {
                        case 0x60: return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(__webpack_require__(/*! ./versions/default_header */ "./src/d2/versions/default_header.ts")); })];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(__webpack_require__(/*! ./versions/default_header */ "./src/d2/versions/default_header.ts")); })];
                case 4: return [2 /*return*/, _b.sent()];
            }
        });
    });
}


/***/ }),

/***/ "./src/d2/items.ts":
/*!*************************!*\
  !*** ./src/d2/items.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._writeMagicProperties = exports._readMagicProperties = exports.writeItem = exports.readItem = exports.writeItems = exports.readItems = exports.writeCorpseItem = exports.readCorpseItems = exports.writeGolemItems = exports.readGolemItems = exports.writeMercItems = exports.readMercItems = exports.writeCharItems = exports.readCharItems = void 0;
var bitreader_1 = __webpack_require__(/*! ../binary/bitreader */ "./src/binary/bitreader.ts");
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
var ItemType;
(function (ItemType) {
    ItemType[ItemType["Armor"] = 1] = "Armor";
    ItemType[ItemType["Shield"] = 2] = "Shield";
    ItemType[ItemType["Weapon"] = 3] = "Weapon";
    ItemType[ItemType["Other"] = 4] = "Other";
})(ItemType || (ItemType = {}));
var Quality;
(function (Quality) {
    Quality[Quality["Low"] = 1] = "Low";
    Quality[Quality["Normal"] = 2] = "Normal";
    Quality[Quality["Superior"] = 3] = "Superior";
    Quality[Quality["Magic"] = 4] = "Magic";
    Quality[Quality["Set"] = 5] = "Set";
    Quality[Quality["Rare"] = 6] = "Rare";
    Quality[Quality["Unique"] = 7] = "Unique";
    Quality[Quality["Crafted"] = 8] = "Crafted";
})(Quality || (Quality = {}));
// prettier-ignore
//huffman tree
var HUFFMAN = [[[[["w", "u"], [["8", ["y", ["5", ["j", []]]]], "h"]], ["s", [["2", "n"], "x"]]], [[["c", ["k", "f"]], "b"], [["t", "m"], ["9", "7"]]]], [" ", [[[["e", "d"], "p"], ["g", [[["z", "q"], "3"], ["v", "6"]]]], [["r", "l"], ["a", [["1", ["4", "0"]], ["i", "o"]]]]]]];
// prettier-ignore
var HUFFMAN_LOOKUP = { "0": { "v": 223, "l": 8 }, "1": { "v": 31, "l": 7 }, "2": { "v": 12, "l": 6 }, "3": { "v": 91, "l": 7 }, "4": { "v": 95, "l": 8 }, "5": { "v": 104, "l": 8 }, "6": { "v": 123, "l": 7 }, "7": { "v": 30, "l": 5 }, "8": { "v": 8, "l": 6 }, "9": { "v": 14, "l": 5 }, " ": { "v": 1, "l": 2 }, "a": { "v": 15, "l": 5 }, "b": { "v": 10, "l": 4 }, "c": { "v": 2, "l": 5 }, "d": { "v": 35, "l": 6 }, "e": { "v": 3, "l": 6 }, "f": { "v": 50, "l": 6 }, "g": { "v": 11, "l": 5 }, "h": { "v": 24, "l": 5 }, "i": { "v": 63, "l": 7 }, "j": { "v": 232, "l": 9 }, "k": { "v": 18, "l": 6 }, "l": { "v": 23, "l": 5 }, "m": { "v": 22, "l": 5 }, "n": { "v": 44, "l": 6 }, "o": { "v": 127, "l": 7 }, "p": { "v": 19, "l": 5 }, "q": { "v": 155, "l": 8 }, "r": { "v": 7, "l": 5 }, "s": { "v": 4, "l": 4 }, "t": { "v": 6, "l": 5 }, "u": { "v": 16, "l": 5 }, "v": { "v": 59, "l": 7 }, "w": { "v": 0, "l": 5 }, "x": { "v": 28, "l": 5 }, "y": { "v": 40, "l": 7 }, "z": { "v": 27, "l": 8 } };
function readCharItems(char, reader, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = char;
                    return [4 /*yield*/, readItems(reader, char.header.version, constants, config, char)];
                case 1:
                    _a.items = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.readCharItems = readCharItems;
function writeCharItems(char, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeItems(char.items, char.header.version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeCharItems = writeCharItems;
function readMercItems(char, reader, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var header, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    char.merc_items = [];
                    header = reader.ReadString(2);
                    if (header !== "jf") {
                        // header is not present in first save after char is created
                        if ((char === null || char === void 0 ? void 0 : char.header.level) === 1) {
                            return [2 /*return*/];
                        }
                        throw new Error("Mercenary header 'jf' not found at position " + (reader.offset - 2 * 8));
                    }
                    if (!(char.header.merc_id && parseInt(char.header.merc_id, 16) !== 0)) return [3 /*break*/, 2];
                    _a = char;
                    return [4 /*yield*/, readItems(reader, char.header.version, constants, config, char)];
                case 1:
                    _a.merc_items = _b.sent();
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.readMercItems = readMercItems;
function writeMercItems(char, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    writer.WriteString("jf", 2);
                    if (!(char.header.merc_id && parseInt(char.header.merc_id, 16) !== 0)) return [3 /*break*/, 2];
                    char.merc_items = char.merc_items || [];
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeItems(char.merc_items, char.header.version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 2;
                case 2: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeMercItems = writeMercItems;
function readGolemItems(char, reader, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var header, has_golem, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    header = reader.ReadString(2);
                    if (header !== "kf") {
                        // header is not present in first save after char is created
                        if ((char === null || char === void 0 ? void 0 : char.header.level) === 1) {
                            return [2 /*return*/];
                        }
                        throw new Error("Golem header 'kf' not found at position " + (reader.offset - 2 * 8));
                    }
                    has_golem = reader.ReadUInt8();
                    if (!(has_golem === 1)) return [3 /*break*/, 2];
                    _a = char;
                    return [4 /*yield*/, readItem(reader, char.header.version, constants, config)];
                case 1:
                    _a.golem_item = _b.sent();
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.readGolemItems = readGolemItems;
function writeGolemItems(char, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    writer.WriteString("kf", 2);
                    if (!char.golem_item) return [3 /*break*/, 2];
                    writer.WriteUInt8(1);
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeItem(char.golem_item, char.header.version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    writer.WriteUInt8(0);
                    _c.label = 3;
                case 3: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeGolemItems = writeGolemItems;
function readCorpseItems(char, reader, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var header, i, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    char.corpse_items = [];
                    header = reader.ReadString(2);
                    if (header !== "JM") {
                        // header is not present in first save after char is created
                        if (char.header.level === 1) {
                            char.is_dead = 0;
                            return [2 /*return*/];
                        }
                        throw new Error("Corpse header 'JM' not found at position " + (reader.offset - 2 * 8));
                    }
                    char.is_dead = reader.ReadUInt16(); //0x0002 [corpse count]
                    i = 0;
                    _d.label = 1;
                case 1:
                    if (!(i < char.is_dead)) return [3 /*break*/, 4];
                    reader.SkipBytes(12); //0x0004 [unk4, x_pos, y_pos]
                    _a = char;
                    _c = (_b = char.corpse_items).concat;
                    return [4 /*yield*/, readItems(reader, char.header.version, constants, config, char)];
                case 2:
                    _a.corpse_items = _c.apply(_b, [_d.sent()]);
                    _d.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.readCorpseItems = readCorpseItems;
function writeCorpseItem(char, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    writer.WriteString("JM", 2);
                    writer.WriteUInt16(char.is_dead);
                    if (!char.is_dead) return [3 /*break*/, 2];
                    writer.WriteArray(new Uint8Array(12));
                    char.corpse_items = char.corpse_items || [];
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeItems(char.corpse_items, char.header.version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 2;
                case 2: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeCorpseItem = writeCorpseItem;
function readItems(reader, version, constants, config, char) {
    return __awaiter(this, void 0, void 0, function () {
        var items, header, count, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    items = [];
                    header = reader.ReadString(2);
                    if (header !== "JM") {
                        // header is not present in first save after char is created
                        if ((char === null || char === void 0 ? void 0 : char.header.level) === 1) {
                            return [2 /*return*/, []]; // TODO: return starter items based on class
                        }
                        throw new Error("Item list header 'JM' not found at position " + (reader.offset - 2 * 8));
                    }
                    count = reader.ReadUInt16();
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < count)) return [3 /*break*/, 4];
                    _b = (_a = items).push;
                    return [4 /*yield*/, readItem(reader, version, constants, config)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, items];
            }
        });
    });
}
exports.readItems = readItems;
function writeItems(items, version, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    writer.WriteString("JM", 2);
                    writer.WriteUInt16(items.length);
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < items.length)) return [3 /*break*/, 4];
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeItem(items[i], version, constants, config)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeItems = writeItems;
function readItem(reader, version, originalConstants, config, parent) {
    return __awaiter(this, void 0, void 0, function () {
        var header, constants, item, i, prefix, arr, i, plist_flag, magic_attributes, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (version <= 0x60) {
                        header = reader.ReadString(2);
                        if (header !== "JM") {
                            throw new Error("Item header 'JM' not found at position " + (reader.offset - 2 * 8));
                        }
                    }
                    constants = originalConstants;
                    item = {};
                    _readSimpleBits(item, reader, version, constants, config);
                    if (!item.simple_item) {
                        item.id = reader.ReadUInt32(32);
                        item.level = reader.ReadUInt8(7);
                        item.quality = reader.ReadUInt8(4);
                        item.multiple_pictures = reader.ReadBit();
                        if (item.multiple_pictures) {
                            item.picture_id = reader.ReadUInt8(3);
                        }
                        item.class_specific = reader.ReadBit();
                        if (item.class_specific) {
                            item.auto_affix_id = reader.ReadUInt16(11);
                        }
                        switch (item.quality) {
                            case Quality.Low:
                                item.low_quality_id = reader.ReadUInt8(3);
                                break;
                            case Quality.Normal:
                                break;
                            case Quality.Superior:
                                item.file_index = reader.ReadUInt8(3);
                                break;
                            case Quality.Magic:
                                item.magic_prefix = reader.ReadUInt16(11);
                                if (item.magic_prefix)
                                    item.magic_prefix_name = constants.magic_prefixes[item.magic_prefix] ? constants.magic_prefixes[item.magic_prefix].n : null;
                                item.magic_suffix = reader.ReadUInt16(11);
                                if (item.magic_suffix)
                                    item.magic_suffix_name = constants.magic_suffixes[item.magic_suffix] ? constants.magic_suffixes[item.magic_suffix].n : null;
                                break;
                            case Quality.Set:
                                item.set_id = reader.ReadUInt16(12);
                                item.set_name = constants.set_items[item.set_id] ? constants.set_items[item.set_id].n : null;
                                break;
                            case Quality.Unique:
                                item.unique_id = reader.ReadUInt16(12);
                                item.unique_name = constants.unq_items[item.unique_id] ? constants.unq_items[item.unique_id].n : null;
                                break;
                            case Quality.Rare:
                            case Quality.Crafted:
                                item.rare_name_id = reader.ReadUInt8(8);
                                if (item.rare_name_id)
                                    item.rare_name = constants.rare_names[item.rare_name_id] ? constants.rare_names[item.rare_name_id].n : null;
                                item.rare_name_id2 = reader.ReadUInt8(8);
                                if (item.rare_name_id2)
                                    item.rare_name2 = constants.rare_names[item.rare_name_id2] ? constants.rare_names[item.rare_name_id2].n : null;
                                item.magical_name_ids = [];
                                for (i = 0; i < 6; i++) {
                                    prefix = reader.ReadBit();
                                    if (prefix === 1) {
                                        item.magical_name_ids[i] = reader.ReadUInt16(11);
                                    }
                                    else {
                                        item.magical_name_ids[i] = null;
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                        if (item.given_runeword) {
                            item.runeword_id = reader.ReadUInt16(12);
                            //fix delerium on d2gs??? why is this a thing?
                            if (item.runeword_id == 2718) {
                                item.runeword_id = 48;
                            }
                            if (constants.runewords[item.runeword_id]) {
                                item.runeword_name = constants.runewords[item.runeword_id].n;
                            }
                            reader.ReadUInt8(4);
                        }
                        if (item.personalized) {
                            arr = new Uint8Array(16);
                            for (i = 0; i < arr.length; i++) {
                                if (version > 0x61) {
                                    arr[i] = reader.ReadUInt8(8);
                                }
                                else {
                                    arr[i] = reader.ReadUInt8(7);
                                }
                                if (arr[i] === 0x00) {
                                    break;
                                }
                            }
                            item.personalized_name = new bitreader_1.BitReader(arr).ReadString(16).trim().replace(/\0/g, "");
                        }
                        //tomes
                        if (item.type === "tbk" || item.type == "ibk") {
                            reader.ReadUInt8(5);
                        }
                        //realm data
                        item.timestamp = reader.ReadUInt8(1);
                        if (item.type_id === ItemType.Armor) {
                            item.defense_rating = reader.ReadUInt16(constants.magical_properties[31].sB) - constants.magical_properties[31].sA;
                        }
                        if (item.type_id === ItemType.Armor || item.type_id === ItemType.Weapon) {
                            item.max_durability = reader.ReadUInt16(constants.magical_properties[73].sB) - constants.magical_properties[73].sA;
                            if (item.max_durability > 0) {
                                item.current_durability = reader.ReadUInt16(constants.magical_properties[72].sB) - constants.magical_properties[72].sA;
                            }
                        }
                        if (constants.stackables[item.type]) {
                            item.quantity = reader.ReadUInt16(9);
                        }
                        if (item.socketed === 1) {
                            item.total_nr_of_sockets = reader.ReadUInt8(4);
                        }
                        plist_flag = 0;
                        if (item.quality === Quality.Set) {
                            plist_flag = reader.ReadUInt8(5);
                            item.set_list_count = 0;
                            item._unknown_data.plist_flag = plist_flag;
                        }
                        magic_attributes = _readMagicProperties(reader, constants);
                        item.magic_attributes = magic_attributes;
                        while (plist_flag > 0) {
                            if (plist_flag & 1) {
                                item.set_list_count += 1;
                                magic_attributes = _readMagicProperties(reader, constants);
                                if (item.set_attributes) {
                                    item.set_attributes.push(magic_attributes);
                                }
                                else {
                                    item.set_attributes = [magic_attributes];
                                }
                            }
                            plist_flag >>>= 1;
                        }
                        if (item.given_runeword === 1) {
                            magic_attributes = _readMagicProperties(reader, constants);
                            if (magic_attributes && magic_attributes.length > 0) {
                                item.runeword_attributes = magic_attributes;
                            }
                        }
                    }
                    reader.Align();
                    if (!(item.nr_of_items_in_sockets > 0 && item.simple_item === 0)) return [3 /*break*/, 4];
                    item.socketed_items = [];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < item.nr_of_items_in_sockets)) return [3 /*break*/, 4];
                    _b = (_a = item.socketed_items).push;
                    return [4 /*yield*/, readItem(reader, version, constants, config, item)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: 
                //console.log(JSON.stringify(item));
                return [2 /*return*/, item];
            }
        });
    });
}
exports.readItem = readItem;
function writeItem(item, version, constants, config) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var writer, i, magical_name_id, runeword_id, name_1, i, set_attribute_count, plist_flag, i, i, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (item._unknown_data === undefined) {
                        item._unknown_data = {};
                    }
                    if (item.categories === undefined) {
                        item.categories = (_a = _GetItemTXT(item, constants)) === null || _a === void 0 ? void 0 : _a.c;
                    }
                    writer = new bitwriter_1.BitWriter();
                    if (version <= 0x60) {
                        writer.WriteString("JM", 2);
                    }
                    _writeSimpleBits(writer, version, item, constants, config);
                    if (!item.simple_item) {
                        writer.WriteUInt32(item.id, 32);
                        writer.WriteUInt8(item.level, 7);
                        writer.WriteUInt8(item.quality, 4);
                        writer.WriteUInt8(item.multiple_pictures, 1);
                        if (item.multiple_pictures) {
                            writer.WriteUInt8(item.picture_id, 3);
                        }
                        writer.WriteUInt8(item.class_specific, 1);
                        if (item.class_specific === 1) {
                            writer.WriteUInt16(item.auto_affix_id || 0, 11);
                        }
                        switch (item.quality) {
                            case Quality.Low:
                                writer.WriteUInt8(item.low_quality_id, 3);
                                break;
                            case Quality.Normal:
                                break;
                            case Quality.Superior:
                                writer.WriteUInt8(item.file_index || 0, 3);
                                break;
                            case Quality.Magic:
                                writer.WriteUInt16(item.magic_prefix, 11);
                                writer.WriteUInt16(item.magic_suffix, 11);
                                break;
                            case Quality.Set:
                                writer.WriteUInt16(item.set_id, 12);
                                break;
                            case Quality.Unique:
                                writer.WriteUInt16(item.unique_id, 12);
                                break;
                            case Quality.Rare:
                            case Quality.Crafted:
                                writer.WriteUInt8(item.rare_name_id !== undefined ? item.rare_name_id : _lookupRareId(item.rare_name, constants), 8);
                                writer.WriteUInt8(item.rare_name_id2 !== undefined ? item.rare_name_id2 : _lookupRareId(item.rare_name2, constants), 8);
                                for (i = 0; i < 6; i++) {
                                    magical_name_id = item.magical_name_ids[i];
                                    if (magical_name_id) {
                                        writer.WriteBit(1);
                                        writer.WriteUInt16(magical_name_id, 11);
                                    }
                                    else {
                                        writer.WriteBit(0);
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                        if (item.given_runeword) {
                            runeword_id = item.runeword_id;
                            if (runeword_id == 2718) {
                                runeword_id = 48;
                            }
                            writer.WriteUInt16(runeword_id, 12);
                            writer.WriteUInt8(5, 4); //always 5?
                        }
                        if (item.personalized) {
                            name_1 = item.personalized_name.substring(0, 16);
                            for (i = 0; i < name_1.length; i++) {
                                if (version > 0x61) {
                                    writer.WriteUInt8(name_1.charCodeAt(i), 8);
                                }
                                else {
                                    writer.WriteUInt8(name_1.charCodeAt(i) & 0x7f, 7);
                                }
                            }
                            writer.WriteUInt8(0x00, version > 0x61 ? 8 : 7);
                        }
                        if (item.type === "tbk") {
                            writer.WriteUInt8(0, 5);
                        }
                        else if (item.type === "ibk") {
                            writer.WriteUInt8(1, 5);
                        }
                        writer.WriteUInt8(item.timestamp, 1);
                        if (item.type_id === ItemType.Armor || item.type_id === ItemType.Shield) {
                            writer.WriteUInt16(item.defense_rating + constants.magical_properties[31].sA, constants.magical_properties[31].sB);
                        }
                        if (item.type_id === ItemType.Armor || item.type_id === ItemType.Shield || item.type_id === ItemType.Weapon) {
                            writer.WriteUInt16(item.max_durability || 0, constants.magical_properties[73].sB);
                            if (item.max_durability > 0) {
                                writer.WriteUInt16(item.current_durability, constants.magical_properties[72].sB);
                            }
                        }
                        if (constants.stackables[item.type]) {
                            writer.WriteUInt16(item.quantity, 9);
                        }
                        if (item.socketed === 1) {
                            writer.WriteUInt8(item.total_nr_of_sockets, 4);
                        }
                        if (item.quality === Quality.Set) {
                            set_attribute_count = item.set_attributes != null ? item.set_attributes.length : 0;
                            plist_flag = (1 << set_attribute_count) - 1;
                            writer.WriteUInt8(item._unknown_data.plist_flag || plist_flag, 5);
                        }
                        _writeMagicProperties(writer, item.magic_attributes, constants);
                        if (item.set_attributes && item.set_attributes.length > 0) {
                            for (i = 0; i < item.set_attributes.length; i++) {
                                _writeMagicProperties(writer, item.set_attributes[i], constants);
                            }
                        }
                        if (item.given_runeword === 1) {
                            _writeMagicProperties(writer, item.runeword_attributes, constants);
                        }
                    }
                    writer.Align();
                    if (!(item.nr_of_items_in_sockets > 0 && item.simple_item === 0)) return [3 /*break*/, 4];
                    i = 0;
                    _d.label = 1;
                case 1:
                    if (!(i < item.nr_of_items_in_sockets)) return [3 /*break*/, 4];
                    _c = (_b = writer).WriteArray;
                    return [4 /*yield*/, writeItem(item.socketed_items[i], version, constants, config)];
                case 2:
                    _c.apply(_b, [_d.sent()]);
                    _d.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeItem = writeItem;
function _readSimpleBits(item, reader, version, constants, config) {
    var _a;
    //init so we do not have npe's
    item._unknown_data = {};
    //1.10-1.14d
    //[flags:32][version:10][mode:3]([invloc:4][x:4][y:4][page:3])([itemcode:32])([sockets:3])
    //1.15
    //[flags:32][version:3][mode:3]([invloc:4][x:4][y:4][page:3])([itemcode:variable])([sockets:3])
    item._unknown_data.b0_3 = reader.ReadBitArray(4);
    item.identified = reader.ReadBit();
    item._unknown_data.b5_10 = reader.ReadBitArray(6);
    item.socketed = reader.ReadBit();
    item._unknown_data.b12 = reader.ReadBitArray(1);
    item.new = reader.ReadBit();
    item._unknown_data.b14_15 = reader.ReadBitArray(2);
    item.is_ear = reader.ReadBit();
    item.starter_item = reader.ReadBit();
    item._unknown_data.b18_20 = reader.ReadBitArray(3);
    item.simple_item = reader.ReadBit();
    item.ethereal = reader.ReadBit();
    item._unknown_data.b23 = reader.ReadBitArray(1);
    item.personalized = reader.ReadBit();
    item._unknown_data.b25 = reader.ReadBitArray(1);
    item.given_runeword = reader.ReadBit();
    item._unknown_data.b27_31 = reader.ReadBitArray(5);
    if (version <= 0x60) {
        item.version = reader.ReadUInt16(10).toString(10);
    }
    else if (version >= 0x61) {
        item.version = reader.ReadUInt16(3).toString(2);
    }
    item.location_id = reader.ReadUInt8(3);
    item.equipped_id = reader.ReadUInt8(4);
    item.position_x = reader.ReadUInt8(4);
    item.position_y = reader.ReadUInt8(4);
    item.alt_position_id = reader.ReadUInt8(3);
    if (item.is_ear) {
        var clazz = reader.ReadUInt8(3);
        var level = reader.ReadUInt8(7);
        var arr = new Uint8Array(15);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = reader.ReadUInt8(7);
            if (arr[i] === 0x00) {
                break;
            }
        }
        var name_2 = new bitreader_1.BitReader(arr).ReadString(15).trim().replace(/\0/g, "");
        item.ear_attributes = {
            class: clazz,
            level: level,
            name: name_2,
        };
    }
    else {
        if (version <= 0x60) {
            item.type = reader.ReadString(4);
        }
        else if (version >= 0x61) {
            item.type = "";
            //props to d07riv
            //https://github.com/d07RiV/d07riv.github.io/blob/master/d2r.html#L11-L20
            for (var i = 0; i < 4; i++) {
                var node = HUFFMAN;
                do {
                    node = node[reader.ReadBit()];
                } while (Array.isArray(node));
                item.type += node;
            }
        }
        item.type = item.type.trim().replace(/\0/g, "");
        var details = _GetItemTXT(item, constants);
        item.categories = details === null || details === void 0 ? void 0 : details.c;
        if (item === null || item === void 0 ? void 0 : item.categories.includes("Any Armor")) {
            item.type_id = ItemType.Armor;
        }
        else if (item === null || item === void 0 ? void 0 : item.categories.includes("Weapon")) {
            item.type_id = ItemType.Weapon;
            details = constants.weapon_items[item.type];
        }
        else {
            item.type_id = ItemType.Other;
        }
        var bits = item.simple_item ? 1 : 3;
        if ((_a = item.categories) === null || _a === void 0 ? void 0 : _a.includes("Quest")) {
            item.quest_difficulty = reader.ReadUInt16(constants.magical_properties[356].sB) - constants.magical_properties[356].sA;
            bits = 1;
        }
        item.nr_of_items_in_sockets = reader.ReadUInt8(bits);
    }
}
function _lookupRareId(name, constants) {
    //some inconsistencies with txt data and nokka. so have to hack it with startsWith
    return constants.rare_names.findIndex(function (k) { return k && (k.n.toLowerCase().startsWith(name.toLowerCase()) || name.toLowerCase().startsWith(k.n.toLowerCase())); });
}
function _writeSimpleBits(writer, version, item, constants, config) {
    var _a;
    writer.WriteBits(item._unknown_data.b0_3 || new Uint8Array(4), 4);
    writer.WriteBit(item.identified);
    writer.WriteBits(item._unknown_data.b5_10 || new Uint8Array(6), 6);
    writer.WriteBit(item.socketed);
    writer.WriteBits(item._unknown_data.b12 || new Uint8Array(1), 1);
    writer.WriteBit(item.new);
    writer.WriteBits(item._unknown_data.b14_15 || new Uint8Array(2), 2);
    writer.WriteBit(item.is_ear);
    writer.WriteBit(item.starter_item);
    writer.WriteBits(item._unknown_data.b18_20 || new Uint8Array(3), 3);
    writer.WriteBit(item.simple_item);
    writer.WriteBit(item.ethereal);
    writer.WriteBits(item._unknown_data.b23 || new Uint8Array([1]), 1); //always 1? IFLAG_JUSTSAVED
    writer.WriteBit(item.personalized);
    writer.WriteBits(item._unknown_data.b25 || new Uint8Array(1), 1); //IFLAG_LOWQUALITY
    writer.WriteBit(item.given_runeword);
    writer.WriteBits(item._unknown_data.b27_31 || new Uint8Array(5), 5);
    var itemVersion = item.version != null ? item.version : "101";
    if (version <= 0x60) {
        // 0 = pre-1.08; 1 = 1.08/1.09 normal; 2 = 1.10 normal; 100 = 1.08/1.09 expansion; 101 = 1.10 expansion
        writer.WriteUInt16(parseInt(itemVersion, 10), 10);
    }
    else if (version >= 0x61) {
        writer.WriteUInt16(parseInt(itemVersion, 2), 3);
    }
    writer.WriteUInt8(item.location_id, 3);
    writer.WriteUInt8(item.equipped_id, 4);
    writer.WriteUInt8(item.position_x, 4);
    writer.WriteUInt8(item.position_y, 4);
    writer.WriteUInt8(item.alt_position_id, 3);
    if (item.is_ear) {
        writer.WriteUInt8(item.ear_attributes.class, 3);
        writer.WriteUInt8(item.ear_attributes.level, 7);
        var name_3 = item.ear_attributes.name.substring(0, 15);
        for (var i = 0; i < name_3.length; i++) {
            writer.WriteUInt8(name_3.charCodeAt(i) & 0x7f, 7);
        }
        writer.WriteUInt8(0x00, 7);
    }
    else {
        var t = item.type.padEnd(4, " ");
        if (version <= 0x60) {
            writer.WriteString(t, 4);
        }
        else {
            for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
                var c = t_1[_i];
                var n = HUFFMAN_LOOKUP[c];
                writer.WriteUInt16(n.v, n.l);
            }
        }
        var bits = item.simple_item ? 1 : 3;
        if ((_a = item.categories) === null || _a === void 0 ? void 0 : _a.includes("Quest")) {
            var difficulty = item.quest_difficulty || 0;
            writer.WriteUInt16(difficulty + constants.magical_properties[356].sA, constants.magical_properties[356].sB);
            bits = 1;
        }
        writer.WriteUInt8(item.nr_of_items_in_sockets, bits);
    }
}
function _readMagicProperties(reader, constants) {
    var id = reader.ReadUInt16(9);
    var magic_attributes = [];
    while (id != 0x1ff) {
        var values = [];
        if (id > constants.magical_properties.length) {
            throw new Error("Invalid Stat Id: " + id + " at position " + (reader.offset - 9));
        }
        var num_of_properties = constants.magical_properties[id].np || 1;
        for (var i = 0; i < num_of_properties; i++) {
            var prop = constants.magical_properties[id + i];
            if (prop == null) {
                throw new Error("Cannot find Magical Property for id: " + id + " at position " + reader.offset);
            }
            if (prop.sP) {
                var param = reader.ReadUInt16(prop.sP);
                switch (prop.dF) {
                    case 14: //+skill to skilltab
                        values.push(param & 0x7);
                        param = (param >> 3) & 0x1fff;
                        break;
                    default:
                        break;
                }
                //encode
                switch (prop.e) {
                    case 1:
                        //throw new Error(`Unimplemented encoding: ${prop.encode}`);
                        break;
                    case 2: //chance to cast
                    case 3: //charges
                        values.push(param & 0x3f); //skill level
                        param = (param >> 6) & 0x3ff; //skll id
                        break;
                    default:
                        break;
                }
                values.push(param);
            }
            if (!prop.sB) {
                throw new Error("Save Bits is undefined for stat: " + id + ":" + prop.s + " at position " + reader.offset);
            }
            var v = reader.ReadUInt16(prop.sB);
            if (prop.sA) {
                v -= prop.sA;
            }
            switch (prop.e) {
                case 3:
                    values.push(v & 0xff); // current charges
                    values.push((v >> 8) & 0xff); //max charges
                    break;
                default:
                    values.push(v);
                    break;
            }
        }
        magic_attributes.push({
            id: id,
            values: values,
            name: constants.magical_properties[id].s,
        });
        id = reader.ReadUInt16(9);
    }
    return magic_attributes;
}
exports._readMagicProperties = _readMagicProperties;
function _writeMagicProperties(writer, properties, constants) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            var property = properties[i];
            var valueIdx = 0;
            writer.WriteUInt16(property.id, 9);
            var num_of_properties = constants.magical_properties[property.id].np || 1;
            for (var j = 0; j < num_of_properties; j++) {
                var prop = constants.magical_properties[property.id + j];
                if (prop == null) {
                    throw new Error("Cannot find Magical Property for id: " + property.id);
                }
                if (prop.sP) {
                    var param = property.values[valueIdx++];
                    switch (prop.dF) {
                        case 14: //+skill to skilltab
                            param |= (property.values[valueIdx++] & 0x1fff) << 3;
                            break;
                        default:
                            break;
                    }
                    //encode
                    switch (prop.e) {
                        case 1:
                            //throw new Error(`Unimplemented encoding: ${prop.encode}`);
                            break;
                        case 2: //chance to cast
                        case 3: //charges
                            param |= (property.values[valueIdx++] & 0x3ff) << 6;
                            break;
                        default:
                            break;
                    }
                    writer.WriteUInt32(param, prop.sP);
                }
                var v = property.values[valueIdx++];
                if (prop.sA) {
                    v += prop.sA;
                }
                switch (prop.e) {
                    case 3:
                        v |= (property.values[valueIdx++] & 0xff) << 8;
                        break;
                    default:
                        break;
                }
                if (!prop.sB) {
                    throw new Error("Save Bits is undefined for stat: " + property.id + ":" + prop.s);
                }
                writer.WriteUInt32(v, prop.sB);
            }
        }
    }
    writer.WriteUInt16(0x1ff, 9);
}
exports._writeMagicProperties = _writeMagicProperties;
function _GetItemTXT(item, constants) {
    if (constants.armor_items[item.type]) {
        return constants.armor_items[item.type];
    }
    else if (constants.weapon_items[item.type]) {
        return constants.weapon_items[item.type];
    }
    else if (constants.other_items[item.type]) {
        return constants.other_items[item.type];
    }
}


/***/ }),

/***/ "./src/d2/skills.ts":
/*!**************************!*\
  !*** ./src/d2/skills.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSkills = exports.readSkills = void 0;
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
function readSkills(char, reader, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, header, i, id;
        return __generator(this, function (_a) {
            char.skills = [];
            offset = SkillOffset[char.header.class];
            header = reader.ReadString(2);
            if (header !== "if") {
                // header is not present in first save after char is created
                if (char.header.level === 1) {
                    return [2 /*return*/]; // TODO: return starter skills based on class
                }
                throw new Error("Skills header 'if' not found at position " + (reader.offset - 2 * 8));
            }
            for (i = 0; i < 30; i++) {
                id = offset + i;
                char.skills.push({
                    id: id,
                    points: reader.ReadUInt8(),
                    name: constants.skills[id].s,
                });
            }
            return [2 /*return*/];
        });
    });
}
exports.readSkills = readSkills;
function writeSkills(char, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, i;
        return __generator(this, function (_a) {
            writer = new bitwriter_1.BitWriter();
            writer.WriteString("if", 2); //0x0000 [skills header = 0x69, 0x66 "if"]
            //probably array length checking/sorting of skills by id...
            for (i = 0; i < 30; i++) {
                writer.WriteUInt8(char.skills[i].points);
            }
            return [2 /*return*/, writer.ToArray()];
        });
    });
}
exports.writeSkills = writeSkills;
var SkillOffset = {
    Amazon: 6,
    Sorceress: 36,
    Necromancer: 66,
    Paladin: 96,
    Barbarian: 126,
    Druid: 221,
    Assassin: 251,
};


/***/ }),

/***/ "./src/d2/types.ts":
/*!*************************!*\
  !*** ./src/d2/types.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EItemQuality = exports.EStashType = void 0;
var EStashType;
(function (EStashType) {
    EStashType[EStashType["shared"] = 0] = "shared";
    EStashType[EStashType["private"] = 1] = "private";
})(EStashType = exports.EStashType || (exports.EStashType = {}));
var EItemQuality;
(function (EItemQuality) {
    EItemQuality[EItemQuality["normal"] = 0] = "normal";
    EItemQuality[EItemQuality["exceptional"] = 1] = "exceptional";
    EItemQuality[EItemQuality["elite"] = 2] = "elite";
})(EItemQuality = exports.EItemQuality || (exports.EItemQuality = {}));


/***/ }),

/***/ "./src/d2/versions/default_header.ts":
/*!*******************************************!*\
  !*** ./src/d2/versions/default_header.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.writeHeader = exports.readHeader = void 0;
var bitreader_1 = __webpack_require__(/*! ../../binary/bitreader */ "./src/binary/bitreader.ts");
var bitwriter_1 = __webpack_require__(/*! ../../binary/bitwriter */ "./src/binary/bitwriter.ts");
var difficulties = ["normal", "nm", "hell"];
function readHeader(char, reader, constants) {
    var _a, _b, _c, _d;
    char.header.filesize = reader.ReadUInt32(); //0x0008
    char.header.checksum = reader.ReadUInt32().toString(16).padStart(8, "0"); //0x000c
    reader.SkipBytes(4); //0x0010
    if (char.header.version > 0x61) {
        reader.SeekByte(267);
    }
    char.header.name = reader.ReadString(16).replace(/\0/g, ""); //0x0014
    if (char.header.version > 0x61) {
        reader.SeekByte(36);
    }
    char.header.status = _readStatus(reader.ReadUInt8()); //0x0024
    char.header.progression = reader.ReadUInt8(); //0x0025
    char.header.active_arms = reader.ReadUInt16(); //0x0026 [unk = 0x0, 0x0]
    char.header.class = constants.classes[reader.ReadUInt8()].n; //0x0028
    reader.SkipBytes(2); //0x0029 [unk = 0x10, 0x1E]
    char.header.level = reader.ReadUInt8(); //0x002b
    char.header.created = reader.ReadUInt32(); //0x002c
    char.header.last_played = reader.ReadUInt32(); //0x0030
    reader.SkipBytes(4); //0x0034 [unk = 0xff, 0xff, 0xff, 0xff]
    char.header.assigned_skills = _readAssignedSkills(reader.ReadArray(64), constants); //0x0038
    char.header.left_skill = (_a = constants.skills[reader.ReadUInt32()]) === null || _a === void 0 ? void 0 : _a.s; //0x0078
    char.header.right_skill = (_b = constants.skills[reader.ReadUInt32()]) === null || _b === void 0 ? void 0 : _b.s; //0x007c
    char.header.left_swap_skill = (_c = constants.skills[reader.ReadUInt32()]) === null || _c === void 0 ? void 0 : _c.s; //0x0080
    char.header.right_swap_skill = (_d = constants.skills[reader.ReadUInt32()]) === null || _d === void 0 ? void 0 : _d.s; //0x0084
    char.header.menu_appearance = _readCharMenuAppearance(reader.ReadArray(32), constants); //0x0088 [char menu appearance]
    char.header.difficulty = _readDifficulty(reader.ReadArray(3)); //0x00a8
    char.header.map_id = reader.ReadUInt32(); //0x00ab
    reader.SkipBytes(2); //0x00af [unk = 0x0, 0x0]
    char.header.dead_merc = reader.ReadUInt16(); //0x00b1
    char.header.merc_id = reader.ReadUInt32().toString(16); //0x00b3
    char.header.merc_name_id = reader.ReadUInt16(); //0x00b7
    char.header.merc_type = reader.ReadUInt16(); //0x00b9
    char.header.merc_experience = reader.ReadUInt32(); //0x00bb
    reader.SkipBytes(144); //0x00bf [unk]
    reader.SkipBytes(4); //0x014f [quests header identifier = 0x57, 0x6f, 0x6f, 0x21 "Woo!"]
    reader.SkipBytes(4); //0x0153 [version = 0x6, 0x0, 0x0, 0x0]
    reader.SkipBytes(2); //0x0153 [quests header length = 0x2a, 0x1]
    char.header.quests_normal = _readQuests(reader.ReadArray(96)); //0x0159
    char.header.quests_nm = _readQuests(reader.ReadArray(96)); //0x01b9
    char.header.quests_hell = _readQuests(reader.ReadArray(96)); //0x0219
    reader.SkipBytes(2); //0x0279 [waypoint header identifier = 0x57, 0x53 "WS"]
    reader.SkipBytes(4); //0x027b [waypoint header version = 0x1, 0x0, 0x0, 0x0]
    reader.SkipBytes(2); //0x027f [waypoint header length = 0x50, 0x0]
    char.header.waypoints = _readWaypointData(reader.ReadArray(0x48)); //0x0281
    reader.SkipBytes(2); //0x02c9 [npc header identifier  = 0x01, 0x77 ".w"]
    reader.SkipBytes(2); //0x02ca [npc header length = 0x34]
    char.header.npcs = _readNPCData(reader.ReadArray(0x30)); //0x02cc
}
exports.readHeader = readHeader;
function writeHeader(char, writer, constants) {
    writer
        .WriteUInt32(0x0) //0x0008 (filesize. needs to be writen after all data)
        .WriteUInt32(0x0); //0x000c (checksum. needs to be calculated after all data writer)
    if (char.header.version > 0x61) {
        writer.WriteArray(new Uint8Array(Array(20).fill(0))); // 0x0010
    }
    else {
        writer
            .WriteArray(new Uint8Array([0x00, 0x00, 0x00, 0x00])) //0x0010
            .WriteString(char.header.name, 16); //0x0014
    }
    writer
        .WriteArray(_writeStatus(char.header.status)) //0x0024
        .WriteUInt8(char.header.progression) //0x0025
        .WriteUInt16(char.header.active_arms) //0x0026
        .WriteUInt8(_classId(char.header.class, constants)) //0x0028
        .WriteArray(new Uint8Array([0x10, 0x1e])) //0x0029
        .WriteUInt8(char.header.level) //0x002b
        .WriteArray(new Uint8Array([0x00, 0x00, 0x00, 0x00])) //0x002c
        .WriteUInt32(char.header.last_played) //0x0030
        .WriteArray(new Uint8Array([0xff, 0xff, 0xff, 0xff])) //0x0034
        .WriteArray(_writeAssignedSkills(char.header.assigned_skills, constants)) //0x0038
        .WriteUInt32(_skillId(char.header.left_skill, constants)) //0x0078
        .WriteUInt32(_skillId(char.header.right_skill, constants)) //0x007c
        .WriteUInt32(_skillId(char.header.left_swap_skill, constants)) //0x0080
        .WriteUInt32(_skillId(char.header.right_swap_skill, constants)) //0x0084
        .WriteArray(_writeCharMenuAppearance(char.header.menu_appearance, constants)) //0x0088 [char menu appearance]
        .WriteArray(_writeDifficulty(char.header.difficulty)) //0x00a8
        .WriteUInt32(char.header.map_id) //0x00ab
        .WriteArray(new Uint8Array([0x00, 0x00])) //0x00af [unk = 0x0, 0x0]
        .WriteUInt16(char.header.dead_merc) //0x00b1
        .WriteUInt32(parseInt(char.header.merc_id, 16)) //0x00b3
        .WriteUInt16(char.header.merc_name_id) //0x00b7
        .WriteUInt16(char.header.merc_type) //0x00b9
        .WriteUInt32(char.header.merc_experience); //0x00bb
    if (char.header.version > 0x61) {
        writer
            .WriteArray(new Uint8Array(76)) //0x00bf [unk]
            .WriteString(char.header.name, 16) //0x010b
            .WriteArray(new Uint8Array(52)); //0x011b [unk]
    }
    else {
        writer
            .WriteArray(new Uint8Array(140)) //0x00bf [unk]
            .WriteUInt32(0x1); //0x014b [unk = 0x1, 0x0, 0x0, 0x0]
    }
    writer
        .WriteString("Woo!", 4) //0x014f [quests = 0x57, 0x6f, 0x6f, 0x21 "Woo!"]
        .WriteArray(new Uint8Array([0x06, 0x00, 0x00, 0x00, 0x2a, 0x01])) //0x0153 [unk = 0x6, 0x0, 0x0, 0x0, 0x2a, 0x1]
        .WriteArray(_writeQuests(char.header.quests_normal)) //0x0159
        .WriteArray(_writeQuests(char.header.quests_nm)) //0x01b9
        .WriteArray(_writeQuests(char.header.quests_hell)) //0x0219
        .WriteString("WS", 2) //0x0279 [waypoint data = 0x57, 0x53 "WS"]
        .WriteArray(new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x50, 0x00])) //0x027b [unk = 0x1, 0x0, 0x0, 0x0, 0x50, 0x0]
        .WriteArray(_writeWaypointData(char.header.waypoints)) //0x0281
        .WriteArray(new Uint8Array([0x01, 0x77])) //0x02c9 [npc header = 0x01, 0x77 ".w"]
        .WriteUInt16(0x34) //0x02ca [npc struct length]
        .WriteArray(_writeNPCData(char.header.npcs)); //0x02cc [npc introduction data... unk]
}
exports.writeHeader = writeHeader;
function _classId(name, constants) {
    if (!name)
        return -1;
    return constants.classes.findIndex(function (c) { return c && c.n == name; });
}
function _skillId(name, constants) {
    //default to "attack" if empty string or can't find spellname.
    if (name === "")
        return 0;
    if (!name)
        return -1;
    var idx = constants.skills.findIndex(function (s) { return s && s.s == name; });
    return idx >= 0 ? idx : 0;
}
function _readStatus(byte) {
    var status = {};
    status.hardcore = ((byte >>> 2) & 1) === 1;
    status.died = ((byte >>> 3) & 1) === 1;
    status.expansion = ((byte >>> 5) & 1) === 1;
    status.ladder = ((byte >>> 6) & 1) === 1;
    return status;
}
function _writeStatus(status) {
    var arr = new Uint8Array(1);
    arr[0] |= status.hardcore ? 1 << 2 : 0;
    arr[0] |= status.died ? 1 << 3 : 0;
    arr[0] |= status.expansion ? 1 << 5 : 0;
    arr[0] |= status.ladder ? 1 << 6 : 0;
    return arr;
}
function _readCharMenuAppearance(bytes, constants) {
    var appearance = {};
    var reader = new bitreader_1.BitReader(bytes);
    var graphics = reader.ReadArray(16);
    var tints = reader.ReadArray(16);
    appearance.head = { graphic: graphics[0], tint: tints[0] };
    appearance.torso = { graphic: graphics[1], tint: tints[1] };
    appearance.legs = { graphic: graphics[2], tint: tints[2] };
    appearance.right_arm = { graphic: graphics[3], tint: tints[3] };
    appearance.left_arm = { graphic: graphics[4], tint: tints[4] };
    appearance.right_hand = { graphic: graphics[5], tint: tints[5] };
    appearance.left_hand = { graphic: graphics[6], tint: tints[6] };
    appearance.shield = { graphic: graphics[7], tint: tints[7] };
    appearance.special1 = { graphic: graphics[8], tint: tints[8] };
    appearance.special2 = { graphic: graphics[9], tint: tints[9] };
    appearance.special3 = { graphic: graphics[10], tint: tints[10] };
    appearance.special4 = { graphic: graphics[11], tint: tints[11] };
    appearance.special5 = { graphic: graphics[12], tint: tints[12] };
    appearance.special6 = { graphic: graphics[13], tint: tints[13] };
    appearance.special7 = { graphic: graphics[14], tint: tints[14] };
    appearance.special8 = { graphic: graphics[15], tint: tints[15] };
    return appearance;
}
function _writeCharMenuAppearance(appearance, constants) {
    var writer = new bitwriter_1.BitWriter(32);
    writer.length = 32 * 8;
    var graphics = [];
    graphics.push(appearance && appearance.head ? appearance.head.graphic : 0);
    graphics.push(appearance && appearance.torso ? appearance.torso.graphic : 0);
    graphics.push(appearance && appearance.legs ? appearance.legs.graphic : 0);
    graphics.push(appearance && appearance.right_arm ? appearance.right_arm.graphic : 0);
    graphics.push(appearance && appearance.left_arm ? appearance.left_arm.graphic : 0);
    graphics.push(appearance && appearance.right_hand ? appearance.right_hand.graphic : 0);
    graphics.push(appearance && appearance.left_hand ? appearance.left_hand.graphic : 0);
    graphics.push(appearance && appearance.shield ? appearance.shield.graphic : 0);
    graphics.push(appearance && appearance.special1 ? appearance.special1.graphic : 0);
    graphics.push(appearance && appearance.special2 ? appearance.special2.graphic : 0);
    graphics.push(appearance && appearance.special3 ? appearance.special3.graphic : 0);
    graphics.push(appearance && appearance.special4 ? appearance.special4.graphic : 0);
    graphics.push(appearance && appearance.special5 ? appearance.special5.graphic : 0);
    graphics.push(appearance && appearance.special6 ? appearance.special6.graphic : 0);
    graphics.push(appearance && appearance.special7 ? appearance.special7.graphic : 0);
    graphics.push(appearance && appearance.special8 ? appearance.special8.graphic : 0);
    for (var _i = 0, graphics_1 = graphics; _i < graphics_1.length; _i++) {
        var g = graphics_1[_i];
        writer.WriteUInt8(g);
    }
    var tints = [];
    tints.push(appearance && appearance.head ? appearance.head.tint : 0);
    tints.push(appearance && appearance.torso ? appearance.torso.tint : 0);
    tints.push(appearance && appearance.legs ? appearance.legs.tint : 0);
    tints.push(appearance && appearance.right_arm ? appearance.right_arm.tint : 0);
    tints.push(appearance && appearance.left_arm ? appearance.left_arm.tint : 0);
    tints.push(appearance && appearance.right_hand ? appearance.right_hand.tint : 0);
    tints.push(appearance && appearance.left_hand ? appearance.left_hand.tint : 0);
    tints.push(appearance && appearance.shield ? appearance.shield.tint : 0);
    tints.push(appearance && appearance.special1 ? appearance.special1.tint : 0);
    tints.push(appearance && appearance.special2 ? appearance.special2.tint : 0);
    tints.push(appearance && appearance.special3 ? appearance.special3.tint : 0);
    tints.push(appearance && appearance.special4 ? appearance.special4.tint : 0);
    tints.push(appearance && appearance.special5 ? appearance.special5.tint : 0);
    tints.push(appearance && appearance.special6 ? appearance.special6.tint : 0);
    tints.push(appearance && appearance.special7 ? appearance.special7.tint : 0);
    tints.push(appearance && appearance.special8 ? appearance.special8.tint : 0);
    for (var _a = 0, tints_1 = tints; _a < tints_1.length; _a++) {
        var t = tints_1[_a];
        writer.WriteUInt8(t);
    }
    return writer.ToArray();
}
function _readAssignedSkills(bytes, constants) {
    var skills = [];
    var reader = new bitreader_1.BitReader(bytes);
    for (var i = 0; i < 16; i++) {
        var skillId = reader.ReadUInt32();
        var skill = constants.skills[skillId];
        if (skill) {
            skills.push(skill.s);
        }
    }
    return skills;
}
function _writeAssignedSkills(skills, constants) {
    var writer = new bitwriter_1.BitWriter(64);
    writer.length = 64 * 8;
    skills = skills || [];
    for (var i = 0; i < 16; i++) {
        var skillId = _skillId(skills[i], constants);
        if (skillId > 0) {
            writer.WriteUInt32(skillId);
        }
        else {
            writer.WriteUInt32(0xffff);
        }
    }
    return writer.ToArray();
}
function _readDifficulty(bytes) {
    var difficulty = {};
    difficulty.Normal = bytes[0];
    difficulty.Nightmare = bytes[1];
    difficulty.Hell = bytes[2];
    return difficulty;
}
function _writeDifficulty(difficulty) {
    var writer = new bitwriter_1.BitWriter(3);
    writer.length = 3 * 8;
    writer.WriteUInt8(difficulty.Normal);
    writer.WriteUInt8(difficulty.Nightmare);
    writer.WriteUInt8(difficulty.Hell);
    return writer.ToArray();
}
function _readQuests(bytes) {
    var quests = {};
    var reader = new bitreader_1.BitReader(bytes);
    quests.act_i = {};
    quests.act_i.introduced = reader.ReadUInt16() === 0x1; //0x0000
    quests.act_i.den_of_evil = _readQuest(reader.ReadArray(2)); //0x0002
    quests.act_i.sisters_burial_grounds = _readQuest(reader.ReadArray(2));
    quests.act_i.tools_of_the_trade = _readQuest(reader.ReadArray(2));
    quests.act_i.the_search_for_cain = _readQuest(reader.ReadArray(2));
    quests.act_i.the_forgotten_tower = _readQuest(reader.ReadArray(2));
    quests.act_i.sisters_to_the_slaughter = _readQuest(reader.ReadArray(2));
    quests.act_i.completed = reader.ReadUInt16() === 0x1;
    quests.act_ii = {};
    quests.act_ii.introduced = reader.ReadUInt16() === 0x1; //0x0010 [if jerhyn introduction = 0x01]
    quests.act_ii.radaments_lair = _readQuest(reader.ReadArray(2)); //0x0012
    quests.act_ii.the_horadric_staff = _readQuest(reader.ReadArray(2));
    quests.act_ii.tainted_sun = _readQuest(reader.ReadArray(2));
    quests.act_ii.arcane_sanctuary = _readQuest(reader.ReadArray(2));
    quests.act_ii.the_summoner = _readQuest(reader.ReadArray(2));
    quests.act_ii.the_seven_tombs = _readQuest(reader.ReadArray(2));
    quests.act_ii.completed = reader.ReadUInt16() === 0x1; //0x001e
    quests.act_iii = {};
    quests.act_iii.introduced = reader.ReadUInt16() === 0x1; //0x0020 [if hratli introduction = 0x01]
    quests.act_iii.lam_esens_tome = _readQuest(reader.ReadArray(2)); //0x0022
    quests.act_iii.khalims_will = _readQuest(reader.ReadArray(2));
    quests.act_iii.blade_of_the_old_religion = _readQuest(reader.ReadArray(2));
    quests.act_iii.the_golden_bird = _readQuest(reader.ReadArray(2));
    quests.act_iii.the_blackened_temple = _readQuest(reader.ReadArray(2));
    quests.act_iii.the_guardian = _readQuest(reader.ReadArray(2));
    quests.act_iii.completed = reader.ReadUInt16() === 0x1; //0x002e
    quests.act_iv = {};
    quests.act_iv.introduced = reader.ReadUInt16() === 0x1; //0x0030 [if activ introduction = 0x01]
    quests.act_iv.the_fallen_angel = _readQuest(reader.ReadArray(2)); //0x0032
    quests.act_iv.terrors_end = _readQuest(reader.ReadArray(2));
    quests.act_iv.hellforge = _readQuest(reader.ReadArray(2));
    quests.act_iv.completed = reader.ReadUInt16() === 0x1; //0x0038
    reader.SkipBytes(10); //0x003a
    quests.act_v = {};
    quests.act_v.introduced = reader.ReadUInt16() === 0x1;
    quests.act_v.siege_on_harrogath = _readQuest(reader.ReadArray(2)); //0x0046
    quests.act_v.rescue_on_mount_arreat = _readQuest(reader.ReadArray(2));
    quests.act_v.prison_of_ice = _readQuest(reader.ReadArray(2));
    quests.act_v.betrayal_of_harrogath = _readQuest(reader.ReadArray(2));
    quests.act_v.rite_of_passage = _readQuest(reader.ReadArray(2));
    quests.act_v.eve_of_destruction = _readQuest(reader.ReadArray(2));
    quests.act_v.completed = reader.ReadUInt16() === 0x1;
    reader.SkipBytes(12);
    return quests; //sizeof [0x0060]
}
function _writeQuests(quests) {
    var writer = new bitwriter_1.BitWriter(96);
    writer.length = 96 * 8;
    var difficultyCompleted = +quests.act_v.completed || +quests.act_v.eve_of_destruction.is_completed;
    return writer
        .WriteUInt16(+quests.act_i.introduced)
        .WriteArray(_writeQuest(quests.act_i.den_of_evil))
        .WriteArray(_writeQuest(quests.act_i.sisters_burial_grounds))
        .WriteArray(_writeQuest(quests.act_i.tools_of_the_trade))
        .WriteArray(_writeQuest(quests.act_i.the_search_for_cain))
        .WriteArray(_writeQuest(quests.act_i.the_forgotten_tower))
        .WriteArray(_writeQuest(quests.act_i.sisters_to_the_slaughter))
        .WriteUInt16(+quests.act_i.completed || +quests.act_i.sisters_to_the_slaughter.is_completed)
        .WriteUInt16(+quests.act_ii.introduced || +quests.act_i.sisters_to_the_slaughter.is_completed)
        .WriteArray(_writeQuest(quests.act_ii.radaments_lair))
        .WriteArray(_writeQuest(quests.act_ii.the_horadric_staff))
        .WriteArray(_writeQuest(quests.act_ii.tainted_sun))
        .WriteArray(_writeQuest(quests.act_ii.arcane_sanctuary))
        .WriteArray(_writeQuest(quests.act_ii.the_summoner))
        .WriteArray(_writeQuest(quests.act_ii.the_seven_tombs))
        .WriteUInt16(+quests.act_ii.completed || +quests.act_ii.the_seven_tombs.is_completed)
        .WriteUInt16(+quests.act_iii.introduced || +quests.act_ii.the_seven_tombs.is_completed)
        .WriteArray(_writeQuest(quests.act_iii.lam_esens_tome))
        .WriteArray(_writeQuest(quests.act_iii.khalims_will))
        .WriteArray(_writeQuest(quests.act_iii.blade_of_the_old_religion))
        .WriteArray(_writeQuest(quests.act_iii.the_golden_bird))
        .WriteArray(_writeQuest(quests.act_iii.the_blackened_temple))
        .WriteArray(_writeQuest(quests.act_iii.the_guardian))
        .WriteUInt16(+quests.act_iii.completed || +quests.act_iii.the_guardian.is_completed)
        .WriteUInt16(+quests.act_iv.introduced || +quests.act_iii.the_guardian.is_completed)
        .WriteArray(_writeQuest(quests.act_iv.the_fallen_angel))
        .WriteArray(_writeQuest(quests.act_iv.terrors_end))
        .WriteArray(_writeQuest(quests.act_iv.hellforge))
        .WriteUInt16(+quests.act_iv.completed || +quests.act_iv.terrors_end.is_completed)
        .WriteArray(new Uint8Array(6))
        .WriteUInt16(+quests.act_v.introduced || +quests.act_iv.terrors_end.is_completed)
        .WriteArray(new Uint8Array(4))
        .WriteArray(_writeQuest(quests.act_v.siege_on_harrogath))
        .WriteArray(_writeQuest(quests.act_v.rescue_on_mount_arreat))
        .WriteArray(_writeQuest(quests.act_v.prison_of_ice))
        .WriteArray(_writeQuest(quests.act_v.betrayal_of_harrogath))
        .WriteArray(_writeQuest(quests.act_v.rite_of_passage))
        .WriteArray(_writeQuest(quests.act_v.eve_of_destruction))
        .WriteUInt8(difficultyCompleted)
        .WriteUInt8(difficultyCompleted ? 0x80 : 0x0) //is this right?
        .WriteArray(new Uint8Array(12))
        .ToArray();
}
function _readQuest(bytes) {
    var quest = {};
    var reader = new bitreader_1.BitReader(bytes);
    quest.is_completed = reader.ReadBit() === 1;
    quest.is_requirement_completed = reader.ReadBit() === 1;
    quest.is_received = reader.ReadBit() === 1;
    if (reader.ReadBit() === 1)
        quest.unk3 = true;
    if (reader.ReadBit() === 1)
        quest.unk4 = true;
    if (reader.ReadBit() === 1)
        quest.unk5 = true;
    if (reader.ReadBit() === 1)
        quest.unk6 = true;
    if (reader.ReadBit() === 1)
        quest.consumed_scroll = true;
    if (reader.ReadBit() === 1)
        quest.unk8 = true;
    if (reader.ReadBit() === 1)
        quest.unk9 = true;
    if (reader.ReadBit() === 1)
        quest.unk10 = true;
    if (reader.ReadBit() === 1)
        quest.unk11 = true;
    quest.closed = reader.ReadBit() === 1;
    quest.done_recently = reader.ReadBit() === 1;
    if (reader.ReadBit() === 1)
        quest.unk14 = true;
    if (reader.ReadBit() === 1)
        quest.unk15 = true;
    return quest;
}
function _writeQuest(quest) {
    var writer = new bitwriter_1.BitWriter(2);
    writer.length = 2 * 8;
    writer.WriteBit(+quest.is_completed);
    writer.WriteBit(+quest.is_requirement_completed);
    writer.WriteBit(+quest.is_received);
    writer.WriteBit(+quest.unk3);
    writer.WriteBit(+quest.unk4);
    writer.WriteBit(+quest.unk5);
    writer.WriteBit(+quest.unk6);
    writer.WriteBit(+quest.consumed_scroll);
    writer.WriteBit(+quest.unk8);
    writer.WriteBit(+quest.unk9);
    writer.WriteBit(+quest.unk10);
    writer.WriteBit(+quest.unk11);
    writer.WriteBit(+quest.closed);
    writer.WriteBit(+quest.done_recently);
    writer.WriteBit(+quest.unk14);
    writer.WriteBit(+quest.unk15);
    return writer.ToArray();
}
function _readWaypointData(bytes) {
    var waypoints = {};
    var reader = new bitreader_1.BitReader(bytes);
    for (var i = 0; i < difficulties.length; i++) {
        waypoints[difficulties[i]] = _readWaypoints(reader.ReadArray(24));
    }
    return waypoints;
}
function _readWaypoints(bytes) {
    var waypoints = {};
    var reader = new bitreader_1.BitReader(bytes);
    reader.SkipBytes(2); //unk = 0x2, 0x
    waypoints.act_i = {};
    waypoints.act_i.rogue_encampement = reader.ReadBit() === 1;
    waypoints.act_i.cold_plains = reader.ReadBit() === 1;
    waypoints.act_i.stony_field = reader.ReadBit() === 1;
    waypoints.act_i.dark_woods = reader.ReadBit() === 1;
    waypoints.act_i.black_marsh = reader.ReadBit() === 1;
    waypoints.act_i.outer_cloister = reader.ReadBit() === 1;
    waypoints.act_i.jail_lvl_1 = reader.ReadBit() === 1;
    waypoints.act_i.inner_cloister = reader.ReadBit() === 1;
    waypoints.act_i.catacombs_lvl_2 = reader.ReadBit() === 1;
    waypoints.act_ii = {};
    waypoints.act_ii.lut_gholein = reader.ReadBit() === 1;
    waypoints.act_ii.sewers_lvl_2 = reader.ReadBit() === 1;
    waypoints.act_ii.dry_hills = reader.ReadBit() === 1;
    waypoints.act_ii.halls_of_the_dead_lvl_2 = reader.ReadBit() === 1;
    waypoints.act_ii.far_oasis = reader.ReadBit() === 1;
    waypoints.act_ii.lost_city = reader.ReadBit() === 1;
    waypoints.act_ii.palace_cellar_lvl_1 = reader.ReadBit() === 1;
    waypoints.act_ii.arcane_sanctuary = reader.ReadBit() === 1;
    waypoints.act_ii.canyon_of_the_magi = reader.ReadBit() === 1;
    waypoints.act_iii = {};
    waypoints.act_iii.kurast_docks = reader.ReadBit() === 1;
    waypoints.act_iii.spider_forest = reader.ReadBit() === 1;
    waypoints.act_iii.great_marsh = reader.ReadBit() === 1;
    waypoints.act_iii.flayer_jungle = reader.ReadBit() === 1;
    waypoints.act_iii.lower_kurast = reader.ReadBit() === 1;
    waypoints.act_iii.kurast_bazaar = reader.ReadBit() === 1;
    waypoints.act_iii.upper_kurast = reader.ReadBit() === 1;
    waypoints.act_iii.travincal = reader.ReadBit() === 1;
    waypoints.act_iii.durance_of_hate_lvl_2 = reader.ReadBit() === 1;
    waypoints.act_iv = {};
    waypoints.act_iv.the_pandemonium_fortress = reader.ReadBit() === 1;
    waypoints.act_iv.city_of_the_damned = reader.ReadBit() === 1;
    waypoints.act_iv.river_of_flame = reader.ReadBit() === 1;
    waypoints.act_v = {};
    waypoints.act_v.harrogath = reader.ReadBit() === 1;
    waypoints.act_v.frigid_highlands = reader.ReadBit() === 1;
    waypoints.act_v.arreat_plateau = reader.ReadBit() === 1;
    waypoints.act_v.crystalline_passage = reader.ReadBit() === 1;
    waypoints.act_v.halls_of_pain = reader.ReadBit() === 1;
    waypoints.act_v.glacial_trail = reader.ReadBit() === 1;
    waypoints.act_v.frozen_tundra = reader.ReadBit() === 1;
    waypoints.act_v.the_ancients_way = reader.ReadBit() === 1;
    waypoints.act_v.worldstone_keep_lvl_2 = reader.ReadBit() === 1;
    reader.Align().SkipBytes(17);
    return waypoints;
}
function _writeWaypointData(waypoints) {
    var writer = new bitwriter_1.BitWriter(72);
    writer.length = 72 * 8;
    for (var i = 0; i < difficulties.length; i++) {
        var w = waypoints != null ? waypoints[difficulties[i]] : null;
        writer.WriteArray(_writeWaypoints(w));
    }
    return writer.ToArray();
}
function _writeWaypoints(waypoints) {
    var writer = new bitwriter_1.BitWriter(24);
    writer.length = 24 * 8;
    writer.WriteArray(new Uint8Array([0x02, 0x01]));
    if (waypoints) {
        if (waypoints.act_i) {
            writer.WriteBit(+waypoints.act_i.rogue_encampement);
            writer.WriteBit(+waypoints.act_i.cold_plains);
            writer.WriteBit(+waypoints.act_i.stony_field);
            writer.WriteBit(+waypoints.act_i.dark_woods);
            writer.WriteBit(+waypoints.act_i.black_marsh);
            writer.WriteBit(+waypoints.act_i.outer_cloister);
            writer.WriteBit(+waypoints.act_i.jail_lvl_1);
            writer.WriteBit(+waypoints.act_i.inner_cloister);
            writer.WriteBit(+waypoints.act_i.catacombs_lvl_2);
        }
        if (waypoints.act_ii) {
            writer.WriteBit(+waypoints.act_ii.lut_gholein);
            writer.WriteBit(+waypoints.act_ii.sewers_lvl_2);
            writer.WriteBit(+waypoints.act_ii.dry_hills);
            writer.WriteBit(+waypoints.act_ii.halls_of_the_dead_lvl_2);
            writer.WriteBit(+waypoints.act_ii.far_oasis);
            writer.WriteBit(+waypoints.act_ii.lost_city);
            writer.WriteBit(+waypoints.act_ii.palace_cellar_lvl_1);
            writer.WriteBit(+waypoints.act_ii.arcane_sanctuary);
            writer.WriteBit(+waypoints.act_ii.canyon_of_the_magi);
        }
        if (waypoints.act_iii) {
            writer.WriteBit(+waypoints.act_iii.kurast_docks);
            writer.WriteBit(+waypoints.act_iii.spider_forest);
            writer.WriteBit(+waypoints.act_iii.great_marsh);
            writer.WriteBit(+waypoints.act_iii.flayer_jungle);
            writer.WriteBit(+waypoints.act_iii.lower_kurast);
            writer.WriteBit(+waypoints.act_iii.kurast_bazaar);
            writer.WriteBit(+waypoints.act_iii.upper_kurast);
            writer.WriteBit(+waypoints.act_iii.travincal);
            writer.WriteBit(+waypoints.act_iii.durance_of_hate_lvl_2);
        }
        if (waypoints.act_iv) {
            writer.WriteBit(+waypoints.act_iv.the_pandemonium_fortress);
            writer.WriteBit(+waypoints.act_iv.city_of_the_damned);
            writer.WriteBit(+waypoints.act_iv.river_of_flame);
        }
        if (waypoints.act_v) {
            writer.WriteBit(+waypoints.act_v.harrogath);
            writer.WriteBit(+waypoints.act_v.frigid_highlands);
            writer.WriteBit(+waypoints.act_v.arreat_plateau);
            writer.WriteBit(+waypoints.act_v.crystalline_passage);
            writer.WriteBit(+waypoints.act_v.halls_of_pain);
            writer.WriteBit(+waypoints.act_v.glacial_trail);
            writer.WriteBit(+waypoints.act_v.frozen_tundra);
            writer.WriteBit(+waypoints.act_v.the_ancients_way);
            writer.WriteBit(+waypoints.act_v.worldstone_keep_lvl_2);
        }
    }
    else {
        //all wps
        //writer.WriteArray(new Uint8Array(5));
        writer.WriteArray(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0x7f]));
        //_writeBits(writer, 0x3fffffffff, start, 0, 38);
    }
    writer.Align().WriteArray(new Uint8Array(17));
    return writer.ToArray();
}
function _readNPCData(bytes) {
    var npcs = { normal: {}, nm: {}, hell: {} };
    var reader = new bitreader_1.BitReader(bytes);
    for (var j = 0; j < 3; j++) {
        npcs[difficulties[j]] = {
            warriv_act_ii: { intro: false, congrats: false },
            charsi: { intro: false, congrats: false },
            warriv_act_i: { intro: false, congrats: false },
            kashya: { intro: false, congrats: false },
            akara: { intro: false, congrats: false },
            gheed: { intro: false, congrats: false },
            greiz: { intro: false, congrats: false },
            jerhyn: { intro: false, congrats: false },
            meshif_act_ii: { intro: false, congrats: false },
            geglash: { intro: false, congrats: false },
            lysnader: { intro: false, congrats: false },
            fara: { intro: false, congrats: false },
            drogan: { intro: false, congrats: false },
            alkor: { intro: false, congrats: false },
            hratli: { intro: false, congrats: false },
            ashera: { intro: false, congrats: false },
            cain_act_iii: { intro: false, congrats: false },
            elzix: { intro: false, congrats: false },
            malah: { intro: false, congrats: false },
            anya: { intro: false, congrats: false },
            natalya: { intro: false, congrats: false },
            meshif_act_iii: { intro: false, congrats: false },
            ormus: { intro: false, congrats: false },
            cain_act_v: { intro: false, congrats: false },
            qualkehk: { intro: false, congrats: false },
            nihlathak: { intro: false, congrats: false },
        };
    }
    //introductions
    for (var i = 0; i < 3; i++) {
        var j = i * 5;
        var npc = npcs[difficulties[i]];
        npc.warriv_act_ii.intro = reader.bits[0 + j * 8] === 1;
        npc.charsi.intro = reader.bits[2 + j * 8] === 1;
        npc.warriv_act_i.intro = reader.bits[3 + j * 8] === 1;
        npc.kashya.intro = reader.bits[4 + j * 8] === 1;
        npc.akara.intro = reader.bits[5 + j * 8] === 1;
        npc.gheed.intro = reader.bits[6 + j * 8] === 1;
        npc.greiz.intro = reader.bits[8 + j * 8] === 1;
        npc.jerhyn.intro = reader.bits[9 + j * 8] === 1;
        npc.meshif_act_ii.intro = reader.bits[10 + j * 8] === 1;
        npc.geglash.intro = reader.bits[11 + j * 8] === 1;
        npc.lysnader.intro = reader.bits[12 + j * 8] === 1;
        npc.fara.intro = reader.bits[13 + j * 8] === 1;
        npc.drogan.intro = reader.bits[14 + j * 8] === 1;
        npc.alkor.intro = reader.bits[16 + j * 8] === 1;
        npc.hratli.intro = reader.bits[17 + j * 8] === 1;
        npc.ashera.intro = reader.bits[18 + j * 8] === 1;
        npc.cain_act_iii.intro = reader.bits[21 + j * 8] === 1;
        npc.elzix.intro = reader.bits[23 + j * 8] === 1;
        npc.malah.intro = reader.bits[24 + j * 8] === 1;
        npc.anya.intro = reader.bits[25 + j * 8] === 1;
        npc.natalya.intro = reader.bits[27 + j * 8] === 1;
        npc.meshif_act_iii.intro = reader.bits[28 + j * 8] === 1;
        npc.ormus.intro = reader.bits[31 + j * 8] === 1;
        npc.cain_act_v.intro = reader.bits[37 + j * 8] === 1;
        npc.qualkehk.intro = reader.bits[38 + j * 8] === 1;
        npc.nihlathak.intro = reader.bits[39 + j * 8] === 1;
    }
    //congrats
    for (var i = 0; i < 3; i++) {
        var j = i * 5;
        var npc = npcs[difficulties[i]];
        npc.warriv_act_ii.congrats = reader.bits[192 + (0 + j * 8)] === 1;
        npc.charsi.congrats = reader.bits[192 + (2 + j * 8)] === 1;
        npc.warriv_act_i.congrats = reader.bits[192 + (3 + j * 8)] === 1;
        npc.kashya.congrats = reader.bits[192 + (4 + j * 8)] === 1;
        npc.akara.congrats = reader.bits[192 + (5 + j * 8)] === 1;
        npc.gheed.congrats = reader.bits[192 + (6 + j * 8)] === 1;
        npc.greiz.congrats = reader.bits[192 + (8 + j * 8)] === 1;
        npc.jerhyn.congrats = reader.bits[192 + (9 + j * 8)] === 1;
        npc.meshif_act_ii.congrats = reader.bits[192 + (10 + j * 8)] === 1;
        npc.geglash.congrats = reader.bits[192 + (11 + j * 8)] === 1;
        npc.lysnader.congrats = reader.bits[192 + (12 + j * 8)] === 1;
        npc.fara.congrats = reader.bits[192 + (13 + j * 8)] === 1;
        npc.drogan.congrats = reader.bits[192 + (14 + j * 8)] === 1;
        npc.alkor.congrats = reader.bits[192 + (16 + j * 8)] === 1;
        npc.hratli.congrats = reader.bits[192 + (17 + j * 8)] === 1;
        npc.ashera.congrats = reader.bits[192 + (18 + j * 8)] === 1;
        npc.cain_act_iii.congrats = reader.bits[192 + (21 + j * 8)] === 1;
        npc.elzix.congrats = reader.bits[192 + (23 + j * 8)] === 1;
        npc.malah.congrats = reader.bits[192 + (24 + j * 8)] === 1;
        npc.anya.congrats = reader.bits[192 + (25 + j * 8)] === 1;
        npc.natalya.congrats = reader.bits[192 + (27 + j * 8)] === 1;
        npc.meshif_act_iii.congrats = reader.bits[192 + (28 + j * 8)] === 1;
        npc.ormus.congrats = reader.bits[192 + (31 + j * 8)] === 1;
        npc.cain_act_v.congrats = reader.bits[192 + (37 + j * 8)] === 1;
        npc.qualkehk.congrats = reader.bits[192 + (38 + j * 8)] === 1;
        npc.nihlathak.congrats = reader.bits[192 + (39 + j * 8)] === 1;
    }
    return npcs;
}
function _writeNPCData(npcs) {
    var writer = new bitwriter_1.BitWriter(0x30);
    writer.length = 0x30 * 8;
    if (npcs) {
        for (var j = 0; j < 3; j++) {
            var npc = npcs[difficulties[j]];
            writer.SeekByte(j * 5);
            writer.WriteBit(+npc.warriv_act_ii.intro);
            writer.WriteBit(0);
            writer.WriteBit(+npc.charsi.intro);
            writer.WriteBit(+npc.warriv_act_i.intro);
            writer.WriteBit(+npc.kashya.intro);
            writer.WriteBit(+npc.akara.intro);
            writer.WriteBit(+npc.gheed.intro);
            writer.WriteBit(0);
            writer.WriteBit(+npc.greiz.intro);
            writer.WriteBit(+npc.jerhyn.intro);
            writer.WriteBit(+npc.meshif_act_ii.intro);
            writer.WriteBit(+npc.geglash.intro);
            writer.WriteBit(+npc.lysnader.intro);
            writer.WriteBit(+npc.fara.intro);
            writer.WriteBit(+npc.drogan.intro);
            writer.WriteBit(0);
            writer.WriteBit(+npc.alkor.intro);
            writer.WriteBit(+npc.hratli.intro);
            writer.WriteBit(+npc.ashera.intro);
            writer.WriteBits(new Uint8Array(2).fill(0), 2);
            writer.WriteBit(+npc.cain_act_iii.intro);
            writer.WriteBit(0);
            writer.WriteBit(+npc.elzix.intro);
            writer.WriteBit(+npc.malah.intro);
            writer.WriteBit(+npc.anya.intro);
            writer.WriteBit(0);
            writer.WriteBit(+npc.natalya.intro);
            writer.WriteBit(+npc.meshif_act_iii.intro);
            writer.WriteBits(new Uint8Array(2).fill(0), 2);
            writer.WriteBit(+npc.ormus.intro);
            writer.WriteBits(new Uint8Array(5).fill(0), 5);
            writer.WriteBit(+npc.cain_act_v.intro);
            writer.WriteBit(+npc.qualkehk.intro);
            writer.WriteBit(+npc.nihlathak.intro);
        }
        for (var j = 0; j < 3; j++) {
            writer.SeekByte(24 + j * 5);
            var npc = npcs[difficulties[j]];
            writer.WriteBit(+npc.warriv_act_ii.congrats);
            writer.WriteBit(0);
            writer.WriteBit(+npc.charsi.congrats);
            writer.WriteBit(+npc.warriv_act_i.congrats);
            writer.WriteBit(+npc.kashya.congrats);
            writer.WriteBit(+npc.akara.congrats);
            writer.WriteBit(+npc.gheed.congrats);
            writer.WriteBit(0);
            writer.WriteBit(+npc.greiz.congrats);
            writer.WriteBit(+npc.jerhyn.congrats);
            writer.WriteBit(+npc.meshif_act_ii.congrats);
            writer.WriteBit(+npc.geglash.congrats);
            writer.WriteBit(+npc.lysnader.congrats);
            writer.WriteBit(+npc.fara.congrats);
            writer.WriteBit(+npc.drogan.congrats);
            writer.WriteBit(0);
            writer.WriteBit(+npc.alkor.congrats);
            writer.WriteBit(+npc.hratli.congrats);
            writer.WriteBit(+npc.ashera.congrats);
            writer.WriteBits(new Uint8Array(2).fill(0), 2);
            writer.WriteBit(+npc.cain_act_iii.congrats);
            writer.WriteBit(0);
            writer.WriteBit(+npc.elzix.congrats);
            writer.WriteBit(+npc.malah.congrats);
            writer.WriteBit(+npc.anya.congrats);
            writer.WriteBit(0);
            writer.WriteBit(+npc.natalya.congrats);
            writer.WriteBit(+npc.meshif_act_iii.congrats);
            writer.WriteBits(new Uint8Array(2).fill(0), 2);
            writer.WriteBit(+npc.ormus.congrats);
            writer.WriteBits(new Uint8Array(5).fill(0), 5);
            writer.WriteBit(+npc.cain_act_v.congrats);
            writer.WriteBit(+npc.qualkehk.congrats);
            writer.WriteBit(+npc.nihlathak.congrats);
        }
    }
    return writer.ToArray();
}


/***/ }),

/***/ "./src/data/parser.ts":
/*!****************************!*\
  !*** ./src/data/parser.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConstantData = void 0;
var types = __importStar(__webpack_require__(/*! ../d2/types */ "./src/d2/types.ts"));
//special stats. read the next N properties.
//seems to be hardcode in d2 and not in itemstatcost
var item_property_stat_count = {
    item_maxdamage_percent: { numprops: 2, rangestr: "strModMinDamageRange", equalstr: "strModEnhancedDamage" },
    firemindam: { numprops: 2, rangestr: "strModFireDamageRange", equalstr: "strModFireDamage" },
    lightmindam: { numprops: 2, rangestr: "strModLightningDamageRange", equalstr: "strModLightningDamage" },
    magicmindam: { numprops: 2, rangestr: "strModMagicDamageRange", equalstr: "strModMagicDamage" },
    coldmindam: { numprops: 3, rangestr: "strModColdDamageRange", equalstr: "strModColdDamage" },
    poisonmindam: { numprops: 3, rangestr: "strModPoisonDamageRange", equalstr: "strModPoisonDamage" },
};
//TODO use smaller field names to minimize size of file.
function readConstantData(buffers) {
    var constants = {};
    var strings = {};
    if (_hasKey(buffers, "strings.txt")) {
        strings = _readStrings(_getKey(buffers, "string.txt"));
        strings = Object.assign(strings, _readStrings(_getKey(buffers, "expansionstring.txt")));
        strings = Object.assign(strings, _readStrings(_getKey(buffers, "patchstring.txt")));
    }
    else {
        strings = _readJSONStrings(_getKey(buffers, "item-gems.json"));
        strings = Object.assign(strings, _readJSONStrings(_getKey(buffers, "item-modifiers.json")));
        strings = Object.assign(strings, _readJSONStrings(_getKey(buffers, "item-nameaffixes.json")));
        strings = Object.assign(strings, _readJSONStrings(_getKey(buffers, "item-names.json")));
        strings = Object.assign(strings, _readJSONStrings(_getKey(buffers, "item-runes.json")));
        strings = Object.assign(strings, _readJSONStrings(_getKey(buffers, "skills.json")));
    }
    constants.classes = _readClasses(_getArray(buffers, "CharStats.txt"), _getArray(buffers, "PlayerClass.txt"), strings);
    var skillDescs = _readSkillDesc(_getArray(buffers, "SkillDesc.txt"), strings);
    constants.skills = _readSkills(_getArray(buffers, "skills.txt"), skillDescs, strings);
    constants.rare_names = [null].concat(_readRareNames(_getArray(buffers, "RareSuffix.txt"), 1, strings));
    constants.rare_names = constants.rare_names.concat(_readRareNames(_getArray(buffers, "RarePrefix.txt"), constants.rare_names.length, strings));
    constants.magic_prefixes = _readMagicNames(_getArray(buffers, "MagicPrefix.txt"), strings);
    constants.magic_suffixes = _readMagicNames(_getArray(buffers, "MagicSuffix.txt"), strings);
    constants.properties = _readProperties(_getArray(buffers, "Properties.txt"), strings);
    constants.magical_properties = _readItemStatCosts(_getArray(buffers, "ItemStatCost.txt"), strings);
    constants.runewords = _readRunewords(_getArray(buffers, "Runes.txt"), strings);
    constants.set_items = _readSetOrUnqItems(_getArray(buffers, "SetItems.txt"), strings);
    constants.unq_items = _readSetOrUnqItems(_getArray(buffers, "UniqueItems.txt"), strings);
    var item_types = _readTypes(_getArray(buffers, "ItemTypes.txt"), strings);
    var armor_items = _readItems(_getArray(buffers, "Armor.txt"), item_types, strings);
    var weapon_items = _readItems(_getArray(buffers, "Weapons.txt"), item_types, strings);
    var other_items = _readItems(_getArray(buffers, "Misc.txt"), item_types, strings);
    constants.stackables = {};
    __spreadArrays(armor_items, weapon_items, other_items).filter(function (item) { return item.s === 1; })
        .map(function (item) { return (constants.stackables[item.code] = { n: item.n }); });
    constants.armor_items = {};
    armor_items.map(function (item) {
        constants.armor_items[item.code] = item;
        delete item.code;
    });
    constants.weapon_items = {};
    weapon_items.map(function (item) {
        constants.weapon_items[item.code] = item;
        delete item.code;
    });
    constants.other_items = {};
    other_items.map(function (item) {
        constants.other_items[item.code] = item;
        delete item.code;
    });
    _readGems(constants.other_items, _getArray(buffers, "Gems.txt"), strings);
    return constants;
}
exports.readConstantData = readConstantData;
function _getArray(files, find) {
    return _readTsv(_getKey(files, find));
}
function _getKey(files, find) {
    var key = Object.keys(files).find(function (key) { return key.toLowerCase() === find.toLowerCase(); });
    if (!key) {
        throw new Error("Cannot find file: " + find);
    }
    return files[key];
}
function _hasKey(files, find) {
    return Object.keys(files).find(function (key) { return key.toLowerCase() === find.toLowerCase(); }) != null;
}
function _readTsv(file) {
    var lines = file.split(/\r?\n/).map(function (line) { return line.split(/\t/); });
    var header = lines[0];
    return {
        header: header,
        lines: lines,
    };
}
function _readStrings(file) {
    var result = {};
    file
        .split(/\r?\n/)
        .map(function (line) { return line.split(/\t/); })
        .map(function (line) {
        if (!result[line[0]]) {
            result[line[0]] = line[1];
        }
    });
    return result;
}
function _readJSONStrings(file) {
    var result = {};
    //remove BOM
    if (file.charCodeAt(0) === 0xfeff) {
        file = file.slice(1);
    }
    var data = JSON.parse(file);
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var str = data_1[_i];
        result[str.Key] = str.enUS;
    }
    return result;
}
function _readClasses(tsv, tsv2, strings) {
    var arr = [];
    var cClass = tsv.header.indexOf("class");
    // str	dex	int	vit	tot	stamina
    var cStr = tsv.header.indexOf("str");
    var cDex = tsv.header.indexOf("dex");
    var cInt = tsv.header.indexOf("int");
    var cVit = tsv.header.indexOf("vit");
    var cStam = tsv.header.indexOf("stamina");
    var cHpadd = tsv.header.indexOf("hpadd");
    var cLifePerLvl = tsv.header.indexOf("LifePerLevel");
    var cStamPerLvl = tsv.header.indexOf("StaminaPerLevel");
    var cManaPerLvl = tsv.header.indexOf("ManaPerLevel");
    var cLifePerVit = tsv.header.indexOf("LifePerVitality");
    var cStamPerVit = tsv.header.indexOf("StaminaPerVitality");
    var cManaPerMag = tsv.header.indexOf("ManaPerMagic");
    var cAllSkills = tsv.header.indexOf("StrAllSkills");
    var cSkillTab1 = tsv.header.indexOf("StrSkillTab1");
    var cSkillTab2 = tsv.header.indexOf("StrSkillTab2");
    var cSkillTab3 = tsv.header.indexOf("StrSkillTab3");
    var cClassOnly = tsv.header.indexOf("StrClassOnly");
    var cCode = tsv2.header.indexOf("Code");
    var id = 0;
    for (var i = 1; i < tsv.lines.length; i++) {
        var clazz = tsv.lines[i][cClass];
        if (clazz && clazz != "Expansion") {
            arr[id] = {
                n: clazz,
                c: tsv2.lines[i][cCode],
                as: strings[tsv.lines[i][cAllSkills]],
                ts: [strings[tsv.lines[i][cSkillTab1]], strings[tsv.lines[i][cSkillTab2]], strings[tsv.lines[i][cSkillTab3]]],
                co: strings[tsv.lines[i][cClassOnly]],
                s: {
                    lpl: +tsv.lines[i][cLifePerLvl],
                    mpl: +tsv.lines[i][cManaPerLvl],
                    spl: +tsv.lines[i][cStamPerLvl],
                    lpv: +tsv.lines[i][cLifePerVit],
                    spv: +tsv.lines[i][cStamPerVit],
                    mpe: +tsv.lines[i][cManaPerMag],
                },
                a: {
                    str: +tsv.lines[i][cStr],
                    dex: +tsv.lines[i][cDex],
                    int: +tsv.lines[i][cInt],
                    vit: +tsv.lines[i][cVit],
                    stam: +tsv.lines[i][cStam],
                    hpadd: tsv.lines[i][cHpadd],
                },
            };
            id++;
        }
    }
    return arr;
}
function _readSkillDesc(tsv, strings) {
    var arr = {};
    var cSkillDesc = tsv.header.indexOf("skilldesc");
    var cStrName = tsv.header.indexOf("str name");
    for (var i = 1; i < tsv.lines.length; i++) {
        var id = tsv.lines[i][cSkillDesc];
        var skillStrName = tsv.lines[i][cStrName];
        if (id && skillStrName) {
            arr[id] = strings[skillStrName];
        }
    }
    return arr;
}
function _readSkills(tsv, skillDescs, strings) {
    var arr = [];
    var cSkillDesc = tsv.header.indexOf("skilldesc");
    var cId = tsv.header.indexOf("Id");
    if (cId < 0) {
        cId = tsv.header.indexOf("*Id");
    }
    var cCharclass = tsv.header.indexOf("charclass");
    for (var i = 1; i < tsv.lines.length; i++) {
        var id = +tsv.lines[i][cId];
        var skillDesc = tsv.lines[i][cSkillDesc];
        if (skillDesc) {
            var o = {};
            if (skillDescs[skillDesc])
                o.s = skillDescs[skillDesc];
            if (tsv.lines[i][cCharclass])
                o.c = tsv.lines[i][cCharclass];
            arr[id] = o;
        }
    }
    return arr;
}
function _readRareNames(tsv, idx, strings) {
    var arr = [];
    var cName = tsv.header.indexOf("name");
    var id = idx;
    for (var i = 1; i < tsv.lines.length; i++) {
        var name_1 = tsv.lines[i][cName];
        if (name_1) {
            arr[id - idx] = {
                n: strings[name_1],
            };
            id++;
        }
    }
    return arr;
}
function _readMagicNames(tsv, strings) {
    var arr = [];
    var cName = tsv.header.indexOf("Name");
    var cTransformcolor = tsv.header.indexOf("transformcolor");
    var id = 1;
    for (var i = 1; i < tsv.lines.length; i++) {
        var name_2 = tsv.lines[i][cName];
        if (name_2 != "Expansion") {
            var o = {};
            o.n = strings[name_2];
            if (tsv.lines[i][cTransformcolor])
                o.tc = tsv.lines[i][cTransformcolor];
            arr[id] = o;
            id++;
        }
    }
    return arr;
}
function _readProperties(tsv, strings) {
    var arr = {};
    var cCode = tsv.header.indexOf("code");
    var cStats = [];
    for (var j = 1; j <= 7; j++) {
        cStats[j] = {};
        cStats[j].cStat = tsv.header.indexOf("stat" + j);
        cStats[j].cFunc = tsv.header.indexOf("func" + j);
    }
    for (var i = 1; i < tsv.lines.length; i++) {
        var code = tsv.lines[i][cCode];
        if (code != "Expansion") {
            var prop = [];
            //prop.code = code;
            for (var j = 1; j <= 7; j++) {
                var stat = tsv.lines[i][cStats[j].cStat];
                var func = tsv.lines[i][cStats[j].cFunc];
                if (!stat && !func) {
                    break;
                }
                var s = {};
                if (stat)
                    s.s = stat;
                if (func)
                    s.f = +func;
                prop[j - 1] = s;
            }
            if (prop.length) {
                arr[code] = prop;
            }
        }
    }
    return arr;
}
function _readRunewords(tsv, strings) {
    var arr = [];
    var cName = tsv.header.indexOf("Name");
    for (var i = 1; i < tsv.lines.length; i++) {
        var name_3 = tsv.lines[i][cName];
        if (name_3) {
            var id = +name_3.substring(8);
            //TODO: why?
            if (id > 75) {
                id += 25;
            }
            else {
                id += 26;
            }
            arr[id] = {
                n: strings[tsv.lines[i][cName]],
            };
        }
    }
    return arr;
}
function _readTypes(tsv, strings) {
    var arr = {};
    var cCode = tsv.header.indexOf("Code");
    var cItemType = tsv.header.indexOf("ItemType");
    var cEquiv1 = tsv.header.indexOf("Equiv1");
    var cEquiv2 = tsv.header.indexOf("Equiv2");
    var cInvGfx = [];
    for (var i = 1; i <= 6; i++) {
        cInvGfx.push(tsv.header.indexOf("InvGfx" + i));
    }
    for (var i = 1; i < tsv.lines.length; i++) {
        var code = tsv.lines[i][cCode];
        if (code) {
            var o = {};
            var invgfx = [];
            for (var j = 0; j <= 6; j++) {
                if (tsv.lines[i][cInvGfx[j]])
                    invgfx[j] = tsv.lines[i][cInvGfx[j]];
            }
            o.ig = invgfx;
            o.eq1 = tsv.lines[i][cEquiv1];
            o.eq2 = tsv.lines[i][cEquiv2];
            o.n = tsv.lines[i][cItemType];
            o.c = [o.n];
            arr[code] = o;
        }
    }
    for (var _i = 0, _a = Object.keys(arr); _i < _a.length; _i++) {
        var k = _a[_i];
        arr[k].c = __spreadArrays(_resolvetItemTypeCategories(arr, k));
        if (arr[k] !== undefined && arr[arr[k].eq1] !== undefined) {
            arr[k].eq1n = arr[arr[k].eq1].n;
        }
        if (arr[k] !== undefined && arr[arr[k].eq2] !== undefined) {
            arr[k].eq2n = arr[arr[k].eq2].n;
        }
    }
    return arr;
}
function _resolvetItemTypeCategories(arr, key) {
    var res = [];
    if (arr[key] !== undefined) {
        res = __spreadArrays([arr[key].n], _resolvetItemTypeCategories(arr, arr[key].eq1), _resolvetItemTypeCategories(arr, arr[key].eq2));
    }
    return res;
}
function _readItems(tsv, itemtypes, strings) {
    var arr = [];
    var cCode = tsv.header.indexOf("code");
    var cNameStr = tsv.header.indexOf("namestr");
    var cStackable = tsv.header.indexOf("stackable");
    var cMinac = tsv.header.indexOf("minac");
    var cMaxac = tsv.header.indexOf("maxac");
    var cDurability = tsv.header.indexOf("durability");
    var cMindam = tsv.header.indexOf("mindam");
    var cMaxdam = tsv.header.indexOf("maxdam");
    var cTwoHandMindam = tsv.header.indexOf("2handmindam");
    var cTwoHandMaxdam = tsv.header.indexOf("2handmaxdam");
    var cMinmisdam = tsv.header.indexOf("minmisdam");
    var cMaxmisdam = tsv.header.indexOf("maxmisdam");
    var cReqstr = tsv.header.indexOf("reqstr");
    var cReqdex = tsv.header.indexOf("reqdex");
    var cHasinv = tsv.header.indexOf("hasinv");
    var cGemapplytype = tsv.header.indexOf("gemapplytype");
    var cInvfile = tsv.header.indexOf("invfile");
    var cUniqueInvfile = tsv.header.indexOf("uniqueinvfile");
    var cSetInvfile = tsv.header.indexOf("setinvfile");
    var cInvwidth = tsv.header.indexOf("invwidth");
    var cInvheight = tsv.header.indexOf("invheight");
    var cInvtransform = tsv.header.indexOf("InvTrans");
    var cType = tsv.header.indexOf("type");
    var cNormCode = tsv.header.indexOf("normcode");
    var cUberCode = tsv.header.indexOf("ubercode");
    var cUltraCode = tsv.header.indexOf("ultracode");
    for (var i = 1; i < tsv.lines.length; i++) {
        var code = tsv.lines[i][cCode];
        if (code) {
            var item = {};
            item.code = code;
            item.nc = tsv.lines[i][cNormCode];
            item.exc = tsv.lines[i][cUberCode];
            item.elc = tsv.lines[i][cUltraCode];
            item.iq =
                item.code === item.exc
                    ? types.EItemQuality.exceptional
                    : item.code === item.elc
                        ? types.EItemQuality.elite
                        : types.EItemQuality.normal;
            item.n = strings[tsv.lines[i][cNameStr]];
            if (tsv.lines[i][cStackable] && +tsv.lines[i][cStackable] > 0)
                item.s = 1;
            if (tsv.lines[i][cMinac] && +tsv.lines[i][cMinac] > 0)
                item.minac = +tsv.lines[i][cMinac];
            if (tsv.lines[i][cMaxac] && +tsv.lines[i][cMaxac] > 0)
                item.maxac = +tsv.lines[i][cMaxac];
            if (tsv.lines[i][cDurability])
                item.durability = +tsv.lines[i][cDurability];
            if (tsv.lines[i][cMindam] && +tsv.lines[i][cMindam] > 0)
                item.mind = +tsv.lines[i][cMindam];
            if (tsv.lines[i][cMaxdam] && +tsv.lines[i][cMaxdam] > 0)
                item.maxd = +tsv.lines[i][cMaxdam];
            if (tsv.lines[i][cTwoHandMindam] && +tsv.lines[i][cTwoHandMindam] > 0)
                item.min2d = +tsv.lines[i][cTwoHandMindam];
            if (tsv.lines[i][cTwoHandMaxdam] && +tsv.lines[i][cTwoHandMaxdam] > 0)
                item.max2d = +tsv.lines[i][cTwoHandMaxdam];
            if (tsv.lines[i][cMinmisdam] && +tsv.lines[i][cMinmisdam] > 0)
                item.minmd = +tsv.lines[i][cMinmisdam];
            if (tsv.lines[i][cMaxmisdam] && +tsv.lines[i][cMaxmisdam] > 0)
                item.maxmd = +tsv.lines[i][cMaxmisdam];
            if (tsv.lines[i][cReqstr])
                item.rs = +tsv.lines[i][cReqstr];
            if (tsv.lines[i][cReqdex])
                item.rd = +tsv.lines[i][cReqdex];
            if (tsv.lines[i][cHasinv])
                item.hi = +tsv.lines[i][cHasinv];
            if (tsv.lines[i][cGemapplytype])
                item.gt = +tsv.lines[i][cGemapplytype];
            if (tsv.lines[i][cInvfile])
                item.i = tsv.lines[i][cInvfile];
            if (tsv.lines[i][cUniqueInvfile])
                item.ui = tsv.lines[i][cUniqueInvfile];
            if (tsv.lines[i][cSetInvfile])
                item.si = tsv.lines[i][cSetInvfile];
            if (tsv.lines[i][cInvwidth])
                item.iw = +tsv.lines[i][cInvwidth];
            if (tsv.lines[i][cInvheight])
                item.ih = +tsv.lines[i][cInvheight];
            if (tsv.lines[i][cInvtransform])
                item.it = +tsv.lines[i][cInvtransform];
            var type = itemtypes[tsv.lines[i][cType]];
            if (type && type.ig) {
                item.ig = type.ig;
                item.eq1n = type.eq1n;
                item.eq2n = type.eq2n;
                item.c = type.c;
            }
            arr.push(item);
        }
    }
    return arr;
}
function _readGems(miscItems, tsv, strings) {
    var cCode = tsv.header.indexOf("code");
    var types = ["weapon", "helm", "shield"];
    var cols = {};
    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
        var type = types_1[_i];
        cols[type] = [];
        for (var j = 1; j <= 3; j++) {
            cols[type][j] = {};
            cols[type][j].cMod = tsv.header.indexOf(type + "Mod" + j + "Code");
            cols[type][j].cParam = tsv.header.indexOf(type + "Mod" + j + "Param");
            cols[type][j].cMin = tsv.header.indexOf(type + "Mod" + j + "Min");
            cols[type][j].cMax = tsv.header.indexOf(type + "Mod" + j + "Max");
        }
    }
    for (var i = 1; i < tsv.lines.length; i++) {
        var code = tsv.lines[i][cCode];
        if (code && code != "Expansion") {
            var item = miscItems[code];
            for (var k = 0; k < 3; k++) {
                var type = types[k];
                for (var j = 1; j <= 3; j++) {
                    var mod = tsv.lines[i][cols[type][j].cMod];
                    if (!mod) {
                        break;
                    }
                    if (j == 1) {
                        if (!item.m)
                            item.m = [];
                        item.m[k] = [];
                    }
                    var m = {};
                    m.m = mod;
                    if (tsv.lines[i][cols[type][j].cParam])
                        m.p = +tsv.lines[i][cols[type][j].cParam];
                    if (tsv.lines[i][cols[type][j].cMin])
                        m.min = +tsv.lines[i][cols[type][j].cMin];
                    if (tsv.lines[i][cols[type][j].cMax])
                        m.max = +tsv.lines[i][cols[type][j].cMax];
                    item.m[k].push(m);
                }
            }
        }
    }
}
function _readSetOrUnqItems(tsv, strings) {
    var arr = [];
    var cIndex = tsv.header.indexOf("index");
    var cInvfile = tsv.header.indexOf("invfile");
    var cCode = tsv.header.indexOf("code");
    if (cCode < 0)
        cCode = tsv.header.indexOf("item");
    var cInvtransform = tsv.header.indexOf("invtransform");
    var id = 0;
    for (var i = 1; i < tsv.lines.length; i++) {
        var index = tsv.lines[i][cIndex];
        if (index && index != "Expansion") {
            var o = {};
            o.n = strings[tsv.lines[i][cIndex]];
            if (tsv.lines[i][cInvfile])
                o.i = tsv.lines[i][cInvfile];
            if (tsv.lines[i][cCode])
                o.c = tsv.lines[i][cCode];
            if (tsv.lines[i][cInvtransform])
                o.tc = tsv.lines[i][cInvtransform];
            arr[id] = o;
            id++;
        }
    }
    return arr;
}
function _readItemStatCosts(tsv, strings) {
    var arr = [];
    var cStat = tsv.header.indexOf("Stat");
    var cId = tsv.header.indexOf("ID");
    if (cId < 0) {
        cId = tsv.header.indexOf("*ID");
    }
    var cCSvBits = tsv.header.indexOf("CSvBits");
    var cCSvParam = tsv.header.indexOf("CSvParam");
    var cCSvSigned = tsv.header.indexOf("CSvSigned");
    var cEncode = tsv.header.indexOf("Encode");
    var cValShift = tsv.header.indexOf("ValShift");
    var cSigned = tsv.header.indexOf("Signed");
    var cSaveBits = tsv.header.indexOf("Save Bits");
    var cSaveAdd = tsv.header.indexOf("Save Add");
    var cSaveParamBits = tsv.header.indexOf("Save Param Bits");
    var cDescPriority = tsv.header.indexOf("descpriority");
    var cDescFunc = tsv.header.indexOf("descfunc");
    var cDescVal = tsv.header.indexOf("descval");
    var cDescstrpos = tsv.header.indexOf("descstrpos");
    var cDescstrneg = tsv.header.indexOf("descstrneg");
    var cDescstr2 = tsv.header.indexOf("descstr2");
    var cDgrp = tsv.header.indexOf("dgrp");
    var cDgrpFunc = tsv.header.indexOf("dgrpfunc");
    var cDgrpVal = tsv.header.indexOf("dgrpval");
    var cDgrpstrpos = tsv.header.indexOf("dgrpstrpos");
    var cDgrpstrneg = tsv.header.indexOf("dgrpstrneg");
    var cDgrpstr2 = tsv.header.indexOf("dgrpstr2");
    var cOp = tsv.header.indexOf("op");
    var cOpParam = tsv.header.indexOf("op param");
    var cOpBase = tsv.header.indexOf("op base");
    var cOpStat1 = tsv.header.indexOf("op stat1");
    var cOpStat2 = tsv.header.indexOf("op stat2");
    var cOpStat3 = tsv.header.indexOf("op stat3");
    for (var i = 1; i < tsv.lines.length; i++) {
        var id = +tsv.lines[i][cId];
        var stat = tsv.lines[i][cStat];
        if (stat) {
            var o = {};
            o.s = stat;
            if (tsv.lines[i][cCSvBits])
                o.cB = +tsv.lines[i][cCSvBits];
            if (tsv.lines[i][cCSvParam])
                o.cP = +tsv.lines[i][cCSvParam];
            if (tsv.lines[i][cCSvSigned])
                o.cS = +tsv.lines[i][cCSvSigned];
            if (tsv.lines[i][cEncode])
                o.e = +tsv.lines[i][cEncode];
            if (tsv.lines[i][cValShift])
                o.vS = +tsv.lines[i][cValShift];
            if (tsv.lines[i][cSigned])
                o.sS = +tsv.lines[i][cSigned];
            if (tsv.lines[i][cSaveBits])
                o.sB = +tsv.lines[i][cSaveBits];
            if (tsv.lines[i][cSaveAdd])
                o.sA = +tsv.lines[i][cSaveAdd];
            if (tsv.lines[i][cSaveParamBits])
                o.sP = +tsv.lines[i][cSaveParamBits];
            if (tsv.lines[i][cDescPriority])
                o.so = +tsv.lines[i][cDescPriority];
            if (tsv.lines[i][cDescFunc])
                o.dF = +tsv.lines[i][cDescFunc];
            if (tsv.lines[i][cDescVal])
                o.dV = +tsv.lines[i][cDescVal];
            if (tsv.lines[i][cDescstrpos])
                o.dP = strings[tsv.lines[i][cDescstrpos]];
            if (tsv.lines[i][cDescstrneg])
                o.dN = strings[tsv.lines[i][cDescstrneg]];
            if (tsv.lines[i][cDescstr2])
                o.d2 = strings[tsv.lines[i][cDescstr2]];
            if (tsv.lines[i][cDgrp])
                o.dg = +tsv.lines[i][cDgrp];
            if (tsv.lines[i][cDgrpFunc])
                o.dgF = +tsv.lines[i][cDgrpFunc];
            if (tsv.lines[i][cDgrpVal])
                o.dgV = +tsv.lines[i][cDgrpVal];
            if (tsv.lines[i][cDgrpstrpos])
                o.dgP = strings[tsv.lines[i][cDgrpstrpos]];
            if (tsv.lines[i][cDgrpstrneg])
                o.dN = strings[tsv.lines[i][cDgrpstrneg]];
            if (tsv.lines[i][cDgrpstr2])
                o.dg2 = strings[tsv.lines[i][cDgrpstr2]];
            if (tsv.lines[i][cOp])
                o.o = +tsv.lines[i][cOp];
            if (tsv.lines[i][cOpParam])
                o.op = +tsv.lines[i][cOpParam];
            if (tsv.lines[i][cOpBase])
                o.ob = tsv.lines[i][cOpBase];
            if (tsv.lines[i][cOpStat1])
                o.os = [tsv.lines[i][cOpStat1]];
            if (tsv.lines[i][cOpStat2])
                o.os[1] = tsv.lines[i][cOpStat2];
            if (tsv.lines[i][cOpStat3])
                o.os[2] = tsv.lines[i][cOpStat3];
            var dmgstatrange = item_property_stat_count[stat];
            if (dmgstatrange) {
                o.np = dmgstatrange.numprops;
                o.dR = strings[dmgstatrange.rangestr];
                o.dE = strings[dmgstatrange.equalstr];
            }
            arr[id] = o;
        }
    }
    return arr;
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./d2/d2s */ "./src/d2/d2s.ts"), exports);
var header_1 = __webpack_require__(/*! ./d2/header */ "./src/d2/header.ts");
Object.defineProperty(exports, "readHeader", { enumerable: true, get: function () { return header_1.readHeader; } });
Object.defineProperty(exports, "readHeaderData", { enumerable: true, get: function () { return header_1.readHeaderData; } });
Object.defineProperty(exports, "writeHeader", { enumerable: true, get: function () { return header_1.writeHeader; } });
Object.defineProperty(exports, "writeHeaderData", { enumerable: true, get: function () { return header_1.writeHeaderData; } });
Object.defineProperty(exports, "fixHeader", { enumerable: true, get: function () { return header_1.fixHeader; } });
var attributes_1 = __webpack_require__(/*! ./d2/attributes */ "./src/d2/attributes.ts");
Object.defineProperty(exports, "readAttributes", { enumerable: true, get: function () { return attributes_1.readAttributes; } });
Object.defineProperty(exports, "writeAttributes", { enumerable: true, get: function () { return attributes_1.writeAttributes; } });
var skills_1 = __webpack_require__(/*! ./d2/skills */ "./src/d2/skills.ts");
Object.defineProperty(exports, "readSkills", { enumerable: true, get: function () { return skills_1.readSkills; } });
Object.defineProperty(exports, "writeSkills", { enumerable: true, get: function () { return skills_1.writeSkills; } });
var attribute_enhancer_1 = __webpack_require__(/*! ./d2/attribute_enhancer */ "./src/d2/attribute_enhancer.ts");
Object.defineProperty(exports, "enhanceAttributes", { enumerable: true, get: function () { return attribute_enhancer_1.enhanceAttributes; } });
Object.defineProperty(exports, "enhanceItems", { enumerable: true, get: function () { return attribute_enhancer_1.enhanceItems; } });
Object.defineProperty(exports, "enhancePlayerAttributes", { enumerable: true, get: function () { return attribute_enhancer_1.enhancePlayerAttributes; } });
var constants_1 = __webpack_require__(/*! ./d2/constants */ "./src/d2/constants.ts");
Object.defineProperty(exports, "getConstantData", { enumerable: true, get: function () { return constants_1.getConstantData; } });
Object.defineProperty(exports, "setConstantData", { enumerable: true, get: function () { return constants_1.setConstantData; } });
__exportStar(__webpack_require__(/*! ./data/parser */ "./src/data/parser.ts"), exports);
exports.types = __importStar(__webpack_require__(/*! ./d2/types */ "./src/d2/types.ts"));


/***/ })

/******/ });
//# sourceMappingURL=d2s.bundle.js.map
var constants_99 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/data/versions/99_constant_data.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/data/versions/99_constant_data.ts":
/*!***********************************************!*\
  !*** ./src/data/versions/99_constant_data.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
exports.constants = { "classes": [{ "n": "Amazon", "c": "ama", "as": "%+d to Amazon Skill Levels", "ts": ["%+d to Bow and Crossbow Skills", "%+d to Passive and Magic Skills", "%+d to Javelin and Spear Skills"], "co": "(Amazon Only)", "s": { "lpl": 8, "mpl": 6, "spl": 4, "lpv": 12, "spv": 4, "mpe": 6 }, "a": { "str": 20, "dex": 25, "int": 15, "vit": 20, "stam": 84, "hpadd": "30" } }, { "n": "Sorceress", "c": "sor", "as": "%+d to Sorceress Skill Levels", "ts": ["%+d to Fire Skills", "%+d to Lightning Skills", "%+d to Cold Skills"], "co": "(Sorceress Only)", "s": { "lpl": 4, "mpl": 8, "spl": 4, "lpv": 8, "spv": 4, "mpe": 8 }, "a": { "str": 10, "dex": 25, "int": 35, "vit": 10, "stam": 74, "hpadd": "30" } }, { "n": "Necromancer", "c": "nec", "as": "%+d to Necromancer Skill Levels", "ts": ["%+d to Curses", "%+d to Poison and Bone Skills", "+%d to Summoning Skills"], "co": "(Necromancer Only)", "s": { "lpl": 6, "mpl": 8, "spl": 4, "lpv": 8, "spv": 4, "mpe": 8 }, "a": { "str": 15, "dex": 25, "int": 25, "vit": 15, "stam": 79, "hpadd": "30" } }, { "n": "Paladin", "c": "pal", "as": "%+d to Paladin Skill Levels", "ts": ["%+d to Combat Skills", "%+d to Offensive Auras", "%+d to Defensive Auras"], "co": "(Paladin Only)", "s": { "lpl": 8, "mpl": 6, "spl": 4, "lpv": 12, "spv": 4, "mpe": 6 }, "a": { "str": 25, "dex": 20, "int": 15, "vit": 25, "stam": 89, "hpadd": "30" } }, { "n": "Barbarian", "c": "bar", "as": "%+d to Barbarian Skill Levels", "ts": ["%+d to Combat Skills", "%+d to Masteries", "%+d to Warcries"], "co": "(Barbarian Only)", "s": { "lpl": 8, "mpl": 4, "spl": 4, "lpv": 16, "spv": 4, "mpe": 4 }, "a": { "str": 30, "dex": 20, "int": 10, "vit": 25, "stam": 92, "hpadd": "30" } }, { "n": "Druid", "c": "dru", "as": "%+d to Druid Skill Levels", "ts": ["%+d to Summoning Skills", "%+d to Shape Shifting Skills", "%+d to Elemental Skills"], "co": "(Druid Only)", "s": { "lpl": 6, "mpl": 8, "spl": 4, "lpv": 8, "spv": 4, "mpe": 8 }, "a": { "str": 15, "dex": 20, "int": 20, "vit": 25, "stam": 84, "hpadd": "30" } }, { "n": "Assassin", "c": "ass", "as": "%+d to Assassin Skill Levels", "ts": ["%+d to Traps", "%+d to Shadow Disciplines", "%+d to Martial Arts"], "co": "(Assassin Only)", "s": { "lpl": 8, "mpl": 6, "spl": 5, "lpv": 12, "spv": 5, "mpe": 7 }, "a": { "str": 20, "dex": 20, "int": 25, "vit": 20, "stam": 95, "hpadd": "30" } }], "skills": [{ "s": "Attack" }, { "s": "Kick" }, { "s": "Throw" }, { "s": "Unsummon" }, { "s": "Left Hand Throw" }, { "s": "Left Hand Swing" }, { "s": "Magic Arrow", "c": "ama" }, { "s": "Fire Arrow", "c": "ama" }, { "s": "Inner Sight", "c": "ama" }, { "s": "Critical Strike", "c": "ama" }, { "s": "Jab", "c": "ama" }, { "s": "Cold Arrow", "c": "ama" }, { "s": "Multiple Shot", "c": "ama" }, { "s": "Dodge", "c": "ama" }, { "s": "Power Strike", "c": "ama" }, { "s": "Poison Javelin", "c": "ama" }, { "s": "Exploding Arrow", "c": "ama" }, { "s": "Slow Missiles", "c": "ama" }, { "s": "Avoid", "c": "ama" }, { "s": "Impale", "c": "ama" }, { "s": "Lightning Bolt", "c": "ama" }, { "s": "Ice Arrow", "c": "ama" }, { "s": "Guided Arrow", "c": "ama" }, { "s": "Penetrate", "c": "ama" }, { "s": "Charged Strike", "c": "ama" }, { "s": "Plague Javelin", "c": "ama" }, { "s": "Strafe", "c": "ama" }, { "s": "Immolation Arrow", "c": "ama" }, { "s": "Decoy", "c": "ama" }, { "s": "Evade", "c": "ama" }, { "s": "Fend", "c": "ama" }, { "s": "Freezing Arrow", "c": "ama" }, { "s": "Valkyrie", "c": "ama" }, { "s": "Pierce", "c": "ama" }, { "s": "Lightning Strike", "c": "ama" }, { "s": "Lightning Fury", "c": "ama" }, { "s": "Fire Bolt", "c": "sor" }, { "s": "Warmth", "c": "sor" }, { "s": "Charged Bolt", "c": "sor" }, { "s": "Ice Bolt", "c": "sor" }, { "s": "Frozen Armor", "c": "sor" }, { "s": "Inferno", "c": "sor" }, { "s": "Static Field", "c": "sor" }, { "s": "Telekinesis", "c": "sor" }, { "s": "Frost Nova", "c": "sor" }, { "s": "Ice Blast", "c": "sor" }, { "s": "Blaze", "c": "sor" }, { "s": "Fire Ball", "c": "sor" }, { "s": "Nova", "c": "sor" }, { "s": "Lightning", "c": "sor" }, { "s": "Shiver Armor", "c": "sor" }, { "s": "Fire Wall", "c": "sor" }, { "s": "Enchant", "c": "sor" }, { "s": "Chain Lightning", "c": "sor" }, { "s": "Teleport", "c": "sor" }, { "s": "Glacial Spike", "c": "sor" }, { "s": "Meteor", "c": "sor" }, { "s": "Thunder Storm", "c": "sor" }, { "s": "Energy Shield", "c": "sor" }, { "s": "Blizzard", "c": "sor" }, { "s": "Chilling Armor", "c": "sor" }, { "s": "Fire Mastery", "c": "sor" }, { "s": "Hydra", "c": "sor" }, { "s": "Lightning Mastery", "c": "sor" }, { "s": "Frozen Orb", "c": "sor" }, { "s": "Cold Mastery", "c": "sor" }, { "s": "Amplify Damage", "c": "nec" }, { "s": "Teeth", "c": "nec" }, { "s": "Bone Armor", "c": "nec" }, { "s": "Skeleton Mastery", "c": "nec" }, { "s": "Raise Skeleton", "c": "nec" }, { "s": "Dim Vision", "c": "nec" }, { "s": "Weaken", "c": "nec" }, { "s": "Poison Dagger", "c": "nec" }, { "s": "Corpse Explosion", "c": "nec" }, { "s": "Clay Golem", "c": "nec" }, { "s": "Iron Maiden", "c": "nec" }, { "s": "Terror", "c": "nec" }, { "s": "Bone Wall", "c": "nec" }, { "s": "Golem Mastery", "c": "nec" }, { "s": "Raise Skeletal Mage", "c": "nec" }, { "s": "Confuse", "c": "nec" }, { "s": "Life Tap", "c": "nec" }, { "s": "Poison Explosion", "c": "nec" }, { "s": "Bone Spear", "c": "nec" }, { "s": "Blood Golem", "c": "nec" }, { "s": "Attract", "c": "nec" }, { "s": "Decrepify", "c": "nec" }, { "s": "Bone Prison", "c": "nec" }, { "s": "Summon Resist", "c": "nec" }, { "s": "Iron Golem", "c": "nec" }, { "s": "Lower Resist", "c": "nec" }, { "s": "Poison Nova", "c": "nec" }, { "s": "Bone Spirit", "c": "nec" }, { "s": "Fire Golem", "c": "nec" }, { "s": "Revive", "c": "nec" }, { "s": "Sacrifice", "c": "pal" }, { "s": "Smite", "c": "pal" }, { "s": "Might", "c": "pal" }, { "s": "Prayer", "c": "pal" }, { "s": "Resist Fire", "c": "pal" }, { "s": "Holy Bolt", "c": "pal" }, { "s": "Holy Fire", "c": "pal" }, { "s": "Thorns", "c": "pal" }, { "s": "Defiance", "c": "pal" }, { "s": "Resist Cold", "c": "pal" }, { "s": "Zeal", "c": "pal" }, { "s": "Charge", "c": "pal" }, { "s": "Blessed Aim", "c": "pal" }, { "s": "Cleansing", "c": "pal" }, { "s": "Resist Lightning", "c": "pal" }, { "s": "Vengeance", "c": "pal" }, { "s": "Blessed Hammer", "c": "pal" }, { "s": "Concentration", "c": "pal" }, { "s": "Holy Freeze", "c": "pal" }, { "s": "Vigor", "c": "pal" }, { "s": "Conversion", "c": "pal" }, { "s": "Holy Shield", "c": "pal" }, { "s": "Holy Shock", "c": "pal" }, { "s": "Sanctuary", "c": "pal" }, { "s": "Meditation", "c": "pal" }, { "s": "Fist of the Heavens", "c": "pal" }, { "s": "Fanaticism", "c": "pal" }, { "s": "Conviction", "c": "pal" }, { "s": "Redemption", "c": "pal" }, { "s": "Salvation", "c": "pal" }, { "s": "Bash", "c": "bar" }, { "s": "Blade Mastery", "c": "bar" }, { "s": "Axe Mastery", "c": "bar" }, { "s": "Mace Mastery", "c": "bar" }, { "s": "Howl", "c": "bar" }, { "s": "Find Potion", "c": "bar" }, { "s": "Leap", "c": "bar" }, { "s": "Double Swing", "c": "bar" }, { "s": "Polearm Mastery", "c": "bar" }, { "s": "Throwing Mastery", "c": "bar" }, { "s": "Spear Mastery", "c": "bar" }, { "s": "Taunt", "c": "bar" }, { "s": "Shout", "c": "bar" }, { "s": "Stun", "c": "bar" }, { "s": "Double Throw", "c": "bar" }, { "s": "Increased Stamina", "c": "bar" }, { "s": "Find Item", "c": "bar" }, { "s": "Leap Attack", "c": "bar" }, { "s": "Concentrate", "c": "bar" }, { "s": "Iron Skin", "c": "bar" }, { "s": "Battle Cry", "c": "bar" }, { "s": "Frenzy", "c": "bar" }, { "s": "Increased Speed", "c": "bar" }, { "s": "Battle Orders", "c": "bar" }, { "s": "Grim Ward", "c": "bar" }, { "s": "Whirlwind", "c": "bar" }, { "s": "Berserk", "c": "bar" }, { "s": "Natural Resistance", "c": "bar" }, { "s": "War Cry", "c": "bar" }, { "s": "Battle Command", "c": "bar" }, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, { "s": "Firestorm" }, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, { "s": "Scroll of Identify" }, { "s": "Tome of Identify" }, { "s": "Scroll of Town Portal" }, { "s": "Tome of Town Portal" }, { "s": "Raven", "c": "dru" }, { "s": "Poison Creeper", "c": "dru" }, { "s": "Werewolf", "c": "dru" }, { "s": "Lycanthropy", "c": "dru" }, { "s": "Firestorm", "c": "dru" }, { "s": "Oak Sage", "c": "dru" }, { "s": "Summon Spirit Wolf", "c": "dru" }, { "s": "Werebear", "c": "dru" }, { "s": "Molten Boulder", "c": "dru" }, { "s": "Arctic Blast", "c": "dru" }, { "s": "Carrion Vine", "c": "dru" }, { "s": "Feral Rage", "c": "dru" }, { "s": "Maul", "c": "dru" }, { "s": "Fissure", "c": "dru" }, { "s": "Cyclone Armor", "c": "dru" }, { "s": "Heart of Wolverine", "c": "dru" }, { "s": "Summon Dire Wolf", "c": "dru" }, { "s": "Rabies", "c": "dru" }, { "s": "Fire Claws", "c": "dru" }, { "s": "Twister", "c": "dru" }, { "s": "Solar Creeper", "c": "dru" }, { "s": "Hunger", "c": "dru" }, { "s": "Shock Wave", "c": "dru" }, { "s": "Volcano", "c": "dru" }, { "s": "Tornado", "c": "dru" }, { "s": "Spirit of Barbs", "c": "dru" }, { "s": "Summon Grizzly", "c": "dru" }, { "s": "Fury", "c": "dru" }, { "s": "Armageddon", "c": "dru" }, { "s": "Hurricane", "c": "dru" }, { "s": "Fire Blast", "c": "ass" }, { "s": "Claw Mastery", "c": "ass" }, { "s": "Psychic Hammer", "c": "ass" }, { "s": "Tiger Strike", "c": "ass" }, { "s": "Dragon Talon", "c": "ass" }, { "s": "Shock Web", "c": "ass" }, { "s": "Blade Sentinel", "c": "ass" }, { "s": "Burst of Speed", "c": "ass" }, { "s": "Fists of Fire", "c": "ass" }, { "s": "Dragon Claw", "c": "ass" }, { "s": "Charged Bolt Sentry", "c": "ass" }, { "s": "Wake of Fire", "c": "ass" }, { "s": "Weapon Block", "c": "ass" }, { "s": "Cloak of Shadows", "c": "ass" }, { "s": "Cobra Strike", "c": "ass" }, { "s": "Blade Fury", "c": "ass" }, { "s": "Fade", "c": "ass" }, { "s": "Shadow Warrior", "c": "ass" }, { "s": "Claws of Thunder", "c": "ass" }, { "s": "Dragon Tail", "c": "ass" }, { "s": "Lightning Sentry", "c": "ass" }, { "s": "Wake of Inferno", "c": "ass" }, { "s": "Mind Blast", "c": "ass" }, { "s": "Blades of Ice", "c": "ass" }, { "s": "Dragon Flight", "c": "ass" }, { "s": "Death Sentry", "c": "ass" }, { "s": "Blade Shield", "c": "ass" }, { "s": "Venom", "c": "ass" }, { "s": "Shadow Master", "c": "ass" }, { "s": "Phoenix Strike", "c": "ass" }, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, { "s": "Delirium" }, null, null, null, null, null, null, {}, {}, { "s": "Scroll of Town Portal" }, {}, {}, {}, {}, {}, null, null, null, null, null, {}], "rare_names": [null, { "n": "Bite" }, { "n": "Scratch" }, { "n": "Scalpel" }, { "n": "Fang" }, { "n": "Gutter" }, { "n": "Thirst" }, { "n": "Razor" }, { "n": "Scythe" }, { "n": "Edge" }, { "n": "Saw" }, { "n": "Splitter" }, { "n": "Cleaver" }, { "n": "Sever" }, { "n": "Sunder" }, { "n": "Rend" }, { "n": "Mangler" }, { "n": "Slayer" }, { "n": "Reaver" }, { "n": "Spawn" }, { "n": "Gnash" }, { "n": "Star" }, { "n": "Blow" }, { "n": "Smasher" }, { "n": "Bane" }, {}, { "n": "Breaker" }, { "n": "Grinder" }, { "n": "Crack" }, { "n": "Mallet" }, { "n": "Knell" }, { "n": "Lance" }, { "n": "Spike" }, { "n": "Impaler" }, { "n": "Skewer" }, { "n": "Prod" }, { "n": "Scourge" }, { "n": "Wand" }, { "n": "Wrack" }, { "n": "Barb" }, { "n": "Needle" }, { "n": "Dart" }, { "n": "Bolt" }, { "n": "Quarrel" }, { "n": "Fletch" }, { "n": "Flight" }, { "n": "Nock" }, { "n": "Horn" }, { "n": "Stinger" }, { "n": "Quill" }, { "n": "Goad" }, { "n": "Branch" }, { "n": "Spire" }, { "n": "Song" }, { "n": "Call" }, { "n": "Cry" }, { "n": "Spell" }, { "n": "Chant" }, { "n": "Weaver" }, { "n": "Gnarl" }, { "n": "Visage" }, { "n": "Crest" }, { "n": "Circlet" }, { "n": "Veil" }, { "n": "Hood" }, { "n": "Mask" }, { "n": "Brow" }, { "n": "Casque" }, { "n": "Visor" }, { "n": "Cowl" }, { "n": "Hide" }, { "n": "Pelt" }, { "n": "Carapace" }, { "n": "Coat" }, { "n": "Wrap" }, { "n": "Suit" }, { "n": "Cloak" }, { "n": "Shroud" }, { "n": "Jack" }, { "n": "Mantle" }, { "n": "Guard" }, { "n": "Badge" }, { "n": "Rock" }, { "n": "Aegis" }, { "n": "Ward" }, { "n": "Tower" }, { "n": "Shield" }, { "n": "Wing" }, { "n": "Mark" }, { "n": "Emblem" }, { "n": "Hand" }, { "n": "Fist" }, { "n": "Claw" }, { "n": "Clutches" }, { "n": "Grip" }, { "n": "Grasp" }, { "n": "Hold" }, { "n": "Touch" }, { "n": "Finger" }, { "n": "Knuckle" }, { "n": "Shank" }, { "n": "Spur" }, { "n": "Tread" }, { "n": "Stalker" }, { "n": "Greaves" }, { "n": "Blazer" }, { "n": "Nails" }, { "n": "Trample" }, { "n": "Brogues" }, { "n": "Track" }, { "n": "Slippers" }, { "n": "Clasp" }, { "n": "Buckle" }, { "n": "Harness" }, { "n": "Lock" }, { "n": "Fringe" }, { "n": "Winding" }, { "n": "Chain" }, {}, { "n": "Lash" }, { "n": "Cord" }, { "n": "Knot" }, { "n": "Circle" }, { "n": "Loop" }, { "n": "Eye" }, { "n": "Turn" }, { "n": "Spiral" }, { "n": "Coil" }, { "n": "Gyre" }, { "n": "Band" }, { "n": "Whorl" }, { "n": "Talisman" }, { "n": "Heart" }, { "n": "Noose" }, { "n": "Necklace" }, { "n": "Collar" }, { "n": "Beads" }, { "n": "Torc" }, { "n": "Gorget" }, {}, { "n": "Wood" }, { "n": "Brand" }, { "n": "Bludgeon" }, { "n": "Cudgel" }, { "n": "Loom" }, { "n": "Harp" }, { "n": "Master" }, { "n": "Bar" }, { "n": "Hew" }, { "n": "Crook" }, { "n": "Mar" }, { "n": "Shell" }, { "n": "Stake" }, { "n": "Picket" }, { "n": "Pale" }, { "n": "Flange" }, { "n": "Beast" }, { "n": "Eagle" }, { "n": "Raven" }, { "n": "Viper" }, {}, { "n": "Skull" }, { "n": "Blood" }, { "n": "Dread" }, { "n": "Doom" }, { "n": "Grim" }, { "n": "Bone" }, { "n": "Death" }, { "n": "Shadow" }, { "n": "Storm" }, { "n": "Rune" }, { "n": "Plague" }, { "n": "Stone" }, {}, { "n": "Spirit" }, { "n": "Storm" }, { "n": "Demon" }, { "n": "Cruel" }, { "n": "Empyrian" }, { "n": "Bramble" }, { "n": "Pain" }, { "n": "Loath" }, { "n": "Glyph" }, { "n": "Imp" }, {}, { "n": "Hailstone" }, { "n": "Gale" }, { "n": "Dire" }, { "n": "Soul" }, { "n": "Brimstone" }, { "n": "Corpse" }, { "n": "Carrion" }, { "n": "Armageddon" }, { "n": "Havoc" }, { "n": "Bitter" }, { "n": "Entropy" }, { "n": "Chaos" }, { "n": "Order" }, { "n": "Rule" }, { "n": "Warp" }, { "n": "Rift" }, { "n": "Corruption" }], "magic_prefixes": [null, {}, { "n": "Sturdy" }, { "n": "Strong" }, { "n": "Glorious" }, { "n": "Blessed" }, { "n": "Saintly", "tc": "dgld" }, { "n": "Holy", "tc": "dgld" }, { "n": "Devious", "tc": "dblu" }, { "n": "Fortified", "tc": "dblu" }, {}, {}, {}, { "n": "Jagged" }, { "n": "Deadly" }, { "n": "Vicious" }, { "n": "Brutal" }, { "n": "Massive", "tc": "dgld" }, { "n": "Savage", "tc": "dgld" }, { "n": "Merciless", "tc": "dgld" }, { "n": "Vulpine", "tc": "cblu" }, {}, {}, {}, {}, { "n": "Tireless" }, { "n": "Rugged" }, { "n": "Bronze" }, { "n": "Iron" }, { "n": "Steel" }, { "n": "Silver" }, {}, { "n": "Gold", "tc": "lgld" }, { "n": "Platinum", "tc": "lgld" }, { "n": "Meteoric", "tc": "lgld" }, { "n": "Sharp" }, { "n": "Fine" }, { "n": "Warrior's" }, { "n": "Soldier's" }, { "n": "Knight's", "tc": "dgld" }, { "n": "Lord's", "tc": "dgld" }, { "n": "King's", "tc": "dgld" }, { "n": "Howling", "tc": "oran" }, { "n": "Fortuitous" }, {}, {}, {}, {}, {}, { "n": "Glimmering" }, { "n": "Glowing", "tc": "lyel" }, {}, {}, { "n": "Lizard's" }, {}, { "n": "Snake's" }, { "n": "Serpent's" }, { "n": "Serpent's" }, { "n": "Drake's", "tc": "cblu" }, { "n": "Dragon's", "tc": "cblu" }, { "n": "Dragon's", "tc": "cblu" }, { "n": "Wyrm's", "tc": "cblu" }, {}, {}, { "n": "Prismatic", "tc": "lpur" }, { "n": "Prismatic", "tc": "lpur" }, { "n": "Azure" }, { "n": "Lapis" }, { "n": "Lapis" }, { "n": "Cobalt" }, { "n": "Cobalt" }, {}, { "n": "Sapphire", "tc": "lblu" }, {}, {}, { "n": "Crimson" }, { "n": "Burgundy" }, { "n": "Burgundy" }, { "n": "Garnet" }, { "n": "Garnet" }, {}, { "n": "Ruby", "tc": "lred" }, {}, {}, { "n": "Ocher" }, { "n": "Tangerine" }, { "n": "Tangerine" }, { "n": "Coral" }, { "n": "Coral" }, {}, { "n": "Amber", "tc": "lyel" }, {}, {}, { "n": "Beryl" }, { "n": "Jade" }, { "n": "Jade" }, { "n": "Viridian" }, { "n": "Viridian" }, {}, { "n": "Emerald", "tc": "lgrn" }, {}, { "n": "Fletcher's" }, { "n": "Archer's", "tc": "cgrn" }, { "n": "Archer's", "tc": "cgrn" }, { "n": "Monk's" }, { "n": "Priest's", "tc": "cgrn" }, { "n": "Priest's", "tc": "cgrn" }, { "n": "Summoner's" }, { "n": "Necromancer's", "tc": "cgrn" }, { "n": "Necromancer's", "tc": "cgrn" }, { "n": "Angel's" }, { "n": "Arch-Angel's", "tc": "cgrn" }, { "n": "Arch-Angel's", "tc": "cgrn" }, { "n": "Slayer's" }, { "n": "Berserker's", "tc": "cgrn" }, { "n": "Berserker's", "tc": "cgrn" }, {}, {}, { "n": "Triumphant" }, { "n": "Stout" }, { "n": "Stout" }, { "n": "Stout" }, { "n": "Burly" }, { "n": "Burly" }, { "n": "Burly" }, { "n": "Stalwart" }, { "n": "Stalwart" }, { "n": "Stalwart" }, { "n": "Stout" }, { "n": "Stout" }, { "n": "Stout" }, { "n": "Burly" }, { "n": "Burly" }, { "n": "Stalwart" }, { "n": "Stalwart" }, { "n": "Stout" }, { "n": "Stout" }, { "n": "Burly" }, { "n": "Stalwart" }, { "n": "Blanched", "tc": "whit" }, { "n": "Eburine", "tc": "whit" }, { "n": "Bone", "tc": "whit" }, { "n": "Ivory", "tc": "whit" }, { "n": "Sturdy" }, { "n": "Sturdy" }, { "n": "Strong" }, { "n": "Glorious" }, { "n": "Blessed" }, { "n": "Saintly", "tc": "dgld" }, { "n": "Holy", "tc": "dgld" }, { "n": "Godly", "tc": "dgld" }, { "n": "Devious" }, { "n": "Void" }, { "n": "Null", "tc": "dblu" }, { "n": "Antimagic", "tc": "dblu" }, { "n": "Red" }, { "n": "Red" }, { "n": "Sanguinary" }, { "n": "Sanguinary" }, { "n": "Bloody" }, { "n": "Red", "tc": "dred" }, { "n": "Sanguinary", "tc": "dred" }, { "n": "Bloody", "tc": "dred" }, { "n": "Red", "tc": "dred" }, { "n": "Sanguinary", "tc": "dred" }, { "n": "Bloody", "tc": "dred" }, { "n": "Scarlet", "tc": "dred" }, { "n": "Crimson", "tc": "dred" }, { "n": "Jagged" }, { "n": "Jagged" }, { "n": "Jagged" }, { "n": "Forked" }, { "n": "Forked" }, { "n": "Serrated" }, { "n": "Serrated" }, { "n": "Jagged", "tc": "blac" }, { "n": "Jagged", "tc": "blac" }, { "n": "Forked", "tc": "blac" }, { "n": "Forked", "tc": "blac" }, { "n": "Serrated", "tc": "blac" }, { "n": "Jagged", "tc": "blac" }, { "n": "Forked", "tc": "blac" }, { "n": "Serrated", "tc": "blac" }, { "n": "Carbuncle", "tc": "dred" }, { "n": "Carmine", "tc": "dred" }, { "n": "Vermilion", "tc": "dred" }, { "n": "Jagged" }, { "n": "Deadly" }, { "n": "Vicious" }, { "n": "Brutal" }, { "n": "Massive", "tc": "dgld" }, { "n": "Savage", "tc": "dgld" }, { "n": "Merciless", "tc": "dgld" }, { "n": "Ferocious", "tc": "blac" }, { "n": "Cruel", "tc": "blac" }, { "n": "Cinnabar", "tc": "dred" }, { "n": "Rusty", "tc": "dred" }, { "n": "Realgar", "tc": "dred" }, { "n": "Ruby", "tc": "dred" }, { "n": "Vulpine", "tc": "cblu" }, { "n": "Dun" }, { "n": "Tireless" }, { "n": "Tireless" }, { "n": "Brown" }, { "n": "Rugged" }, { "n": "Rugged" }, { "n": "Rugged" }, { "n": "Rugged" }, { "n": "Rugged" }, { "n": "Rugged" }, { "n": "Rugged" }, { "n": "Rugged" }, { "n": "Rugged" }, { "n": "Rugged" }, { "n": "Rugged" }, { "n": "Vigorous" }, { "n": "Chestnut" }, { "n": "Maroon" }, { "n": "Bronze" }, { "n": "Bronze" }, { "n": "Bronze" }, { "n": "Iron" }, { "n": "Iron" }, { "n": "Iron" }, { "n": "Steel" }, { "n": "Steel" }, { "n": "Steel" }, { "n": "Bronze" }, { "n": "Bronze" }, { "n": "Bronze" }, { "n": "Iron" }, { "n": "Iron" }, { "n": "Steel" }, { "n": "Steel" }, { "n": "Bronze" }, { "n": "Bronze" }, { "n": "Iron" }, { "n": "Steel" }, { "n": "Bronze" }, { "n": "Iron" }, { "n": "Steel" }, { "n": "Silver" }, { "n": "Gold", "tc": "lgld" }, { "n": "Platinum", "tc": "lgld" }, { "n": "Meteoric", "tc": "lgld" }, { "n": "Strange", "tc": "lgld" }, { "n": "Weird", "tc": "lgld" }, { "n": "Nickel" }, { "n": "Tin" }, { "n": "Silver" }, { "n": "Argent" }, { "n": "Fine" }, { "n": "Fine" }, { "n": "Sharp" }, { "n": "Fine" }, { "n": "Sharp" }, { "n": "Fine" }, { "n": "Sharp" }, { "n": "Fine" }, { "n": "Warrior's" }, { "n": "Soldier's" }, { "n": "Knight's", "tc": "dgld" }, { "n": "Lord's", "tc": "dgld" }, { "n": "King's", "tc": "dgld" }, { "n": "Master's", "tc": "dgld" }, { "n": "Grandmaster's", "tc": "dgld" }, { "n": "Glimmering" }, { "n": "Glowing", "tc": "lyel" }, { "n": "Bright" }, { "n": "Screaming", "tc": "oran" }, { "n": "Howling", "tc": "oran" }, { "n": "Wailing", "tc": "oran" }, { "n": "Screaming", "tc": "oran" }, { "n": "Howling", "tc": "oran" }, { "n": "Wailing", "tc": "oran" }, { "n": "Lucky" }, { "n": "Lucky" }, { "n": "Lucky" }, { "n": "Lucky" }, { "n": "Lucky" }, { "n": "Lucky" }, { "n": "Felicitous" }, { "n": "Fortuitous" }, { "n": "Emerald" }, { "n": "Lizard's" }, { "n": "Lizard's" }, { "n": "Lizard's" }, { "n": "Snake's" }, { "n": "Snake's" }, { "n": "Snake's" }, { "n": "Serpent's" }, { "n": "Serpent's" }, { "n": "Serpent's" }, { "n": "Lizard's" }, { "n": "Lizard's" }, { "n": "Lizard's" }, { "n": "Snake's" }, { "n": "Snake's" }, { "n": "Serpent's" }, { "n": "Serpent's" }, { "n": "Lizard's" }, { "n": "Lizard's" }, { "n": "Snake's" }, { "n": "Serpent's" }, { "n": "Lizard's" }, { "n": "Snake's" }, { "n": "Serpent's" }, { "n": "Serpent's" }, { "n": "Drake's", "tc": "cblu" }, { "n": "Dragon's", "tc": "cblu" }, { "n": "Dragon's", "tc": "cblu" }, { "n": "Wyrm's", "tc": "cblu" }, { "n": "Great Wyrm's", "tc": "cblu" }, { "n": "Bahamut's", "tc": "cblu" }, { "n": "Zircon", "tc": "cblu" }, { "n": "Jacinth", "tc": "cblu" }, { "n": "Turquoise", "tc": "cblu" }, { "n": "Shimmering" }, { "n": "Shimmering" }, { "n": "Shimmering" }, { "n": "Shimmering", "tc": "lpur" }, { "n": "Shimmering", "tc": "lpur" }, { "n": "Shimmering", "tc": "lpur" }, { "n": "Shimmering", "tc": "lpur" }, { "n": "Rainbow", "tc": "lpur" }, { "n": "Scintillating", "tc": "lpur" }, { "n": "Prismatic", "tc": "lpur" }, { "n": "Chromatic", "tc": "lpur" }, { "n": "Shimmering", "tc": "lpur" }, { "n": "Rainbow", "tc": "lpur" }, { "n": "Scintillating", "tc": "lpur" }, { "n": "Prismatic", "tc": "lpur" }, { "n": "Chromatic", "tc": "lpur" }, { "n": "Shimmering", "tc": "lpur" }, { "n": "Rainbow", "tc": "lpur" }, { "n": "Scintillating", "tc": "lpur" }, { "n": "Shimmering", "tc": "lpur" }, { "n": "Scintillating", "tc": "lpur" }, { "n": "Azure" }, { "n": "Lapis" }, { "n": "Cobalt" }, { "n": "Sapphire" }, { "n": "Azure" }, { "n": "Lapis" }, { "n": "Cobalt", "tc": "lblu" }, { "n": "Sapphire", "tc": "lblu" }, { "n": "Azure" }, { "n": "Lapis" }, { "n": "Cobalt", "tc": "lblu" }, { "n": "Sapphire", "tc": "lblu" }, { "n": "Azure" }, { "n": "Lapis" }, { "n": "Lapis" }, { "n": "Cobalt" }, { "n": "Cobalt" }, { "n": "Sapphire", "tc": "lblu" }, { "n": "Lapis Lazuli", "tc": "lblu" }, { "n": "Sapphire", "tc": "lblu" }, { "n": "Crimson" }, { "n": "Russet" }, { "n": "Garnet" }, { "n": "Ruby" }, { "n": "Crimson" }, { "n": "Russet" }, { "n": "Garnet", "tc": "lred" }, { "n": "Ruby", "tc": "lred" }, { "n": "Crimson" }, { "n": "Russet", "tc": "lred" }, { "n": "Garnet", "tc": "lred" }, { "n": "Ruby" }, { "n": "Russet" }, { "n": "Russet" }, { "n": "Garnet" }, { "n": "Garnet" }, { "n": "Ruby", "tc": "lred" }, { "n": "Garnet", "tc": "lred" }, { "n": "Ruby", "tc": "lred" }, { "n": "Tangerine" }, { "n": "Ocher" }, { "n": "Coral" }, { "n": "Amber" }, { "n": "Tangerine" }, { "n": "Ocher" }, { "n": "Coral", "tc": "lyel" }, { "n": "Amber", "tc": "lyel" }, { "n": "Tangerine" }, { "n": "Ocher" }, { "n": "Coral", "tc": "lyel" }, { "n": "Amber", "tc": "lyel" }, { "n": "Tangerine" }, { "n": "Ocher" }, { "n": "Ocher" }, { "n": "Coral" }, { "n": "Coral" }, { "n": "Amber", "tc": "lyel" }, { "n": "Camphor", "tc": "lyel" }, { "n": "Ambergris", "tc": "lyel" }, { "n": "Beryl" }, { "n": "Viridian" }, { "n": "Jade" }, { "n": "Emerald" }, { "n": "Beryl" }, { "n": "Viridian" }, { "n": "Jade", "tc": "cgrn" }, { "n": "Emerald", "tc": "cgrn" }, { "n": "Beryl" }, { "n": "Viridian" }, { "n": "Jade", "tc": "cgrn" }, { "n": "Emerald", "tc": "cgrn" }, { "n": "Beryl" }, { "n": "Viridian" }, { "n": "Viridian" }, { "n": "Jade" }, { "n": "Jade" }, { "n": "Emerald", "tc": "cgrn" }, { "n": "Beryl", "tc": "cgrn" }, { "n": "Jade", "tc": "cgrn" }, { "n": "Triumphant" }, { "n": "Victorious" }, { "n": "Aureolic" }, { "n": "Mechanic's" }, { "n": "Artisan's" }, { "n": "Jeweler's" }, { "n": "Lunar" }, { "n": "Arcadian" }, { "n": "Unearthly" }, { "n": "Astral" }, { "n": "Elysian", "tc": "dgld" }, { "n": "Celestial", "tc": "dgld" }, { "n": "Diamond" }, { "n": "Fletcher's" }, { "n": "Acrobatic" }, { "n": "Harpoonist's" }, { "n": "Fletcher's" }, { "n": "Bowyer's", "tc": "lgld" }, { "n": "Archer's", "tc": "lgld" }, { "n": "Acrobatic" }, { "n": "Gymnastic", "tc": "lgld" }, { "n": "Athletic", "tc": "lgld" }, { "n": "Harpoonist's" }, { "n": "Spearmaiden's", "tc": "lgld" }, { "n": "Lancer's", "tc": "lgld" }, { "n": "Burning" }, { "n": "Sparking" }, { "n": "Chilling" }, { "n": "Burning" }, { "n": "Blazing", "tc": "lgld" }, { "n": "Volcanic", "tc": "lgld" }, { "n": "Sparking" }, { "n": "Charged", "tc": "lgld" }, { "n": "Powered", "tc": "lgld" }, { "n": "Chilling" }, { "n": "Freezing", "tc": "lgld" }, { "n": "Glacial", "tc": "lgld" }, { "n": "Hexing" }, { "n": "Fungal" }, { "n": "Graverobber's" }, { "n": "Hexing" }, { "n": "Blighting", "tc": "lgld" }, { "n": "Cursing", "tc": "lgld" }, { "n": "Fungal" }, { "n": "Noxious", "tc": "lgld" }, { "n": "Venomous", "tc": "lgld" }, { "n": "Graverobber's" }, { "n": "Mojo", "tc": "lgld" }, { "n": "Golemlord's", "tc": "lgld" }, { "n": "Lion Branded" }, { "n": "Captain's" }, { "n": "Preserver's" }, { "n": "Lion Branded" }, { "n": "Hawk Branded", "tc": "lgld" }, { "n": "Rose Branded", "tc": "lgld" }, { "n": "Captain's" }, { "n": "Commander's", "tc": "lgld" }, { "n": "Marshal's", "tc": "lgld" }, { "n": "Preserver's" }, { "n": "Warden's", "tc": "lgld" }, { "n": "Guardian's", "tc": "lgld" }, { "n": "Expert's" }, { "n": "Fanatic" }, { "n": "Sounding" }, { "n": "Expert's" }, { "n": "Veteran's", "tc": "lgld" }, { "n": "Master's", "tc": "lgld" }, { "n": "Fanatic" }, { "n": "Raging", "tc": "lgld" }, { "n": "Furious", "tc": "lgld" }, { "n": "Sounding" }, { "n": "Resonant", "tc": "lgld" }, { "n": "Echoing", "tc": "lgld" }, { "n": "Trainer's" }, { "n": "Spiritual" }, { "n": "Natural" }, { "n": "Trainer's" }, { "n": "Caretaker's", "tc": "lgld" }, { "n": "Keeper's", "tc": "lgld" }, { "n": "Spiritual" }, { "n": "Feral", "tc": "lgld" }, { "n": "Communal", "tc": "lgld" }, { "n": "Natural" }, { "n": "Terrene", "tc": "lgld" }, { "n": "Gaean", "tc": "lgld" }, { "n": "Entrapping" }, { "n": "Mentalist's" }, { "n": "Shogukusha's" }, { "n": "Entrapping" }, { "n": "Trickster's", "tc": "lgld" }, { "n": "Cunning", "tc": "lgld" }, { "n": "Mentalist's" }, { "n": "Psychic", "tc": "lgld" }, { "n": "Shadow", "tc": "lgld" }, { "n": "Shogukusha's" }, { "n": "Sensei's", "tc": "lgld" }, { "n": "Kenshi's", "tc": "lgld" }, { "n": "Enlightened", "tc": "whit" }, { "n": "Enlightened", "tc": "whit" }, { "n": "Honorable", "tc": "whit" }, { "n": "Honorable", "tc": "whit" }, { "n": "Righteous", "tc": "whit" }, { "n": "Righteous", "tc": "whit" }, { "n": "Faithful", "tc": "whit" }, { "n": "Faithful", "tc": "whit" }, { "n": "Knave's", "tc": "whit" }, { "n": "Jack's", "tc": "whit" }, { "n": "Jester's", "tc": "whit" }, { "n": "Joker's", "tc": "whit" }, { "n": "Fool's", "tc": "whit" }, { "n": "Alarming", "tc": "whit" }, { "n": "Calling", "tc": "whit" }, { "n": "Yelling", "tc": "whit" }, { "n": "Howling", "tc": "whit" }, { "n": "Grinding", "tc": "whit" }, { "n": "Paradox", "tc": "whit" }, { "n": "Paradox", "tc": "whit" }, { "n": "Robineye", "tc": "whit" }, { "n": "Sparroweye", "tc": "whit" }, { "n": "Falconeye", "tc": "whit" }, { "n": "Hawkeye", "tc": "whit" }, { "n": "Eagleeye", "tc": "whit" }, { "n": "Visionary", "tc": "whit" }, { "n": "Mnemonic", "tc": "cblu" }, { "n": "Snowy", "tc": "lblu" }, { "n": "Shivering", "tc": "lblu" }, { "n": "Boreal", "tc": "lblu" }, { "n": "Hibernal", "tc": "lblu" }, { "n": "Fiery", "tc": "dred" }, { "n": "Smoldering", "tc": "dred" }, { "n": "Smoking", "tc": "dred" }, { "n": "Flaming", "tc": "dred" }, { "n": "Condensing", "tc": "dred" }, { "n": "Static", "tc": "lyel" }, { "n": "Glowing", "tc": "lyel" }, { "n": "Buzzing", "tc": "lyel" }, { "n": "Arcing", "tc": "lyel" }, { "n": "Shocking", "tc": "lyel" }, { "n": "Septic", "tc": "dgrn" }, { "n": "Foul", "tc": "dgrn" }, { "n": "Corrosive", "tc": "dgrn" }, { "n": "Toxic", "tc": "dgrn" }, { "n": "Pestilent", "tc": "dgrn" }, { "n": "Maiden's" }, { "n": "Valkyrie's", "tc": "cgrn" }, { "n": "Maiden's" }, { "n": "Valkyrie's", "tc": "cgrn" }, { "n": "Monk's" }, { "n": "Priest's", "tc": "cgrn" }, { "n": "Monk's" }, { "n": "Priest's", "tc": "cgrn" }, { "n": "Monk's" }, { "n": "Priest's", "tc": "cgrn" }, { "n": "Summoner's" }, { "n": "Necromancer's", "tc": "cgrn" }, { "n": "Summoner's" }, { "n": "Necromancer's", "tc": "cgrn" }, { "n": "Angel's" }, { "n": "Arch-Angel's", "tc": "cgrn" }, { "n": "Angel's" }, { "n": "Arch-Angel's", "tc": "cgrn" }, { "n": "Slayer's" }, { "n": "Berserker's", "tc": "cgrn" }, { "n": "Slayer's" }, { "n": "Berserker's", "tc": "cgrn" }, { "n": "Slayer's" }, { "n": "Berserker's", "tc": "cgrn" }, { "n": "Shaman's" }, { "n": "Hierophant's", "tc": "cgrn" }, { "n": "Shaman's" }, { "n": "Hierophant's", "tc": "cgrn" }, { "n": "Magekiller's" }, { "n": "Witch-hunter's", "tc": "cgrn" }, { "n": "Magekiller's" }, { "n": "Witch-hunter's", "tc": "cgrn" }, { "n": "Compact" }, { "n": "Thin" }, { "n": "Dense" }, { "n": "Consecrated" }, { "n": "Pure", "tc": "lgld" }, { "n": "Sacred", "tc": "lgld" }, { "n": "Hallowed", "tc": "lgld" }, { "n": "Divine", "tc": "lgld" }, { "n": "Pearl" }, { "n": "Crimson" }, { "n": "Red" }, { "n": "Sanguinary" }, { "n": "Bloody" }, { "n": "Red", "tc": "dred" }, { "n": "Sanguinary", "tc": "dred" }, { "n": "Red", "tc": "dred" }, { "n": "Jagged" }, { "n": "Forked" }, { "n": "Serrated" }, { "n": "Jagged", "tc": "blac" }, { "n": "Forked", "tc": "blac" }, { "n": "Jagged", "tc": "blac" }, { "n": "Snowy" }, { "n": "Shivering" }, { "n": "Boreal" }, { "n": "Hibernal" }, { "n": "Snowy" }, { "n": "Shivering" }, { "n": "Boreal", "tc": "lblu" }, { "n": "Hibernal", "tc": "lblu" }, { "n": "Snowy" }, { "n": "Shivering" }, { "n": "Boreal", "tc": "lblu" }, { "n": "Hibernal", "tc": "lblu" }, { "n": "Fiery" }, { "n": "Smoldering" }, { "n": "Smoking" }, { "n": "Flaming" }, { "n": "Fiery" }, { "n": "Smoldering" }, { "n": "Smoking", "tc": "lred" }, { "n": "Flaming", "tc": "lred" }, { "n": "Fiery" }, { "n": "Smoldering" }, { "n": "Smoking", "tc": "lred" }, { "n": "Flaming", "tc": "lred" }, { "n": "Static" }, { "n": "Glowing" }, { "n": "Arcing" }, { "n": "Shocking" }, { "n": "Static" }, { "n": "Glowing" }, { "n": "Arcing", "tc": "whit" }, { "n": "Shocking", "tc": "whit" }, { "n": "Static" }, { "n": "Glowing" }, { "n": "Arcing", "tc": "whit" }, { "n": "Shocking", "tc": "whit" }, { "n": "Septic" }, { "n": "Foul" }, { "n": "Toxic" }, { "n": "Pestilent" }, { "n": "Septic" }, { "n": "Foul" }, { "n": "Toxic", "tc": "dgrn" }, { "n": "Pestilent", "tc": "dgrn" }, { "n": "Septic" }, { "n": "Foul" }, { "n": "Toxic", "tc": "dgrn" }, { "n": "Pestilent", "tc": "dgrn" }, { "n": "Tireless" }, { "n": "Lizard's" }, { "n": "Azure" }, { "n": "Crimson" }, { "n": "Tangerine" }, { "n": "Beryl" }, { "n": "Godly", "tc": "dgld" }, { "n": "Cruel", "tc": "blac" }, {}], "magic_suffixes": [null, { "n": "of Health" }, { "n": "of Protection" }, { "n": "of Absorption" }, { "n": "of Life", "tc": "dblu" }, {}, { "n": "of Warding" }, { "n": "of the Sentinel" }, { "n": "of Guarding" }, { "n": "of Negation" }, {}, { "n": "of Piercing" }, { "n": "of Bashing" }, { "n": "of Puncturing" }, { "n": "of Thorns" }, { "n": "of Spikes", "tc": "oran" }, { "n": "of Readiness" }, { "n": "of Alacrity" }, { "n": "of Swiftness" }, { "n": "of Quickness", "tc": "dyel" }, { "n": "of Blocking" }, { "n": "of Deflecting" }, { "n": "of the Apprentice" }, { "n": "of the Magus" }, { "n": "of Frost" }, { "n": "of the Glacier" }, { "n": "of Frost" }, { "n": "of Thawing" }, { "n": "of Flame" }, { "n": "of Fire" }, { "n": "of Burning", "tc": "dred" }, { "n": "of Flame" }, { "n": "of Shock" }, { "n": "of Lightning" }, { "n": "of Thunder", "tc": "dyel" }, { "n": "of Shock" }, { "n": "of Craftmanship" }, { "n": "of Quality" }, { "n": "of Maiming" }, { "n": "of Slaying" }, { "n": "of Gore" }, { "n": "of Carnage", "tc": "blac" }, { "n": "of Slaughter", "tc": "blac" }, { "n": "of Maiming" }, { "n": "of Worth" }, { "n": "of Measure" }, { "n": "of Excellence" }, { "n": "of Performance", "tc": "blac" }, { "n": "of Measure" }, { "n": "of Blight" }, { "n": "of Venom" }, { "n": "of Pestilence", "tc": "dgrn" }, { "n": "of Blight" }, { "n": "of Dexterity" }, { "n": "of Dexterity" }, { "n": "of Skill" }, { "n": "of Skill" }, { "n": "of Accuracy" }, { "n": "of Precision" }, { "n": "of Precision" }, { "n": "of Perfection", "tc": "dgld" }, { "n": "of Balance" }, { "n": "of Stability", "tc": "dyel" }, {}, { "n": "of Regeneration" }, { "n": "of Regeneration" }, { "n": "of Regeneration" }, { "n": "of Regrowth", "tc": "cred" }, { "n": "of Regrowth", "tc": "cred" }, { "n": "of Vileness" }, {}, { "n": "of Greed" }, { "n": "of Wealth", "tc": "lgld" }, { "n": "of Chance" }, { "n": "of Fortune", "tc": "lgld" }, { "n": "of Energy" }, { "n": "of Energy" }, { "n": "of the Mind" }, { "n": "of Brilliance" }, { "n": "of Sorcery", "tc": "dgld" }, { "n": "of Wizardry", "tc": "dgld" }, { "n": "of the Bear" }, { "n": "of Light" }, { "n": "of Radiance" }, { "n": "of the Sun" }, { "n": "of Life" }, { "n": "of the Jackal" }, { "n": "of the Fox" }, { "n": "of the Wolf" }, { "n": "of the Wolf" }, { "n": "of the Tiger" }, { "n": "of the Mammoth", "tc": "cred" }, { "n": "of the Mammoth", "tc": "cred" }, { "n": "of the Colossus", "tc": "cred" }, { "n": "of the Leech" }, { "n": "of the Locust", "tc": "cred" }, { "n": "of the Bat" }, { "n": "of the Vampire", "tc": "cblu" }, { "n": "of Defiance", "tc": "dred" }, { "n": "of Amelioration" }, { "n": "of Remedy" }, {}, { "n": "of Simplicity" }, { "n": "of Ease" }, {}, { "n": "of Strength" }, { "n": "of Might" }, { "n": "of the Ox" }, { "n": "of the Ox" }, { "n": "of the Giant", "tc": "dgld" }, { "n": "of the Giant", "tc": "dgld" }, { "n": "of the Titan", "tc": "dgld" }, { "n": "of Pacing" }, { "n": "of Haste" }, { "n": "of Speed" }, { "n": "of Health" }, { "n": "of Protection" }, { "n": "of Absorption" }, { "n": "of Life", "tc": "dblu" }, { "n": "of Life Everlasting" }, { "n": "of Protection" }, { "n": "of Absorption" }, { "n": "of Life" }, { "n": "of Amicae" }, { "n": "of Warding" }, { "n": "of the Sentinel" }, { "n": "of Guarding" }, { "n": "of Negation" }, { "n": "of the Sentinel" }, { "n": "of Guarding" }, { "n": "of Negation" }, { "n": "of Coolness" }, { "n": "of Inflammability" }, { "n": "of Amianthus" }, { "n": "of Quenching" }, { "n": "of Coolness" }, { "n": "of Inflammability" }, { "n": "of Amianthus" }, { "n": "of Quenching" }, { "n": "of Faith" }, { "n": "of Resistance" }, { "n": "of Insulation" }, { "n": "of Grounding" }, { "n": "of the Dynamo" }, { "n": "of Resistance" }, { "n": "of Insulation" }, { "n": "of Grounding" }, { "n": "of the Dynamo" }, { "n": "of Stoicism" }, { "n": "of Warming" }, { "n": "of Thawing" }, { "n": "of the Dunes" }, { "n": "of the Scirocco" }, { "n": "of Warming" }, { "n": "of Thawing" }, { "n": "of the Dunes" }, { "n": "of the Scirocco" }, { "n": "of Desire" }, { "n": "of Piercing" }, { "n": "of Bashing" }, { "n": "of Puncturing" }, { "n": "of Thorns" }, { "n": "of Spikes", "tc": "oran" }, { "n": "of Razors", "tc": "oran" }, { "n": "of Swords", "tc": "oran" }, { "n": "of Malice" }, { "n": "of Readiness" }, { "n": "of Alacrity" }, { "n": "of Swiftness" }, { "n": "of Quickness", "tc": "dyel" }, { "n": "of Alacrity", "tc": "dyel" }, { "n": "of Fervor" }, { "n": "of Blocking" }, { "n": "of Deflecting" }, { "n": "of the Apprentice" }, { "n": "of the Magus" }, { "n": "of Frost" }, { "n": "of the Icicle" }, { "n": "of the Glacier", "tc": "dblu" }, { "n": "of Winter", "tc": "dblu" }, { "n": "of Frost" }, { "n": "of Frigidity", "tc": "dblu" }, { "n": "of Thawing" }, { "n": "of Flame" }, { "n": "of Fire" }, { "n": "of Burning", "tc": "dred" }, { "n": "of Incineration", "tc": "dred" }, { "n": "of Flame" }, { "n": "of Passion", "tc": "dred" }, { "n": "of Shock" }, { "n": "of Lightning" }, { "n": "of Thunder", "tc": "dyel" }, { "n": "of Storms", "tc": "dyel" }, { "n": "of Shock" }, { "n": "of Ennui", "tc": "dyel" }, { "n": "of Craftmanship" }, { "n": "of Quality" }, { "n": "of Maiming" }, { "n": "of Slaying" }, { "n": "of Gore" }, { "n": "of Carnage", "tc": "blac" }, { "n": "of Slaughter", "tc": "blac" }, { "n": "of Butchery", "tc": "blac" }, { "n": "of Evisceration", "tc": "blac" }, { "n": "of Maiming" }, { "n": "of Craftmanship" }, { "n": "of Craftmanship" }, { "n": "of Craftmanship" }, { "n": "of Quality" }, { "n": "of Quality" }, { "n": "of Maiming" }, { "n": "of Maiming" }, { "n": "of Craftmanship" }, { "n": "of Craftmanship" }, { "n": "of Quality" }, { "n": "of Quality" }, { "n": "of Maiming" }, { "n": "of Craftmanship" }, { "n": "of Quality" }, { "n": "of Maiming" }, { "n": "of Ire" }, { "n": "of Wrath", "tc": "blac" }, { "n": "of Carnage", "tc": "blac" }, { "n": "of Worth" }, { "n": "of Measure" }, { "n": "of Excellence" }, { "n": "of Performance", "tc": "blac" }, { "n": "of Transcendence", "tc": "blac" }, { "n": "of Worth" }, { "n": "of Measure" }, { "n": "of Excellence" }, { "n": "of Performance" }, { "n": "of Joyfulness", "tc": "whit" }, { "n": "of Bliss", "tc": "whit" }, { "n": "of Blight" }, { "n": "of Venom" }, { "n": "of Pestilence", "tc": "dgrn" }, { "n": "of Anthrax", "tc": "dgrn" }, { "n": "of Blight" }, { "n": "of Envy", "tc": "dgrn" }, { "n": "of Dexterity" }, { "n": "of Skill" }, { "n": "of Accuracy" }, { "n": "of Precision" }, { "n": "of Perfection", "tc": "dgld" }, { "n": "of Nirvana", "tc": "dgld" }, { "n": "of Dexterity" }, { "n": "of Skill" }, { "n": "of Accuracy" }, { "n": "of Precision" }, { "n": "of Perfection", "tc": "dgld" }, { "n": "of Dexterity" }, { "n": "of Skill" }, { "n": "of Accuracy" }, { "n": "of Precision", "tc": "dgld" }, { "n": "of Dexterity" }, { "n": "of Dexterity" }, { "n": "of Dexterity" }, { "n": "of Dexterity" }, { "n": "of Dexterity" }, { "n": "of Dexterity" }, { "n": "of Daring" }, { "n": "of Balance" }, { "n": "of Equilibrium" }, { "n": "of Stability", "tc": "dyel" }, { "n": "of Balance" }, { "n": "of Balance" }, { "n": "of Balance", "tc": "dyel" }, { "n": "of Truth" }, { "n": "of Regeneration" }, { "n": "of Regeneration" }, { "n": "of Regeneration" }, { "n": "of Regrowth", "tc": "cred" }, { "n": "of Regrowth", "tc": "cred" }, { "n": "of Revivification", "tc": "cred" }, { "n": "of Honor" }, { "n": "of Vileness" }, { "n": "of Greed" }, { "n": "of Wealth", "tc": "lgld" }, { "n": "of Greed" }, { "n": "of Greed" }, { "n": "of Greed" }, { "n": "of Greed" }, { "n": "of Greed" }, { "n": "of Greed" }, { "n": "of Avarice" }, { "n": "of Chance" }, { "n": "of Fortune", "tc": "lgld" }, { "n": "of Fortune", "tc": "lgld" }, { "n": "of Luck", "tc": "lgld" }, { "n": "of Fortune" }, { "n": "of Good Luck" }, { "n": "of Prosperity" }, { "n": "of Energy" }, { "n": "of the Mind" }, { "n": "of Brilliance" }, { "n": "of Sorcery" }, { "n": "of Wizardry", "tc": "dgld" }, { "n": "of Enlightenment", "tc": "dgld" }, { "n": "of Energy" }, { "n": "of the Mind" }, { "n": "of Brilliance" }, { "n": "of Sorcery" }, { "n": "of Wizardry", "tc": "dgld" }, { "n": "of Energy" }, { "n": "of the Mind" }, { "n": "of Brilliance" }, { "n": "of Sorcery", "tc": "dgld" }, { "n": "of Knowledge" }, { "n": "of the Bear" }, { "n": "of Light" }, { "n": "of Radiance" }, { "n": "of the Sun" }, { "n": "of the Jackal" }, { "n": "of the Fox" }, { "n": "of the Wolf" }, { "n": "of the Tiger" }, { "n": "of the Mammoth", "tc": "cred" }, { "n": "of the Colossus", "tc": "cred" }, { "n": "of the Squid", "tc": "cred" }, { "n": "of the Whale", "tc": "cred" }, { "n": "of the Jackal" }, { "n": "of the Fox" }, { "n": "of the Wolf" }, { "n": "of the Tiger" }, { "n": "of the Mammoth", "tc": "cred" }, { "n": "of the Colossus", "tc": "cred" }, { "n": "of the Jackal" }, { "n": "of the Fox" }, { "n": "of the Wolf" }, { "n": "of the Tiger" }, { "n": "of the Mammoth", "tc": "cred" }, { "n": "of Life" }, { "n": "of Life" }, { "n": "of Life" }, { "n": "of Sustenance" }, { "n": "of Sustenance" }, { "n": "of Sustenance" }, { "n": "of Vita" }, { "n": "of Vita" }, { "n": "of Vita" }, { "n": "of Life" }, { "n": "of Life" }, { "n": "of Sustenance" }, { "n": "of Sustenance" }, { "n": "of Vita" }, { "n": "of Vita" }, { "n": "of Life" }, { "n": "of Sustenance" }, { "n": "of Vita" }, { "n": "of Spirit" }, { "n": "of Hope" }, { "n": "of the Leech" }, { "n": "of the Locust", "tc": "cred" }, { "n": "of the Lamprey", "tc": "cred" }, { "n": "of the Leech" }, { "n": "of the Locust" }, { "n": "of the Lamprey", "tc": "cred" }, { "n": "of the Leech", "tc": "cred" }, { "n": "of the Bat" }, { "n": "of the Wraith", "tc": "cred" }, { "n": "of the Vampire", "tc": "cred" }, { "n": "of the Bat" }, { "n": "of the Wraith" }, { "n": "of the Vampire", "tc": "cred" }, { "n": "of the Bat", "tc": "cred" }, { "n": "of Defiance", "tc": "dred" }, { "n": "of Amelioration" }, { "n": "of Remedy" }, { "n": "of Simplicity" }, { "n": "of Ease" }, { "n": "of Freedom" }, { "n": "of Strength" }, { "n": "of Might" }, { "n": "of the Ox" }, { "n": "of the Giant" }, { "n": "of the Titan", "tc": "dgld" }, { "n": "of Atlas", "tc": "dgld" }, { "n": "of Strength" }, { "n": "of Might" }, { "n": "of the Ox" }, { "n": "of the Giant" }, { "n": "of the Titan", "tc": "dgld" }, { "n": "of Strength" }, { "n": "of Might" }, { "n": "of the Ox" }, { "n": "of the Giant", "tc": "dgld" }, { "n": "of Strength" }, { "n": "of Strength" }, { "n": "of Strength" }, { "n": "of Strength" }, { "n": "of Strength" }, { "n": "of Strength" }, { "n": "of Virility" }, { "n": "of Pacing" }, { "n": "of Haste" }, { "n": "of Speed" }, { "n": "of Transportation" }, { "n": "of Acceleration" }, { "n": "of Inertia" }, { "n": "of Inertia" }, { "n": "of Inertia" }, { "n": "of Self-Repair" }, { "n": "of Restoration" }, { "n": "of Ages" }, { "n": "of Replenishing" }, { "n": "of Propogation" }, { "n": "of the Centaur", "tc": "cred" }, { "n": "of Memory", "tc": "cred" }, { "n": "of the Elephant", "tc": "cred" }, { "n": "of Power", "tc": "dgld" }, { "n": "of Grace", "tc": "dgld" }, { "n": "of Grace and Power", "tc": "dgld" }, { "n": "of the Yeti", "tc": "lblu" }, { "n": "of the Phoenix", "tc": "cred" }, { "n": "of the Efreeti", "tc": "cblu" }, { "n": "of the Cobra", "tc": "dyel" }, { "n": "of the Elements", "tc": "dgld" }, { "n": "of Firebolts" }, { "n": "of Firebolts" }, { "n": "of Firebolts" }, { "n": "of Charged Bolt" }, { "n": "of Charged Bolt" }, { "n": "of Charged Bolt" }, { "n": "of Icebolt", "tc": "lblu" }, { "n": "of Frozen Armor" }, { "n": "of Static Field" }, { "n": "of Telekinesis" }, { "n": "of Frost Shield", "tc": "lblu" }, { "n": "of Ice Blast" }, { "n": "of Blaze" }, { "n": "of Fire Ball" }, { "n": "of Nova", "tc": "cblu" }, { "n": "of Nova", "tc": "cblu" }, { "n": "of Nova Shield", "tc": "cblu" }, { "n": "of Nova Shield", "tc": "cblu" }, { "n": "of Nova Shield", "tc": "cblu" }, { "n": "of Lightning", "tc": "cblu" }, { "n": "of Lightning", "tc": "cblu" }, { "n": "of Shiver Armor" }, { "n": "of Fire Wall" }, { "n": "of Enchant" }, { "n": "of Chain Lightning" }, { "n": "of Chain Lightning" }, { "n": "of Chain Lightning" }, { "n": "of Teleport Shield", "tc": "whit" }, { "n": "of Teleport Shield", "tc": "whit" }, { "n": "of Teleport Shield", "tc": "whit" }, { "n": "of Glacial Spike" }, { "n": "of Meteor" }, { "n": "of Thunder Storm" }, { "n": "of Energy Shield" }, { "n": "of Blizzard" }, { "n": "of Chilling Armor" }, { "n": "of Hydra Shield", "tc": "cred" }, { "n": "of Frozen Orb" }, { "n": "of Dawn" }, { "n": "of Sunlight" }, { "n": "of Magic Arrow" }, { "n": "of Magic Arrow" }, { "n": "of Fire Arrow" }, { "n": "of Fire Arrow" }, { "n": "of Inner Sight" }, { "n": "of Inner Sight" }, { "n": "of Jab" }, { "n": "of Jab" }, { "n": "of Cold Arrow" }, { "n": "of Cold Arrow" }, { "n": "of Multiple Shot" }, { "n": "of Multiple Shot" }, { "n": "of Power Strike" }, { "n": "of Power Strike" }, { "n": "of Poison Jab" }, { "n": "of Poison Jab" }, { "n": "of Exploding Arrow" }, { "n": "of Exploding Arrow" }, { "n": "of Slow Missile" }, { "n": "of Slow Missile" }, { "n": "of Impaling Strike" }, { "n": "of Impaling Strike" }, { "n": "of Lightning Javelin" }, { "n": "of Lightning Javelin" }, { "n": "of Ice Arrow" }, { "n": "of Ice Arrow" }, { "n": "of Guided Arrow" }, { "n": "of Guided Arrow" }, { "n": "of Charged Strike" }, { "n": "of Charged Strike" }, { "n": "of Plague Jab" }, { "n": "of Plague Jab" }, { "n": "of Immolating Arrow" }, { "n": "of Immolating Arrow" }, { "n": "of Fending" }, { "n": "of Fending" }, { "n": "of Freezing Arrow" }, { "n": "of Freezing Arrow" }, { "n": "of Lightning Strike" }, { "n": "of Lightning Strike" }, { "n": "of Lightning Fury" }, { "n": "of Lightning Fury" }, { "n": "of Fire Bolt" }, { "n": "of Fire Bolt" }, { "n": "of Charged Bolt" }, { "n": "of Charged Bolt" }, { "n": "of Ice Bolt" }, { "n": "of Ice Bolt" }, { "n": "of Frozen Armor" }, { "n": "of Frozen Armor" }, { "n": "of Static Field" }, { "n": "of Static Field" }, { "n": "of Telekinesis" }, { "n": "of Telekinesis" }, { "n": "of Frost Nova" }, { "n": "of Frost Nova" }, { "n": "of Ice Blast" }, { "n": "of Ice Blast" }, { "n": "of Blazing" }, { "n": "of Blazing" }, { "n": "of Fire Ball" }, { "n": "of Fire Ball" }, { "n": "of Nova" }, { "n": "of Nova" }, { "n": "of Lightning" }, { "n": "of Lightning" }, { "n": "of Shiver Armor" }, { "n": "of Shiver Armor" }, { "n": "of Fire Wall" }, { "n": "of Fire Wall" }, { "n": "of Enchantment" }, { "n": "of Enchantment" }, { "n": "of Chain Lightning" }, { "n": "of Chain Lightning" }, { "n": "of Teleportation" }, { "n": "of Teleportation" }, { "n": "of Glacial Spike" }, { "n": "of Glacial Spike" }, { "n": "of Meteor" }, { "n": "of Meteor" }, { "n": "of Thunder Storm" }, { "n": "of Thunder Storm" }, { "n": "of Energy Shield" }, { "n": "of Energy Shield" }, { "n": "of Blizzard" }, { "n": "of Blizzard" }, { "n": "of Chilling Armor" }, { "n": "of Chilling Armor" }, { "n": "of Hydra" }, { "n": "of Hydra" }, { "n": "of Frozen Orb" }, { "n": "of Frozen Orb" }, { "n": "of Amplify Damage" }, { "n": "of Amplify Damage" }, { "n": "of Teeth" }, { "n": "of Teeth" }, { "n": "of Bone Armor" }, { "n": "of Bone Armor" }, { "n": "of Raise Skeleton" }, { "n": "of Raise Skeleton" }, { "n": "of Dim Vision" }, { "n": "of Dim Vision" }, { "n": "of Weaken" }, { "n": "of Weaken" }, { "n": "of Poison Dagger" }, { "n": "of Poison Dagger" }, { "n": "of Corpse Explosion" }, { "n": "of Corpse Explosion" }, { "n": "of Clay Golem" }, { "n": "of Clay Golem" }, { "n": "of Iron Maiden" }, { "n": "of Iron Maiden" }, { "n": "of Terror" }, { "n": "of Terror" }, { "n": "of Bone Wall" }, { "n": "of Bone Wall" }, { "n": "of Skeletal Mages" }, { "n": "of Skeletal Mages" }, { "n": "of Confusion" }, { "n": "of Confusion" }, { "n": "of Life Tap" }, { "n": "of Life Tap" }, { "n": "of Poison Explosion" }, { "n": "of Poison Explosion" }, { "n": "of Bone Spear" }, { "n": "of Bone Spear" }, { "n": "of Blood Golem" }, { "n": "of Blood Golem" }, { "n": "of Attract" }, { "n": "of Attract" }, { "n": "of Decrepify" }, { "n": "of Decrepify" }, { "n": "of Bone Prison" }, { "n": "of Bone Prison" }, { "n": "of Iron Golem" }, { "n": "of Iron Golem" }, { "n": "of Lower Resistance" }, { "n": "of Lower Resistance" }, { "n": "of Poison Nova" }, { "n": "of Poison Nova" }, { "n": "of Bone Spirit" }, { "n": "of Bone Spirit" }, { "n": "of Fire Golem" }, { "n": "of Fire Golem" }, { "n": "of Revivification" }, { "n": "of Revivification" }, { "n": "of Sacrifice" }, { "n": "of Sacrifice" }, { "n": "of Holy Bolt" }, { "n": "of Holy Bolt" }, { "n": "of Zeal" }, { "n": "of Zeal" }, { "n": "of Vengeance" }, { "n": "of Vengeance" }, { "n": "of Blessed Hammer" }, { "n": "of Blessed Hammer" }, { "n": "of Conversion" }, { "n": "of Conversion" }, { "n": "of Fist of the Heavens" }, { "n": "of Fist of the Heavens" }, { "n": "of Bashing" }, { "n": "of Bashing" }, { "n": "of Howl" }, { "n": "of Howl" }, { "n": "of Find Potion" }, { "n": "of Find Potion" }, { "n": "of Taunt" }, { "n": "of Taunt" }, { "n": "of Shout" }, { "n": "of Shout" }, { "n": "of Stun" }, { "n": "of Stun" }, { "n": "of Find Item" }, { "n": "of Find Item" }, { "n": "of Concentration" }, { "n": "of Concentration" }, { "n": "of Battle Cry" }, { "n": "of Battle Cry" }, { "n": "of Battle Orders" }, { "n": "of Battle Orders" }, { "n": "of Grim Ward" }, { "n": "of Grim Ward" }, { "n": "of War Cry" }, { "n": "of War Cry" }, { "n": "of Battle Command" }, { "n": "of Battle Command" }, { "n": "of Firestorms" }, { "n": "of Firestorms" }, { "n": "of Molten Boulder" }, { "n": "of Molten Boulder" }, { "n": "of Fissure" }, { "n": "of Fissure" }, { "n": "of Cyclone Armor" }, { "n": "of Cyclone Armor" }, { "n": "of Twister" }, { "n": "of Twister" }, { "n": "of Volcano" }, { "n": "of Volcano" }, { "n": "of Tornado" }, { "n": "of Tornado" }, { "n": "of Armageddon" }, { "n": "of Armageddon" }, { "n": "of Hurricane" }, { "n": "of Hurricane" }, { "n": "of Amplify Damage" }, { "n": "of the Icicle", "tc": "dblu" }, { "n": "of the Glacier", "tc": "dblu" }, { "n": "of Fire", "tc": "dred" }, { "n": "of Burning", "tc": "dred" }, { "n": "of Lightning", "tc": "dyel" }, { "n": "of Thunder", "tc": "dyel" }, { "n": "of Daring" }, { "n": "of Daring" }, { "n": "of Knowledge" }, { "n": "of Knowledge" }, { "n": "of Virility" }, { "n": "of Virility" }, { "n": "of Readiness" }, { "n": "of Craftmanship" }, { "n": "of Quality" }, { "n": "of Maiming" }, { "n": "of Craftmanship" }, { "n": "of Quality" }, { "n": "of Craftmanship" }, { "n": "of Blight" }, { "n": "of Venom" }, { "n": "of Pestilence" }, { "n": "of Anthrax" }, { "n": "of Blight" }, { "n": "of Venom" }, { "n": "of Pestilence", "tc": "dgrn" }, { "n": "of Anthrax", "tc": "dgrn" }, { "n": "of Blight" }, { "n": "of Venom" }, { "n": "of Pestilence", "tc": "dgrn" }, { "n": "of Anthrax", "tc": "dgrn" }, { "n": "of Frost" }, { "n": "of the Icicle" }, { "n": "of the Glacier" }, { "n": "of Winter" }, { "n": "of Frost" }, { "n": "of the Icicle" }, { "n": "of the Glacier", "tc": "dblu" }, { "n": "of Winter", "tc": "dblu" }, { "n": "of Frost" }, { "n": "of the Icicle" }, { "n": "of the Glacier", "tc": "dblu" }, { "n": "of Winter", "tc": "dblu" }, { "n": "of Flame" }, { "n": "of Fire" }, { "n": "of Burning" }, { "n": "of Incineration" }, { "n": "of Flame" }, { "n": "of Fire" }, { "n": "of Burning", "tc": "dred" }, { "n": "of Incineration", "tc": "dred" }, { "n": "of Flame" }, { "n": "of Fire" }, { "n": "of Burning", "tc": "dred" }, { "n": "of Incineration", "tc": "dred" }, { "n": "of Shock" }, { "n": "of Lightning" }, { "n": "of Thunder" }, { "n": "of Storms" }, { "n": "of Shock" }, { "n": "of Lightning" }, { "n": "of Thunder", "tc": "dyel" }, { "n": "of Storms", "tc": "dyel" }, { "n": "of Shock" }, { "n": "of Lightning" }, { "n": "of Thunder", "tc": "dyel" }, { "n": "of Storms", "tc": "dyel" }, { "n": "of Dexterity" }, { "n": "of Dexterity" }, { "n": "of Strength" }, { "n": "of Strength" }, { "n": "of Thorns" }, { "n": "of Frost" }, { "n": "of Flame" }, { "n": "of Blight" }, { "n": "of Shock" }, { "n": "of Regeneration" }, { "n": "of Energy" }, { "n": "of Light" }, { "n": "of the Leech" }, { "n": "of the Locust" }, { "n": "of the Lamprey", "tc": "cred" }, { "n": "of the Bat" }, { "n": "of the Wraith" }, { "n": "of the Vampire", "tc": "cred" }, {}], "properties": { "ac": [{ "s": "armorclass", "f": 1 }], "ac-miss": [{ "s": "armorclass_vs_missile", "f": 1 }], "ac-hth": [{ "s": "armorclass_vs_hth", "f": 1 }], "red-dmg": [{ "s": "normal_damage_reduction", "f": 1 }], "red-dmg%": [{ "s": "damageresist", "f": 1 }], "ac%": [{ "s": "item_armor_percent", "f": 2 }], "red-mag": [{ "s": "magic_damage_reduction", "f": 1 }], "str": [{ "s": "strength", "f": 1 }], "dex": [{ "s": "dexterity", "f": 1 }], "vit": [{ "s": "vitality", "f": 1 }], "enr": [{ "s": "energy", "f": 1 }], "mana": [{ "s": "maxmana", "f": 1 }], "mana%": [{ "s": "item_maxmana_percent", "f": 1 }], "hp": [{ "s": "maxhp", "f": 1 }], "hp%": [{ "s": "item_maxhp_percent", "f": 1 }], "att": [{ "s": "tohit", "f": 1 }], "block": [{ "s": "toblock", "f": 1 }], "cold-min": [{ "s": "coldmindam", "f": 1 }], "cold-max": [{ "s": "coldmaxdam", "f": 1 }], "cold-len": [{ "s": "coldlength", "f": 1 }], "fire-min": [{ "s": "firemindam", "f": 1 }], "fire-max": [{ "s": "firemaxdam", "f": 1 }], "ltng-min": [{ "s": "lightmindam", "f": 1 }], "ltng-max": [{ "s": "lightmaxdam", "f": 1 }], "pois-min": [{ "s": "poisonmindam", "f": 1 }], "pois-max": [{ "s": "poisonmaxdam", "f": 1 }], "pois-len": [{ "s": "poisonlength", "f": 1 }], "dmg-min": [{ "f": 5 }], "dmg-max": [{ "f": 6 }], "dmg%": [{ "f": 7 }], "dmg-to-mana": [{ "s": "item_damagetomana", "f": 1 }], "res-fire": [{ "s": "fireresist", "f": 1 }], "res-fire-max": [{ "s": "maxfireresist", "f": 1 }], "res-ltng": [{ "s": "lightresist", "f": 1 }], "res-ltng-max": [{ "s": "maxlightresist", "f": 1 }], "res-cold": [{ "s": "coldresist", "f": 1 }], "res-cold-max": [{ "s": "maxcoldresist", "f": 1 }], "res-mag": [{ "s": "magicresist", "f": 1 }], "res-mag-max": [{ "s": "maxmagicresist", "f": 1 }], "res-pois": [{ "s": "poisonresist", "f": 1 }], "res-pois-max": [{ "s": "maxpoisonresist", "f": 1 }], "res-all": [{ "s": "fireresist", "f": 1 }, { "s": "lightresist", "f": 3 }, { "s": "coldresist", "f": 3 }, { "s": "poisonresist", "f": 3 }], "res-all-max": [{ "s": "maxfireresist", "f": 1 }, { "s": "maxlightresist", "f": 3 }, { "s": "maxcoldresist", "f": 3 }, { "s": "maxpoisonresist", "f": 3 }], "abs-fire%": [{ "s": "item_absorbfire_percent", "f": 1 }], "abs-fire": [{ "s": "item_absorbfire", "f": 1 }], "abs-ltng%": [{ "s": "item_absorblight_percent", "f": 1 }], "abs-ltng": [{ "s": "item_absorblight", "f": 1 }], "abs-mag%": [{ "s": "item_absorbmagic_percent", "f": 1 }], "abs-mag": [{ "s": "item_absorbmagic", "f": 1 }], "abs-cold%": [{ "s": "item_absorbcold_percent", "f": 1 }], "abs-cold": [{ "s": "item_absorbcold", "f": 1 }], "dur": [{ "s": "maxdurability", "f": 1 }], "dur%": [{ "s": "item_maxdurability_percent", "f": 13 }], "regen": [{ "s": "hpregen", "f": 1 }], "thorns": [{ "s": "item_attackertakesdamage", "f": 1 }], "swing1": [{ "s": "item_fasterattackrate", "f": 8 }], "swing2": [{ "s": "item_fasterattackrate", "f": 8 }], "swing3": [{ "s": "item_fasterattackrate", "f": 8 }], "gold%": [{ "s": "item_goldbonus", "f": 1 }], "mag%": [{ "s": "item_magicbonus", "f": 1 }], "knock": [{ "s": "item_knockback", "f": 1 }], "regen-stam": [{ "s": "staminarecoverybonus", "f": 1 }], "regen-mana": [{ "s": "manarecoverybonus", "f": 1 }], "stam": [{ "s": "maxstamina", "f": 1 }], "time": [{ "s": "item_timeduration", "f": 1 }], "manasteal": [{ "s": "manadrainmindam", "f": 1 }], "lifesteal": [{ "s": "lifedrainmindam", "f": 1 }], "ama": [{ "s": "item_addclassskills", "f": 21 }], "pal": [{ "s": "item_addclassskills", "f": 21 }], "nec": [{ "s": "item_addclassskills", "f": 21 }], "sor": [{ "s": "item_addclassskills", "f": 21 }], "bar": [{ "s": "item_addclassskills", "f": 21 }], "herb": [{ "s": "item_doubleherbduration", "f": 1 }], "light": [{ "s": "item_lightradius", "f": 1 }], "color": [{ "s": "item_lightcolor", "f": 1 }], "ease": [{ "s": "item_req_percent", "f": 1 }], "move1": [{ "s": "item_fastermovevelocity", "f": 8 }], "move2": [{ "s": "item_fastermovevelocity", "f": 8 }], "move3": [{ "s": "item_fastermovevelocity", "f": 8 }], "balance1": [{ "s": "item_fastergethitrate", "f": 8 }], "balance2": [{ "s": "item_fastergethitrate", "f": 8 }], "balance3": [{ "s": "item_fastergethitrate", "f": 8 }], "block1": [{ "s": "item_fasterblockrate", "f": 8 }], "block2": [{ "s": "item_fasterblockrate", "f": 8 }], "block3": [{ "s": "item_fasterblockrate", "f": 8 }], "cast1": [{ "s": "item_fastercastrate", "f": 8 }], "cast2": [{ "s": "item_fastercastrate", "f": 8 }], "cast3": [{ "s": "item_fastercastrate", "f": 8 }], "res-pois-len": [{ "s": "item_poisonlengthresist", "f": 1 }], "dmg": [{ "s": "item_normaldamage", "f": 1 }], "howl": [{ "s": "item_howl", "f": 1 }], "stupidity": [{ "s": "item_stupidity", "f": 1 }], "ignore-ac": [{ "s": "item_ignoretargetac", "f": 1 }], "reduce-ac": [{ "s": "item_fractionaltargetac", "f": 1 }], "noheal": [{ "s": "item_preventheal", "f": 1 }], "half-freeze": [{ "s": "item_halffreezeduration", "f": 1 }], "att%": [{ "s": "item_tohit_percent", "f": 1 }], "dmg-ac": [{ "s": "item_damagetargetac", "f": 1 }], "dmg-demon": [{ "s": "item_demondamage_percent", "f": 1 }], "dmg-undead": [{ "s": "item_undeaddamage_percent", "f": 1 }], "att-demon": [{ "s": "item_demon_tohit", "f": 1 }], "att-undead": [{ "s": "item_undead_tohit", "f": 1 }], "throw": [{ "s": "item_throwable", "f": 1 }], "fireskill": [{ "s": "item_elemskill", "f": 21 }], "allskills": [{ "s": "item_allskills", "f": 1 }], "light-thorns": [{ "s": "item_attackertakeslightdamage", "f": 1 }], "freeze": [{ "s": "item_freeze", "f": 1 }], "openwounds": [{ "s": "item_openwounds", "f": 1 }], "crush": [{ "s": "item_crushingblow", "f": 1 }], "kick": [{ "s": "item_kickdamage", "f": 1 }], "mana-kill": [{ "s": "item_manaafterkill", "f": 1 }], "demon-heal": [{ "s": "item_healafterdemonkill", "f": 1 }], "bloody": [{ "s": "item_extrablood", "f": 1 }], "deadly": [{ "s": "item_deadlystrike", "f": 1 }], "slow": [{ "s": "item_slow", "f": 1 }], "nofreeze": [{ "s": "item_cannotbefrozen", "f": 1 }], "stamdrain": [{ "s": "item_staminadrainpct", "f": 1 }], "reanimate": [{ "s": "item_reanimate", "f": 24 }], "pierce": [{ "s": "item_pierce", "f": 1 }], "magicarrow": [{ "s": "item_magicarrow", "f": 1 }], "explosivearrow": [{ "s": "item_explosivearrow", "f": 1 }], "dru": [{ "s": "item_addclassskills", "f": 21 }], "ass": [{ "s": "item_addclassskills", "f": 21 }], "skill": [{ "s": "item_singleskill", "f": 22 }], "skilltab": [{ "s": "item_addskill_tab", "f": 10 }], "aura": [{ "s": "item_aura", "f": 22 }], "att-skill": [{ "s": "item_skillonattack", "f": 11 }], "hit-skill": [{ "s": "item_skillonhit", "f": 11 }], "gethit-skill": [{ "s": "item_skillongethit", "f": 11 }], "sock": [{ "s": "item_numsockets", "f": 14 }], "dmg-fire": [{ "s": "firemindam", "f": 15 }, { "s": "firemaxdam", "f": 16 }], "dmg-ltng": [{ "s": "lightmindam", "f": 15 }, { "s": "lightmaxdam", "f": 16 }], "dmg-mag": [{ "s": "magicmindam", "f": 15 }, { "s": "magicmaxdam", "f": 16 }], "dmg-cold": [{ "s": "coldmindam", "f": 15 }, { "s": "coldmaxdam", "f": 16 }, { "s": "coldlength", "f": 17 }], "dmg-pois": [{ "s": "poisonmindam", "f": 15 }, { "s": "poisonmaxdam", "f": 16 }, { "s": "poisonlength", "f": 17 }], "dmg-throw": [{ "s": "item_throw_mindamage", "f": 15 }, { "s": "item_throw_maxdamage", "f": 16 }], "dmg-norm": [{ "s": "mindamage", "f": 15 }, { "s": "maxdamage", "f": 16 }], "ac/lvl": [{ "s": "item_armor_perlevel", "f": 17 }], "ac%/lvl": [{ "s": "item_armorpercent_perlevel", "f": 17 }], "hp/lvl": [{ "s": "item_hp_perlevel", "f": 17 }], "mana/lvl": [{ "s": "item_mana_perlevel", "f": 17 }], "dmg/lvl": [{ "s": "item_maxdamage_perlevel", "f": 17 }], "dmg%/lvl": [{ "s": "item_maxdamage_percent_perlevel", "f": 17 }], "str/lvl": [{ "s": "item_strength_perlevel", "f": 17 }], "dex/lvl": [{ "s": "item_dexterity_perlevel", "f": 17 }], "enr/lvl": [{ "s": "item_energy_perlevel", "f": 17 }], "vit/lvl": [{ "s": "item_vitality_perlevel", "f": 17 }], "att/lvl": [{ "s": "item_tohit_perlevel", "f": 17 }], "att%/lvl": [{ "s": "item_tohitpercent_perlevel", "f": 17 }], "dmg-cold/lvl": [{ "s": "item_cold_damagemax_perlevel", "f": 17 }], "dmg-fire/lvl": [{ "s": "item_fire_damagemax_perlevel", "f": 17 }], "dmg-ltng/lvl": [{ "s": "item_ltng_damagemax_perlevel", "f": 17 }], "dmg-pois/lvl": [{ "s": "item_pois_damagemax_perlevel", "f": 17 }], "res-cold/lvl": [{ "s": "item_resist_cold_perlevel", "f": 17 }], "res-fire/lvl": [{ "s": "item_resist_fire_perlevel", "f": 17 }], "res-ltng/lvl": [{ "s": "item_resist_ltng_perlevel", "f": 17 }], "res-pois/lvl": [{ "s": "item_resist_pois_perlevel", "f": 17 }], "abs-cold/lvl": [{ "s": "item_absorb_cold_perlevel", "f": 17 }], "abs-fire/lvl": [{ "s": "item_absorb_fire_perlevel", "f": 17 }], "abs-ltng/lvl": [{ "s": "item_absorb_ltng_perlevel", "f": 17 }], "abs-pois/lvl": [{ "s": "item_absorb_pois_perlevel", "f": 17 }], "thorns/lvl": [{ "s": "item_thorns_perlevel", "f": 17 }], "gold%/lvl": [{ "s": "item_find_gold_perlevel", "f": 17 }], "mag%/lvl": [{ "s": "item_find_magic_perlevel", "f": 17 }], "regen-stam/lvl": [{ "s": "item_regenstamina_perlevel", "f": 17 }], "stam/lvl": [{ "s": "item_stamina_perlevel", "f": 17 }], "dmg-dem/lvl": [{ "s": "item_damage_demon_perlevel", "f": 17 }], "dmg-und/lvl": [{ "s": "item_damage_undead_perlevel", "f": 17 }], "att-dem/lvl": [{ "s": "item_tohit_demon_perlevel", "f": 17 }], "att-und/lvl": [{ "s": "item_tohit_undead_perlevel", "f": 17 }], "crush/lvl": [{ "s": "item_crushingblow_perlevel", "f": 17 }], "wounds/lvl": [{ "s": "item_openwounds_perlevel", "f": 17 }], "kick/lvl": [{ "s": "item_kick_damage_perlevel", "f": 17 }], "deadly/lvl": [{ "s": "item_deadlystrike_perlevel", "f": 17 }], "rep-dur": [{ "s": "item_replenish_durability", "f": 17 }], "rep-quant": [{ "s": "item_replenish_quantity", "f": 17 }], "stack": [{ "s": "item_extra_stack", "f": 1 }], "ac/time": [{ "s": "item_armor_bytime", "f": 18 }], "ac%/time": [{ "s": "item_armorpercent_bytime", "f": 18 }], "hp/time": [{ "s": "item_hp_bytime", "f": 18 }], "mana/time": [{ "s": "item_mana_bytime", "f": 18 }], "dmg/time": [{ "s": "item_maxdamage_bytime", "f": 18 }], "dmg%/time": [{ "s": "item_maxdamage_percent_bytime", "f": 18 }], "str/time": [{ "s": "item_strength_bytime", "f": 18 }], "dex/time": [{ "s": "item_dexterity_bytime", "f": 18 }], "enr/time": [{ "s": "item_energy_bytime", "f": 18 }], "vit/time": [{ "s": "item_vitality_bytime", "f": 18 }], "att/time": [{ "s": "item_tohit_bytime", "f": 18 }], "att%/time": [{ "s": "item_tohitpercent_bytime", "f": 18 }], "dmg-cold/time": [{ "s": "item_cold_damagemax_bytime", "f": 18 }], "dmg-fire/time": [{ "s": "item_fire_damagemax_bytime", "f": 18 }], "dmg-ltng/time": [{ "s": "item_ltng_damagemax_bytime", "f": 18 }], "dmg-pois/time": [{ "s": "item_pois_damagemax_bytime", "f": 18 }], "res-cold/time": [{ "s": "item_resist_cold_bytime", "f": 18 }], "res-fire/time": [{ "s": "item_resist_fire_bytime", "f": 18 }], "res-ltng/time": [{ "s": "item_resist_ltng_bytime", "f": 18 }], "res-pois/time": [{ "s": "item_resist_pois_bytime", "f": 18 }], "abs-cold/time": [{ "s": "item_absorb_cold_bytime", "f": 18 }], "abs-fire/time": [{ "s": "item_absorb_fire_bytime", "f": 18 }], "abs-ltng/time": [{ "s": "item_absorb_ltng_bytime", "f": 18 }], "abs-pois/time": [{ "s": "item_absorb_pois_bytime", "f": 18 }], "gold%/time": [{ "s": "item_find_gold_bytime", "f": 18 }], "mag%/time": [{ "s": "item_find_magic_bytime", "f": 18 }], "regen-stam/time": [{ "s": "item_regenstamina_bytime", "f": 18 }], "stam/time": [{ "s": "item_stamina_bytime", "f": 18 }], "dmg-dem/time": [{ "s": "item_damage_demon_bytime", "f": 18 }], "dmg-und/time": [{ "s": "item_damage_undead_bytime", "f": 18 }], "att-dem/time": [{ "s": "item_tohit_demon_bytime", "f": 18 }], "att-und/time": [{ "s": "item_tohit_undead_bytime", "f": 18 }], "crush/time": [{ "s": "item_crushingblow_bytime", "f": 18 }], "wounds/time": [{ "s": "item_openwounds_bytime", "f": 18 }], "kick/time": [{ "s": "item_kick_damage_bytime", "f": 18 }], "deadly/time": [{ "s": "item_deadlystrike_bytime", "f": 18 }], "pierce-fire": [{ "s": "passive_fire_pierce", "f": 1 }], "pierce-ltng": [{ "s": "passive_ltng_pierce", "f": 1 }], "pierce-cold": [{ "s": "passive_cold_pierce", "f": 1 }], "pierce-pois": [{ "s": "passive_pois_pierce", "f": 1 }], "indestruct": [{ "f": 20 }], "charged": [{ "s": "item_charged_skill", "f": 19 }], "extra-fire": [{ "s": "passive_fire_mastery", "f": 1 }], "extra-ltng": [{ "s": "passive_ltng_mastery", "f": 1 }], "extra-cold": [{ "s": "passive_cold_mastery", "f": 1 }], "extra-pois": [{ "s": "passive_pois_mastery", "f": 1 }], "dmg-elem": [{ "s": "firemindam", "f": 15 }, { "s": "firemaxdam", "f": 16 }, { "s": "lightmindam", "f": 15 }, { "s": "lightmaxdam", "f": 16 }, { "s": "coldmindam", "f": 15 }, { "s": "coldmaxdam", "f": 16 }, { "s": "coldlength", "f": 17 }], "dmg-elem-min": [{ "s": "firemindam", "f": 1 }, { "s": "lightmindam", "f": 3 }, { "s": "coldmindam", "f": 3 }], "dmg-elem-max": [{ "s": "firemaxdam", "f": 1 }, { "s": "lightmaxdam", "f": 3 }, { "s": "coldmaxdam", "f": 3 }, { "s": "coldlength", "f": 17 }], "all-stats": [{ "s": "strength", "f": 1 }, { "s": "energy", "f": 3 }, { "s": "dexterity", "f": 3 }, { "s": "vitality", "f": 3 }], "addxp": [{ "s": "item_addexperience", "f": 1 }], "heal-kill": [{ "s": "item_healafterkill", "f": 1 }], "cheap": [{ "s": "item_reducedprices", "f": 1 }], "rip": [{ "s": "item_restinpeace", "f": 1 }], "att-mon%": [{ "s": "attack_vs_montype", "f": 24 }], "dmg-mon%": [{ "s": "damage_vs_montype", "f": 24 }], "kill-skill": [{ "s": "item_skillonkill", "f": 11 }], "death-skill": [{ "s": "item_skillondeath", "f": 11 }], "levelup-skill": [{ "s": "item_skillonlevelup", "f": 11 }], "skill-rand": [{ "s": "item_singleskill", "f": 12 }], "fade": [{ "s": "fade", "f": 17 }], "levelreq": [{ "s": "item_levelreq", "f": 1 }], "ethereal": [{ "f": 23 }], "oskill": [{ "s": "item_nonclassskill", "f": 22 }], "state": [{ "s": "state", "f": 24 }], "randclassskill": [{ "s": "item_addclassskills", "f": 36 }], "noconsume": [{ "s": "item_noconsume", "f": 1 }], "pierce-immunity-cold": [{ "s": "item_pierce_cold_immunity", "f": 1 }], "pierce-immunity-fire": [{ "s": "item_pierce_fire_immunity", "f": 1 }], "pierce-immunity-light": [{ "s": "item_pierce_light_immunity", "f": 1 }], "pierce-immunity-poison": [{ "s": "item_pierce_poison_immunity", "f": 1 }], "pierce-immunity-damage": [{ "s": "item_pierce_damage_immunity", "f": 1 }], "pierce-immunity-magic": [{ "s": "item_pierce_magic_immunity", "f": 1 }] }, "magical_properties": [{ "s": "strength", "cB": 10, "cS": 0, "sB": 8, "sA": 32, "so": 67, "dF": 19, "dP": "%+d to Strength", "dN": "%+d to all Attributes", "dg": 1, "dgF": 19, "dgP": "%+d to all Attributes" }, { "s": "energy", "cB": 10, "cS": 0, "sB": 7, "sA": 32, "so": 61, "dF": 19, "dP": "%+d to Energy", "dN": "%+d to all Attributes", "dg": 1, "dgF": 19, "dgP": "%+d to all Attributes", "o": 8, "os": ["maxmana"] }, { "s": "dexterity", "cB": 10, "cS": 0, "sB": 7, "sA": 32, "so": 65, "dF": 19, "dP": "%+d to Dexterity", "dN": "%+d to all Attributes", "dg": 1, "dgF": 19, "dgP": "%+d to all Attributes" }, { "s": "vitality", "cB": 10, "cS": 0, "sB": 7, "sA": 32, "so": 63, "dF": 19, "dP": "%+d to Vitality", "dN": "%+d to all Attributes", "dg": 1, "dgF": 19, "dgP": "%+d to all Attributes", "o": 9, "os": ["maxhp", "maxstamina"] }, { "s": "statpts", "cB": 10, "cS": 0 }, { "s": "newskills", "cB": 8, "cS": 0 }, { "s": "hitpoints", "cB": 21, "cS": 0, "vS": 8 }, { "s": "maxhp", "cB": 21, "cS": 0, "vS": 8, "sB": 9, "sA": 32, "so": 59, "dF": 19, "dP": "%+d to Life", "dN": "%+d to Life" }, { "s": "mana", "cB": 21, "cS": 0, "vS": 8 }, { "s": "maxmana", "cB": 21, "cS": 0, "vS": 8, "sB": 8, "sA": 32, "so": 55, "dF": 19, "dP": "%+d to Mana", "dN": "%+d to Mana" }, { "s": "stamina", "cB": 21, "cS": 0, "vS": 8 }, { "s": "maxstamina", "cB": 21, "cS": 0, "vS": 8, "sB": 8, "sA": 32, "so": 51, "dF": 19, "dP": "%+d Maximum Stamina", "dN": "%+d Maximum Stamina" }, { "s": "level", "cB": 7, "cS": 0 }, { "s": "experience", "cB": 32, "cS": 0 }, { "s": "gold", "cB": 25, "cS": 0 }, { "s": "goldbank", "cB": 25, "cS": 0 }, { "s": "item_armor_percent", "sS": 1, "sB": 9, "sA": 0, "so": 74, "dF": 19, "dP": "%+d%% Enhanced Defense", "dN": "%+d%% Enhanced Defense", "o": 13, "os": ["armorclass"] }, { "s": "item_maxdamage_percent", "sS": 1, "sB": 9, "sA": 0, "so": 129, "dF": 19, "dP": "%+d%% Enhanced Maximum Damage", "dN": "%+d%% Enhanced Maximum Damage", "o": 13, "os": ["maxdamage", "secondary_maxdamage", "item_throw_maxdamage"], "np": 2, "dR": "Adds %d-%d damage", "dE": "%+d%% Enhanced Damage" }, { "s": "item_mindamage_percent", "sS": 1, "sB": 9, "sA": 0, "so": 130, "dF": 19, "dP": "%+d%% Enhanced Minimum Damage", "dN": "%+d%% Enhanced Minimum Damage", "o": 13, "os": ["mindamage", "secondary_mindamage", "item_throw_mindamage"] }, { "s": "tohit", "sS": 1, "sB": 10, "so": 115, "dF": 19, "dP": "%+d to Attack Rating", "dN": "%+d to Attack Rating" }, { "s": "toblock", "sS": 1, "sB": 6, "sA": 0, "so": 134, "dF": 19, "dP": "%d%% Increased Chance of Blocking", "dN": "%d%% Increased Chance of Blocking" }, { "s": "mindamage", "sS": 1, "sB": 6, "sA": 0, "so": 127, "dF": 19, "dP": "%+d to Minimum Damage", "dN": "%+d to Minimum Damage" }, { "s": "maxdamage", "sS": 1, "sB": 7, "sA": 0, "so": 126, "dF": 19, "dP": "%+d to Maximum Damage", "dN": "%+d to Maximum Damage" }, { "s": "secondary_mindamage", "sS": 1, "sB": 6, "sA": 0, "so": 124, "dF": 19, "dP": "%+d to Minimum Damage", "dN": "%+d to Minimum Damage" }, { "s": "secondary_maxdamage", "sS": 1, "sB": 7, "sA": 0, "so": 123, "dF": 19, "dP": "%+d to Maximum Damage", "dN": "%+d to Maximum Damage" }, { "s": "damagepercent", "sS": 1, "sB": 8, "sA": 0 }, { "s": "manarecovery", "sB": 8, "sA": 0 }, { "s": "manarecoverybonus", "sS": 1, "sB": 8, "sA": 0, "so": 52, "dF": 19, "dP": "Regenerate Mana %d%%", "dN": "Regenerate Mana %d%%" }, { "s": "staminarecoverybonus", "sS": 1, "sB": 8, "sA": 0, "so": 48, "dF": 19, "dP": "Heal Stamina Plus %d%%", "dN": "Heal Stamina Plus %d%%" }, { "s": "lastexp" }, { "s": "nextexp" }, { "s": "armorclass", "sS": 1, "sB": 11, "sA": 10, "so": 71, "dF": 19, "dP": "%+d Defense", "dN": "%+d Defense" }, { "s": "armorclass_vs_missile", "sS": 1, "sB": 9, "sA": 0, "so": 69, "dF": 19, "dP": "%+d Defense vs. Missile", "dN": "%+d Defense vs. Missile" }, { "s": "armorclass_vs_hth", "sS": 1, "sB": 8, "sA": 0, "so": 70, "dF": 19, "dP": "%+d Defense vs. Melee", "dN": "%+d Defense vs. Melee" }, { "s": "normal_damage_reduction", "sS": 1, "sB": 6, "sA": 0, "so": 22, "dF": 19, "dP": "Damage Reduced by %d", "dN": "Damage Reduced by %d" }, { "s": "magic_damage_reduction", "sS": 1, "sB": 6, "sA": 0, "so": 21, "dF": 19, "dP": "Magic Damage Reduced by %d", "dN": "Magic Damage Reduced by %d" }, { "s": "damageresist", "sS": 1, "sB": 9, "sA": 200, "so": 22, "dF": 29, "dP": "Damage Reduced by %d%%", "dN": "Damage Increased by %d%%" }, { "s": "magicresist", "sS": 1, "sB": 9, "sA": 200, "so": 41, "dF": 19, "dP": "Magic Resist %+d%%", "dN": "Magic Resist %+d%%" }, { "s": "maxmagicresist", "sS": 1, "sB": 5, "sA": 0, "so": 46, "dF": 19, "dP": "%+d%% to Maximum Magic Resist", "dN": "%+d%% to Maximum Magic Resist" }, { "s": "fireresist", "sS": 1, "sB": 9, "sA": 200, "so": 36, "dF": 19, "dP": "Fire Resist %+d%%", "dN": "All Resistances %+d", "dg": 2, "dgF": 19, "dgP": "All Resistances %+d" }, { "s": "maxfireresist", "sS": 1, "sB": 5, "sA": 0, "so": 42, "dF": 19, "dP": "%+d%% to Maximum Fire Resist", "dN": "%+d%% to Maximum Fire Resist" }, { "s": "lightresist", "sS": 1, "sB": 9, "sA": 200, "so": 38, "dF": 19, "dP": "Lightning Resist %+d%%", "dN": "All Resistances %+d", "dg": 2, "dgF": 19, "dgP": "All Resistances %+d" }, { "s": "maxlightresist", "sS": 1, "sB": 5, "sA": 0, "so": 43, "dF": 19, "dP": "%+d%% to Maximum Lightning Resist", "dN": "%+d%% to Maximum Lightning Resist" }, { "s": "coldresist", "sS": 1, "sB": 9, "sA": 200, "so": 40, "dF": 19, "dP": "Cold Resist %+d%%", "dN": "All Resistances %+d", "dg": 2, "dgF": 19, "dgP": "All Resistances %+d" }, { "s": "maxcoldresist", "sS": 1, "sB": 5, "sA": 0, "so": 44, "dF": 19, "dP": "%+d%% to Maximum Cold Resist", "dN": "%+d%% to Maximum Cold Resist" }, { "s": "poisonresist", "sS": 1, "sB": 9, "sA": 200, "so": 34, "dF": 19, "dP": "Poison Resist %+d%%", "dN": "All Resistances %+d", "dg": 2, "dgF": 19, "dgP": "All Resistances %+d" }, { "s": "maxpoisonresist", "sS": 1, "sB": 5, "sA": 0, "so": 45, "dF": 19, "dP": "%+d%% to Maximum Poison Resist", "dN": "%+d%% to Maximum Poison Resist" }, { "s": "damageaura", "sS": 1 }, { "s": "firemindam", "sS": 1, "sB": 8, "sA": 0, "so": 102, "dF": 19, "dP": "%+d to Minimum Fire Damage", "dN": "%+d to Minimum Fire Damage", "np": 2, "dR": "Adds %d-%d fire damage", "dE": "%+d fire damage" }, { "s": "firemaxdam", "sS": 1, "sB": 9, "sA": 0, "so": 101, "dF": 19, "dP": "%+d to Maximum Fire Damage", "dN": "%+d to Maximum Fire Damage" }, { "s": "lightmindam", "sS": 1, "sB": 6, "sA": 0, "so": 99, "dF": 19, "dP": "%+d to Minimum Lightning Damage", "dN": "%+d to Minimum Lightning Damage", "np": 2, "dR": "Adds %d-%d lightning damage", "dE": "%+d lightning damage" }, { "s": "lightmaxdam", "sS": 1, "sB": 10, "sA": 0, "so": 98, "dF": 19, "dP": "%+d to Maximum Lightning Damage", "dN": "%+d to Maximum Lightning Damage" }, { "s": "magicmindam", "sS": 1, "sB": 8, "sA": 0, "so": 104, "dF": 19, "dP": "%+d magic damage", "dN": "%+d magic damage", "np": 2, "dR": "Adds %d-%d magic damage", "dE": "%+d magic damage" }, { "s": "magicmaxdam", "sS": 1, "sB": 9, "sA": 0, "so": 103, "dF": 19, "dP": "%+d magic damage", "dN": "%+d magic damage" }, { "s": "coldmindam", "sS": 1, "sB": 8, "sA": 0, "so": 96, "dF": 19, "dP": "%+d to Minimum Cold Damage", "dN": "%+d to Minimum Cold Damage", "np": 3, "dR": "Adds %d-%d cold damage", "dE": "%+d cold damage" }, { "s": "coldmaxdam", "sS": 1, "sB": 9, "sA": 0, "so": 95, "dF": 19, "dP": "%+d to Maximum Cold Damage", "dN": "%+d to Maximum Cold Damage" }, { "s": "coldlength", "sS": 1, "sB": 8, "sA": 0 }, { "s": "poisonmindam", "sS": 1, "sB": 10, "sA": 0, "so": 92, "dF": 19, "dP": "%+d to Minimum Poison Damage", "dN": "%+d to Minimum Poison Damage", "np": 3, "dR": "Adds %d-%d poison damage over %d seconds", "dE": "%+d poison damage over %d seconds" }, { "s": "poisonmaxdam", "sS": 1, "sB": 10, "sA": 0, "so": 91, "dF": 19, "dP": "%+d to Maximum Poison Damage", "dN": "%+d to Maximum Poison Damage" }, { "s": "poisonlength", "sS": 1, "sB": 9, "sA": 0 }, { "s": "lifedrainmindam", "sS": 1, "sB": 7, "sA": 0, "so": 88, "dF": 19, "dP": "%d%% Life stolen per hit", "dN": "%d%% Life stolen per hit" }, { "s": "lifedrainmaxdam", "sS": 1 }, { "s": "manadrainmindam", "sS": 1, "sB": 7, "sA": 0, "so": 89, "dF": 19, "dP": "%d%% Mana stolen per hit", "dN": "%d%% Mana stolen per hit" }, { "s": "manadrainmaxdam", "sS": 1 }, { "s": "stamdrainmindam", "sS": 1 }, { "s": "stamdrainmaxdam", "sS": 1 }, { "s": "stunlength" }, { "s": "velocitypercent", "sS": 1, "sB": 7, "sA": 30 }, { "s": "attackrate", "sS": 1, "sB": 7, "sA": 30 }, { "s": "other_animrate", "sS": 1 }, { "s": "quantity", "sS": 1 }, { "s": "value", "sS": 1, "sB": 8, "sA": 100 }, { "s": "durability", "sS": 1, "sB": 9, "sA": 0 }, { "s": "maxdurability", "sS": 1, "sB": 8, "sA": 0 }, { "s": "hpregen", "sB": 6, "sA": 30, "so": 56, "dF": 19, "dP": "Replenish Life %+d", "dN": "Drain Life %d" }, { "s": "item_maxdurability_percent", "sS": 1, "sB": 7, "sA": 20, "so": 3, "dF": 19, "dP": "Increase Maximum Durability %d%%", "dN": "Increase Maximum Durability %d%%", "o": 13, "os": ["maxdurability"] }, { "s": "item_maxhp_percent", "sS": 1, "sB": 6, "sA": 10, "so": 58, "dF": 19, "dP": "Increase Maximum Life %d%%", "dN": "Increase Maximum Life %d%%", "o": 11, "os": ["maxhp"] }, { "s": "item_maxmana_percent", "sS": 1, "sB": 6, "sA": 10, "so": 54, "dF": 19, "dP": "Increase Maximum Mana %d%%", "dN": "Increase Maximum Mana %d%%", "o": 11, "os": ["maxmana"] }, { "s": "item_attackertakesdamage", "sS": 1, "sB": 7, "sA": 0, "so": 13, "dF": 19, "dP": "Attacker Takes Damage of %d", "dN": "Attacker Takes Damage of %d" }, { "s": "item_goldbonus", "sS": 1, "sB": 9, "sA": 100, "so": 10, "dF": 19, "dP": "%d%% Extra Gold from Monsters", "dN": "%d%% Extra Gold from Monsters" }, { "s": "item_magicbonus", "sS": 1, "sB": 8, "sA": 100, "so": 8, "dF": 19, "dP": "%d%% Better Chance of Getting Magic Items", "dN": "%d%% Better Chance of Getting Magic Items" }, { "s": "item_knockback", "sS": 1, "sB": 7, "sA": 0, "so": 76, "dF": 19, "dP": "Knockback", "dN": "Knockback" }, { "s": "item_timeduration", "sS": 1, "sB": 9, "sA": 20 }, { "s": "item_addclassskills", "sS": 1, "sB": 3, "sA": 0, "sP": 3, "so": 150, "dF": 13, "dP": "%+d to Amazon Skill Levels", "dN": "%+d to Amazon Skill Levels" }, { "s": "unsentparam1" }, { "s": "item_addexperience", "sS": 1, "sB": 9, "sA": 50, "so": 11, "dF": 19, "dP": "%+d%% to Experience Gained", "dN": "%+d%% to Experience Gained" }, { "s": "item_healafterkill", "sS": 1, "sB": 7, "sA": 0, "so": 16, "dF": 19, "dP": "%+d Life after each Kill", "dN": "%+d Life after each Kill" }, { "s": "item_reducedprices", "sB": 7, "sA": 0, "so": 8, "dF": 19, "dP": "Reduces all Vendor Prices %d%%", "dN": "Reduces all Vendor Prices %d%%" }, { "s": "item_doubleherbduration", "sS": 1, "sB": 1, "sA": 0 }, { "s": "item_lightradius", "sS": 1, "sB": 4, "sA": 4, "so": 6, "dF": 19, "dP": "%+d to Light Radius", "dN": "%+d to Light Radius" }, { "s": "item_lightcolor", "sS": 1, "sB": 24, "sA": 0 }, { "s": "item_req_percent", "sS": 1, "sB": 8, "sA": 100, "so": 0, "dF": 19, "dP": "Requirements %+d%%", "dN": "Requirements %+d%%" }, { "s": "item_levelreq", "sB": 7 }, { "s": "item_fasterattackrate", "sS": 1, "sB": 7, "sA": 20, "so": 145, "dF": 19, "dP": "%+d%% Increased Attack Speed", "dN": "%+d%% Increased Attack Speed" }, { "s": "item_levelreqpct", "sB": 7, "sA": 64, "o": 13, "os": ["item_levelreq"] }, { "s": "lastblockframe" }, { "s": "item_fastermovevelocity", "sS": 1, "sB": 7, "sA": 20, "so": 148, "dF": 19, "dP": "%+d%% Faster Run/Walk", "dN": "%+d%% Faster Run/Walk" }, { "s": "item_nonclassskill", "e": 1, "sS": 1, "sB": 6, "sA": 0, "sP": 9, "so": 81, "dF": 28, "dP": "%+d to %s", "dN": "%+d to %s" }, { "s": "state", "sB": 1, "sP": 8 }, { "s": "item_fastergethitrate", "sS": 1, "sB": 7, "sA": 20, "so": 139, "dF": 19, "dP": "%+d%% Faster Hit Recovery", "dN": "%+d%% Faster Hit Recovery" }, { "s": "monster_playercount" }, { "s": "skill_poison_override_length" }, { "s": "item_fasterblockrate", "sS": 1, "sB": 7, "sA": 20, "so": 136, "dF": 19, "dP": "%+d%% Faster Block Rate", "dN": "%+d%% Faster Block Rate" }, { "s": "skill_bypass_undead" }, { "s": "skill_bypass_demons" }, { "s": "item_fastercastrate", "sS": 1, "sB": 7, "sA": 20, "so": 142, "dF": 19, "dP": "%+d%% Faster Cast Rate", "dN": "%+d%% Faster Cast Rate" }, { "s": "skill_bypass_beasts" }, { "s": "item_singleskill", "e": 1, "sS": 1, "sB": 3, "sA": 0, "sP": 9, "so": 81, "dF": 27, "dP": "%+d to %s %s", "dN": "%+d to %s %s" }, { "s": "item_restinpeace", "sB": 1, "sA": 0, "so": 81, "dF": 19, "dP": "Slain Monsters Rest in Peace", "dN": "Slain Monsters Rest in Peace" }, { "s": "curse_resistance", "sB": 9, "sA": 0 }, { "s": "item_poisonlengthresist", "sS": 1, "sB": 8, "sA": 20, "so": 18, "dF": 19, "dP": "Poison Length Reduced by %d%%", "dN": "Poison Length Reduced by %d%%" }, { "s": "item_normaldamage", "sS": 1, "sB": 9, "sA": 20, "so": 122, "dF": 19, "dP": "Damage %+d", "dN": "Damage %+d" }, { "s": "item_howl", "sS": 1, "sB": 7, "sA": -1, "so": 79, "dF": 5, "dP": "Hit Causes Monster to Flee %+d%%", "dN": "Hit Causes Monster to Flee %+d%%" }, { "s": "item_stupidity", "sS": 1, "sB": 7, "sA": 0, "so": 80, "dF": 12, "dV": 2, "dP": "Hit Blinds Target", "dN": "Hit Blinds Target" }, { "s": "item_damagetomana", "sS": 1, "sB": 6, "sA": 0, "so": 11, "dF": 19, "dP": "%+d%% Damage Taken Goes To Mana", "dN": "%+d%% Damage Taken Goes To Mana" }, { "s": "item_ignoretargetac", "sS": 1, "sB": 1, "sA": 0, "so": 119, "dF": 19, "dP": "Ignore Target's Defense", "dN": "Ignore Target's Defense" }, { "s": "item_fractionaltargetac", "sS": 1, "sB": 7, "sA": 0, "so": 118, "dF": 19, "dP": "-%d%% Target Defense", "dN": "-%d%% Target Defense" }, { "s": "item_preventheal", "sS": 1, "sB": 7, "sA": 0, "so": 81, "dF": 19, "dP": "Prevent Monster Heal", "dN": "Prevent Monster Heal" }, { "s": "item_halffreezeduration", "sS": 1, "sB": 1, "sA": 0, "so": 19, "dF": 19, "dP": "Half Freeze Duration", "dN": "Half Freeze Duration" }, { "s": "item_tohit_percent", "sS": 1, "sB": 9, "sA": 20, "so": 117, "dF": 19, "dP": "%d%% Bonus to Attack Rating", "dN": "%d%% Bonus to Attack Rating" }, { "s": "item_damagetargetac", "sS": 1, "sB": 7, "sA": 128, "so": 75, "dF": 19, "dP": "%d to Monster Defense Per Hit", "dN": "%d to Monster Defense Per Hit" }, { "s": "item_demondamage_percent", "sS": 1, "sB": 9, "sA": 20, "so": 112, "dF": 19, "dP": "%+d%% Damage to Demons", "dN": "%+d%% Damage to Demons" }, { "s": "item_undeaddamage_percent", "sS": 1, "sB": 9, "sA": 20, "so": 108, "dF": 19, "dP": "%+d%% Damage to Undead", "dN": "%+d%% Damage to Undead" }, { "s": "item_demon_tohit", "sS": 1, "sB": 10, "sA": 128, "so": 110, "dF": 19, "dP": "%+d to Attack Rating against Demons", "dN": "%+d to Attack Rating against Demons" }, { "s": "item_undead_tohit", "sS": 1, "sB": 10, "sA": 128, "so": 106, "dF": 19, "dP": "%+d to Attack Rating against Undead", "dN": "%+d to Attack Rating against Undead" }, { "s": "item_throwable", "sS": 1, "sB": 1, "sA": 0, "so": 5, "dF": 19, "dP": "Throwable", "dN": "Throwable" }, { "s": "item_elemskill", "sS": 1, "sB": 3, "sA": 0, "sP": 3, "so": 157, "dF": 19, "dP": "%+d to Fire Skills", "dN": "%+d to Fire Skills" }, { "s": "item_allskills", "sS": 1, "sB": 3, "sA": 0, "so": 158, "dF": 19, "dP": "%+d to All Skills", "dN": "%+d to All Skills" }, { "s": "item_attackertakeslightdamage", "sS": 1, "sB": 5, "sA": 0, "so": 14, "dF": 19, "dP": "Attacker Takes Lightning Damage of %d", "dN": "Attacker Takes Lightning Damage of %d" }, { "s": "ironmaiden_level", "sS": 1 }, { "s": "lifetap_level", "sS": 1 }, { "s": "thorns_percent" }, { "s": "bonearmor", "sS": 1 }, { "s": "bonearmormax", "sS": 1 }, { "s": "item_freeze", "sS": 1, "sB": 5, "sA": 0, "so": 78, "dF": 12, "dV": 2, "dP": "Freezes target", "dN": "Freezes target" }, { "s": "item_openwounds", "sS": 1, "sB": 7, "sA": 0, "so": 83, "dF": 19, "dP": "%+d%% Chance of Open Wounds", "dN": "%+d%% Chance of Open Wounds" }, { "s": "item_crushingblow", "sS": 1, "sB": 7, "sA": 0, "so": 87, "dF": 19, "dP": "%+d%% Chance of Crushing Blow", "dN": "%+d%% Chance of Crushing Blow" }, { "s": "item_kickdamage", "sS": 1, "sB": 7, "sA": 0, "so": 121, "dF": 19, "dP": "%+d Kick Damage", "dN": "%+d Kick Damage" }, { "s": "item_manaafterkill", "sS": 1, "sB": 7, "sA": 0, "so": 16, "dF": 19, "dP": "%+d to Mana after each Kill", "dN": "%+d to Mana after each Kill" }, { "s": "item_healafterdemonkill", "sS": 1, "sB": 7, "sA": 0, "so": 15, "dF": 19, "dP": "%+d Life after each Demon Kill", "dN": "%+d Life after each Demon Kill" }, { "s": "item_extrablood", "sS": 1, "sB": 7, "sA": 0 }, { "s": "item_deadlystrike", "sS": 1, "sB": 7, "sA": 0, "so": 85, "dF": 19, "dP": "%+d%% Deadly Strike", "dN": "%+d%% Deadly Strike" }, { "s": "item_absorbfire_percent", "sS": 1, "sB": 7, "sA": 0, "so": 23, "dF": 19, "dP": "Fire Absorb %+d%%", "dN": "Fire Absorb %+d%%" }, { "s": "item_absorbfire", "sS": 1, "sB": 7, "sA": 0, "so": 27, "dF": 19, "dP": "%+d Fire Absorb", "dN": "%+d Fire Absorb" }, { "s": "item_absorblight_percent", "sS": 1, "sB": 7, "sA": 0, "so": 24, "dF": 19, "dP": "Lightning Absorb %+d%%", "dN": "Lightning Absorb %+d%%" }, { "s": "item_absorblight", "sS": 1, "sB": 7, "sA": 0, "so": 29, "dF": 19, "dP": "%+d Lightning Absorb", "dN": "%+d Lightning Absorb" }, { "s": "item_absorbmagic_percent", "sS": 1, "sB": 7, "sA": 0, "so": 26, "dF": 19, "dP": "Magic Absorb %+d%%", "dN": "Magic Absorb %+d%%" }, { "s": "item_absorbmagic", "sS": 1, "sB": 7, "sA": 0, "so": 33, "dF": 19, "dP": "%+d Magic Absorb", "dN": "%+d Magic Absorb" }, { "s": "item_absorbcold_percent", "sS": 1, "sB": 7, "sA": 0, "so": 25, "dF": 19, "dP": "Cold Absorb %+d%%", "dN": "Cold Absorb %+d%%" }, { "s": "item_absorbcold", "sS": 1, "sB": 7, "sA": 0, "so": 31, "dF": 19, "dP": "%+d Cold Absorb", "dN": "%+d Cold Absorb" }, { "s": "item_slow", "sS": 1, "sB": 7, "sA": 0, "so": 77, "dF": 19, "dP": "Slows Target by %d%%", "dN": "Slows Target by %d%%" }, { "s": "item_aura", "sS": 1, "sB": 5, "sA": 0, "sP": 9, "so": 159, "dF": 16, "dV": 0, "dP": "Level %d %s Aura When Equipped", "dN": "Level %d %s Aura When Equipped" }, { "s": "item_indesctructible", "sS": 1, "sB": 1, "so": 160, "dF": 19, "dP": "Indestructible", "dN": "Indestructible" }, { "s": "item_cannotbefrozen", "sS": 1, "sB": 1, "so": 20, "dF": 19, "dP": "Cannot Be Frozen", "dN": "Cannot Be Frozen" }, { "s": "item_staminadrainpct", "sS": 1, "sB": 7, "sA": 20, "so": 49, "dF": 19, "dP": "%d%% Slower Stamina Drain", "dN": "%d%% Slower Stamina Drain" }, { "s": "item_reanimate", "sB": 7, "sA": 0, "sP": 10, "so": 17, "dF": 23, "dP": "%0%% Reanimate as: %1", "dN": "%0%% Reanimate as: %1" }, { "s": "item_pierce", "sS": 1, "sB": 7, "sA": 0, "so": 132, "dF": 19, "dP": "%+d%% Piercing Attack", "dN": "%+d%% Piercing Attack" }, { "s": "item_magicarrow", "sS": 1, "sB": 7, "sA": 0, "so": 131, "dF": 19, "dP": "Fires Magic Arrows", "dN": "Fires Magic Arrows" }, { "s": "item_explosivearrow", "sS": 1, "sB": 7, "sA": 0, "so": 133, "dF": 19, "dP": "Fires Explosive Arrows or Bolts", "dN": "Fires Explosive Arrows or Bolts" }, { "s": "item_throw_mindamage", "sS": 1, "sB": 6, "sA": 0 }, { "s": "item_throw_maxdamage", "sS": 1, "sB": 7, "sA": 0 }, { "s": "skill_handofathena", "sS": 1 }, { "s": "skill_staminapercent", "sS": 1, "o": 1, "os": ["maxstamina"] }, { "s": "skill_passive_staminapercent", "sS": 1, "o": 1, "os": ["maxstamina"] }, { "s": "skill_concentration", "sS": 1 }, { "s": "skill_enchant", "sS": 1 }, { "s": "skill_pierce", "sS": 1 }, { "s": "skill_conviction", "sS": 1 }, { "s": "skill_chillingarmor", "sS": 1 }, { "s": "skill_frenzy", "sS": 1 }, { "s": "skill_decrepify", "sS": 1 }, { "s": "skill_armor_percent", "sS": 1 }, { "s": "alignment" }, { "s": "target0" }, { "s": "target1" }, { "s": "goldlost" }, { "s": "conversion_level" }, { "s": "conversion_maxhp" }, { "s": "unit_dooverlay" }, { "s": "attack_vs_montype", "sB": 9, "sP": 10, "so": 108, "dF": 22, "dP": "%d%% to Attack Rating versus", "dN": "%d%% to Attack Rating versus" }, { "s": "damage_vs_montype", "sB": 9, "sP": 10, "so": 106, "dF": 22, "dP": "%d%% to Damage versus", "dN": "%d%% to Damage versus" }, { "s": "fade", "sB": 3 }, { "s": "armor_override_percent", "sS": 1 }, { "s": "lasthitreactframe" }, { "s": "create_season" }, { "s": "bonus_mindamage", "sS": 1, "sB": 8, "sA": 0 }, { "s": "bonus_maxdamage", "sS": 1, "sB": 8, "sA": 0 }, { "s": "item_pierce_cold_immunity", "sB": 10, "so": 100, "dF": 19, "dP": "Monster Cold Immunity is Sundered", "dN": "Monster Cold Immunity is Sundered" }, { "s": "item_addskill_tab", "sS": 1, "sB": 3, "sA": 0, "sP": 16, "so": 151, "dF": 14, "dP": "%+d to Javelin and Spear Skills", "dN": "%+d to Javelin and Spear Skills" }, { "s": "item_pierce_fire_immunity", "sB": 10, "so": 100, "dF": 19, "dP": "Monster Fire Immunity is Sundered", "dN": "Monster Fire Immunity is Sundered" }, { "s": "item_pierce_light_immunity", "sB": 10, "so": 100, "dF": 19, "dP": "Monster Lightning Immunity is Sundered", "dN": "Monster Lightning Immunity is Sundered" }, { "s": "item_pierce_poison_immunity", "sB": 10, "so": 100, "dF": 19, "dP": "Monster Poison Immunity is Sundered", "dN": "Monster Poison Immunity is Sundered" }, { "s": "item_pierce_damage_immunity", "sB": 10, "so": 100, "dF": 19, "dP": "Monster Physical Immunity is Sundered", "dN": "Monster Physical Immunity is Sundered" }, { "s": "item_pierce_magic_immunity", "sB": 10, "so": 100, "dF": 19, "dP": "Monster Magic Immunity is Sundered", "dN": "Monster Magic Immunity is Sundered" }, { "s": "item_numsockets", "sS": 1, "sB": 4, "sA": 0 }, { "s": "item_skillonattack", "e": 2, "sS": 1, "sB": 7, "sA": 0, "sP": 16, "so": 160, "dF": 15, "dP": "%d%% Chance to cast level %d %s on attack", "dN": "%d%% Chance to cast level %d %s on attack" }, { "s": "item_skillonkill", "e": 2, "sS": 1, "sB": 7, "sA": 0, "sP": 16, "so": 160, "dF": 15, "dP": "%d%% Chance to cast level %d %s when you Kill an Enemy", "dN": "%d%% Chance to cast level %d %s when you Kill an Enemy" }, { "s": "item_skillondeath", "e": 2, "sS": 1, "sB": 7, "sA": 0, "sP": 16, "so": 160, "dF": 15, "dP": "%d%% Chance to cast level %d %s when you Die", "dN": "%d%% Chance to cast level %d %s when you Die" }, { "s": "item_skillonhit", "e": 2, "sS": 1, "sB": 7, "sA": 0, "sP": 16, "so": 160, "dF": 15, "dP": "%d%% Chance to cast level %d %s on striking", "dN": "%d%% Chance to cast level %d %s on striking" }, { "s": "item_skillonlevelup", "e": 2, "sS": 1, "sB": 7, "sA": 0, "sP": 16, "so": 160, "dF": 15, "dP": "%d%% Chance to cast level %d %s when you Level-Up", "dN": "%d%% Chance to cast level %d %s when you Level-Up" }, { "s": "unused200" }, { "s": "item_skillongethit", "e": 2, "sS": 1, "sB": 7, "sA": 0, "sP": 16, "so": 160, "dF": 15, "dP": "%d%% Chance to cast level %d %s when struck", "dN": "%d%% Chance to cast level %d %s when struck" }, { "s": "unused202" }, { "s": "unused203" }, { "s": "item_charged_skill", "e": 3, "sS": 1, "sB": 16, "sA": 0, "sP": 16, "so": 1, "dF": 24, "dP": "Level %d %s (%d/%d Charges)", "dN": "Level %d %s (%d/%d Charges)" }, { "s": "item_noconsume", "sS": 1, "sB": 7, "sA": 0, "so": 4, "dF": 19, "dP": "%+d%% Chance to not consume Quantity", "dN": "%+d%% Chance to not consume Quantity" }, { "s": "passive_mastery_replenish_oncrit", "sS": 1, "sB": 8, "sA": 0 }, null, { "s": "unused208", "e": 3, "sS": 1 }, { "s": "unused209", "e": 3, "sS": 1 }, { "s": "unused210", "e": 3, "sS": 1 }, { "s": "unused211", "e": 3, "sS": 1 }, null, { "s": "passive_mastery_attack_speed", "sS": 1, "sB": 8, "sA": 0 }, { "s": "item_armor_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 72, "dF": 19, "dP": "%+d Defense", "dN": "%+d Defense", "d2": "(Based on Character Level)", "o": 4, "op": 3, "ob": "level", "os": ["armorclass"] }, { "s": "item_armorpercent_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 73, "dF": 19, "dP": "%+d%% Enhanced Defense", "dN": "%+d%% Enhanced Defense", "d2": "(Based on Character Level)", "o": 5, "op": 3, "ob": "level", "os": ["armorclass"] }, { "s": "item_hp_perlevel", "vS": 8, "sS": 1, "sB": 6, "sA": 0, "so": 57, "dF": 19, "dP": "%+d to Life", "dN": "%+d to Life", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["maxhp"] }, { "s": "item_mana_perlevel", "vS": 8, "sS": 1, "sB": 6, "sA": 0, "so": 53, "dF": 19, "dP": "%+d to Mana", "dN": "%+d to Mana", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["maxmana"] }, { "s": "item_maxdamage_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 125, "dF": 19, "dP": "%+d to Maximum Damage", "dN": "%+d to Maximum Damage", "d2": "(Based on Character Level)", "o": 4, "op": 3, "ob": "level", "os": ["maxdamage", "secondary_maxdamage", "item_throw_maxdamage"] }, { "s": "item_maxdamage_percent_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 128, "dF": 19, "dP": "%+d%% Enhanced Maximum Damage", "dN": "%+d%% Enhanced Maximum Damage", "d2": "(Based on Character Level)", "o": 5, "op": 3, "ob": "level", "os": ["maxdamage", "secondary_maxdamage", "item_throw_maxdamage"] }, { "s": "item_strength_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 66, "dF": 19, "dP": "%+d to Strength", "dN": "%+d to Strength", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["strength"] }, { "s": "item_dexterity_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 64, "dF": 19, "dP": "%+d to Dexterity", "dN": "%+d to Dexterity", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["dexterity"] }, { "s": "item_energy_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 60, "dF": 19, "dP": "%+d to Energy", "dN": "%+d to Energy", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["energy"] }, { "s": "item_vitality_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 62, "dF": 19, "dP": "%+d to Vitality", "dN": "%+d to Vitality", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["vitality"] }, { "s": "item_tohit_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 114, "dF": 19, "dP": "%+d to Attack Rating", "dN": "%+d to Attack Rating", "d2": "(Based on Character Level)", "o": 2, "op": 1, "ob": "level", "os": ["tohit"] }, { "s": "item_tohitpercent_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 116, "dF": 19, "dP": "%d%% Bonus to Attack Rating", "dN": "%d%% Bonus to Attack Rating", "d2": "(Based on Character Level)", "o": 2, "op": 1, "ob": "level", "os": ["item_tohit_percent"] }, { "s": "item_cold_damagemax_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 94, "dF": 19, "dP": "%+d to Maximum Cold Damage", "dN": "%+d to Maximum Cold Damage", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["coldmaxdam"] }, { "s": "item_fire_damagemax_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 100, "dF": 19, "dP": "%+d to Maximum Fire Damage", "dN": "%+d to Maximum Fire Damage", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["firemaxdam"] }, { "s": "item_ltng_damagemax_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 97, "dF": 19, "dP": "%+d to Maximum Lightning Damage", "dN": "%+d to Maximum Lightning Damage", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["lightmaxdam"] }, { "s": "item_pois_damagemax_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 90, "dF": 19, "dP": "%+d to Maximum Poison Damage", "dN": "%+d to Maximum Poison Damage", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["poisonmaxdam"] }, { "s": "item_resist_cold_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 39, "dF": 19, "dP": "Cold Resist %+d%%", "dN": "Cold Resist %+d%%", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["coldresist"] }, { "s": "item_resist_fire_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 35, "dF": 19, "dP": "Fire Resist %+d%%", "dN": "Fire Resist %+d%%", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["fireresist"] }, { "s": "item_resist_ltng_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 37, "dF": 19, "dP": "Lightning Resist %+d%%", "dN": "Lightning Resist %+d%%", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["lightresist"] }, { "s": "item_resist_pois_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 33, "dF": 19, "dP": "Poison Resist %+d%%", "dN": "Poison Resist %+d%%", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["poisonresist"] }, { "s": "item_absorb_cold_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 32, "dF": 19, "dP": "%+d Absorbs Cold Damage", "dN": "%+d Absorbs Cold Damage", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_absorbcold"] }, { "s": "item_absorb_fire_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 28, "dF": 19, "dP": "%+d Absorbs Fire Damage", "dN": "%+d Absorbs Fire Damage", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_absorbfire"] }, { "s": "item_absorb_ltng_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 30, "dF": 19, "dP": "%+d Absorbs Lightning Damage", "dN": "%+d Absorbs Lightning Damage", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_absorblight"] }, { "s": "item_absorb_pois_perlevel", "sS": 1, "sB": 6, "sA": 0, "o": 2, "op": 3, "ob": "level", "os": ["item_absorbmagic"] }, { "s": "item_thorns_perlevel", "sS": 1, "sB": 5, "sA": 0, "so": 12, "dF": 19, "dP": "Attacker Takes Damage of %d", "dN": "Attacker Takes Damage of %d", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_attackertakesdamage"] }, { "s": "item_find_gold_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 9, "dF": 19, "dP": "%d%% Extra Gold from Monsters", "dN": "%d%% Extra Gold from Monsters", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_goldbonus"] }, { "s": "item_find_magic_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 7, "dF": 19, "dP": "%d%% Better Chance of Getting Magic Items", "dN": "%d%% Better Chance of Getting Magic Items", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_magicbonus"] }, { "s": "item_regenstamina_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 47, "dF": 19, "dP": "Heal Stamina Plus %d%%", "dN": "Heal Stamina Plus %d%%", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["staminarecoverybonus"] }, { "s": "item_stamina_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 50, "dF": 19, "dP": "%+d Maximum Stamina", "dN": "%+d Maximum Stamina", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["maxstamina"] }, { "s": "item_damage_demon_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 111, "dF": 19, "dP": "%+d%% Damage to Demons", "dN": "%+d%% Damage to Demons", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_demondamage_percent"] }, { "s": "item_damage_undead_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 107, "dF": 19, "dP": "%+d%% Damage to Undead", "dN": "%+d%% Damage to Undead", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_undeaddamage_percent"] }, { "s": "item_tohit_demon_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 109, "dF": 19, "dP": "%+d to Attack Rating against Demons", "dN": "%+d to Attack Rating against Demons", "d2": "(Based on Character Level)", "o": 2, "op": 1, "ob": "level", "os": ["item_demon_tohit"] }, { "s": "item_tohit_undead_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 105, "dF": 19, "dP": "%+d to Attack Rating against Undead", "dN": "%+d to Attack Rating against Undead", "d2": "(Based on Character Level)", "o": 2, "op": 1, "ob": "level", "os": ["item_undead_tohit"] }, { "s": "item_crushingblow_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 86, "dF": 19, "dP": "%+d%% Chance of Crushing Blow", "dN": "%+d%% Chance of Crushing Blow", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_crushingblow"] }, { "s": "item_openwounds_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 82, "dF": 19, "dP": "%+d%% Chance of Open Wounds", "dN": "%+d%% Chance of Open Wounds", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_openwounds"] }, { "s": "item_kick_damage_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 120, "dF": 19, "dP": "%+d Kick Damage", "dN": "%+d Kick Damage", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_kickdamage"] }, { "s": "item_deadlystrike_perlevel", "sS": 1, "sB": 6, "sA": 0, "so": 84, "dF": 19, "dP": "%+d%% Deadly Strike", "dN": "%+d%% Deadly Strike", "d2": "(Based on Character Level)", "o": 2, "op": 3, "ob": "level", "os": ["item_deadlystrike"] }, { "s": "item_find_gems_perlevel", "sS": 1 }, { "s": "item_replenish_durability", "sS": 1, "sB": 6, "sA": 0, "so": 1, "dF": 11, "dP": "Repairs %d durability per second", "dN": "Repairs %d durability per second" }, { "s": "item_replenish_quantity", "sS": 1, "sB": 6, "sA": 0, "so": 2, "dF": 19, "dP": "Replenishes quantity", "dN": "Replenishes quantity" }, { "s": "item_extra_stack", "sS": 1, "sB": 8, "sA": 0, "so": 4, "dF": 19, "dP": "Increased Stack Size", "dN": "Increased Stack Size" }, { "s": "item_find_item", "sS": 1 }, { "s": "item_slash_damage", "sS": 1 }, { "s": "item_slash_damage_percent", "sS": 1 }, { "s": "item_crush_damage", "sS": 1 }, { "s": "item_crush_damage_percent", "sS": 1 }, { "s": "item_thrust_damage", "sS": 1 }, { "s": "item_thrust_damage_percent", "sS": 1 }, { "s": "item_absorb_slash", "sS": 1 }, { "s": "item_absorb_crush", "sS": 1 }, { "s": "item_absorb_thrust", "sS": 1 }, { "s": "item_absorb_slash_percent", "sS": 1 }, { "s": "item_absorb_crush_percent", "sS": 1 }, { "s": "item_absorb_thrust_percent", "sS": 1 }, { "s": "item_armor_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d Defense", "dN": "%+d Defense", "o": 6, "os": ["armorclass"] }, { "s": "item_armorpercent_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%+d%% Enhanced Defense", "dN": "%+d%% Enhanced Defense", "o": 7, "os": ["armorclass"] }, { "s": "item_hp_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Life", "dN": "%+d to Life", "o": 6, "os": ["maxhp"] }, { "s": "item_mana_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Mana", "dN": "%+d to Mana", "o": 6, "os": ["maxmana"] }, { "s": "item_maxdamage_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Maximum Damage", "dN": "%+d to Maximum Damage", "o": 6, "os": ["maxdamage", "secondary_maxdamage", "item_throw_maxdamage"] }, { "s": "item_maxdamage_percent_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%+d%% Enhanced Maximum Damage", "dN": "%+d%% Enhanced Maximum Damage", "o": 7, "os": ["maxdamage", "secondary_mindamage", "item_throw_mindamage"] }, { "s": "item_strength_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Strength", "dN": "%+d to Strength", "o": 6, "os": ["strength"] }, { "s": "item_dexterity_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Dexterity", "dN": "%+d to Dexterity", "o": 6, "os": ["dexterity"] }, { "s": "item_energy_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Energy", "dN": "%+d to Energy", "o": 6, "os": ["energy"] }, { "s": "item_vitality_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Vitality", "dN": "%+d to Vitality", "o": 6, "os": ["vitality"] }, { "s": "item_tohit_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Attack Rating", "dN": "%+d to Attack Rating", "o": 6, "os": ["tohit"] }, { "s": "item_tohitpercent_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%d%% Bonus to Attack Rating", "dN": "%d%% Bonus to Attack Rating", "o": 6, "os": ["item_tohit_percent"] }, { "s": "item_cold_damagemax_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Maximum Cold Damage", "dN": "%+d to Maximum Cold Damage", "o": 6, "os": ["coldmaxdam"] }, { "s": "item_fire_damagemax_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Maximum Fire Damage", "dN": "%+d to Maximum Fire Damage", "o": 6, "os": ["firemaxdam"] }, { "s": "item_ltng_damagemax_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Maximum Lightning Damage", "dN": "%+d to Maximum Lightning Damage", "o": 6, "os": ["lightmaxdam"] }, { "s": "item_pois_damagemax_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Maximum Poison Damage", "dN": "%+d to Maximum Poison Damage", "o": 6, "os": ["poisonmaxdam"] }, { "s": "item_resist_cold_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "Cold Resist %+d%%", "dN": "Cold Resist %+d%%", "o": 6, "os": ["coldresist"] }, { "s": "item_resist_fire_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "Fire Resist %+d%%", "dN": "Fire Resist %+d%%", "o": 6, "os": ["fireresist"] }, { "s": "item_resist_ltng_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "Lightning Resist %+d%%", "dN": "Lightning Resist %+d%%", "o": 6, "os": ["lightresist"] }, { "s": "item_resist_pois_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "Poison Resist %+d%%", "dN": "Poison Resist %+d%%", "o": 6, "os": ["poisonresist"] }, { "s": "item_absorb_cold_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%+d Absorbs Cold Damage", "dN": "%+d Absorbs Cold Damage", "o": 6, "os": ["item_absorbcold"] }, { "s": "item_absorb_fire_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%+d Absorbs Fire Damage", "dN": "%+d Absorbs Fire Damage", "o": 6, "os": ["item_absorbfire"] }, { "s": "item_absorb_ltng_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%+d Absorbs Lightning Damage", "dN": "%+d Absorbs Lightning Damage", "o": 6, "os": ["item_absorblight"] }, { "s": "item_absorb_pois_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "o": 6, "os": ["item_absorbmagic"] }, { "s": "item_find_gold_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%d%% Extra Gold from Monsters", "dN": "%d%% Extra Gold from Monsters", "o": 6, "os": ["item_goldbonus"] }, { "s": "item_find_magic_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%d%% Better Chance of Getting Magic Items", "dN": "%d%% Better Chance of Getting Magic Items", "o": 6, "os": ["item_magicbonus"] }, { "s": "item_regenstamina_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "Heal Stamina Plus %d%%", "dN": "Heal Stamina Plus %d%%", "o": 6, "os": ["staminarecoverybonus"] }, { "s": "item_stamina_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d Maximum Stamina", "dN": "%+d Maximum Stamina", "o": 6, "os": ["maxstamina"] }, { "s": "item_damage_demon_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%+d%% Damage to Demons", "dN": "%+d%% Damage to Demons", "o": 6, "os": ["item_demondamage_percent"] }, { "s": "item_damage_undead_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%+d%% Damage to Undead", "dN": "%+d%% Damage to Undead", "o": 6, "os": ["item_undeaddamage_percent"] }, { "s": "item_tohit_demon_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Attack Rating against Demons", "dN": "%+d to Attack Rating against Demons", "o": 6, "os": ["item_demon_tohit"] }, { "s": "item_tohit_undead_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d to Attack Rating against Undead", "dN": "%+d to Attack Rating against Undead", "o": 6, "os": ["item_undead_tohit"] }, { "s": "item_crushingblow_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%+d%% Chance of Crushing Blow", "dN": "%+d%% Chance of Crushing Blow", "o": 6, "os": ["item_crushingblow"] }, { "s": "item_openwounds_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%+d%% Chance of Open Wounds", "dN": "%+d%% Chance of Open Wounds", "o": 6, "os": ["item_openwounds"] }, { "s": "item_kick_damage_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 17, "dP": "%+d Kick Damage", "dN": "%+d Kick Damage", "o": 6, "os": ["item_kickdamage"] }, { "s": "item_deadlystrike_bytime", "e": 4, "sS": 1, "sB": 22, "sA": 0, "so": 180, "dF": 18, "dP": "%+d%% Deadly Strike", "dN": "%+d%% Deadly Strike", "o": 6, "os": ["item_deadlystrike"] }, { "s": "item_find_gems_bytime", "e": 4, "sS": 1 }, { "s": "item_pierce_cold", "sS": 1, "sB": 8, "sA": 50, "so": 88, "dF": 19, "dP": "-%d%% to Enemy Cold Resistance", "dN": "-%d%% to Enemy Cold Resistance" }, { "s": "item_pierce_fire", "sS": 1, "sB": 8, "sA": 50, "so": 88, "dF": 19, "dP": "-%d%% to Enemy Fire Resistance", "dN": "-%d%% to Enemy Fire Resistance" }, { "s": "item_pierce_ltng", "sS": 1, "sB": 8, "sA": 50, "so": 88, "dF": 19, "dP": "-%d%% to Enemy Lightning Resistance", "dN": "-%d%% to Enemy Lightning Resistance" }, { "s": "item_pierce_pois", "sS": 1, "sB": 8, "sA": 50, "so": 88, "dF": 19, "dP": "-%d%% to Enemy Poison Resistance", "dN": "-%d%% to Enemy Poison Resistance" }, { "s": "item_damage_vs_monster", "sS": 1 }, { "s": "item_damage_percent_vs_monster", "sS": 1 }, { "s": "item_tohit_vs_monster", "sS": 1 }, { "s": "item_tohit_percent_vs_monster", "sS": 1 }, { "s": "item_ac_vs_monster", "sS": 1 }, { "s": "item_ac_percent_vs_monster", "sS": 1 }, { "s": "firelength", "sS": 1 }, { "s": "burningmin", "sS": 1 }, { "s": "burningmax", "sS": 1 }, { "s": "progressive_damage", "sS": 1 }, { "s": "progressive_steal", "sS": 1 }, { "s": "progressive_other", "sS": 1 }, { "s": "progressive_fire", "sS": 1 }, { "s": "progressive_cold", "sS": 1 }, { "s": "progressive_lightning", "sS": 1 }, { "s": "item_extra_charges", "sS": 1, "sB": 6, "sA": 0 }, { "s": "progressive_tohit", "sS": 1 }, { "s": "poison_count", "sS": 1 }, { "s": "damage_framerate", "sS": 1 }, { "s": "pierce_idx", "sS": 1 }, { "s": "passive_fire_mastery", "sS": 1, "sB": 9, "sA": 50, "so": 88, "dF": 19, "dP": "%+d%% to Fire Skill Damage", "dN": "%+d%% to Fire Skill Damage" }, { "s": "passive_ltng_mastery", "sS": 1, "sB": 9, "sA": 50, "so": 88, "dF": 19, "dP": "%+d%% to Lightning Skill Damage", "dN": "%+d%% to Lightning Skill Damage" }, { "s": "passive_cold_mastery", "sS": 1, "sB": 9, "sA": 50, "so": 88, "dF": 19, "dP": "%+d%% to Cold Skill Damage", "dN": "%+d%% to Cold Skill Damage" }, { "s": "passive_pois_mastery", "sS": 1, "sB": 9, "sA": 50, "so": 88, "dF": 19, "dP": "%+d%% to Poison Skill Damage", "dN": "%+d%% to Poison Skill Damage" }, { "s": "passive_fire_pierce", "sS": 1, "sB": 8, "sA": 0, "so": 88, "dF": 19, "dP": "-%d%% to Enemy Fire Resistance", "dN": "-%d%% to Enemy Fire Resistance" }, { "s": "passive_ltng_pierce", "sS": 1, "sB": 8, "sA": 0, "so": 88, "dF": 19, "dP": "-%d%% to Enemy Lightning Resistance", "dN": "-%d%% to Enemy Lightning Resistance" }, { "s": "passive_cold_pierce", "sS": 1, "sB": 8, "sA": 0, "so": 88, "dF": 19, "dP": "-%d%% to Enemy Cold Resistance", "dN": "-%d%% to Enemy Cold Resistance" }, { "s": "passive_pois_pierce", "sS": 1, "sB": 8, "sA": 0, "so": 88, "dF": 19, "dP": "-%d%% to Enemy Poison Resistance", "dN": "-%d%% to Enemy Poison Resistance" }, { "s": "passive_critical_strike", "sS": 1, "sB": 8, "sA": 0 }, { "s": "passive_dodge", "sS": 1, "sB": 7, "sA": 0 }, { "s": "passive_avoid", "sS": 1, "sB": 7, "sA": 0 }, { "s": "passive_evade", "sS": 1, "sB": 7, "sA": 0 }, { "s": "passive_warmth", "sS": 1, "sB": 8, "sA": 0 }, { "s": "passive_mastery_melee_th", "sS": 1, "sB": 8, "sA": 0 }, { "s": "passive_mastery_melee_dmg", "sS": 1, "sB": 8, "sA": 0 }, { "s": "passive_mastery_melee_crit", "sS": 1, "sB": 8, "sA": 0 }, { "s": "passive_mastery_throw_th", "sS": 1, "sB": 8, "sA": 0 }, { "s": "passive_mastery_throw_dmg", "sS": 1, "sB": 8, "sA": 0 }, { "s": "passive_mastery_throw_crit", "sS": 1, "sB": 8, "sA": 0 }, { "s": "passive_weaponblock", "sS": 1, "sB": 8, "sA": 0 }, { "s": "passive_summon_resist", "sS": 1, "sB": 8, "sA": 0 }, { "s": "modifierlist_skill" }, { "s": "modifierlist_level" }, { "s": "last_sent_hp_pct", "sS": 1 }, { "s": "source_unit_type" }, { "s": "source_unit_id" }, { "s": "shortparam1" }, { "s": "questitemdifficulty", "sB": 2, "sA": 0 }, { "s": "passive_mag_mastery", "sS": 1, "sB": 9, "sA": 50 }, { "s": "passive_mag_pierce", "sS": 1, "sB": 8, "sA": 0 }, { "s": "skill_cooldown" }, { "s": "skill_missile_damage_scale" }], "runewords": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, { "n": "Ancients' Pledge" }, { "n": "Armageddon" }, { "n": "Authority" }, { "n": "Beast" }, { "n": "Beauty" }, { "n": "Black" }, { "n": "Blood" }, { "n": "Bone" }, { "n": "Bramble" }, { "n": "Brand" }, { "n": "Breath of the Dying" }, { "n": "Broken Promise" }, { "n": "Call to Arms" }, { "n": "Chains of Honor" }, { "n": "Chance" }, { "n": "Chaos" }, { "n": "Crescent Moon" }, { "n": "Darkness" }, { "n": "Daylight" }, { "n": "Death" }, { "n": "Deception" }, { "n": "Delirium" }, { "n": "Desire" }, { "n": "Despair" }, { "n": "Destruction" }, { "n": "Doom" }, { "n": "Dragon" }, { "n": "Dread" }, { "n": "Dream" }, { "n": "Duress" }, { "n": "Edge" }, { "n": "Elation" }, { "n": "Enigma" }, { "n": "Enlightenment" }, { "n": "Envy" }, { "n": "Eternity" }, { "n": "Exile" }, { "n": "Faith" }, { "n": "Famine" }, { "n": "Flickering Flame" }, { "n": "Fortitude" }, { "n": "Fortune" }, { "n": "Friendship" }, { "n": "Fury" }, { "n": "Gloom" }, { "n": "Glory" }, { "n": "Grief" }, { "n": "Hand of Justice" }, { "n": "Harmony" }, { "n": "Hatred" }, { "n": "Heart of the Oak" }, { "n": "Heaven's Will" }, { "n": "Holy Tears" }, { "n": "Holy Thunder" }, { "n": "Honor" }, { "n": "Revenge" }, { "n": "Humility" }, { "n": "Hunger" }, { "n": "Ice" }, { "n": "Infinity" }, { "n": "Innocence" }, { "n": "Insight" }, { "n": "Jealousy" }, { "n": "Judgement" }, { "n": "King's Grace" }, { "n": "Kingslayer" }, { "n": "Knight's Vigil" }, { "n": "Knowledge" }, { "n": "Last Wish" }, { "n": "Law" }, { "n": "Lawbringer" }, { "n": "Leaf" }, { "n": "Lightning" }, { "n": "Lionheart" }, { "n": "Love" }, { "n": "Loyalty" }, { "n": "Lust" }, { "n": "Madness" }, null, { "n": "Malice" }, { "n": "Melody" }, { "n": "Memory" }, { "n": "Mist" }, { "n": "Morning" }, { "n": "Mystery" }, { "n": "Myth" }, { "n": "Nadir" }, { "n": "Nature's Kingdom" }, { "n": "Night" }, { "n": "Oath" }, { "n": "Obedience" }, { "n": "Oblivion" }, { "n": "Obsession" }, { "n": "Passion" }, { "n": "Patience" }, { "n": "Pattern" }, { "n": "Peace" }, { "n": "Voice of Reason" }, { "n": "Penitence" }, { "n": "Peril" }, { "n": "Pestilence" }, { "n": "Phoenix" }, { "n": "Piety" }, { "n": "Pillar of Faith" }, { "n": "Plague" }, { "n": "Praise" }, { "n": "Prayer" }, { "n": "Pride" }, { "n": "Principle" }, { "n": "Prowess in Battle" }, { "n": "Prudence" }, { "n": "Punishment" }, { "n": "Purity" }, { "n": "Question" }, { "n": "Radiance" }, { "n": "Rain" }, { "n": "Reason" }, { "n": "Red" }, { "n": "Rhyme" }, { "n": "Rift" }, { "n": "Sanctuary" }, { "n": "Serendipity" }, { "n": "Shadow" }, { "n": "Shadow of Doubt" }, { "n": "Silence" }, { "n": "Siren's Song" }, { "n": "Smoke" }, { "n": "Sorrow" }, { "n": "Spirit" }, { "n": "Splendor" }, { "n": "Starlight" }, { "n": "Stealth" }, { "n": "Steel" }, { "n": "Still Water" }, { "n": "Sting" }, { "n": "Stone" }, { "n": "Storm" }, { "n": "Strength" }, { "n": "Tempest" }, { "n": "Temptation" }, { "n": "Terror" }, { "n": "Thirst" }, { "n": "Thought" }, { "n": "Thunder" }, { "n": "Time" }, { "n": "Tradition" }, { "n": "Treachery" }, { "n": "Trust" }, { "n": "Truth" }, { "n": "Unbending Will" }, { "n": "Valor" }, { "n": "Vengeance" }, { "n": "Venom" }, { "n": "Victory" }, { "n": "Voice" }, { "n": "Void" }, { "n": "War" }, { "n": "Water" }, { "n": "Wealth" }, { "n": "Whisper" }, { "n": "White" }, { "n": "Wind" }, { "n": "Wings of Hope" }, { "n": "Wisdom" }, { "n": "Woe" }, { "n": "Wonder" }, { "n": "Wrath" }, { "n": "Youth" }, { "n": "Zephyr" }], "set_items": [{ "n": "Civerb's Ward", "c": "lrg", "tc": "lyel" }, { "n": "Civerb's Icon", "c": "amu", "tc": "lyel" }, { "n": "Civerb's Cudgel", "c": "gsc", "tc": "lyel" }, { "n": "Hsarus' Iron Heel", "c": "mbt", "tc": "dred" }, { "n": "Hsarus' Iron Fist", "c": "buc", "tc": "dred" }, { "n": "Hsarus' Iron Stay", "c": "mbl", "tc": "dred" }, { "n": "Cleglaw's Tooth", "c": "lsd", "tc": "lred" }, { "n": "Cleglaw's Claw", "c": "sml", "tc": "lred" }, { "n": "Cleglaw's Pincers", "c": "mgl", "tc": "lred" }, { "n": "Iratha's Collar", "c": "amu", "tc": "lgry" }, { "n": "Iratha's Cuff", "c": "tgl", "tc": "lgry" }, { "n": "Iratha's Coil", "c": "crn", "tc": "lgry" }, { "n": "Iratha's Cord", "c": "tbl", "tc": "lgry" }, { "n": "Isenhart's Lightbrand", "c": "bsd", "tc": "lgld" }, { "n": "Isenhart's Parry", "c": "gts", "tc": "lgld" }, { "n": "Isenhart's Case", "c": "brs", "tc": "lgld" }, { "n": "Isenhart's Horns", "c": "fhl", "tc": "lgld" }, { "n": "Vidala's Barb", "c": "lbb", "tc": "blac" }, { "n": "Vidala's Fetlock", "c": "tbt", "tc": "blac" }, { "n": "Vidala's Ambush", "c": "lea", "tc": "blac" }, { "n": "Vidala's Snare", "c": "amu", "tc": "blac" }, { "n": "Milabrega's Orb", "c": "kit", "tc": "dblu" }, { "n": "Milabrega's Rod", "c": "wsp", "tc": "dblu" }, { "n": "Milabrega's Diadem", "c": "crn", "tc": "dblu" }, { "n": "Milabrega's Robe", "c": "aar", "tc": "dblu" }, { "n": "Cathan's Rule", "c": "bst", "tc": "dgrn" }, { "n": "Cathan's Mesh", "c": "chn", "tc": "dgrn" }, { "n": "Cathan's Visage", "c": "msk", "tc": "dgrn" }, { "n": "Cathan's Sigil", "c": "amu", "tc": "dgrn" }, { "n": "Cathan's Seal", "c": "rin", "tc": "dgrn" }, { "n": "Tancred's Crowbill", "c": "mpi", "tc": "dgld" }, { "n": "Tancred's Spine", "c": "ful", "tc": "dgld" }, { "n": "Tancred's Hobnails", "c": "lbt", "tc": "dgld" }, { "n": "Tancred's Weird", "c": "amu", "tc": "dgld" }, { "n": "Tancred's Skull", "c": "bhm", "tc": "dgld" }, { "n": "Sigon's Gage", "c": "hgl", "tc": "whit" }, { "n": "Sigon's Visor", "c": "ghm", "tc": "whit" }, { "n": "Sigon's Shelter", "c": "gth", "tc": "whit" }, { "n": "Sigon's Sabot", "c": "hbt", "tc": "whit" }, { "n": "Sigon's Wrap", "c": "hbl", "tc": "whit" }, { "n": "Sigon's Guard", "c": "tow", "tc": "whit" }, { "n": "Infernal Cranium", "c": "cap", "tc": "lyel" }, { "n": "Infernal Torch", "c": "gwn", "tc": "lyel" }, { "n": "Infernal Sign", "c": "tbl", "tc": "lyel" }, { "n": "Berserker's Headgear", "c": "hlm", "tc": "dred" }, { "n": "Berserker's Hauberk", "c": "spl", "tc": "dred" }, { "n": "Berserker's Hatchet", "c": "2ax", "tc": "dred" }, { "n": "Death's Hand", "c": "lgl", "tc": "lred" }, { "n": "Death's Guard", "c": "lbl", "tc": "lred" }, { "n": "Death's Touch", "c": "wsd", "tc": "lred" }, { "n": "Angelic Sickle", "c": "sbr", "tc": "lgry" }, { "n": "Angelic Mantle", "c": "rng", "tc": "lgry" }, { "n": "Angelic Halo", "c": "rin", "tc": "lgry" }, { "n": "Angelic Wings", "c": "amu", "tc": "lgry" }, { "n": "Arctic Horn", "c": "swb", "tc": "lgld" }, { "n": "Arctic Furs", "c": "qui", "tc": "lgld" }, { "n": "Arctic Binding", "c": "vbl", "tc": "lgld" }, { "n": "Arctic Mitts", "c": "tgl", "tc": "lgld" }, { "n": "Arcanna's Sign", "c": "amu", "tc": "blac" }, { "n": "Arcanna's Deathwand", "c": "wst", "tc": "blac" }, { "n": "Arcanna's Head", "c": "skp", "tc": "blac" }, { "n": "Arcanna's Flesh", "c": "ltp", "tc": "blac" }, { "n": "Natalya's Totem", "c": "xh9", "tc": "dgry" }, { "n": "Natalya's Mark", "c": "7qr", "tc": "dgry" }, { "n": "Natalya's Shadow", "c": "ucl", "tc": "dgry" }, { "n": "Natalya's Soul", "c": "xmb", "tc": "dgry" }, { "n": "Aldur's Stony Gaze", "c": "dr8", "tc": "oran" }, { "n": "Aldur's Deception", "c": "uul", "tc": "oran" }, { "n": "Aldur's Rhythm", "c": "9mt", "tc": "oran" }, { "n": "Aldur's Advance", "c": "xtb", "tc": "oran" }, { "n": "Immortal King's Will", "c": "ba5", "tc": "lgry" }, { "n": "Immortal King's Soul Cage", "c": "uar", "tc": "lgry" }, { "n": "Immortal King's Detail", "c": "zhb", "tc": "lgry" }, { "n": "Immortal King's Forge", "c": "xhg", "tc": "lgry" }, { "n": "Immortal King's Pillar", "c": "xhb", "tc": "lgry" }, { "n": "Immortal King's Stone Crusher", "c": "7m7", "tc": "lgry" }, { "n": "Tal Rasha's Fine-Spun Cloth", "c": "zmb", "tc": "dpur" }, { "n": "Tal Rasha's Adjudication", "c": "amu", "tc": "dpur" }, { "n": "Tal Rasha's Lidless Eye", "c": "oba", "tc": "dpur" }, { "n": "Tal Rasha's Guardianship", "c": "uth", "tc": "dpur" }, { "n": "Tal Rasha's Horadric Crest", "c": "xsk", "tc": "dpur" }, { "n": "Griswold's Valor", "c": "urn", "tc": "dgld" }, { "n": "Griswold's Heart", "c": "xar", "tc": "dgld" }, { "n": "Griswold's Redemption", "c": "7ws", "tc": "dgld" }, { "n": "Griswold's Honor", "c": "paf", "tc": "dgld" }, { "n": "Trang-Oul's Guise", "c": "uh9", "tc": "dgld" }, { "n": "Trang-Oul's Scales", "c": "xul", "tc": "dyel" }, { "n": "Trang-Oul's Wing", "c": "ne9", "tc": "dyel" }, { "n": "Trang-Oul's Claws", "c": "xmg", "tc": "dyel" }, { "n": "Trang-Oul's Girth", "c": "utc", "tc": "dyel" }, { "n": "M'avina's True Sight", "c": "ci3", "tc": "whit" }, { "n": "M'avina's Embrace", "c": "uld", "tc": "whit" }, { "n": "M'avina's Icy Clutch", "c": "xtg", "tc": "whit" }, { "n": "M'avina's Tenet", "c": "zvb", "tc": "whit" }, { "n": "M'avina's Caster", "c": "amc", "tc": "whit" }, { "n": "Telling of Beads", "c": "amu", "tc": "lblu" }, { "n": "Laying of Hands", "c": "ulg", "tc": "lblu" }, { "n": "Rite of Passage", "c": "xlb", "tc": "lblu" }, { "n": "Dark Adherent", "c": "uui", "tc": "lblu" }, { "n": "Credendum", "c": "umc", "tc": "lblu" }, { "n": "Dangoon's Teaching", "c": "7ma" }, { "n": "Taebaek's Glory", "c": "uts" }, { "n": "Haemosu's Adamant", "c": "xrs" }, { "n": "Ondal's Almighty", "c": "uhm" }, { "n": "Guillaume's Face", "c": "xhm", "tc": "lgry" }, { "n": "Wilhelm's Pride", "c": "ztb", "tc": "lgry" }, { "n": "Magnus' Skin", "c": "xvg", "tc": "lgry" }, { "n": "Whitstan's Guard", "c": "xml", "tc": "lgry" }, { "n": "Hwanin's Splendor", "c": "xrn" }, { "n": "Hwanin's Refuge", "c": "xcl" }, { "n": "Hwanin's Blessing", "c": "mbl" }, { "n": "Hwanin's Justice", "c": "9vo" }, { "n": "Sazabi's Cobalt Redeemer", "c": "7ls", "tc": "dblu" }, { "n": "Sazabi's Ghost Liberator", "c": "upl", "tc": "dblu" }, { "n": "Sazabi's Mental Sheath", "c": "xhl", "tc": "dblu" }, { "n": "Bul-Kathos' Sacred Charge", "c": "7gd", "tc": "dgrn" }, { "n": "Bul-Kathos' Tribal Guardian", "c": "7wd", "tc": "dgrn" }, { "n": "Cow King's Horns", "c": "xap" }, { "n": "Cow King's Hide", "c": "stu" }, { "n": "Cow King's Hooves", "c": "vbt" }, { "n": "Naj's Puzzler", "c": "6cs" }, { "n": "Naj's Light Plate", "c": "ult" }, { "n": "Naj's Circlet", "c": "ci0" }, { "n": "Sander's Paragon", "c": "cap", "tc": "lpur" }, { "n": "Sander's Riprap", "c": "vbt", "tc": "lpur" }, { "n": "Sander's Taboo", "c": "vgl", "tc": "lpur" }, { "n": "Sander's Superstition", "c": "bwn", "tc": "lpur" }], "unq_items": [{ "n": "The Gnasher", "i": "invhaxu", "c": "hax" }, { "n": "Deathspade", "i": "invaxeu", "c": "axe" }, { "n": "Bladebone", "c": "2ax", "tc": "lgry" }, { "n": "Skull Splitter", "i": "invmpiu", "c": "mpi" }, { "n": "Rakescar", "c": "wax", "tc": "dgry" }, { "n": "Axe of Fechmar", "c": "lax", "tc": "lpur" }, { "n": "Goreshovel", "c": "bax", "tc": "dpur" }, { "n": "The Chieftain", "i": "invbtxu", "c": "btx" }, { "n": "Brainhew", "i": "invgaxu", "c": "gax" }, { "n": "Humongous", "c": "gix", "tc": "blac" }, { "n": "Torch of Iro", "i": "invwndu", "c": "wnd" }, { "n": "Maelstrom", "c": "ywn", "tc": "dblu" }, { "n": "Gravenspine", "i": "invbwnu", "c": "bwn" }, { "n": "Ume's Lament", "c": "gwn", "tc": "lblu" }, { "n": "Felloak", "i": "invclbu", "c": "clb" }, { "n": "Knell Striker", "c": "scp", "tc": "dred" }, { "n": "Rusthandle", "c": "gsc", "tc": "lgld" }, { "n": "Stormeye", "c": "wsp", "tc": "cred" }, { "n": "Stoutnail", "i": "invspcu", "c": "spc" }, { "n": "Crushflange", "c": "mac", "tc": "blac" }, { "n": "Bloodrise", "i": "invmstu", "c": "mst" }, { "n": "The General's Tan Do Li Ga", "c": "fla", "tc": "dblu" }, { "n": "Ironstone", "c": "whm", "tc": "cblu" }, { "n": "Bonesnap", "i": "invmauu", "c": "mau" }, { "n": "Steeldriver", "i": "invgma", "c": "gma", "tc": "cgrn" }, { "n": "Rixot's Keen", "c": "ssd", "tc": "blac" }, { "n": "Blood Crescent", "i": "invscmu", "c": "scm" }, { "n": "Skewer of Krintiz", "i": "inv9sbu", "c": "sbr" }, { "n": "Gleamscythe", "i": "invflcu", "c": "flc" }, { "n": "Azurewrath", "i": "invcrsu", "c": "crs" }, { "n": "Griswold's Edge", "i": "invbsdu", "c": "bsd" }, { "n": "Hellplague", "i": "invlsdu", "c": "lsd" }, { "n": "Culwen's Point", "c": "wsd", "tc": "whit" }, { "n": "Shadowfang", "i": "inv2hsu", "c": "2hs" }, { "n": "Soulflay", "c": "clm", "tc": "dgrn" }, { "n": "Kinemil's Awl", "i": "invgisu", "c": "gis" }, { "n": "Blacktongue", "i": "invbswu", "c": "bsw" }, { "n": "Ripsaw", "c": "flb", "tc": "cblu" }, { "n": "The Patriarch", "i": "invgsdu", "c": "gsd" }, { "n": "Gull", "c": "dgr", "tc": "lgry" }, { "n": "The Diggler", "c": "dir", "tc": "dgry" }, { "n": "The Jade Tan Do", "i": "invkrsu", "c": "kri" }, { "n": "Spectral Shard", "c": "bld", "tc": "dblu" }, { "n": "The Dragon Chang", "c": "spr", "tc": "dpur" }, { "n": "Razortine", "i": "invtriu", "c": "tri" }, { "n": "Bloodthief", "c": "brn", "tc": "whit" }, { "n": "Lance of Yaggai", "c": "spt", "tc": "lred" }, { "n": "The Tannr Gorerod", "c": "pik", "tc": "lgry" }, { "n": "Dimoak's Hew", "c": "bar", "tc": "blac" }, { "n": "Steelgoad", "c": "vou", "tc": "cgrn" }, { "n": "Soul Harvest", "i": "invscyu", "c": "scy" }, { "n": "The Battlebranch", "c": "pax", "tc": "lblu" }, { "n": "Woestave", "c": "hal", "tc": "dblu" }, { "n": "The Grim Reaper", "c": "wsc", "tc": "lpur" }, { "n": "Bane Ash", "c": "sst", "tc": "lgrn" }, { "n": "Serpent Lord", "c": "lst", "tc": "cgrn" }, { "n": "Spire of Lazarus", "i": "invcstu", "c": "cst" }, { "n": "The Salamander", "c": "bst", "tc": "dred" }, { "n": "The Iron Jang Bong", "c": "wst", "tc": "dyel" }, { "n": "Pluckeye", "c": "sbw", "tc": "cblu" }, { "n": "Witherstring", "c": "hbw", "tc": "lred" }, { "n": "Raven Claw", "c": "lbw", "tc": "dred" }, { "n": "Rogue's Bow", "i": "invcbwu", "c": "cbw" }, { "n": "Stormstrike", "i": "invsbbu", "c": "sbb" }, { "n": "Wizendraw", "c": "lbb", "tc": "dgrn" }, { "n": "Hellclap", "i": "invswbu", "c": "swb" }, { "n": "Blastbark", "c": "lwb", "tc": "lyel" }, { "n": "Leadcrow", "i": "invlxbu", "c": "lxb" }, { "n": "Ichorsting", "i": "invmxbu", "c": "mxb" }, { "n": "Hellcast", "i": "invhxbu", "c": "hxb" }, { "n": "Doomslinger", "i": "invrxbu", "c": "rxb" }, { "n": "Biggin's Bonnet", "i": "invcapu", "c": "cap" }, { "n": "Tarnhelm", "c": "skp", "tc": "oran" }, { "n": "Coif of Glory", "i": "invhlmu", "c": "hlm" }, { "n": "Duskdeep", "i": "invfhlu", "c": "fhl" }, { "n": "Wormskull", "i": "invbhmu", "c": "bhm" }, { "n": "Howltusk", "c": "ghm", "tc": "dgry" }, { "n": "Undead Crown", "c": "crn", "tc": "blac" }, { "n": "The Face of Horror", "c": "msk", "tc": "lblu" }, { "n": "Greyform", "c": "qui", "tc": "lgry" }, { "n": "Blinkbat's Form", "c": "lea", "tc": "dred" }, { "n": "The Centurion", "c": "hla", "tc": "cred" }, { "n": "Twitchthroe", "c": "stu", "tc": "lgrn" }, { "n": "Darkglow", "c": "rng", "tc": "dgrn" }, { "n": "Hawkmail", "c": "scl", "tc": "cgrn" }, { "n": "Sparking Mail", "c": "chn", "tc": "lyel" }, { "n": "Venom Ward", "c": "brs", "tc": "dyel" }, { "n": "Iceblink", "c": "spl", "tc": "lgld" }, { "n": "Boneflesh", "c": "plt", "tc": "dgld" }, { "n": "Rockfleece", "c": "fld", "tc": "dgry" }, { "n": "Rattlecage", "c": "gth", "tc": "dpur" }, { "n": "Goldskin", "i": "invfulu", "c": "ful" }, { "n": "Silks of the Victor", "i": "invaaru", "c": "aar" }, { "n": "Heavenly Garb", "c": "ltp", "tc": "cblu" }, { "n": "Pelta Lunata", "i": "invbucu", "c": "buc" }, { "n": "Umbral Disk", "i": "invsmlu", "c": "sml" }, { "n": "Stormguild", "i": "invlrgu", "c": "lrg" }, { "n": "Wall of the Eyeless", "i": "invbshu", "c": "bsh" }, { "n": "Swordback Hold", "i": "invspku", "c": "spk" }, { "n": "Steelclash", "i": "invkitu", "c": "kit" }, { "n": "Bverrit Keep", "i": "invtowu", "c": "tow" }, { "n": "The Ward", "i": "invgtsu", "c": "gts" }, { "n": "The Hand of Broc", "c": "lgl", "tc": "cblu" }, { "n": "Bloodfist", "c": "vgl", "tc": "oran" }, { "n": "Chance Guards", "c": "mgl", "tc": "lred" }, { "n": "Magefist", "c": "tgl", "tc": "lgry" }, { "n": "Frostburn", "c": "hgl", "tc": "dred" }, { "n": "Hotspur", "c": "lbt", "tc": "cred" }, { "n": "Gorefoot", "c": "vbt", "tc": "dblu" }, { "n": "Treads of Cthon", "c": "mbt", "tc": "lgrn" }, { "n": "Goblin Toe", "c": "tbt", "tc": "dgry" }, { "n": "Tearhaunch", "c": "hbt", "tc": "dgrn" }, { "n": "Lenymo", "c": "lbl", "tc": "cgrn" }, { "n": "Snakecord", "c": "vbl", "tc": "blac" }, { "n": "Nightsmoke", "c": "mbl", "tc": "lyel" }, { "n": "Goldwrap", "c": "tbl", "tc": "lblu" }, { "n": "Bladebuckle", "c": "hbl", "tc": "dyel" }, { "n": "Nokozan Relic", "c": "amu" }, { "n": "The Eye of Etlich", "c": "amu" }, { "n": "The Mahim-Oak Curio", "c": "amu" }, { "n": "Nagelring", "c": "rin" }, { "n": "Manald Heal", "c": "rin" }, { "n": "The Stone of Jordan", "c": "rin" }, { "n": "Amulet of the Viper", "c": "vip" }, { "n": "Staff of Kings", "c": "msf" }, { "n": "Horadric Staff", "c": "hst" }, { "n": "Hell Forge Hammer", "c": "hfh" }, { "n": "Khalim's Flail", "c": "qf1" }, { "n": "Khalim's Will", "c": "qf2" }, { "n": "Coldkill", "i": "invhaxu", "c": "9ha", "tc": "cblu" }, { "n": "Butcher's Pupil", "i": "invaxeu", "c": "9ax", "tc": "cblu" }, { "n": "Islestrike", "c": "92a" }, { "n": "Pompeii's Wrath", "i": "invmpiu", "c": "9mp", "tc": "cred" }, { "n": "Guardian Naga", "c": "9wa" }, { "n": "Warlord's Trust", "c": "9la", "tc": "whit" }, { "n": "Spellsteel", "c": "9ba", "tc": "whit" }, { "n": "Stormrider", "i": "inv9btu", "c": "9bt", "tc": "lred" }, { "n": "Boneslayer Blade", "i": "invgaxu", "c": "9ga" }, { "n": "The Minotaur", "i": "inv9giu", "c": "9gi" }, { "n": "Suicide Branch", "c": "9wn" }, { "n": "Carin Shard", "c": "9yw", "tc": "cblu" }, { "n": "Arm of King Leoric", "i": "invbwnu", "c": "9bw" }, { "n": "Blackhand Key", "i": "inv9gwu", "c": "9gw", "tc": "blac" }, { "n": "Dark Clan Crusher", "i": "invclbu", "c": "9cl", "tc": "dgld" }, { "n": "Zakarum's Hand", "c": "9sc", "tc": "lpur" }, { "n": "The Fetid Sprinkler", "c": "9qs" }, { "n": "Hand of Blessed Light", "c": "9ws" }, { "n": "Fleshrender", "i": "invspcu", "c": "9sp" }, { "n": "Sureshrill Frost", "c": "9ma" }, { "n": "Moonfall", "i": "invmstu", "c": "9mt" }, { "n": "Baezil's Vortex", "c": "9fl", "tc": "dblu" }, { "n": "Earthshaker", "c": "9wh" }, { "n": "Bloodtree Stump", "c": "9m9" }, { "n": "The Gavel of Pain", "i": "inv9gmu", "c": "9gm" }, { "n": "Bloodletter", "c": "9ss", "tc": "cred" }, { "n": "Coldsteel Eye", "i": "invscmu", "c": "9sm" }, { "n": "Hexfire", "i": "invsbru", "c": "9sb" }, { "n": "Blade of Ali Baba", "c": "9fc", "tc": "cred" }, { "n": "Ginther's Rift", "i": "inv9cru", "c": "9cr" }, { "n": "Headstriker", "c": "9bs", "tc": "bwht" }, { "n": "Plague Bearer", "i": "inv9lsu", "c": "9ls" }, { "n": "The Atlantean", "c": "9wd", "tc": "lblu" }, { "n": "Crainte Vomir", "i": "inv2hsu", "c": "92h" }, { "n": "Bing Sz Wang", "c": "9cm" }, { "n": "The Vile Husk", "i": "invgisu", "c": "9gs", "tc": "dgry" }, { "n": "Cloudcrack", "i": "invbswu", "c": "9b9" }, { "n": "Todesfaelle Flamme", "i": "inv9fbu", "c": "9fb" }, { "n": "Swordguard", "i": "invgsdu", "c": "9gd", "tc": "bwht" }, { "n": "Spineripper", "c": "9dg" }, { "n": "Heart Carver", "c": "9di" }, { "n": "Blackbog's Sharp", "i": "invkrsu", "c": "9kr" }, { "n": "Stormspike", "i": "inv9blu", "c": "9bl", "tc": "cblu" }, { "n": "The Impaler", "c": "9sr", "tc": "lred" }, { "n": "Kelpie Snare", "i": "invtriu", "c": "9tr" }, { "n": "Soulfeast Tine", "i": "inv9bru", "c": "9br", "tc": "lyel" }, { "n": "Hone Sundan", "c": "9st" }, { "n": "Spire of Honor", "c": "9p9", "tc": "lgry" }, { "n": "The Meat Scraper", "c": "9b7", "tc": "dred" }, { "n": "Blackleach Blade", "c": "9vo", "tc": "blac" }, { "n": "Athena's Wrath", "i": "inv9s8u", "c": "9s8" }, { "n": "Pierre Tombale Couant", "c": "9pa", "tc": "lgld" }, { "n": "Husoldal Evo", "c": "9h9" }, { "n": "Grim's Burning Dead", "c": "9wc", "tc": "cred" }, { "n": "Razorswitch", "c": "8ss" }, { "n": "Ribcracker", "c": "8ls", "tc": "lblu" }, { "n": "Chromatic Ire", "i": "invcstu", "c": "8cs" }, { "n": "Warpspear", "c": "8bs", "tc": "cblu" }, { "n": "Skull Collector", "i": "inv8wsu", "c": "8ws", "tc": "blac" }, { "n": "Skystrike", "c": "8sb" }, { "n": "Riphook", "c": "8hb", "tc": "cred" }, { "n": "Kuko Shakaku", "i": "inv8lbu", "c": "8lb", "tc": "lpur" }, { "n": "Endlesshail", "i": "invcbwu", "c": "8cb" }, { "n": "Witchwild String", "i": "inv8s8u", "c": "8s8", "tc": "lblu" }, { "n": "Cliffkiller", "c": "8l8" }, { "n": "Magewrath", "i": "invswbu", "c": "8sw" }, { "n": "Goldstrike Arch", "c": "8lw", "tc": "lgry" }, { "n": "Langer Briser", "i": "inv8lxu", "c": "8lx" }, { "n": "Pus Spitter", "i": "inv8mxu", "c": "8mx", "tc": "cgrn" }, { "n": "Buriza-Do Kyanon", "i": "invhxbu", "c": "8hx" }, { "n": "Demon Machine", "i": "invrxbu", "c": "8rx", "tc": "blac" }, { "n": "Armor" }, { "n": "Peasant Crown", "c": "xap" }, { "n": "Rockstopper", "i": "invxkpu", "c": "xkp" }, { "n": "Stealskull", "i": "invhlmu", "c": "xlm" }, { "n": "Darksight Helm", "i": "invfhlu", "c": "xhl", "tc": "blac" }, { "n": "Valkyrie Wing", "c": "xhm" }, { "n": "Crown of Thieves", "i": "invxrnu", "c": "xrn", "tc": "dgld" }, { "n": "Blackhorn's Face", "c": "xsk", "tc": "blac" }, { "n": "Vampire Gaze", "i": "invbhmu", "c": "xh9", "tc": "cgrn" }, { "n": "The Spirit Shroud", "c": "xui" }, { "n": "Skin of the Vipermagi", "c": "xea", "tc": "dblu" }, { "n": "Skin of the Flayed One", "c": "xla", "tc": "lred" }, { "n": "Iron Pelt", "i": "invxtuu", "c": "xtu", "tc": "dgry" }, { "n": "Spirit Forge", "c": "xng" }, { "n": "Crow Caw", "c": "xcl" }, { "n": "Shaftstop", "c": "xhn" }, { "n": "Duriel's Shell", "c": "xrs", "tc": "oran" }, { "n": "Skullder's Ire", "c": "xpl" }, { "n": "Guardian Angel", "c": "xlt", "tc": "lgry" }, { "n": "Toothrow", "c": "xld", "tc": "whit" }, { "n": "Atma's Wail", "c": "xth" }, { "n": "Black Hades", "c": "xul" }, { "n": "Corpsemourn", "i": "invxaru", "c": "xar", "tc": "blac" }, { "n": "Que-Hegan's Wisdom", "c": "xtp" }, { "n": "Visceratuant", "i": "invbucu", "c": "xuc" }, { "n": "Moser's Blessed Circle", "i": "invxmlu", "c": "xml" }, { "n": "Stormchaser", "i": "invxrgu", "c": "xrg", "tc": "cblu" }, { "n": "Tiamat's Rebuke", "i": "invkitu", "c": "xit", "tc": "lgry" }, { "n": "Gerke's Sanctuary", "i": "invtowu", "c": "xow", "tc": "lgrn" }, { "n": "Radament's Sphere", "i": "invgtsu", "c": "xts" }, { "n": "Lidless Wall", "i": "invxshu", "c": "xsh", "tc": "dgld" }, { "n": "Lance Guard", "i": "invxpku", "c": "xpk" }, { "n": "Venom Grip", "c": "xlg" }, { "n": "Gravepalm", "c": "xvg" }, { "n": "Ghoulhide", "c": "xmg" }, { "n": "Lava Gout", "c": "xtg" }, { "n": "Hellmouth", "c": "xhg" }, { "n": "Infernostride", "c": "xlb" }, { "n": "Waterwalk", "c": "xvb" }, { "n": "Silkweave", "c": "xmb" }, { "n": "War Traveler", "c": "xtb" }, { "n": "Gore Rider", "c": "xhb" }, { "n": "String of Ears", "c": "zlb" }, { "n": "Razortail", "c": "zvb" }, { "n": "Gloom's Trap", "c": "zmb" }, { "n": "Snowclash", "c": "ztb" }, { "n": "Thundergod's Vigor", "c": "zhb" }, {}, { "n": "Harlequin Crest", "c": "uap", "tc": "cgrn" }, { "n": "Veil of Steel", "c": "uhm", "tc": "lgry" }, { "n": "The Gladiator's Bane", "c": "utu", "tc": "lgry" }, { "n": "Arkaine's Valor", "c": "upl", "tc": "lred" }, { "n": "Blackoak Shield", "i": "invsmlu", "c": "uml" }, { "n": "Stormshield", "i": "invkitu", "c": "uit" }, { "n": "Hellslayer", "i": "invbtxu", "c": "7bt", "tc": "dred" }, { "n": "Messerschmidt's Reaver", "i": "invgaxu", "c": "7ga", "tc": "blac" }, { "n": "Baranar's Star", "i": "invmstu", "c": "7mt", "tc": "lred" }, { "n": "Schaefer's Hammer", "c": "7wh", "tc": "lblu" }, { "n": "The Cranium Basher", "c": "7gm", "tc": "blac" }, { "n": "Lightsabre", "i": "invcrsu", "c": "7cr" }, { "n": "Doombringer", "i": "invbswu", "c": "7b7", "tc": "dred" }, { "n": "The Grandfather", "i": "invgsdu", "c": "7gd", "tc": "lyel" }, { "n": "Wizardspike", "c": "7dg", "tc": "lgry" }, { "n": "Constricting Ring", "c": "rin", "tc": "cblu" }, { "n": "Stormspire", "c": "7wc", "tc": "dblu" }, { "n": "Eaglehorn", "c": "6l7", "tc": "dgld" }, { "n": "Windforce", "c": "6lw", "tc": "dyel" }, { "n": "Rings" }, { "n": "Bul-Kathos' Wedding Band", "c": "rin", "tc": "dpur" }, { "n": "The Cat's Eye", "c": "amu", "tc": "oran" }, { "n": "The Rising Sun", "c": "amu", "tc": "lgld" }, { "n": "Crescent Moon", "c": "amu", "tc": "lblu" }, { "n": "Mara's Kaleidoscope", "c": "amu", "tc": "oran" }, { "n": "Atma's Scarab", "c": "amu", "tc": "cgrn" }, { "n": "Dwarf Star", "c": "rin", "tc": "dgry" }, { "n": "Raven Frost", "c": "rin", "tc": "cblu" }, { "n": "Highlord's Wrath", "c": "amu", "tc": "bwht" }, { "n": "Saracen's Chance", "c": "amu", "tc": "dpur" }, { "n": "Class-specific" }, { "n": "Arreat's Face", "c": "baa" }, { "n": "Homunculus", "c": "nea" }, { "n": "Titan's Revenge", "c": "ama" }, { "n": "Lycander's Aim", "c": "am7" }, { "n": "Lycander's Flank", "c": "am9" }, { "n": "The Oculus", "c": "oba" }, { "n": "Herald of Zakarum", "c": "pa9" }, { "n": "Bartuc's Cut-Throat", "c": "9tw" }, { "n": "Jalal's Mane", "c": "dra" }, { "n": "The Scalper", "c": "9ta" }, { "n": "Bloodmoon", "i": "invsbru", "c": "7sb", "tc": "cred" }, { "n": "Djinn Slayer", "i": "invscmu", "c": "7sm", "tc": "dpur" }, { "n": "Deathbit", "c": "9tk" }, { "n": "Warshrike", "i": "invtk3", "c": "7bk", "tc": "bwht" }, { "n": "Gut Siphon", "i": "invrxbu", "c": "6rx", "tc": "lgrn" }, { "n": "Razor's Edge", "i": "invhaxu", "c": "7ha" }, { "n": "Gore Ripper", "tc": "dred" }, { "n": "Demon Limb", "i": "invspcu", "c": "7sp", "tc": "dgrn" }, { "n": "Steel Shade", "i": "invhlmu", "c": "ulm", "tc": "blac" }, { "n": "Tomb Reaver", "c": "7pa", "tc": "lyel" }, { "n": "Death's Web", "c": "7gw", "tc": "bwht" }, { "n": "Nature's Peace", "c": "rin", "tc": "dgrn" }, { "n": "Azurewrath", "i": "invcrs", "c": "7cr" }, { "n": "Seraph's Hymn", "i": "invamu2", "c": "amu", "tc": "bwht" }, { "n": "Zakarum's Salvation" }, { "n": "Fleshripper", "i": "invkrsu", "c": "7kr", "tc": "dred" }, { "n": "Odium" }, { "n": "Horizon's Tornado", "c": "7fl", "tc": "dpur" }, { "n": "Stone Crusher", "c": "7wh" }, { "n": "Jade Talon", "c": "7wb", "tc": "cgrn" }, { "n": "Shadow Dancer", "c": "uhb", "tc": "blac" }, { "n": "Cerebus' Bite", "c": "drb", "tc": "bwht" }, { "n": "Tyrael's Might", "i": "invaaru", "c": "uar", "tc": "dblu" }, { "n": "Soul Drainer", "c": "umg", "tc": "dred" }, { "n": "Rune Master", "c": "72a", "tc": "lblu" }, { "n": "Death Cleaver", "c": "7wa" }, { "n": "Executioner's Justice", "c": "7gi", "tc": "blac" }, { "n": "Stoneraven", "c": "amd" }, { "n": "Leviathan", "c": "uld", "tc": "cgrn" }, { "n": "Larzuk's Champion", "i": "invhfh" }, { "n": "Wisp Projector", "c": "rin", "tc": "bwht" }, { "n": "Gargoyle's Bite", "c": "7ts", "tc": "cgrn" }, { "n": "Lacerator", "c": "7b8", "tc": "blac" }, { "n": "Mang Song's Lesson", "i": "inv8wsu", "c": "6ws", "tc": "dgld" }, { "n": "Viperfork", "c": "7br", "tc": "dgrn" }, { "n": "Ethereal Edge", "c": "7ba", "tc": "whit" }, { "n": "Demonhorn's Edge", "c": "bad", "tc": "dgry" }, { "n": "The Reaper's Toll", "i": "invscy", "c": "7s8" }, { "n": "Spirit Keeper", "c": "drd" }, { "n": "Hellrack", "i": "invhxbu", "c": "6hx" }, { "n": "Alma Negra", "c": "pac", "tc": "blac" }, { "n": "Darkforce Spawn", "c": "nef", "tc": "cred" }, { "n": "Widowmaker", "i": "invswbu", "c": "6sw", "tc": "dred" }, { "n": "Blood Raven's Charge", "i": "invswbu", "c": "amb", "tc": "dgld" }, { "n": "Ghostflame", "c": "7bl", "tc": "cblu" }, { "n": "Shadow Killer", "i": "invaxfu", "c": "7cs" }, { "n": "Gimmershred", "c": "7ta" }, { "n": "Griffon's Eye", "c": "ci3" }, { "n": "Windhammer", "i": "invmau", "c": "7m7", "tc": "cblu" }, { "n": "Thunderstroke", "c": "amf", "tc": "dblu" }, { "n": "Giant Maimer", "tc": "cred" }, { "n": "Demon's Arch", "c": "7s7", "tc": "cred" }, { "n": "Boneflame", "c": "nee", "tc": "dred" }, { "n": "Steel Pillar", "c": "7p7" }, { "n": "Nightwing's Veil", "c": "uhm", "tc": "cblu" }, { "n": "Crown of Ages", "c": "urn", "tc": "dgld" }, { "n": "Andariel's Visage", "c": "usk", "tc": "dred" }, { "n": "Darkfear", "i": "invhlmu", "c": "ulm" }, { "n": "Dragonscale", "c": "pae", "tc": "dgrn" }, { "n": "Steel Carapace", "c": "uul", "tc": "dgry" }, { "n": "Medusa's Gaze", "i": "invtowu", "c": "uow", "tc": "lred" }, { "n": "Ravenlore", "c": "dre", "tc": "dgld" }, { "n": "Boneshade", "i": "invbwnu", "c": "7bw", "tc": "dgry" }, { "n": "Nethercrow", "tc": "cblu" }, { "n": "Flamebellow", "i": "invgisu", "c": "7gs", "tc": "cred" }, { "n": "Death's Fathom", "c": "obf" }, { "n": "Wolfhowl", "c": "bac", "tc": "cred" }, { "n": "Spirit Ward", "i": "invgtsu", "c": "uts", "tc": "dblu" }, { "n": "Kira's Guardian", "c": "ci2", "tc": "blac" }, { "n": "Ormus' Robes", "c": "uui", "tc": "blac" }, { "n": "Gheed's Fortune", "c": "cm3" }, { "n": "Stormlash", "c": "7fl", "tc": "dgry" }, { "n": "Halaberd's Reign", "c": "bae" }, { "n": "Warriv's Warder" }, { "n": "Spike Thorn", "i": "invspku", "c": "upk", "tc": "dyel" }, { "n": "Dracul's Grasp", "c": "uvg", "tc": "dred" }, { "n": "Frostwind", "i": "invlsdu", "c": "7ls", "tc": "cblu" }, { "n": "Templar's Might", "i": "invaaru", "c": "uar", "tc": "cgrn" }, { "n": "Eschuta's Temper", "c": "obc" }, { "n": "Firelizard's Talons", "c": "7lw" }, { "n": "Sandstorm Trek", "c": "uvb" }, { "n": "Marrowwalk", "c": "umb" }, { "n": "Heaven's Light", "c": "7sc", "tc": "cblu" }, { "n": "Merman's Sprocket" }, { "n": "Arachnid Mesh", "c": "ulc", "tc": "blac" }, { "n": "Nosferatu's Coil", "c": "uvc" }, { "n": "Metalgrid", "c": "amu" }, { "n": "Verdungo's Hearty Cord", "c": "umc", "tc": "blac" }, { "n": "Siggard's Stealth" }, { "n": "Carrion Wind", "c": "rin" }, { "n": "Giant Skull", "i": "invbhm", "c": "uh9", "tc": "lgry" }, { "n": "Astreon's Iron Ward", "c": "7ws", "tc": "blac" }, { "n": "Annihilus", "i": "invmss", "c": "cm1" }, { "n": "Arioc's Needle", "c": "7sr" }, { "n": "Cranebeak", "i": "invmpiu", "c": "7mp" }, { "n": "Nord's Tenderizer", "i": "invclbu", "c": "7cl" }, { "n": "Earth Shifter", "c": "7gm" }, { "n": "Wraith Flight", "c": "7gl", "tc": "dblu" }, { "n": "Bonehew", "c": "7o7", "tc": "bwht" }, { "n": "Ondal's Wisdom", "i": "invcstu", "c": "6cs" }, { "n": "The Redeemer", "c": "7sc" }, { "n": "Head Hunter's Glory", "i": "invbshu", "c": "ush" }, { "n": "Steelrend", "c": "uhg" }, { "n": "Rainbow Facet", "c": "jew" }, { "n": "Rainbow Facet", "c": "jew" }, { "n": "Rainbow Facet", "c": "jew" }, { "n": "Rainbow Facet", "c": "jew" }, { "n": "Rainbow Facet", "c": "jew" }, { "n": "Rainbow Facet", "c": "jew" }, { "n": "Rainbow Facet", "c": "jew" }, { "n": "Rainbow Facet", "c": "jew" }, { "n": "Hellfire Torch", "i": "invtrch", "c": "cm2" }, { "n": "Cold Rupture", "c": "cm3", "tc": "lblu" }, { "n": "Flame Rift", "c": "cm3", "tc": "lred" }, { "n": "Crack of the Heavens", "c": "cm3", "tc": "lyel" }, { "n": "Rotting Fissure", "c": "cm3", "tc": "lgrn" }, { "n": "Bone Break", "c": "cm3", "tc": "whit" }, { "n": "Black Cleft", "c": "cm3", "tc": "lgry" }], "stackables": { "tkf": { "n": "Throwing Knife" }, "tax": { "n": "Throwing Axe" }, "bkf": { "n": "Balanced Knife" }, "bal": { "n": "Balanced Axe" }, "jav": { "n": "Javelin" }, "pil": { "n": "Pilum" }, "ssp": { "n": "Short Spear" }, "glv": { "n": "Glaive" }, "tsp": { "n": "Throwing Spear" }, "gps": { "n": "Rancid Gas Potion" }, "ops": { "n": "Oil Potion" }, "gpm": { "n": "Choking Gas Potion" }, "opm": { "n": "Exploding Potion" }, "gpl": { "n": "Strangling Gas Potion" }, "opl": { "n": "Fulminating Potion" }, "9tk": { "n": "Battle Dart" }, "9ta": { "n": "Francisca" }, "9bk": { "n": "War Dart" }, "9b8": { "n": "Hurlbat" }, "9ja": { "n": "War Javelin" }, "9pi": { "n": "Great Pilum" }, "9s9": { "n": "Simbilan" }, "9gl": { "n": "Spiculum" }, "9ts": { "n": "Harpoon" }, "7tk": { "n": "Flying Knife" }, "7ta": { "n": "Flying Axe" }, "7bk": { "n": "Winged Knife" }, "7b8": { "n": "Winged Axe" }, "7ja": { "n": "Hyperion Javelin" }, "7pi": { "n": "Stygian Pilum" }, "7s7": { "n": "Balrog Spear" }, "7gl": { "n": "Ghost Glaive" }, "7ts": { "n": "Winged Harpoon" }, "am5": { "n": "Maiden Javelin" }, "ama": { "n": "Ceremonial Javelin" }, "amf": { "n": "Matriarchal Javelin" }, "tbk": { "n": "Tome of Town Portal" }, "ibk": { "n": "Tome of Identify" }, "gld": { "n": "Gold" }, "aqv": { "n": "Arrows" }, "cqv": { "n": "Bolts" }, "key": { "n": "Key" }, "rps": {}, "rpl": {}, "bps": {}, "bpl": {} }, "armor_items": { "cap": { "nc": "cap", "exc": "xap", "elc": "uap", "iq": 0, "n": "Cap", "minac": 3, "maxac": 5, "durability": 12, "rs": 0, "rd": 0, "hi": 1, "gt": 1, "i": "invcap", "ui": "invcapu", "si": "invcapu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "skp": { "nc": "skp", "exc": "xkp", "elc": "ukp", "iq": 0, "n": "Skull Cap", "minac": 8, "maxac": 11, "durability": 18, "rs": 15, "rd": 0, "hi": 1, "gt": 1, "i": "invskp", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "hlm": { "nc": "hlm", "exc": "xlm", "elc": "ulm", "iq": 0, "n": "Helm", "minac": 15, "maxac": 18, "durability": 24, "rs": 26, "rd": 0, "hi": 1, "gt": 1, "i": "invhlm", "ui": "invhlmu", "si": "invhlmu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "fhl": { "nc": "fhl", "exc": "xhl", "elc": "uhl", "iq": 0, "n": "Full Helm", "minac": 23, "maxac": 26, "durability": 30, "rs": 41, "rd": 0, "hi": 1, "gt": 1, "i": "invfhl", "ui": "invfhlu", "si": "invfhlu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "ghm": { "nc": "ghm", "exc": "xhm", "elc": "uhm", "iq": 0, "n": "Great Helm", "minac": 30, "maxac": 35, "durability": 40, "rs": 63, "rd": 0, "hi": 1, "gt": 1, "i": "invghm", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "crn": { "nc": "crn", "exc": "xrn", "elc": "urn", "iq": 0, "n": "Crown", "minac": 25, "maxac": 45, "durability": 50, "rs": 55, "rd": 0, "hi": 1, "gt": 1, "i": "invcrn", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "msk": { "nc": "msk", "exc": "xsk", "elc": "usk", "iq": 0, "n": "Mask", "minac": 9, "maxac": 27, "durability": 20, "rs": 23, "rd": 0, "hi": 1, "gt": 1, "i": "invmsk", "iw": 2, "ih": 2, "it": 2, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "qui": { "nc": "qui", "exc": "xui", "elc": "uui", "iq": 0, "n": "Quilted Armor", "minac": 8, "maxac": 11, "durability": 20, "rs": 12, "rd": 0, "hi": 1, "gt": 1, "i": "invqlt", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "lea": { "nc": "lea", "exc": "xea", "elc": "uea", "iq": 0, "n": "Leather Armor", "minac": 14, "maxac": 17, "durability": 24, "rs": 15, "rd": 0, "hi": 1, "gt": 1, "i": "invlea", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "hla": { "nc": "hla", "exc": "xla", "elc": "ula", "iq": 0, "n": "Hard Leather Armor", "minac": 21, "maxac": 24, "durability": 28, "rs": 20, "rd": 0, "hi": 1, "gt": 1, "i": "invhla", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "stu": { "nc": "stu", "exc": "xtu", "elc": "utu", "iq": 0, "n": "Studded Leather", "minac": 32, "maxac": 35, "durability": 32, "rs": 27, "rd": 0, "hi": 1, "gt": 1, "i": "invstu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "rng": { "nc": "rng", "exc": "xng", "elc": "ung", "iq": 0, "n": "Ring Mail", "minac": 45, "maxac": 48, "durability": 26, "rs": 36, "rd": 0, "hi": 1, "gt": 1, "i": "invrng", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "scl": { "nc": "scl", "exc": "xcl", "elc": "ucl", "iq": 0, "n": "Scale Mail", "minac": 57, "maxac": 60, "durability": 36, "rs": 44, "rd": 0, "hi": 1, "gt": 1, "i": "invscl", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "chn": { "nc": "chn", "exc": "xhn", "elc": "uhn", "iq": 0, "n": "Chain Mail", "minac": 72, "maxac": 75, "durability": 45, "rs": 48, "rd": 0, "hi": 1, "gt": 1, "i": "invchn", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "brs": { "nc": "brs", "exc": "xrs", "elc": "urs", "iq": 0, "n": "Breast Plate", "minac": 65, "maxac": 68, "durability": 50, "rs": 30, "rd": 0, "hi": 1, "gt": 1, "i": "invbrs", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "spl": { "nc": "spl", "exc": "xpl", "elc": "upl", "iq": 0, "n": "Splint Mail", "minac": 90, "maxac": 95, "durability": 30, "rs": 51, "rd": 0, "hi": 1, "gt": 1, "i": "invspl", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "plt": { "nc": "plt", "exc": "xlt", "elc": "ult", "iq": 0, "n": "Plate Mail", "minac": 108, "maxac": 116, "durability": 60, "rs": 65, "rd": 0, "hi": 1, "gt": 1, "i": "invplt", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "fld": { "nc": "fld", "exc": "xld", "elc": "uld", "iq": 0, "n": "Field Plate", "minac": 101, "maxac": 105, "durability": 48, "rs": 55, "rd": 0, "hi": 1, "gt": 1, "i": "invfld", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "gth": { "nc": "gth", "exc": "xth", "elc": "uth", "iq": 0, "n": "Gothic Plate", "minac": 128, "maxac": 135, "durability": 55, "rs": 70, "rd": 0, "hi": 1, "gt": 1, "i": "invgth", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "ful": { "nc": "ful", "exc": "xul", "elc": "uul", "iq": 0, "n": "Full Plate Mail", "minac": 150, "maxac": 161, "durability": 70, "rs": 80, "rd": 0, "hi": 1, "gt": 1, "i": "invful", "ui": "invfulu", "si": "invfulu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "aar": { "nc": "aar", "exc": "xar", "elc": "uar", "iq": 0, "n": "Ancient Armor", "minac": 218, "maxac": 233, "durability": 60, "rs": 100, "rd": 0, "hi": 1, "gt": 1, "i": "invaar", "ui": "invaaru", "si": "invaaru", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "ltp": { "nc": "ltp", "exc": "xtp", "elc": "utp", "iq": 0, "n": "Light Plate", "minac": 90, "maxac": 107, "durability": 60, "rs": 41, "rd": 0, "hi": 1, "gt": 1, "i": "invltp", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "buc": { "nc": "buc", "exc": "xuc", "elc": "uuc", "iq": 0, "n": "Buckler", "minac": 4, "maxac": 6, "durability": 12, "mind": 1, "maxd": 3, "rs": 12, "rd": 0, "hi": 1, "gt": 2, "i": "invbuc", "ui": "invbucu", "si": "invbucu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "sml": { "nc": "sml", "exc": "xml", "elc": "uml", "iq": 0, "n": "Small Shield", "minac": 8, "maxac": 10, "durability": 16, "mind": 2, "maxd": 3, "rs": 22, "rd": 0, "hi": 1, "gt": 2, "i": "invsml", "ui": "invsmlu", "si": "invsmlu", "iw": 2, "ih": 2, "it": 5, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "lrg": { "nc": "lrg", "exc": "xrg", "elc": "urg", "iq": 0, "n": "Large Shield", "minac": 12, "maxac": 14, "durability": 24, "mind": 2, "maxd": 4, "rs": 34, "rd": 0, "hi": 1, "gt": 2, "i": "invlrg", "ui": "invlrgu", "si": "invlrgu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "kit": { "nc": "kit", "exc": "xit", "elc": "uit", "iq": 0, "n": "Kite Shield", "minac": 16, "maxac": 18, "durability": 30, "mind": 2, "maxd": 5, "rs": 47, "rd": 0, "hi": 1, "gt": 2, "i": "invkit", "ui": "invkitu", "si": "invkitu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "tow": { "nc": "tow", "exc": "xow", "elc": "uow", "iq": 0, "n": "Tower Shield", "minac": 22, "maxac": 25, "durability": 60, "mind": 1, "maxd": 5, "rs": 75, "rd": 0, "hi": 1, "gt": 2, "i": "invtow", "ui": "invtowu", "si": "invtowu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "gts": { "nc": "gts", "exc": "xts", "elc": "uts", "iq": 0, "n": "Gothic Shield", "minac": 30, "maxac": 35, "durability": 40, "mind": 2, "maxd": 6, "rs": 60, "rd": 0, "hi": 1, "gt": 2, "i": "invgts", "ui": "invgtsu", "si": "invgtsu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "lgl": { "nc": "lgl", "exc": "xlg", "elc": "ulg", "iq": 0, "n": "Leather Gloves", "minac": 2, "maxac": 3, "durability": 12, "rs": 0, "rd": 0, "hi": 0, "gt": 0, "i": "invlgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "vgl": { "nc": "vgl", "exc": "xvg", "elc": "uvg", "iq": 0, "n": "Heavy Gloves", "minac": 5, "maxac": 6, "durability": 14, "rs": 0, "rd": 0, "hi": 0, "gt": 0, "i": "invvgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "mgl": { "nc": "mgl", "exc": "xmg", "elc": "umg", "iq": 0, "n": "Chain Gloves", "minac": 8, "maxac": 9, "durability": 16, "rs": 25, "rd": 0, "hi": 0, "gt": 0, "i": "invmgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "tgl": { "nc": "tgl", "exc": "xtg", "elc": "utg", "iq": 0, "n": "Light Gauntlets", "minac": 9, "maxac": 11, "durability": 18, "rs": 45, "rd": 0, "hi": 0, "gt": 0, "i": "invtgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "hgl": { "nc": "hgl", "exc": "xhg", "elc": "uhg", "iq": 0, "n": "Gauntlets", "minac": 12, "maxac": 15, "durability": 24, "rs": 60, "rd": 0, "hi": 0, "gt": 0, "i": "invhgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "lbt": { "nc": "lbt", "exc": "xlb", "elc": "ulb", "iq": 0, "n": "Boots", "minac": 2, "maxac": 3, "durability": 12, "mind": 3, "maxd": 8, "rs": 0, "rd": 0, "hi": 0, "gt": 0, "i": "invlbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "vbt": { "nc": "vbt", "exc": "xvb", "elc": "uvb", "iq": 0, "n": "Heavy Boots", "minac": 5, "maxac": 6, "durability": 14, "mind": 4, "maxd": 10, "rs": 18, "rd": 0, "hi": 0, "gt": 0, "i": "invvbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "mbt": { "nc": "mbt", "exc": "xmb", "elc": "umb", "iq": 0, "n": "Chain Boots", "minac": 8, "maxac": 9, "durability": 16, "mind": 6, "maxd": 12, "rs": 30, "rd": 0, "hi": 0, "gt": 0, "i": "invmbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "tbt": { "nc": "tbt", "exc": "xtb", "elc": "utb", "iq": 0, "n": "Light Plated Boots", "minac": 9, "maxac": 11, "durability": 18, "mind": 8, "maxd": 16, "rs": 50, "rd": 0, "hi": 0, "gt": 0, "i": "invtbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "hbt": { "nc": "hbt", "exc": "xhb", "elc": "uhb", "iq": 0, "n": "Greaves", "minac": 12, "maxac": 15, "durability": 24, "mind": 10, "maxd": 20, "rs": 70, "rd": 0, "hi": 0, "gt": 0, "i": "invhbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "lbl": { "nc": "lbl", "exc": "zlb", "elc": "ulc", "iq": 0, "n": "Sash", "minac": 2, "maxac": 2, "durability": 12, "rs": 0, "rd": 0, "hi": 0, "gt": 0, "i": "invlbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "vbl": { "nc": "vbl", "exc": "zvb", "elc": "uvc", "iq": 0, "n": "Light Belt", "minac": 3, "maxac": 3, "durability": 14, "rs": 0, "rd": 0, "hi": 0, "gt": 0, "i": "invvbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "mbl": { "nc": "mbl", "exc": "zmb", "elc": "umc", "iq": 0, "n": "Belt", "minac": 5, "maxac": 5, "durability": 16, "rs": 25, "rd": 0, "hi": 0, "gt": 0, "i": "invmbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "tbl": { "nc": "tbl", "exc": "ztb", "elc": "utc", "iq": 0, "n": "Heavy Belt", "minac": 6, "maxac": 6, "durability": 18, "rs": 45, "rd": 0, "hi": 0, "gt": 0, "i": "invtbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "hbl": { "nc": "hbl", "exc": "zhb", "elc": "uhc", "iq": 0, "n": "Plated Belt", "minac": 8, "maxac": 11, "durability": 24, "rs": 60, "rd": 0, "hi": 0, "gt": 0, "i": "invhbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "bhm": { "nc": "bhm", "exc": "xh9", "elc": "uh9", "iq": 0, "n": "Bone Helm", "minac": 33, "maxac": 36, "durability": 40, "rs": 25, "rd": 0, "hi": 1, "gt": 1, "i": "invbhm", "ui": "invbhmu", "si": "invbhmu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "bsh": { "nc": "bsh", "exc": "xsh", "elc": "ush", "iq": 0, "n": "Bone Shield", "minac": 10, "maxac": 30, "durability": 40, "mind": 3, "maxd": 6, "rs": 25, "rd": 0, "hi": 1, "gt": 2, "i": "invbsh", "ui": "invbshu", "si": "invbshu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "spk": { "nc": "spk", "exc": "xpk", "elc": "upk", "iq": 0, "n": "Spiked Shield", "minac": 15, "maxac": 25, "durability": 40, "mind": 5, "maxd": 9, "rs": 30, "rd": 0, "hi": 1, "gt": 2, "i": "invspk", "ui": "invspku", "si": "invspku", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "xap": { "nc": "cap", "exc": "xap", "elc": "uap", "iq": 1, "n": "War Hat", "minac": 45, "maxac": 53, "durability": 12, "rs": 20, "rd": 0, "hi": 1, "gt": 1, "i": "invcap", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "xkp": { "nc": "skp", "exc": "xkp", "elc": "ukp", "iq": 1, "n": "Sallet", "minac": 52, "maxac": 62, "durability": 18, "rs": 43, "rd": 0, "hi": 1, "gt": 1, "i": "invskp", "ui": "invxkpu", "si": "invxkpu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "xlm": { "nc": "hlm", "exc": "xlm", "elc": "ulm", "iq": 1, "n": "Casque", "minac": 63, "maxac": 72, "durability": 24, "rs": 59, "rd": 0, "hi": 1, "gt": 1, "i": "invhlm", "ui": "invhlmu", "si": "invhlmu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "xhl": { "nc": "fhl", "exc": "xhl", "elc": "uhl", "iq": 1, "n": "Basinet", "minac": 75, "maxac": 84, "durability": 30, "rs": 82, "rd": 0, "hi": 1, "gt": 1, "i": "invfhl", "ui": "invfhlu", "si": "invfhlu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "xhm": { "nc": "ghm", "exc": "xhm", "elc": "uhm", "iq": 1, "n": "Winged Helm", "minac": 85, "maxac": 98, "durability": 40, "rs": 115, "rd": 0, "hi": 1, "gt": 1, "i": "invghm", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "xrn": { "nc": "crn", "exc": "xrn", "elc": "urn", "iq": 1, "n": "Grand Crown", "minac": 78, "maxac": 113, "durability": 50, "rs": 103, "rd": 0, "hi": 1, "gt": 1, "i": "invcrn", "ui": "invxrnu", "si": "invxrnu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "xsk": { "nc": "msk", "exc": "xsk", "elc": "usk", "iq": 1, "n": "Death Mask", "minac": 54, "maxac": 86, "durability": 20, "rs": 55, "rd": 0, "hi": 1, "gt": 1, "i": "invmsk", "iw": 2, "ih": 2, "it": 2, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "xui": { "nc": "qui", "exc": "xui", "elc": "uui", "iq": 1, "n": "Ghost Armor", "minac": 102, "maxac": 117, "durability": 20, "rs": 38, "rd": 0, "hi": 1, "gt": 1, "i": "invqlt", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xea": { "nc": "lea", "exc": "xea", "elc": "uea", "iq": 1, "n": "Serpentskin Armor", "minac": 111, "maxac": 126, "durability": 24, "rs": 43, "rd": 0, "hi": 1, "gt": 1, "i": "invlea", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xla": { "nc": "hla", "exc": "xla", "elc": "ula", "iq": 1, "n": "Demonhide Armor", "minac": 122, "maxac": 136, "durability": 28, "rs": 50, "rd": 0, "hi": 1, "gt": 1, "i": "invhla", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xtu": { "nc": "stu", "exc": "xtu", "elc": "utu", "iq": 1, "n": "Trellised Armor", "minac": 138, "maxac": 153, "durability": 32, "rs": 61, "rd": 0, "hi": 1, "gt": 1, "i": "invstu", "ui": "invxtuu", "si": "invxtuu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xng": { "nc": "rng", "exc": "xng", "elc": "ung", "iq": 1, "n": "Linked Mail", "minac": 158, "maxac": 172, "durability": 26, "rs": 74, "rd": 0, "hi": 1, "gt": 1, "i": "invrng", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xcl": { "nc": "scl", "exc": "xcl", "elc": "ucl", "iq": 1, "n": "Tigulated Mail", "minac": 176, "maxac": 190, "durability": 36, "rs": 86, "rd": 0, "hi": 1, "gt": 1, "i": "invscl", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xhn": { "nc": "chn", "exc": "xhn", "elc": "uhn", "iq": 1, "n": "Mesh Armor", "minac": 198, "maxac": 213, "durability": 45, "rs": 92, "rd": 0, "hi": 1, "gt": 1, "i": "invchn", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xrs": { "nc": "brs", "exc": "xrs", "elc": "urs", "iq": 1, "n": "Cuirass", "minac": 188, "maxac": 202, "durability": 50, "rs": 65, "rd": 0, "hi": 1, "gt": 1, "i": "invbrs", "si": "invxrss", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xpl": { "nc": "spl", "exc": "xpl", "elc": "upl", "iq": 1, "n": "Russet Armor", "minac": 225, "maxac": 243, "durability": 30, "rs": 97, "rd": 0, "hi": 1, "gt": 1, "i": "invspl", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xlt": { "nc": "plt", "exc": "xlt", "elc": "ult", "iq": 1, "n": "Templar Coat", "minac": 252, "maxac": 274, "durability": 60, "rs": 118, "rd": 0, "hi": 1, "gt": 1, "i": "invplt", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xld": { "nc": "fld", "exc": "xld", "elc": "uld", "iq": 1, "n": "Sharktooth Armor", "minac": 242, "maxac": 258, "durability": 48, "rs": 103, "rd": 0, "hi": 1, "gt": 1, "i": "invfld", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xth": { "nc": "gth", "exc": "xth", "elc": "uth", "iq": 1, "n": "Embossed Plate", "minac": 282, "maxac": 303, "durability": 55, "rs": 125, "rd": 0, "hi": 1, "gt": 1, "i": "invgth", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xul": { "nc": "ful", "exc": "xul", "elc": "uul", "iq": 1, "n": "Chaos Armor", "minac": 315, "maxac": 342, "durability": 70, "rs": 140, "rd": 0, "hi": 1, "gt": 1, "i": "invful", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xar": { "nc": "aar", "exc": "xar", "elc": "uar", "iq": 1, "n": "Ornate Plate", "minac": 417, "maxac": 450, "durability": 60, "rs": 170, "rd": 0, "hi": 1, "gt": 1, "i": "invaar", "ui": "invxaru", "si": "invxaru", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xtp": { "nc": "ltp", "exc": "xtp", "elc": "utp", "iq": 1, "n": "Mage Plate", "minac": 225, "maxac": 261, "durability": 60, "rs": 55, "rd": 0, "hi": 1, "gt": 1, "i": "invltp", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "xuc": { "nc": "buc", "exc": "xuc", "elc": "uuc", "iq": 1, "n": "Defender", "minac": 41, "maxac": 49, "durability": 68, "mind": 8, "maxd": 12, "rs": 38, "rd": 0, "hi": 1, "gt": 2, "i": "invbuc", "ui": "invbucu", "si": "invbucu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "xml": { "nc": "sml", "exc": "xml", "elc": "uml", "iq": 1, "n": "Round Shield", "minac": 47, "maxac": 55, "durability": 64, "mind": 7, "maxd": 14, "rs": 53, "rd": 0, "hi": 1, "gt": 2, "i": "invsml", "ui": "invxmlu", "si": "invxmlu", "iw": 2, "ih": 2, "it": 5, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "xrg": { "nc": "lrg", "exc": "xrg", "elc": "urg", "iq": 1, "n": "Scutum", "minac": 53, "maxac": 61, "durability": 62, "mind": 11, "maxd": 15, "rs": 71, "rd": 0, "hi": 1, "gt": 2, "i": "invlrg", "ui": "invxrgu", "si": "invxrgu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "xit": { "nc": "kit", "exc": "xit", "elc": "uit", "iq": 1, "n": "Dragon Shield", "minac": 59, "maxac": 67, "durability": 76, "mind": 15, "maxd": 24, "rs": 91, "rd": 0, "hi": 1, "gt": 2, "i": "invkit", "ui": "invkitu", "si": "invkitu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "xow": { "nc": "tow", "exc": "xow", "elc": "uow", "iq": 1, "n": "Pavise", "minac": 68, "maxac": 78, "durability": 72, "mind": 10, "maxd": 17, "rs": 133, "rd": 0, "hi": 1, "gt": 2, "i": "invtow", "ui": "invtowu", "si": "invtowu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "xts": { "nc": "gts", "exc": "xts", "elc": "uts", "iq": 1, "n": "Ancient Shield", "minac": 80, "maxac": 93, "durability": 80, "mind": 12, "maxd": 16, "rs": 110, "rd": 0, "hi": 1, "gt": 2, "i": "invgts", "ui": "invgtsu", "si": "invgtsu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "xlg": { "nc": "lgl", "exc": "xlg", "elc": "ulg", "iq": 1, "n": "Demonhide Gloves", "minac": 28, "maxac": 35, "durability": 12, "rs": 20, "rd": 0, "hi": 0, "gt": 0, "i": "invlgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "xvg": { "nc": "vgl", "exc": "xvg", "elc": "uvg", "iq": 1, "n": "Sharkskin Gloves", "minac": 33, "maxac": 39, "durability": 14, "rs": 20, "rd": 0, "hi": 0, "gt": 0, "i": "invvgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "xmg": { "nc": "mgl", "exc": "xmg", "elc": "umg", "iq": 1, "n": "Heavy Bracers", "minac": 37, "maxac": 44, "durability": 16, "rs": 58, "rd": 0, "hi": 0, "gt": 0, "i": "invmgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "xtg": { "nc": "tgl", "exc": "xtg", "elc": "utg", "iq": 1, "n": "Battle Gauntlets", "minac": 39, "maxac": 47, "durability": 18, "rs": 88, "rd": 0, "hi": 0, "gt": 0, "i": "invtgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "xhg": { "nc": "hgl", "exc": "xhg", "elc": "uhg", "iq": 1, "n": "War Gauntlets", "minac": 43, "maxac": 53, "durability": 24, "rs": 110, "rd": 0, "hi": 0, "gt": 0, "i": "invhgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "xlb": { "nc": "lbt", "exc": "xlb", "elc": "ulb", "iq": 1, "n": "Demonhide Boots", "minac": 28, "maxac": 35, "durability": 12, "mind": 26, "maxd": 46, "rs": 20, "rd": 0, "hi": 0, "gt": 0, "i": "invlbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "xvb": { "nc": "vbt", "exc": "xvb", "elc": "uvb", "iq": 1, "n": "Sharkskin Boots", "minac": 33, "maxac": 39, "durability": 14, "mind": 28, "maxd": 50, "rs": 47, "rd": 0, "hi": 0, "gt": 0, "i": "invvbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "xmb": { "nc": "mbt", "exc": "xmb", "elc": "umb", "iq": 1, "n": "Mesh Boots", "minac": 37, "maxac": 44, "durability": 16, "mind": 23, "maxd": 52, "rs": 65, "rd": 0, "hi": 0, "gt": 0, "i": "invmbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "xtb": { "nc": "tbt", "exc": "xtb", "elc": "utb", "iq": 1, "n": "Battle Boots", "minac": 39, "maxac": 47, "durability": 18, "mind": 37, "maxd": 64, "rs": 95, "rd": 0, "hi": 0, "gt": 0, "i": "invtbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "xhb": { "nc": "hbt", "exc": "xhb", "elc": "uhb", "iq": 1, "n": "War Boots", "minac": 43, "maxac": 53, "durability": 24, "mind": 39, "maxd": 80, "rs": 125, "rd": 0, "hi": 0, "gt": 0, "i": "invhbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "zlb": { "nc": "lbl", "exc": "zlb", "elc": "ulc", "iq": 1, "n": "Demonhide Sash", "minac": 29, "maxac": 34, "durability": 12, "rs": 20, "rd": 0, "hi": 0, "gt": 0, "i": "invlbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "zvb": { "nc": "vbl", "exc": "zvb", "elc": "uvc", "iq": 1, "n": "Sharkskin Belt", "minac": 31, "maxac": 36, "durability": 14, "rs": 20, "rd": 0, "hi": 0, "gt": 0, "i": "invvbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "zmb": { "nc": "mbl", "exc": "zmb", "elc": "umc", "iq": 1, "n": "Mesh Belt", "minac": 35, "maxac": 40, "durability": 16, "rs": 58, "rd": 0, "hi": 0, "gt": 0, "i": "invmbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "ztb": { "nc": "tbl", "exc": "ztb", "elc": "utc", "iq": 1, "n": "Battle Belt", "minac": 37, "maxac": 42, "durability": 18, "rs": 88, "rd": 0, "hi": 0, "gt": 0, "i": "invtbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "zhb": { "nc": "hbl", "exc": "zhb", "elc": "uhc", "iq": 1, "n": "War Belt", "minac": 41, "maxac": 52, "durability": 24, "rs": 110, "rd": 0, "hi": 0, "gt": 0, "i": "invhbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "xh9": { "nc": "bhm", "exc": "xh9", "elc": "uh9", "iq": 1, "n": "Grim Helm", "minac": 60, "maxac": 125, "durability": 40, "rs": 58, "rd": 0, "hi": 1, "gt": 1, "i": "invbhm", "ui": "invbhmu", "si": "invbhmu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "xsh": { "nc": "bsh", "exc": "xsh", "elc": "ush", "iq": 1, "n": "Grim Shield", "minac": 50, "maxac": 150, "durability": 70, "mind": 14, "maxd": 20, "rs": 58, "rd": 0, "hi": 1, "gt": 2, "i": "invbsh", "ui": "invxshu", "si": "invxshu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "xpk": { "nc": "spk", "exc": "xpk", "elc": "upk", "iq": 1, "n": "Barbed Shield", "minac": 58, "maxac": 78, "durability": 55, "mind": 18, "maxd": 35, "rs": 65, "rd": 0, "hi": 1, "gt": 2, "i": "invspk", "ui": "invxpku", "si": "invxpku", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "dr1": { "nc": "dr1", "exc": "dr6", "elc": "drb", "iq": 0, "n": "Wolf Head", "minac": 8, "maxac": 11, "durability": 20, "rs": 16, "rd": 0, "hi": 1, "gt": 1, "i": "invdr1", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "dr2": { "nc": "dr2", "exc": "dr7", "elc": "drc", "iq": 0, "n": "Hawk Helm", "minac": 4, "maxac": 15, "durability": 20, "rs": 20, "rd": 0, "hi": 1, "gt": 1, "i": "invdr2", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "dr3": { "nc": "dr3", "exc": "dr8", "elc": "drd", "iq": 0, "n": "Antlers", "minac": 18, "maxac": 24, "durability": 20, "rs": 24, "rd": 0, "hi": 1, "gt": 1, "i": "invdr3", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "dr4": { "nc": "dr4", "exc": "dr9", "elc": "dre", "iq": 0, "n": "Falcon Mask", "minac": 12, "maxac": 28, "durability": 20, "rs": 28, "rd": 0, "hi": 1, "gt": 1, "i": "invdr4", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "dr5": { "nc": "dr5", "exc": "dra", "elc": "drf", "iq": 0, "n": "Spirit Mask", "minac": 22, "maxac": 35, "durability": 20, "rs": 30, "rd": 0, "hi": 1, "gt": 1, "i": "invdr5", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "ba1": { "nc": "ba1", "exc": "ba6", "elc": "bab", "iq": 0, "n": "Jawbone Cap", "minac": 10, "maxac": 15, "durability": 25, "rs": 25, "rd": 0, "hi": 1, "gt": 1, "i": "invba1", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "ba2": { "nc": "ba2", "exc": "ba7", "elc": "bac", "iq": 0, "n": "Fanged Helm", "minac": 15, "maxac": 20, "durability": 35, "rs": 35, "rd": 0, "hi": 1, "gt": 1, "i": "invba2", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "ba3": { "nc": "ba3", "exc": "ba8", "elc": "bad", "iq": 0, "n": "Horned Helm", "minac": 25, "maxac": 30, "durability": 45, "rs": 45, "rd": 0, "hi": 1, "gt": 1, "i": "invba3", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "ba4": { "nc": "ba4", "exc": "ba9", "elc": "bae", "iq": 0, "n": "Assault Helmet", "minac": 30, "maxac": 35, "durability": 50, "rs": 55, "rd": 0, "hi": 1, "gt": 1, "i": "invba4", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "ba5": { "nc": "ba5", "exc": "baa", "elc": "baf", "iq": 0, "n": "Avenger Guard", "minac": 35, "maxac": 50, "durability": 55, "rs": 65, "rd": 0, "hi": 1, "gt": 1, "i": "invba5", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "pa1": { "nc": "pa1", "exc": "pa6", "elc": "pab", "iq": 0, "n": "Targe", "minac": 8, "maxac": 12, "durability": 20, "mind": 2, "maxd": 6, "rs": 16, "rd": 0, "hi": 1, "gt": 2, "i": "invpa1", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "pa2": { "nc": "pa2", "exc": "pa7", "elc": "pac", "iq": 0, "n": "Rondache", "minac": 10, "maxac": 18, "durability": 30, "mind": 2, "maxd": 8, "rs": 26, "rd": 0, "hi": 1, "gt": 2, "i": "invpa2", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "pa3": { "nc": "pa3", "exc": "pa8", "elc": "pad", "iq": 0, "n": "Heraldic Shield", "minac": 16, "maxac": 26, "durability": 40, "mind": 3, "maxd": 9, "rs": 40, "rd": 0, "hi": 1, "gt": 2, "i": "invpa3", "iw": 2, "ih": 4, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "pa4": { "nc": "pa4", "exc": "pa9", "elc": "pae", "iq": 0, "n": "Aerin Shield", "minac": 26, "maxac": 36, "durability": 50, "mind": 4, "maxd": 10, "rs": 50, "rd": 0, "hi": 1, "gt": 2, "i": "invpa4", "iw": 2, "ih": 4, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "pa5": { "nc": "pa5", "exc": "paa", "elc": "paf", "iq": 0, "n": "Crown Shield", "minac": 30, "maxac": 40, "durability": 60, "mind": 4, "maxd": 12, "rs": 65, "rd": 0, "hi": 1, "gt": 2, "i": "invpa5", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "ne1": { "nc": "ne1", "exc": "ne6", "elc": "neb", "iq": 0, "n": "Preserved Head", "minac": 2, "maxac": 5, "durability": 20, "rs": 12, "rd": 0, "hi": 1, "gt": 2, "i": "invne1", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "ne2": { "nc": "ne2", "exc": "ne7", "elc": "neg", "iq": 0, "n": "Zombie Head", "minac": 4, "maxac": 8, "durability": 20, "rs": 14, "rd": 0, "hi": 1, "gt": 2, "i": "invne2", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "ne3": { "nc": "ne3", "exc": "ne8", "elc": "ned", "iq": 0, "n": "Unraveller Head", "minac": 6, "maxac": 10, "durability": 20, "rs": 18, "rd": 0, "hi": 1, "gt": 2, "i": "invne3", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "ne4": { "nc": "ne4", "exc": "ne9", "elc": "nee", "iq": 0, "n": "Gargoyle Head", "minac": 10, "maxac": 16, "durability": 20, "rs": 20, "rd": 0, "hi": 1, "gt": 2, "i": "invne4", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "ne5": { "nc": "ne5", "exc": "nea", "elc": "nef", "iq": 0, "n": "Demon Head", "minac": 15, "maxac": 20, "durability": 20, "rs": 25, "rd": 0, "hi": 1, "gt": 2, "i": "invne5", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "ci0": { "nc": "ci0", "exc": "ci2", "elc": "ci3", "iq": 0, "n": "Circlet", "minac": 20, "maxac": 30, "durability": 35, "rs": 0, "rd": 0, "hi": 1, "gt": 1, "i": "invci0", "iw": 2, "ih": 2, "it": 2, "ig": [], "eq1n": "Helm", "c": ["Circlet", "Helm", "Any Armor"] }, "ci1": { "nc": "ci1", "exc": "ci2", "elc": "ci3", "iq": 0, "n": "Coronet", "minac": 30, "maxac": 40, "durability": 30, "rs": 0, "rd": 0, "hi": 1, "gt": 1, "i": "invci1", "iw": 2, "ih": 2, "it": 2, "ig": [], "eq1n": "Helm", "c": ["Circlet", "Helm", "Any Armor"] }, "ci2": { "nc": "ci1", "exc": "ci2", "elc": "ci3", "iq": 1, "n": "Tiara", "minac": 40, "maxac": 50, "durability": 25, "rs": 0, "rd": 0, "hi": 1, "gt": 1, "i": "invci2", "iw": 2, "ih": 2, "it": 2, "ig": [], "eq1n": "Helm", "c": ["Circlet", "Helm", "Any Armor"] }, "ci3": { "nc": "ci1", "exc": "ci2", "elc": "ci3", "iq": 2, "n": "Diadem", "minac": 50, "maxac": 60, "durability": 20, "rs": 0, "rd": 0, "hi": 1, "gt": 1, "i": "invci3", "iw": 2, "ih": 2, "it": 2, "ig": [], "eq1n": "Helm", "c": ["Circlet", "Helm", "Any Armor"] }, "uap": { "nc": "cap", "exc": "xap", "elc": "uap", "iq": 2, "n": "Shako", "minac": 98, "maxac": 141, "durability": 12, "rs": 50, "rd": 0, "hi": 1, "gt": 1, "i": "invcap", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "ukp": { "nc": "skp", "exc": "xkp", "elc": "ukp", "iq": 2, "n": "Hydraskull", "minac": 101, "maxac": 145, "durability": 18, "rs": 84, "rd": 0, "hi": 1, "gt": 1, "i": "invskp", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "ulm": { "nc": "hlm", "exc": "xlm", "elc": "ulm", "iq": 2, "n": "Armet", "minac": 105, "maxac": 149, "durability": 24, "rs": 109, "rd": 0, "hi": 1, "gt": 1, "i": "invhlm", "ui": "invhlmu", "si": "invhlmu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "uhl": { "nc": "fhl", "exc": "xhl", "elc": "uhl", "iq": 2, "n": "Giant Conch", "minac": 110, "maxac": 154, "durability": 30, "rs": 142, "rd": 0, "hi": 1, "gt": 1, "i": "invfhl", "ui": "invfhlu", "si": "invfhlu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "uhm": { "nc": "ghm", "exc": "xhm", "elc": "uhm", "iq": 2, "n": "Spired Helm", "minac": 114, "maxac": 159, "durability": 40, "rs": 192, "rd": 0, "hi": 1, "gt": 1, "i": "invghm", "si": "invuhms", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "urn": { "nc": "crn", "exc": "xrn", "elc": "urn", "iq": 2, "n": "Corona", "minac": 111, "maxac": 165, "durability": 50, "rs": 174, "rd": 0, "hi": 1, "gt": 1, "i": "invcrn", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "usk": { "nc": "msk", "exc": "xsk", "elc": "usk", "iq": 2, "n": "Demonhead", "minac": 101, "maxac": 154, "durability": 20, "rs": 102, "rd": 0, "hi": 1, "gt": 1, "i": "invmsk", "iw": 2, "ih": 2, "it": 2, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "uui": { "nc": "qui", "exc": "xui", "elc": "uui", "iq": 2, "n": "Dusk Shroud", "minac": 361, "maxac": 467, "durability": 20, "rs": 77, "rd": 0, "hi": 1, "gt": 1, "i": "invqlt", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "uea": { "nc": "lea", "exc": "xea", "elc": "uea", "iq": 2, "n": "Wyrmhide", "minac": 364, "maxac": 470, "durability": 24, "rs": 84, "rd": 0, "hi": 1, "gt": 1, "i": "invlea", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "ula": { "nc": "hla", "exc": "xla", "elc": "ula", "iq": 2, "n": "Scarab Husk", "minac": 369, "maxac": 474, "durability": 28, "rs": 95, "rd": 0, "hi": 1, "gt": 1, "i": "invhla", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "utu": { "nc": "stu", "exc": "xtu", "elc": "utu", "iq": 2, "n": "Wire Fleece", "minac": 375, "maxac": 481, "durability": 32, "rs": 111, "rd": 0, "hi": 1, "gt": 1, "i": "invstu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "ung": { "nc": "rng", "exc": "xng", "elc": "ung", "iq": 2, "n": "Diamond Mail", "minac": 383, "maxac": 489, "durability": 26, "rs": 131, "rd": 0, "hi": 1, "gt": 1, "i": "invrng", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "ucl": { "nc": "scl", "exc": "xcl", "elc": "ucl", "iq": 2, "n": "Loricated Mail", "minac": 390, "maxac": 496, "durability": 36, "rs": 149, "rd": 0, "hi": 1, "gt": 1, "i": "invscl", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "uhn": { "nc": "chn", "exc": "xhn", "elc": "uhn", "iq": 2, "n": "Boneweave", "minac": 399, "maxac": 505, "durability": 45, "rs": 158, "rd": 0, "hi": 1, "gt": 1, "i": "invchn", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "urs": { "nc": "brs", "exc": "xrs", "elc": "urs", "iq": 2, "n": "Great Hauberk", "minac": 395, "maxac": 501, "durability": 50, "rs": 118, "rd": 0, "hi": 1, "gt": 1, "i": "invbrs", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "upl": { "nc": "spl", "exc": "xpl", "elc": "upl", "iq": 2, "n": "Balrog Skin", "minac": 410, "maxac": 517, "durability": 30, "rs": 165, "rd": 0, "hi": 1, "gt": 1, "i": "invspl", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "ult": { "nc": "plt", "exc": "xlt", "elc": "ult", "iq": 2, "n": "Hellforge Plate", "minac": 421, "maxac": 530, "durability": 60, "rs": 196, "rd": 0, "hi": 1, "gt": 1, "i": "invplt", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "uld": { "nc": "fld", "exc": "xld", "elc": "uld", "iq": 2, "n": "Kraken Shell", "minac": 417, "maxac": 523, "durability": 48, "rs": 174, "rd": 0, "hi": 1, "gt": 1, "i": "invfld", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "uth": { "nc": "gth", "exc": "xth", "elc": "uth", "iq": 2, "n": "Lacquered Plate", "minac": 433, "maxac": 541, "durability": 55, "rs": 208, "rd": 0, "hi": 1, "gt": 1, "i": "invgth", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "uul": { "nc": "ful", "exc": "xul", "elc": "uul", "iq": 2, "n": "Shadow Plate", "minac": 446, "maxac": 557, "durability": 70, "rs": 230, "rd": 0, "hi": 1, "gt": 1, "i": "invful", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "uar": { "nc": "aar", "exc": "xar", "elc": "uar", "iq": 2, "n": "Sacred Armor", "minac": 487, "maxac": 600, "durability": 60, "rs": 232, "rd": 0, "hi": 1, "gt": 1, "i": "invaar", "ui": "invaaru", "si": "invaaru", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "utp": { "nc": "ltp", "exc": "xtp", "elc": "utp", "iq": 2, "n": "Archon Plate", "minac": 410, "maxac": 524, "durability": 60, "rs": 103, "rd": 0, "hi": 1, "gt": 1, "i": "invltp", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Armor", "Any Armor"] }, "uuc": { "nc": "buc", "exc": "xuc", "elc": "uuc", "iq": 2, "n": "Heater", "minac": 95, "maxac": 110, "durability": 88, "mind": 16, "maxd": 30, "rs": 77, "rd": 0, "hi": 1, "gt": 2, "i": "invbuc", "ui": "invbucu", "si": "invbucu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "uml": { "nc": "sml", "exc": "xml", "elc": "uml", "iq": 2, "n": "Luna", "minac": 108, "maxac": 123, "durability": 84, "mind": 17, "maxd": 29, "rs": 100, "rd": 0, "hi": 1, "gt": 2, "i": "invsml", "ui": "invsmlu", "si": "invsmlu", "iw": 2, "ih": 2, "it": 5, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "urg": { "nc": "lrg", "exc": "xrg", "elc": "urg", "iq": 2, "n": "Hyperion", "minac": 119, "maxac": 135, "durability": 82, "mind": 14, "maxd": 32, "rs": 127, "rd": 0, "hi": 1, "gt": 2, "i": "invlrg", "ui": "invlrgu", "si": "invlrgu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "uit": { "nc": "kit", "exc": "xit", "elc": "uit", "iq": 2, "n": "Monarch", "minac": 133, "maxac": 148, "durability": 86, "mind": 12, "maxd": 34, "rs": 156, "rd": 0, "hi": 1, "gt": 2, "i": "invkit", "ui": "invkitu", "si": "invkitu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "uow": { "nc": "tow", "exc": "xow", "elc": "uow", "iq": 2, "n": "Aegis", "minac": 145, "maxac": 161, "durability": 92, "mind": 18, "maxd": 28, "rs": 219, "rd": 0, "hi": 1, "gt": 2, "i": "invtow", "ui": "invtowu", "si": "invtowu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "uts": { "nc": "gts", "exc": "xts", "elc": "uts", "iq": 2, "n": "Ward", "minac": 153, "maxac": 170, "durability": 100, "mind": 11, "maxd": 35, "rs": 185, "rd": 0, "hi": 1, "gt": 2, "i": "invgts", "ui": "invgtsu", "si": "invutss", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "ulg": { "nc": "lgl", "exc": "xlg", "elc": "ulg", "iq": 2, "n": "Bramble Mitts", "minac": 54, "maxac": 62, "durability": 12, "rs": 50, "rd": 0, "hi": 0, "gt": 0, "i": "invlgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "uvg": { "nc": "vgl", "exc": "xvg", "elc": "uvg", "iq": 2, "n": "Vampirebone Gloves", "minac": 56, "maxac": 65, "durability": 14, "rs": 50, "rd": 0, "hi": 0, "gt": 0, "i": "invvgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "umg": { "nc": "mgl", "exc": "xmg", "elc": "umg", "iq": 2, "n": "Vambraces", "minac": 59, "maxac": 67, "durability": 16, "rs": 106, "rd": 0, "hi": 0, "gt": 0, "i": "invmgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "utg": { "nc": "tgl", "exc": "xtg", "elc": "utg", "iq": 2, "n": "Crusader Gauntlets", "minac": 59, "maxac": 68, "durability": 18, "rs": 151, "rd": 0, "hi": 0, "gt": 0, "i": "invtgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "uhg": { "nc": "hgl", "exc": "xhg", "elc": "uhg", "iq": 2, "n": "Ogre Gauntlets", "minac": 62, "maxac": 71, "durability": 24, "rs": 185, "rd": 0, "hi": 0, "gt": 0, "i": "invhgl", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Gloves", "Any Armor"] }, "ulb": { "nc": "lbt", "exc": "xlb", "elc": "ulb", "iq": 2, "n": "Wyrmhide Boots", "minac": 54, "maxac": 62, "durability": 12, "mind": 65, "maxd": 100, "rs": 50, "rd": 0, "hi": 0, "gt": 0, "i": "invlbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "uvb": { "nc": "vbt", "exc": "xvb", "elc": "uvb", "iq": 2, "n": "Scarabshell Boots", "minac": 56, "maxac": 65, "durability": 14, "mind": 60, "maxd": 110, "rs": 91, "rd": 0, "hi": 0, "gt": 0, "i": "invvbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "umb": { "nc": "mbt", "exc": "xmb", "elc": "umb", "iq": 2, "n": "Boneweave Boots", "minac": 59, "maxac": 67, "durability": 16, "mind": 69, "maxd": 118, "rs": 118, "rd": 0, "hi": 0, "gt": 0, "i": "invmbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "utb": { "nc": "tbt", "exc": "xtb", "elc": "utb", "iq": 2, "n": "Mirrored Boots", "minac": 59, "maxac": 68, "durability": 18, "mind": 50, "maxd": 145, "rs": 163, "rd": 0, "hi": 0, "gt": 0, "i": "invtbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "uhb": { "nc": "hbt", "exc": "xhb", "elc": "uhb", "iq": 2, "n": "Myrmidon Greaves", "minac": 62, "maxac": 71, "durability": 24, "mind": 83, "maxd": 149, "rs": 208, "rd": 0, "hi": 0, "gt": 0, "i": "invhbt", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Boots", "Any Armor"] }, "ulc": { "nc": "lbl", "exc": "zlb", "elc": "ulc", "iq": 2, "n": "Spiderweb Sash", "minac": 55, "maxac": 62, "durability": 12, "rs": 50, "rd": 0, "hi": 0, "gt": 0, "i": "invlbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "uvc": { "nc": "vbl", "exc": "zvb", "elc": "uvc", "iq": 2, "n": "Vampirefang Belt", "minac": 56, "maxac": 63, "durability": 14, "rs": 50, "rd": 0, "hi": 0, "gt": 0, "i": "invvbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "umc": { "nc": "mbl", "exc": "zmb", "elc": "umc", "iq": 2, "n": "Mithril Coil", "minac": 58, "maxac": 65, "durability": 16, "rs": 106, "rd": 0, "hi": 0, "gt": 0, "i": "invmbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "utc": { "nc": "tbl", "exc": "ztb", "elc": "utc", "iq": 2, "n": "Troll Belt", "minac": 59, "maxac": 66, "durability": 18, "rs": 151, "rd": 0, "hi": 0, "gt": 0, "i": "invtbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "uhc": { "nc": "hbl", "exc": "zhb", "elc": "uhc", "iq": 2, "n": "Colossus Girdle", "minac": 61, "maxac": 71, "durability": 24, "rs": 185, "rd": 0, "hi": 0, "gt": 0, "i": "invhbl", "iw": 2, "ih": 1, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Belt", "Any Armor"] }, "uh9": { "nc": "bhm", "exc": "xh9", "elc": "uh9", "iq": 2, "n": "Bone Visage", "minac": 100, "maxac": 157, "durability": 40, "rs": 106, "rd": 0, "hi": 1, "gt": 1, "i": "invbhm", "ui": "invbhmu", "si": "invbhmu", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Any Armor", "c": ["Helm", "Any Armor"] }, "ush": { "nc": "bsh", "exc": "xsh", "elc": "ush", "iq": 2, "n": "Troll Nest", "minac": 158, "maxac": 173, "durability": 74, "mind": 24, "maxd": 38, "rs": 106, "rd": 0, "hi": 1, "gt": 2, "i": "invbsh", "ui": "invbshu", "si": "invbshu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "upk": { "nc": "spk", "exc": "xpk", "elc": "upk", "iq": 2, "n": "Blade Barrier", "minac": 147, "maxac": 163, "durability": 83, "mind": 26, "maxd": 40, "rs": 118, "rd": 0, "hi": 1, "gt": 2, "i": "invspk", "ui": "invspku", "si": "invspku", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Any Shield", "c": ["Shield", "Any Shield", "Any Armor", "Second Hand"] }, "dr6": { "nc": "dr1", "exc": "dr6", "elc": "drb", "iq": 1, "n": "Alpha Helm", "minac": 52, "maxac": 62, "durability": 20, "rs": 44, "rd": 0, "hi": 1, "gt": 1, "i": "invdr1", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "dr7": { "nc": "dr2", "exc": "dr7", "elc": "drc", "iq": 1, "n": "Griffon Headdress", "minac": 46, "maxac": 68, "durability": 20, "rs": 50, "rd": 0, "hi": 1, "gt": 1, "i": "invdr2", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "dr8": { "nc": "dr3", "exc": "dr8", "elc": "drd", "iq": 1, "n": "Hunter's Guise", "minac": 67, "maxac": 81, "durability": 20, "rs": 56, "rd": 0, "hi": 1, "gt": 1, "i": "invdr3", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "dr9": { "nc": "dr4", "exc": "dr9", "elc": "dre", "iq": 1, "n": "Sacred Feathers", "minac": 58, "maxac": 87, "durability": 20, "rs": 62, "rd": 0, "hi": 1, "gt": 1, "i": "invdr4", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "dra": { "nc": "dr5", "exc": "dra", "elc": "drf", "iq": 1, "n": "Totemic Mask", "minac": 73, "maxac": 98, "durability": 20, "rs": 65, "rd": 0, "hi": 1, "gt": 1, "i": "invdr5", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "ba6": { "nc": "ba1", "exc": "ba6", "elc": "bab", "iq": 1, "n": "Jawbone Visor", "minac": 55, "maxac": 68, "durability": 25, "rs": 58, "rd": 0, "hi": 1, "gt": 1, "i": "invba1", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "ba7": { "nc": "ba2", "exc": "ba7", "elc": "bac", "iq": 1, "n": "Lion Helm", "minac": 63, "maxac": 75, "durability": 35, "rs": 73, "rd": 0, "hi": 1, "gt": 1, "i": "invba2", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "ba8": { "nc": "ba3", "exc": "ba8", "elc": "bad", "iq": 1, "n": "Rage Mask", "minac": 78, "maxac": 90, "durability": 45, "rs": 88, "rd": 0, "hi": 1, "gt": 1, "i": "invba3", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "ba9": { "nc": "ba4", "exc": "ba9", "elc": "bae", "iq": 1, "n": "Savage Helmet", "minac": 85, "maxac": 98, "durability": 50, "rs": 103, "rd": 0, "hi": 1, "gt": 1, "i": "invba4", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "baa": { "nc": "ba5", "exc": "baa", "elc": "baf", "iq": 1, "n": "Slayer Guard", "minac": 93, "maxac": 120, "durability": 55, "rs": 118, "rd": 0, "hi": 1, "gt": 1, "i": "invba5", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "pa6": { "nc": "pa1", "exc": "pa6", "elc": "pab", "iq": 1, "n": "Akaran Targe", "minac": 101, "maxac": 125, "durability": 20, "mind": 12, "maxd": 16, "rs": 44, "rd": 0, "hi": 1, "gt": 2, "i": "invpa1", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "pa7": { "nc": "pa2", "exc": "pa7", "elc": "pac", "iq": 1, "n": "Akaran Rondache", "minac": 113, "maxac": 137, "durability": 30, "mind": 15, "maxd": 20, "rs": 59, "rd": 0, "hi": 1, "gt": 2, "i": "invpa2", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "pa8": { "nc": "pa3", "exc": "pa8", "elc": "pad", "iq": 1, "n": "Protector Shield", "minac": 129, "maxac": 153, "durability": 40, "mind": 18, "maxd": 24, "rs": 69, "rd": 0, "hi": 1, "gt": 2, "i": "invpa3", "iw": 2, "ih": 4, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "pa9": { "nc": "pa4", "exc": "pa9", "elc": "pae", "iq": 1, "n": "Gilded Shield", "minac": 144, "maxac": 168, "durability": 50, "mind": 20, "maxd": 28, "rs": 89, "rd": 0, "hi": 1, "gt": 2, "i": "invpa4", "iw": 2, "ih": 4, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "paa": { "nc": "pa5", "exc": "paa", "elc": "paf", "iq": 1, "n": "Royal Shield", "minac": 156, "maxac": 181, "durability": 60, "mind": 24, "maxd": 32, "rs": 114, "rd": 0, "hi": 1, "gt": 2, "i": "invpa5", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "ne6": { "nc": "ne1", "exc": "ne6", "elc": "neb", "iq": 1, "n": "Mummified Trophy", "minac": 38, "maxac": 48, "durability": 20, "rs": 38, "rd": 0, "hi": 1, "gt": 2, "i": "invne1", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "ne7": { "nc": "ne2", "exc": "ne7", "elc": "neg", "iq": 1, "n": "Fetish Trophy", "minac": 41, "maxac": 52, "durability": 20, "rs": 41, "rd": 0, "hi": 1, "gt": 2, "i": "invne2", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "ne8": { "nc": "ne3", "exc": "ne8", "elc": "ned", "iq": 1, "n": "Sexton Trophy", "minac": 44, "maxac": 55, "durability": 20, "rs": 47, "rd": 0, "hi": 1, "gt": 2, "i": "invne3", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "ne9": { "nc": "ne4", "exc": "ne9", "elc": "nee", "iq": 1, "n": "Cantor Trophy", "minac": 50, "maxac": 64, "durability": 20, "rs": 50, "rd": 0, "hi": 1, "gt": 2, "i": "invne4", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "nea": { "nc": "ne5", "exc": "nea", "elc": "nef", "iq": 1, "n": "Hierophant Trophy", "minac": 58, "maxac": 70, "durability": 20, "rs": 58, "rd": 0, "hi": 1, "gt": 2, "i": "invne5", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "drb": { "nc": "dr1", "exc": "dr6", "elc": "drb", "iq": 2, "n": "Blood Spirit", "minac": 101, "maxac": 145, "durability": 20, "rs": 86, "rd": 0, "hi": 1, "gt": 1, "i": "invdr1", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "drc": { "nc": "dr2", "exc": "dr7", "elc": "drc", "iq": 2, "n": "Sun Spirit", "minac": 98, "maxac": 147, "durability": 20, "rs": 95, "rd": 0, "hi": 1, "gt": 1, "i": "invdr2", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "drd": { "nc": "dr3", "exc": "dr8", "elc": "drd", "iq": 2, "n": "Earth Spirit", "minac": 107, "maxac": 152, "durability": 20, "rs": 104, "rd": 0, "hi": 1, "gt": 1, "i": "invdr3", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "dre": { "nc": "dr4", "exc": "dr9", "elc": "dre", "iq": 2, "n": "Sky Spirit", "minac": 103, "maxac": 155, "durability": 20, "rs": 113, "rd": 0, "hi": 1, "gt": 1, "i": "invdr4", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "drf": { "nc": "dr5", "exc": "dra", "elc": "drf", "iq": 2, "n": "Dream Spirit", "minac": 109, "maxac": 159, "durability": 20, "rs": 118, "rd": 0, "hi": 1, "gt": 1, "i": "invdr5", "iw": 2, "ih": 2, "it": 8, "ig": [], "eq1n": "Helm", "eq2n": "Druid Item", "c": ["Pelt", "Helm", "Any Armor", "Druid Item", "Class Specific"] }, "bab": { "nc": "ba1", "exc": "ba6", "elc": "bab", "iq": 2, "n": "Carnage Helm", "minac": 102, "maxac": 147, "durability": 25, "rs": 106, "rd": 0, "hi": 1, "gt": 1, "i": "invba1", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "bac": { "nc": "ba2", "exc": "ba7", "elc": "bac", "iq": 2, "n": "Fury Visor", "minac": 105, "maxac": 150, "durability": 35, "rs": 129, "rd": 0, "hi": 1, "gt": 1, "i": "invba2", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "bad": { "nc": "ba3", "exc": "ba8", "elc": "bad", "iq": 2, "n": "Destroyer Helm", "minac": 111, "maxac": 156, "durability": 45, "rs": 151, "rd": 0, "hi": 1, "gt": 1, "i": "invba3", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "bae": { "nc": "ba4", "exc": "ba9", "elc": "bae", "iq": 2, "n": "Conqueror Crown", "minac": 114, "maxac": 159, "durability": 50, "rs": 174, "rd": 0, "hi": 1, "gt": 1, "i": "invba4", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "baf": { "nc": "ba5", "exc": "baa", "elc": "baf", "iq": 2, "n": "Guardian Crown", "minac": 117, "maxac": 168, "durability": 55, "rs": 196, "rd": 0, "hi": 1, "gt": 1, "i": "invba5", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Helm", "eq2n": "Barbarian Item", "c": ["Primal Helm", "Helm", "Any Armor", "Barbarian Item", "Class Specific"] }, "pab": { "nc": "pa1", "exc": "pa6", "elc": "pab", "iq": 2, "n": "Sacred Targe", "minac": 126, "maxac": 158, "durability": 45, "mind": 22, "maxd": 70, "rs": 86, "rd": 0, "hi": 1, "gt": 2, "i": "invpa1", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "pac": { "nc": "pa2", "exc": "pa7", "elc": "pac", "iq": 2, "n": "Sacred Rondache", "minac": 138, "maxac": 164, "durability": 68, "mind": 35, "maxd": 58, "rs": 109, "rd": 0, "hi": 1, "gt": 2, "i": "invpa2", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "pad": { "nc": "pa3", "exc": "pa8", "elc": "pad", "iq": 2, "n": "Kurast Shield", "minac": 154, "maxac": 172, "durability": 55, "mind": 10, "maxd": 82, "rs": 124, "rd": 0, "hi": 1, "gt": 2, "i": "invpa3", "iw": 2, "ih": 4, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "pae": { "nc": "pa4", "exc": "pa9", "elc": "pae", "iq": 2, "n": "Zakarum Shield", "minac": 169, "maxac": 193, "durability": 65, "mind": 46, "maxd": 46, "rs": 142, "rd": 0, "hi": 1, "gt": 2, "i": "invpa4", "iw": 2, "ih": 4, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "paf": { "nc": "pa5", "exc": "paa", "elc": "paf", "iq": 2, "n": "Vortex Shield", "minac": 182, "maxac": 225, "durability": 90, "mind": 5, "maxd": 87, "rs": 148, "rd": 0, "hi": 1, "gt": 2, "i": "invpa5", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Paladin Item", "c": ["Auric Shields", "Any Shield", "Any Armor", "Second Hand", "Paladin Item", "Class Specific"] }, "neb": { "nc": "ne1", "exc": "ne6", "elc": "neb", "iq": 2, "n": "Minion Skull", "minac": 95, "maxac": 139, "durability": 20, "rs": 77, "rd": 0, "hi": 1, "gt": 2, "i": "invne1", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "neg": { "nc": "ne2", "exc": "ne7", "elc": "neg", "iq": 2, "n": "Hellspawn Skull", "minac": 96, "maxac": 141, "durability": 20, "rs": 82, "rd": 0, "hi": 1, "gt": 2, "i": "invne2", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "ned": { "nc": "ne3", "exc": "ne8", "elc": "ned", "iq": 2, "n": "Overseer Skull", "minac": 98, "maxac": 142, "durability": 20, "rs": 91, "rd": 0, "hi": 1, "gt": 2, "i": "invne3", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "nee": { "nc": "ne4", "exc": "ne9", "elc": "nee", "iq": 2, "n": "Succubus Skull", "minac": 100, "maxac": 146, "durability": 20, "rs": 95, "rd": 0, "hi": 1, "gt": 2, "i": "invne4", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] }, "nef": { "nc": "ne5", "exc": "nea", "elc": "nef", "iq": 2, "n": "Bloodlord Skull", "minac": 103, "maxac": 148, "durability": 20, "rs": 106, "rd": 0, "hi": 1, "gt": 2, "i": "invne5", "iw": 2, "ih": 2, "it": 0, "ig": [], "eq1n": "Any Shield", "eq2n": "Necromancer Item", "c": ["Voodoo Heads", "Any Shield", "Any Armor", "Second Hand", "Necromancer Item", "Class Specific"] } }, "weapon_items": { "hax": { "nc": "hax", "exc": "9ha", "elc": "7ha", "iq": 0, "n": "Hand Axe", "durability": 28, "mind": 3, "maxd": 6, "hi": 1, "gt": 0, "i": "invhax", "ui": "invhaxu", "si": "invhaxu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "axe": { "nc": "axe", "exc": "9ax", "elc": "7ax", "iq": 0, "n": "Axe", "durability": 24, "mind": 4, "maxd": 11, "rs": 32, "hi": 1, "gt": 0, "i": "invaxe", "ui": "invaxeu", "si": "invaxeu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "2ax": { "nc": "2ax", "exc": "92a", "elc": "72a", "iq": 0, "n": "Double Axe", "durability": 24, "mind": 5, "maxd": 13, "rs": 43, "hi": 1, "gt": 0, "i": "inv2ax", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "mpi": { "nc": "mpi", "exc": "9mp", "elc": "7mp", "iq": 0, "n": "Military Pick", "durability": 26, "mind": 7, "maxd": 11, "rs": 49, "rd": 33, "hi": 1, "gt": 0, "i": "invmpi", "ui": "invmpiu", "si": "invmpiu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "wax": { "nc": "wax", "exc": "9wa", "elc": "7wa", "iq": 0, "n": "War Axe", "durability": 26, "mind": 10, "maxd": 18, "rs": 67, "hi": 1, "gt": 0, "i": "invwax", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "lax": { "nc": "lax", "exc": "9la", "elc": "7la", "iq": 0, "n": "Large Axe", "durability": 30, "min2d": 6, "max2d": 13, "rs": 35, "hi": 1, "gt": 0, "i": "invlax", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "bax": { "nc": "bax", "exc": "9ba", "elc": "7ba", "iq": 0, "n": "Broad Axe", "durability": 35, "min2d": 10, "max2d": 18, "rs": 48, "hi": 1, "gt": 0, "i": "invbrx", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "btx": { "nc": "btx", "exc": "9bt", "elc": "7bt", "iq": 0, "n": "Battle Axe", "durability": 40, "min2d": 12, "max2d": 32, "rs": 54, "hi": 1, "gt": 0, "i": "invbtx", "ui": "invbtxu", "si": "invbtxu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "gax": { "nc": "gax", "exc": "9ga", "elc": "7ga", "iq": 0, "n": "Great Axe", "durability": 50, "min2d": 9, "max2d": 30, "rs": 63, "rd": 39, "hi": 1, "gt": 0, "i": "invgax", "ui": "invgaxu", "si": "invgaxu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "gix": { "nc": "gix", "exc": "9gi", "elc": "7gi", "iq": 0, "n": "Giant Axe", "durability": 50, "min2d": 22, "max2d": 45, "rs": 70, "hi": 1, "gt": 0, "i": "invgix", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "wnd": { "nc": "wnd", "exc": "9wn", "elc": "7wn", "iq": 0, "n": "Wand", "durability": 15, "mind": 2, "maxd": 4, "hi": 1, "gt": 0, "i": "invwnd", "ui": "invwndu", "si": "invwndu", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "ywn": { "nc": "ywn", "exc": "9yw", "elc": "7yw", "iq": 0, "n": "Yew Wand", "durability": 15, "mind": 2, "maxd": 8, "hi": 1, "gt": 0, "i": "invywn", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "bwn": { "nc": "bwn", "exc": "9bw", "elc": "7bw", "iq": 0, "n": "Bone Wand", "durability": 15, "mind": 3, "maxd": 7, "hi": 1, "gt": 0, "i": "invbwn", "ui": "invbwnu", "si": "invbwnu", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "gwn": { "nc": "gwn", "exc": "9gw", "elc": "7gw", "iq": 0, "n": "Grim Wand", "durability": 15, "mind": 5, "maxd": 11, "hi": 1, "gt": 0, "i": "invgwn", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "clb": { "nc": "clb", "exc": "9cl", "elc": "7cl", "iq": 0, "n": "Club", "durability": 24, "mind": 1, "maxd": 6, "hi": 1, "gt": 0, "i": "invclb", "ui": "invclbu", "si": "invclbu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Club", "Blunt", "Melee Weapon", "Weapon"] }, "scp": { "nc": "scp", "exc": "9sc", "elc": "7sc", "iq": 0, "n": "Scepter", "durability": 50, "mind": 6, "maxd": 11, "rs": 25, "hi": 1, "gt": 0, "i": "invscp", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Scepter", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "gsc": { "nc": "gsc", "exc": "9qs", "elc": "7qs", "iq": 0, "n": "Grand Scepter", "durability": 60, "mind": 8, "maxd": 18, "rs": 37, "hi": 1, "gt": 0, "i": "invgsc", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Scepter", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "wsp": { "nc": "wsp", "exc": "9ws", "elc": "7ws", "iq": 0, "n": "War Scepter", "durability": 70, "mind": 10, "maxd": 17, "rs": 55, "hi": 1, "gt": 0, "i": "invwsp", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Scepter", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "spc": { "nc": "spc", "exc": "9sp", "elc": "7sp", "iq": 0, "n": "Spiked Club", "durability": 36, "mind": 5, "maxd": 8, "hi": 1, "gt": 0, "i": "invspc", "ui": "invspcu", "si": "invspcu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Club", "Blunt", "Melee Weapon", "Weapon"] }, "mac": { "nc": "mac", "exc": "9ma", "elc": "7ma", "iq": 0, "n": "Mace", "durability": 60, "mind": 3, "maxd": 10, "rs": 27, "hi": 1, "gt": 0, "i": "invmac", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "mst": { "nc": "mst", "exc": "9mt", "elc": "7mt", "iq": 0, "n": "Morning Star", "durability": 72, "mind": 7, "maxd": 16, "rs": 36, "hi": 1, "gt": 0, "i": "invmst", "ui": "invmstu", "si": "invmstu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "fla": { "nc": "fla", "exc": "9fl", "elc": "7fl", "iq": 0, "n": "Flail", "durability": 30, "mind": 1, "maxd": 24, "rs": 41, "rd": 35, "hi": 1, "gt": 0, "i": "invfla", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "whm": { "nc": "whm", "exc": "9wh", "elc": "7wh", "iq": 0, "n": "War Hammer", "durability": 55, "mind": 19, "maxd": 29, "rs": 53, "hi": 1, "gt": 0, "i": "invwhm", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "mau": { "nc": "mau", "exc": "9m9", "elc": "7m7", "iq": 0, "n": "Maul", "durability": 60, "min2d": 30, "max2d": 43, "rs": 69, "hi": 1, "gt": 0, "i": "invmau", "ui": "invmauu", "si": "invmauu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "gma": { "nc": "gma", "exc": "9gm", "elc": "7gm", "iq": 0, "n": "Great Maul", "durability": 60, "min2d": 38, "max2d": 58, "rs": 99, "hi": 1, "gt": 0, "i": "invgma", "ui": "invgma", "si": "invgma", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "ssd": { "nc": "ssd", "exc": "9ss", "elc": "7ss", "iq": 0, "n": "Short Sword", "durability": 24, "mind": 2, "maxd": 7, "hi": 1, "gt": 0, "i": "invssd", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "scm": { "nc": "scm", "exc": "9sm", "elc": "7sm", "iq": 0, "n": "Scimitar", "durability": 22, "mind": 2, "maxd": 6, "rd": 21, "hi": 1, "gt": 0, "i": "invscm", "ui": "invscmu", "si": "invscmu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "sbr": { "nc": "sbr", "exc": "9sb", "elc": "7sb", "iq": 0, "n": "Sabre", "durability": 32, "mind": 3, "maxd": 8, "rs": 25, "rd": 25, "hi": 1, "gt": 0, "i": "invsbr", "ui": "inv9sbu", "si": "inv9sbu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "flc": { "nc": "flc", "exc": "9fc", "elc": "7fc", "iq": 0, "n": "Falchion", "durability": 32, "mind": 9, "maxd": 17, "rs": 33, "hi": 1, "gt": 0, "i": "invflc", "ui": "invflcu", "si": "invflcu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "crs": { "nc": "crs", "exc": "9cr", "elc": "7cr", "iq": 0, "n": "Crystal Sword", "durability": 20, "mind": 5, "maxd": 15, "rs": 43, "hi": 1, "gt": 0, "i": "invcrs", "ui": "invcrsu", "si": "invcrsu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "bsd": { "nc": "bsd", "exc": "9bs", "elc": "7bs", "iq": 0, "n": "Broad Sword", "durability": 32, "mind": 7, "maxd": 14, "rs": 48, "hi": 1, "gt": 0, "i": "invbsd", "ui": "invbsdu", "si": "invbsdu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "lsd": { "nc": "lsd", "exc": "9ls", "elc": "7ls", "iq": 0, "n": "Long Sword", "durability": 44, "mind": 3, "maxd": 19, "rs": 55, "rd": 39, "hi": 1, "gt": 0, "i": "invlsd", "ui": "invlsdu", "si": "invlsdu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "wsd": { "nc": "wsd", "exc": "9wd", "elc": "7wd", "iq": 0, "n": "War Sword", "durability": 44, "mind": 8, "maxd": 20, "rs": 71, "rd": 45, "hi": 1, "gt": 0, "i": "invwsd", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "2hs": { "nc": "2hs", "exc": "92h", "elc": "72h", "iq": 0, "n": "Two-Handed Sword", "durability": 44, "mind": 2, "maxd": 9, "min2d": 8, "max2d": 17, "rs": 35, "rd": 27, "hi": 1, "gt": 0, "i": "inv2hs", "ui": "inv2hsu", "si": "inv2hsu", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "clm": { "nc": "clm", "exc": "9cm", "elc": "7cm", "iq": 0, "n": "Claymore", "durability": 50, "mind": 5, "maxd": 12, "min2d": 13, "max2d": 30, "rs": 47, "hi": 1, "gt": 0, "i": "invclm", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "gis": { "nc": "gis", "exc": "9gs", "elc": "7gs", "iq": 0, "n": "Giant Sword", "durability": 50, "mind": 3, "maxd": 16, "min2d": 9, "max2d": 28, "rs": 56, "rd": 34, "hi": 1, "gt": 0, "i": "invgis", "ui": "invgisu", "si": "invgisu", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "bsw": { "nc": "bsw", "exc": "9b9", "elc": "7b7", "iq": 0, "n": "Bastard Sword", "durability": 40, "mind": 7, "maxd": 19, "min2d": 20, "max2d": 28, "rs": 62, "hi": 1, "gt": 0, "i": "invbsw", "ui": "invbswu", "si": "invbswu", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "flb": { "nc": "flb", "exc": "9fb", "elc": "7fb", "iq": 0, "n": "Flamberge", "durability": 50, "mind": 9, "maxd": 15, "min2d": 13, "max2d": 26, "rs": 70, "rd": 49, "hi": 1, "gt": 0, "i": "invflb", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "gsd": { "nc": "gsd", "exc": "9gd", "elc": "7gd", "iq": 0, "n": "Great Sword", "durability": 50, "mind": 12, "maxd": 20, "min2d": 25, "max2d": 42, "rs": 100, "rd": 60, "hi": 1, "gt": 0, "i": "invgsd", "ui": "invgsdu", "si": "invgsdu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "dgr": { "nc": "dgr", "exc": "9dg", "elc": "7dg", "iq": 0, "n": "Dagger", "durability": 16, "mind": 1, "maxd": 4, "hi": 1, "gt": 0, "i": "invdgr", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "dir": { "nc": "dir", "exc": "9di", "elc": "7di", "iq": 0, "n": "Dirk", "durability": 20, "mind": 3, "maxd": 9, "rd": 25, "hi": 1, "gt": 0, "i": "invdir", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "kri": { "nc": "kri", "exc": "9kr", "elc": "7kr", "iq": 0, "n": "Kris", "durability": 24, "mind": 2, "maxd": 11, "rd": 45, "hi": 1, "gt": 0, "i": "invkrs", "ui": "invkrsu", "si": "invkrsu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "bld": { "nc": "bld", "exc": "9bl", "elc": "7bl", "iq": 0, "n": "Blade", "durability": 24, "mind": 4, "maxd": 15, "rs": 35, "rd": 51, "hi": 1, "gt": 0, "i": "invbld", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "tkf": { "nc": "tkf", "exc": "9tk", "elc": "7tk", "iq": 0, "n": "Throwing Knife", "s": 1, "durability": 4, "mind": 2, "maxd": 3, "minmd": 4, "maxmd": 9, "rd": 21, "gt": 0, "i": "invtkn", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Knife", "c": ["Throwing Knife", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "tax": { "nc": "tax", "exc": "9ta", "elc": "7ta", "iq": 0, "n": "Throwing Axe", "s": 1, "durability": 6, "mind": 4, "maxd": 7, "minmd": 8, "maxmd": 12, "rd": 40, "gt": 0, "i": "invtax", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Axe", "c": ["Throwing Axe", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Axe", "Melee Weapon", "Weapon"] }, "bkf": { "nc": "bkf", "exc": "9bk", "elc": "7bk", "iq": 0, "n": "Balanced Knife", "s": 1, "durability": 8, "mind": 1, "maxd": 8, "minmd": 6, "maxmd": 11, "rd": 51, "gt": 0, "i": "invbkf", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Knife", "c": ["Throwing Knife", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "bal": { "nc": "bal", "exc": "9b8", "elc": "7b8", "iq": 0, "n": "Balanced Axe", "s": 1, "durability": 10, "mind": 5, "maxd": 10, "minmd": 12, "maxmd": 15, "rd": 57, "gt": 0, "i": "invbal", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Axe", "c": ["Throwing Axe", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Axe", "Melee Weapon", "Weapon"] }, "jav": { "nc": "jav", "exc": "9ja", "elc": "7ja", "iq": 0, "n": "Javelin", "s": 1, "durability": 2, "mind": 1, "maxd": 5, "minmd": 6, "maxmd": 14, "gt": 0, "i": "invjav", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "pil": { "nc": "pil", "exc": "9pi", "elc": "7pi", "iq": 0, "n": "Pilum", "s": 1, "durability": 3, "mind": 4, "maxd": 9, "minmd": 7, "maxmd": 20, "rd": 45, "gt": 0, "i": "invpil", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "ssp": { "nc": "ssp", "exc": "9s9", "elc": "7s7", "iq": 0, "n": "Short Spear", "s": 1, "durability": 4, "mind": 2, "maxd": 13, "minmd": 10, "maxmd": 22, "rs": 40, "rd": 40, "gt": 0, "i": "invssp", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "glv": { "nc": "glv", "exc": "9gl", "elc": "7gl", "iq": 0, "n": "Glaive", "s": 1, "durability": 5, "mind": 5, "maxd": 17, "minmd": 16, "maxmd": 22, "rs": 52, "rd": 35, "gt": 0, "i": "invglv", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "tsp": { "nc": "tsp", "exc": "9ts", "elc": "7ts", "iq": 0, "n": "Throwing Spear", "s": 1, "durability": 6, "mind": 5, "maxd": 15, "minmd": 12, "maxmd": 30, "rd": 65, "gt": 0, "i": "invtsp", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "spr": { "nc": "spr", "exc": "9sr", "elc": "7sr", "iq": 0, "n": "Spear", "durability": 30, "min2d": 3, "max2d": 15, "rd": 20, "hi": 1, "gt": 0, "i": "invspr", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "tri": { "nc": "tri", "exc": "9tr", "elc": "7tr", "iq": 0, "n": "Trident", "durability": 35, "min2d": 9, "max2d": 15, "rs": 38, "rd": 24, "hi": 1, "gt": 0, "i": "invtri", "ui": "invtriu", "si": "invtriu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "brn": { "nc": "brn", "exc": "9br", "elc": "7br", "iq": 0, "n": "Brandistock", "durability": 28, "min2d": 7, "max2d": 17, "rs": 40, "rd": 50, "hi": 1, "gt": 0, "i": "invbrn", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "spt": { "nc": "spt", "exc": "9st", "elc": "7st", "iq": 0, "n": "Spetum", "durability": 28, "min2d": 15, "max2d": 23, "rs": 54, "rd": 35, "hi": 1, "gt": 0, "i": "invspt", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "pik": { "nc": "pik", "exc": "9p9", "elc": "7p7", "iq": 0, "n": "Pike", "durability": 25, "min2d": 14, "max2d": 63, "rs": 60, "rd": 45, "hi": 1, "gt": 0, "i": "invpik", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "bar": { "nc": "bar", "exc": "9b7", "elc": "7o7", "iq": 0, "n": "Bardiche", "durability": 50, "min2d": 1, "max2d": 27, "rs": 40, "hi": 1, "gt": 0, "i": "invbar", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "vou": { "nc": "vou", "exc": "9vo", "elc": "7vo", "iq": 0, "n": "Voulge", "durability": 50, "min2d": 6, "max2d": 21, "rs": 50, "hi": 1, "gt": 0, "i": "invvou", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "scy": { "nc": "scy", "exc": "9s8", "elc": "7s8", "iq": 0, "n": "Scythe", "durability": 65, "min2d": 8, "max2d": 20, "rs": 41, "rd": 41, "hi": 1, "gt": 0, "i": "invscy", "ui": "invscyu", "si": "invscyu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "pax": { "nc": "pax", "exc": "9pa", "elc": "7pa", "iq": 0, "n": "Poleaxe", "durability": 65, "min2d": 18, "max2d": 39, "rs": 62, "hi": 1, "gt": 0, "i": "invpax", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "hal": { "nc": "hal", "exc": "9h9", "elc": "7h7", "iq": 0, "n": "Halberd", "durability": 55, "min2d": 12, "max2d": 45, "rs": 75, "rd": 47, "hi": 1, "gt": 0, "i": "invhal", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "wsc": { "nc": "wsc", "exc": "9wc", "elc": "7wc", "iq": 0, "n": "War Scythe", "durability": 55, "min2d": 15, "max2d": 36, "rs": 80, "rd": 80, "hi": 1, "gt": 0, "i": "invwsc", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "sst": { "nc": "sst", "exc": "8ss", "elc": "6ss", "iq": 0, "n": "Short Staff", "durability": 20, "min2d": 1, "max2d": 5, "hi": 1, "gt": 0, "i": "invsst", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "lst": { "nc": "lst", "exc": "8ls", "elc": "6ls", "iq": 0, "n": "Long Staff", "durability": 30, "min2d": 2, "max2d": 8, "hi": 1, "gt": 0, "i": "invlst", "iw": 1, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "cst": { "nc": "cst", "exc": "8cs", "elc": "6cs", "iq": 0, "n": "Gnarled Staff", "durability": 35, "min2d": 4, "max2d": 12, "hi": 1, "gt": 0, "i": "invcst", "ui": "invcstu", "si": "invcstu", "iw": 1, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "bst": { "nc": "bst", "exc": "8bs", "elc": "6bs", "iq": 0, "n": "Battle Staff", "durability": 40, "min2d": 6, "max2d": 13, "hi": 1, "gt": 0, "i": "invbst", "iw": 1, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "wst": { "nc": "wst", "exc": "8ws", "elc": "6ws", "iq": 0, "n": "War Staff", "durability": 50, "min2d": 12, "max2d": 28, "hi": 1, "gt": 0, "i": "invwst", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "sbw": { "nc": "sbw", "exc": "8sb", "elc": "6sb", "iq": 0, "n": "Short Bow", "durability": 20, "min2d": 1, "max2d": 4, "rd": 15, "hi": 1, "gt": 0, "i": "invsbw", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "hbw": { "nc": "hbw", "exc": "8hb", "elc": "6hb", "iq": 0, "n": "Hunter's Bow", "durability": 32, "min2d": 2, "max2d": 6, "rd": 28, "hi": 1, "gt": 0, "i": "invhbw", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "lbw": { "nc": "lbw", "exc": "8lb", "elc": "6lb", "iq": 0, "n": "Long Bow", "durability": 28, "min2d": 3, "max2d": 10, "rs": 22, "rd": 19, "hi": 1, "gt": 0, "i": "invlbw", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "cbw": { "nc": "cbw", "exc": "8cb", "elc": "6cb", "iq": 0, "n": "Composite Bow", "durability": 36, "min2d": 4, "max2d": 8, "rs": 25, "rd": 35, "hi": 1, "gt": 0, "i": "invcbw", "ui": "invcbwu", "si": "invcbwu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "sbb": { "nc": "sbb", "exc": "8s8", "elc": "6s7", "iq": 0, "n": "Short Battle Bow", "durability": 40, "min2d": 5, "max2d": 11, "rs": 30, "rd": 40, "hi": 1, "gt": 0, "i": "invsbb", "ui": "invsbbu", "si": "invsbbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "lbb": { "nc": "lbb", "exc": "8l8", "elc": "6l7", "iq": 0, "n": "Long Battle Bow", "durability": 44, "min2d": 3, "max2d": 18, "rs": 40, "rd": 50, "hi": 1, "gt": 0, "i": "invlbb", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "swb": { "nc": "swb", "exc": "8sw", "elc": "6sw", "iq": 0, "n": "Short War Bow", "durability": 48, "min2d": 6, "max2d": 14, "rs": 35, "rd": 55, "hi": 1, "gt": 0, "i": "invswb", "ui": "invswbu", "si": "invswbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "lwb": { "nc": "lwb", "exc": "8lw", "elc": "6lw", "iq": 0, "n": "Long War Bow", "durability": 55, "min2d": 3, "max2d": 23, "rs": 50, "rd": 65, "hi": 1, "gt": 0, "i": "invlwb", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "lxb": { "nc": "lxb", "exc": "8lx", "elc": "6lx", "iq": 0, "n": "Light Crossbow", "durability": 30, "min2d": 6, "max2d": 9, "rs": 21, "rd": 27, "hi": 1, "gt": 0, "i": "invlxb", "ui": "invlxbu", "si": "invlxbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "mxb": { "nc": "mxb", "exc": "8mx", "elc": "6mx", "iq": 0, "n": "Crossbow", "durability": 40, "min2d": 9, "max2d": 16, "rs": 40, "rd": 33, "hi": 1, "gt": 0, "i": "invmxb", "ui": "invmxbu", "si": "invmxbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "hxb": { "nc": "hxb", "exc": "8hx", "elc": "6hx", "iq": 0, "n": "Heavy Crossbow", "durability": 50, "min2d": 14, "max2d": 26, "rs": 60, "rd": 40, "hi": 1, "gt": 0, "i": "invhxb", "ui": "invhxbu", "si": "invhxbu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "rxb": { "nc": "rxb", "exc": "8rx", "elc": "6rx", "iq": 0, "n": "Repeating Crossbow", "durability": 40, "min2d": 6, "max2d": 12, "rs": 40, "rd": 50, "hi": 1, "gt": 0, "i": "invrxb", "ui": "invrxbu", "si": "invrxbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "gps": { "nc": "gps", "exc": "", "elc": "", "iq": 0, "n": "Rancid Gas Potion", "s": 1, "durability": 2, "maxd": 1, "gt": 0, "i": "invgpl", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Thrown Weapon", "c": ["Missile Potion", "Thrown Weapon", "Weapon"] }, "ops": { "nc": "ops", "exc": "", "elc": "", "iq": 0, "n": "Oil Potion", "s": 1, "durability": 2, "maxd": 1, "gt": 0, "i": "invopl", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Thrown Weapon", "c": ["Missile Potion", "Thrown Weapon", "Weapon"] }, "gpm": { "nc": "gpm", "exc": "", "elc": "", "iq": 0, "n": "Choking Gas Potion", "s": 1, "durability": 2, "maxd": 1, "gt": 0, "i": "invgpm", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Thrown Weapon", "c": ["Missile Potion", "Thrown Weapon", "Weapon"] }, "opm": { "nc": "opm", "exc": "", "elc": "", "iq": 0, "n": "Exploding Potion", "s": 1, "durability": 2, "maxd": 1, "gt": 0, "i": "invopm", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Thrown Weapon", "c": ["Missile Potion", "Thrown Weapon", "Weapon"] }, "gpl": { "nc": "gpl", "exc": "", "elc": "", "iq": 0, "n": "Strangling Gas Potion", "s": 1, "durability": 2, "maxd": 1, "gt": 0, "i": "invgps", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Thrown Weapon", "c": ["Missile Potion", "Thrown Weapon", "Weapon"] }, "opl": { "nc": "opl", "exc": "", "elc": "", "iq": 0, "n": "Fulminating Potion", "s": 1, "durability": 2, "maxd": 1, "gt": 0, "i": "invops", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Thrown Weapon", "c": ["Missile Potion", "Thrown Weapon", "Weapon"] }, "d33": { "nc": "d33", "exc": "", "elc": "", "iq": 0, "n": "Decoy Gidbinn", "durability": 10, "mind": 1, "maxd": 2, "rs": 15, "rd": 20, "gt": 0, "i": "invd33", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "g33": { "nc": "g33", "exc": "", "elc": "", "iq": 0, "n": "The Gidbinn", "durability": 30, "mind": 3, "maxd": 7, "rs": 15, "rd": 25, "gt": 0, "i": "invg33", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "leg": { "nc": "leg", "exc": "", "elc": "", "iq": 0, "n": "Wirt's Leg", "durability": 66, "mind": 2, "maxd": 8, "hi": 1, "gt": 0, "i": "invleg", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Blunt", "c": ["Club", "Blunt", "Melee Weapon", "Weapon"] }, "hdm": { "nc": "hdm", "exc": "", "elc": "", "iq": 0, "n": "Horadric Malus", "durability": 55, "mind": 6, "maxd": 15, "rs": 15, "rd": 15, "gt": 0, "i": "invhmr", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "hfh": { "nc": "hfh", "exc": "", "elc": "", "iq": 0, "n": "Hell Forge Hammer", "durability": 55, "mind": 6, "maxd": 15, "hi": 1, "gt": 0, "i": "invhfh", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "hst": { "nc": "hst", "exc": "", "elc": "", "iq": 0, "n": "Horadric Staff", "durability": 50, "min2d": 12, "max2d": 20, "rs": 30, "gt": 0, "i": "invhst", "iw": 1, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "msf": { "nc": "msf", "exc": "", "elc": "", "iq": 0, "n": "Shaft of the Horadric Staff", "durability": 45, "min2d": 10, "max2d": 15, "rs": 25, "gt": 0, "i": "invmsf", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "9ha": { "nc": "hax", "exc": "9ha", "elc": "7ha", "iq": 1, "n": "Hatchet", "durability": 28, "mind": 10, "maxd": 21, "rs": 25, "rd": 25, "hi": 1, "gt": 0, "i": "invhax", "ui": "invhaxu", "si": "invhaxu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "9ax": { "nc": "axe", "exc": "9ax", "elc": "7ax", "iq": 1, "n": "Cleaver", "durability": 24, "mind": 10, "maxd": 33, "rs": 68, "hi": 1, "gt": 0, "i": "invaxe", "ui": "invaxeu", "si": "invaxeu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "92a": { "nc": "2ax", "exc": "92a", "elc": "72a", "iq": 1, "n": "Twin Axe", "durability": 24, "mind": 13, "maxd": 38, "rs": 85, "hi": 1, "gt": 0, "i": "inv2ax", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "9mp": { "nc": "mpi", "exc": "9mp", "elc": "7mp", "iq": 1, "n": "Crowbill", "durability": 26, "mind": 14, "maxd": 34, "rs": 94, "rd": 70, "hi": 1, "gt": 0, "i": "invmpi", "ui": "invmpiu", "si": "invmpiu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "9wa": { "nc": "wax", "exc": "9wa", "elc": "7wa", "iq": 1, "n": "Naga", "durability": 26, "mind": 16, "maxd": 45, "rs": 121, "hi": 1, "gt": 0, "i": "invwax", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "9la": { "nc": "lax", "exc": "9la", "elc": "7la", "iq": 1, "n": "Military Axe", "durability": 30, "min2d": 14, "max2d": 34, "rs": 73, "hi": 1, "gt": 0, "i": "invlax", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "9ba": { "nc": "bax", "exc": "9ba", "elc": "7ba", "iq": 1, "n": "Bearded Axe", "durability": 35, "min2d": 21, "max2d": 49, "rs": 92, "hi": 1, "gt": 0, "i": "invbrx", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "9bt": { "nc": "btx", "exc": "9bt", "elc": "7bt", "iq": 1, "n": "Tabar", "durability": 40, "min2d": 24, "max2d": 77, "rs": 101, "hi": 1, "gt": 0, "i": "invbtx", "ui": "inv9btu", "si": "inv9btu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "9ga": { "nc": "gax", "exc": "9ga", "elc": "7ga", "iq": 1, "n": "Gothic Axe", "durability": 50, "min2d": 18, "max2d": 70, "rs": 115, "rd": 79, "hi": 1, "gt": 0, "i": "invgax", "ui": "invgaxu", "si": "invgaxu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "9gi": { "nc": "gix", "exc": "9gi", "elc": "7gi", "iq": 1, "n": "Ancient Axe", "durability": 50, "min2d": 43, "max2d": 85, "rs": 125, "hi": 1, "gt": 0, "i": "invgix", "ui": "inv9giu", "si": "inv9giu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "9wn": { "nc": "wnd", "exc": "9wn", "elc": "7wn", "iq": 1, "n": "Burnt Wand", "durability": 15, "mind": 8, "maxd": 18, "rs": 25, "hi": 1, "gt": 0, "i": "invwnd", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "9yw": { "nc": "ywn", "exc": "9yw", "elc": "7yw", "iq": 1, "n": "Petrified Wand", "durability": 15, "mind": 8, "maxd": 24, "rs": 25, "hi": 1, "gt": 0, "i": "invywn", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "9bw": { "nc": "bwn", "exc": "9bw", "elc": "7bw", "iq": 1, "n": "Tomb Wand", "durability": 15, "mind": 10, "maxd": 22, "rs": 25, "hi": 1, "gt": 0, "i": "invbwn", "ui": "invbwnu", "si": "invbwnu", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "9gw": { "nc": "gwn", "exc": "9gw", "elc": "7gw", "iq": 1, "n": "Grave Wand", "durability": 15, "mind": 13, "maxd": 29, "rs": 25, "hi": 1, "gt": 0, "i": "invgwn", "ui": "inv9gwu", "si": "inv9gwu", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "9cl": { "nc": "clb", "exc": "9cl", "elc": "7cl", "iq": 1, "n": "Cudgel", "durability": 24, "mind": 6, "maxd": 21, "rs": 25, "hi": 1, "gt": 0, "i": "invclb", "ui": "invclbu", "si": "invclbu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Club", "Blunt", "Melee Weapon", "Weapon"] }, "9sc": { "nc": "scp", "exc": "9sc", "elc": "7sc", "iq": 1, "n": "Rune Scepter", "durability": 50, "mind": 13, "maxd": 24, "rs": 58, "hi": 1, "gt": 0, "i": "invscp", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Scepter", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "9qs": { "nc": "gsc", "exc": "9qs", "elc": "7qs", "iq": 1, "n": "Holy Water Sprinkler", "durability": 60, "mind": 14, "maxd": 36, "rs": 76, "hi": 1, "gt": 0, "i": "invgsc", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Scepter", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "9ws": { "nc": "wsp", "exc": "9ws", "elc": "7ws", "iq": 1, "n": "Divine Scepter", "durability": 70, "mind": 16, "maxd": 38, "rs": 103, "hi": 1, "gt": 0, "i": "invwsp", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Scepter", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "9sp": { "nc": "spc", "exc": "9sp", "elc": "7sp", "iq": 1, "n": "Barbed Club", "durability": 36, "mind": 13, "maxd": 25, "rs": 30, "hi": 1, "gt": 0, "i": "invspc", "ui": "invspcu", "si": "invspcu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Club", "Blunt", "Melee Weapon", "Weapon"] }, "9ma": { "nc": "mac", "exc": "9ma", "elc": "7ma", "iq": 1, "n": "Flanged Mace", "durability": 60, "mind": 15, "maxd": 23, "rs": 61, "hi": 1, "gt": 0, "i": "invmac", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "9mt": { "nc": "mst", "exc": "9mt", "elc": "7mt", "iq": 1, "n": "Jagged Star", "durability": 72, "mind": 20, "maxd": 31, "rs": 74, "hi": 1, "gt": 0, "i": "invmst", "ui": "invmstu", "si": "invmstu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "9fl": { "nc": "fla", "exc": "9fl", "elc": "7fl", "iq": 1, "n": "Knout", "durability": 30, "mind": 13, "maxd": 35, "rs": 82, "rd": 73, "hi": 1, "gt": 0, "i": "invfla", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "9wh": { "nc": "whm", "exc": "9wh", "elc": "7wh", "iq": 1, "n": "Battle Hammer", "durability": 55, "mind": 35, "maxd": 58, "rs": 100, "hi": 1, "gt": 0, "i": "invwhm", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "9m9": { "nc": "mau", "exc": "9m9", "elc": "7m7", "iq": 1, "n": "War Club", "durability": 60, "min2d": 53, "max2d": 78, "rs": 124, "hi": 1, "gt": 0, "i": "invmau", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "9gm": { "nc": "gma", "exc": "9gm", "elc": "7gm", "iq": 1, "n": "Martel de Fer", "durability": 60, "min2d": 61, "max2d": 99, "rs": 169, "hi": 1, "gt": 0, "i": "invgma", "ui": "inv9gmu", "si": "inv9gmu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "9ss": { "nc": "ssd", "exc": "9ss", "elc": "7ss", "iq": 1, "n": "Gladius", "durability": 24, "mind": 8, "maxd": 22, "rs": 25, "hi": 1, "gt": 0, "i": "invssd", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9sm": { "nc": "scm", "exc": "9sm", "elc": "7sm", "iq": 1, "n": "Cutlass", "durability": 22, "mind": 8, "maxd": 21, "rs": 25, "rd": 52, "hi": 1, "gt": 0, "i": "invscm", "ui": "invscmu", "si": "invscmu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9sb": { "nc": "sbr", "exc": "9sb", "elc": "7sb", "iq": 1, "n": "Shamshir", "durability": 32, "mind": 10, "maxd": 24, "rs": 58, "rd": 58, "hi": 1, "gt": 0, "i": "invsbr", "ui": "invsbru", "si": "invsbru", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9fc": { "nc": "flc", "exc": "9fc", "elc": "7fc", "iq": 1, "n": "Tulwar", "durability": 32, "mind": 16, "maxd": 35, "rs": 70, "rd": 42, "hi": 1, "gt": 0, "i": "invflc", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9cr": { "nc": "crs", "exc": "9cr", "elc": "7cr", "iq": 1, "n": "Dimensional Blade", "durability": 20, "mind": 13, "maxd": 35, "rs": 85, "rd": 60, "hi": 1, "gt": 0, "i": "invcrs", "ui": "inv9cru", "si": "inv9cru", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9bs": { "nc": "bsd", "exc": "9bs", "elc": "7bs", "iq": 1, "n": "Battle Sword", "durability": 32, "mind": 16, "maxd": 34, "rs": 92, "rd": 43, "hi": 1, "gt": 0, "i": "invbsd", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9ls": { "nc": "lsd", "exc": "9ls", "elc": "7ls", "iq": 1, "n": "Rune Sword", "durability": 44, "mind": 10, "maxd": 42, "rs": 103, "rd": 79, "hi": 1, "gt": 0, "i": "invlsd", "ui": "inv9lsu", "si": "inv9lsu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9wd": { "nc": "wsd", "exc": "9wd", "elc": "7wd", "iq": 1, "n": "Ancient Sword", "durability": 44, "mind": 18, "maxd": 43, "rs": 127, "rd": 88, "hi": 1, "gt": 0, "i": "invwsd", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "92h": { "nc": "2hs", "exc": "92h", "elc": "72h", "iq": 1, "n": "Espandon", "durability": 44, "mind": 8, "maxd": 26, "min2d": 18, "max2d": 40, "rs": 73, "rd": 61, "hi": 1, "gt": 0, "i": "inv2hs", "ui": "inv2hsu", "si": "inv2hsu", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9cm": { "nc": "clm", "exc": "9cm", "elc": "7cm", "iq": 1, "n": "Dacian Falx", "durability": 50, "mind": 13, "maxd": 30, "min2d": 26, "max2d": 61, "rs": 91, "rd": 20, "hi": 1, "gt": 0, "i": "invclm", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9gs": { "nc": "gis", "exc": "9gs", "elc": "7gs", "iq": 1, "n": "Tusk Sword", "durability": 50, "mind": 10, "maxd": 37, "min2d": 19, "max2d": 58, "rs": 104, "rd": 71, "hi": 1, "gt": 0, "i": "invgis", "ui": "invgisu", "si": "invgisu", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9b9": { "nc": "bsw", "exc": "9b9", "elc": "7b7", "iq": 1, "n": "Gothic Sword", "durability": 40, "mind": 14, "maxd": 40, "min2d": 39, "max2d": 60, "rs": 113, "rd": 20, "hi": 1, "gt": 0, "i": "invbsw", "ui": "invbswu", "si": "invbswu", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9fb": { "nc": "flb", "exc": "9fb", "elc": "7fb", "iq": 1, "n": "Zweihander", "durability": 50, "mind": 19, "maxd": 35, "min2d": 29, "max2d": 54, "rs": 125, "rd": 94, "hi": 1, "gt": 0, "i": "invflb", "ui": "inv9fbu", "si": "inv9fbu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9gd": { "nc": "gsd", "exc": "9gd", "elc": "7gd", "iq": 1, "n": "Executioner Sword", "durability": 50, "mind": 24, "maxd": 40, "min2d": 47, "max2d": 80, "rs": 170, "rd": 110, "hi": 1, "gt": 0, "i": "invgsd", "ui": "invgsdu", "si": "invgsdu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9dg": { "nc": "dgr", "exc": "9dg", "elc": "7dg", "iq": 1, "n": "Poignard", "durability": 16, "mind": 6, "maxd": 18, "rs": 25, "hi": 1, "gt": 0, "i": "invdgr", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9di": { "nc": "dir", "exc": "9di", "elc": "7di", "iq": 1, "n": "Rondel", "durability": 20, "mind": 10, "maxd": 26, "rs": 25, "rd": 58, "hi": 1, "gt": 0, "i": "invdir", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9kr": { "nc": "kri", "exc": "9kr", "elc": "7kr", "iq": 1, "n": "Cinquedeas", "durability": 24, "mind": 15, "maxd": 31, "rs": 25, "rd": 88, "hi": 1, "gt": 0, "i": "invkrs", "ui": "invkrsu", "si": "invkrsu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9bl": { "nc": "bld", "exc": "9bl", "elc": "7bl", "iq": 1, "n": "Stiletto", "durability": 24, "mind": 19, "maxd": 36, "rs": 47, "rd": 97, "hi": 1, "gt": 0, "i": "invbld", "ui": "inv9blu", "si": "inv9blu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9tk": { "nc": "tkf", "exc": "9tk", "elc": "7tk", "iq": 1, "n": "Battle Dart", "s": 1, "durability": 6, "mind": 8, "maxd": 16, "minmd": 11, "maxmd": 24, "rs": 25, "rd": 52, "gt": 0, "i": "invtkn", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Knife", "c": ["Throwing Knife", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9ta": { "nc": "tax", "exc": "9ta", "elc": "7ta", "iq": 1, "n": "Francisca", "s": 1, "durability": 15, "mind": 11, "maxd": 22, "minmd": 18, "maxmd": 33, "rs": 25, "rd": 80, "gt": 0, "i": "invtax", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Axe", "c": ["Throwing Axe", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Axe", "Melee Weapon", "Weapon"] }, "9bk": { "nc": "bkf", "exc": "9bk", "elc": "7bk", "iq": 1, "n": "War Dart", "s": 1, "durability": 20, "mind": 6, "maxd": 24, "minmd": 14, "maxmd": 27, "rs": 25, "rd": 97, "gt": 0, "i": "invbkf", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Knife", "c": ["Throwing Knife", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "9b8": { "nc": "bal", "exc": "9b8", "elc": "7b8", "iq": 1, "n": "Hurlbat", "s": 1, "durability": 16, "mind": 13, "maxd": 27, "minmd": 24, "maxmd": 34, "rs": 25, "rd": 106, "gt": 0, "i": "invbal", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Axe", "c": ["Throwing Axe", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Axe", "Melee Weapon", "Weapon"] }, "9ja": { "nc": "jav", "exc": "9ja", "elc": "7ja", "iq": 1, "n": "War Javelin", "s": 1, "durability": 10, "mind": 6, "maxd": 19, "minmd": 14, "maxmd": 32, "rs": 25, "rd": 25, "gt": 0, "i": "invjav", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9pi": { "nc": "pil", "exc": "9pi", "elc": "7pi", "iq": 1, "n": "Great Pilum", "s": 1, "durability": 12, "mind": 11, "maxd": 26, "minmd": 16, "maxmd": 42, "rs": 25, "rd": 88, "gt": 0, "i": "invpil", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9s9": { "nc": "ssp", "exc": "9s9", "elc": "7s7", "iq": 1, "n": "Simbilan", "s": 1, "durability": 14, "mind": 8, "maxd": 32, "minmd": 27, "maxmd": 50, "rs": 80, "rd": 80, "gt": 0, "i": "invssp", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9gl": { "nc": "glv", "exc": "9gl", "elc": "7gl", "iq": 1, "n": "Spiculum", "s": 1, "durability": 16, "mind": 13, "maxd": 38, "minmd": 32, "maxmd": 60, "rs": 98, "rd": 73, "gt": 0, "i": "invglv", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9ts": { "nc": "tsp", "exc": "9ts", "elc": "7ts", "iq": 1, "n": "Harpoon", "s": 1, "durability": 18, "mind": 13, "maxd": 35, "minmd": 18, "maxmd": 54, "rs": 25, "rd": 118, "gt": 0, "i": "invtsp", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9sr": { "nc": "spr", "exc": "9sr", "elc": "7sr", "iq": 1, "n": "War Spear", "durability": 30, "min2d": 10, "max2d": 37, "rs": 25, "rd": 25, "hi": 1, "gt": 0, "i": "invspr", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9tr": { "nc": "tri", "exc": "9tr", "elc": "7tr", "iq": 1, "n": "Fuscina", "durability": 35, "min2d": 19, "max2d": 37, "rs": 77, "rd": 25, "hi": 1, "gt": 0, "i": "invtri", "ui": "invtriu", "si": "invtriu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9br": { "nc": "brn", "exc": "9br", "elc": "7br", "iq": 1, "n": "War Fork", "durability": 28, "min2d": 16, "max2d": 40, "rs": 80, "rd": 95, "hi": 1, "gt": 0, "i": "invbrn", "ui": "inv9bru", "si": "inv9bru", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9st": { "nc": "spt", "exc": "9st", "elc": "7st", "iq": 1, "n": "Yari", "durability": 28, "min2d": 29, "max2d": 59, "rs": 101, "hi": 1, "gt": 0, "i": "invspt", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9p9": { "nc": "pik", "exc": "9p9", "elc": "7p7", "iq": 1, "n": "Lance", "durability": 25, "min2d": 27, "max2d": 114, "rs": 110, "rd": 88, "hi": 1, "gt": 0, "i": "invpik", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9b7": { "nc": "bar", "exc": "9b7", "elc": "7o7", "iq": 1, "n": "Lochaber Axe", "durability": 50, "min2d": 6, "max2d": 58, "rs": 80, "hi": 1, "gt": 0, "i": "invbar", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9vo": { "nc": "vou", "exc": "9vo", "elc": "7vo", "iq": 1, "n": "Bill", "durability": 50, "min2d": 14, "max2d": 53, "rs": 95, "hi": 1, "gt": 0, "i": "invvou", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9s8": { "nc": "scy", "exc": "9s8", "elc": "7s8", "iq": 1, "n": "Battle Scythe", "durability": 65, "min2d": 18, "max2d": 45, "rs": 82, "rd": 82, "hi": 1, "gt": 0, "i": "invscy", "ui": "inv9s8u", "si": "inv9s8u", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9pa": { "nc": "pax", "exc": "9pa", "elc": "7pa", "iq": 1, "n": "Partizan", "durability": 65, "min2d": 34, "max2d": 75, "rs": 113, "rd": 67, "hi": 1, "gt": 0, "i": "invpax", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9h9": { "nc": "hal", "exc": "9h9", "elc": "7h7", "iq": 1, "n": "Bec-de-Corbin", "durability": 55, "min2d": 13, "max2d": 85, "rs": 133, "rd": 91, "hi": 1, "gt": 0, "i": "invhal", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "9wc": { "nc": "wsc", "exc": "9wc", "elc": "7wc", "iq": 1, "n": "Grim Scythe", "durability": 55, "min2d": 30, "max2d": 70, "rs": 140, "rd": 140, "hi": 1, "gt": 0, "i": "invwsc", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "8ss": { "nc": "sst", "exc": "8ss", "elc": "6ss", "iq": 1, "n": "Jo Staff", "durability": 20, "min2d": 6, "max2d": 21, "rs": 25, "hi": 1, "gt": 0, "i": "invsst", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "8ls": { "nc": "lst", "exc": "8ls", "elc": "6ls", "iq": 1, "n": "Quarterstaff", "durability": 30, "min2d": 8, "max2d": 26, "rs": 25, "hi": 1, "gt": 0, "i": "invlst", "iw": 1, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "8cs": { "nc": "cst", "exc": "8cs", "elc": "6cs", "iq": 1, "n": "Cedar Staff", "durability": 35, "min2d": 11, "max2d": 32, "rs": 25, "hi": 1, "gt": 0, "i": "invcst", "ui": "invcstu", "si": "invcstu", "iw": 1, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "8bs": { "nc": "bst", "exc": "8bs", "elc": "6bs", "iq": 1, "n": "Gothic Staff", "durability": 40, "min2d": 14, "max2d": 34, "rs": 25, "hi": 1, "gt": 0, "i": "invbst", "iw": 1, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "8ws": { "nc": "wst", "exc": "8ws", "elc": "6ws", "iq": 1, "n": "Rune Staff", "durability": 50, "min2d": 24, "max2d": 58, "rs": 25, "hi": 1, "gt": 0, "i": "invwst", "ui": "inv8wsu", "si": "inv8wsu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "8sb": { "nc": "sbw", "exc": "8sb", "elc": "6sb", "iq": 1, "n": "Edge Bow", "durability": 20, "min2d": 6, "max2d": 19, "rs": 25, "rd": 43, "hi": 1, "gt": 0, "i": "invsbw", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "8hb": { "nc": "hbw", "exc": "8hb", "elc": "6hb", "iq": 1, "n": "Razor Bow", "durability": 32, "min2d": 8, "max2d": 22, "rs": 25, "rd": 62, "hi": 1, "gt": 0, "i": "invhbw", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "8lb": { "nc": "lbw", "exc": "8lb", "elc": "6lb", "iq": 1, "n": "Cedar Bow", "durability": 28, "min2d": 10, "max2d": 29, "rs": 53, "rd": 49, "hi": 1, "gt": 0, "i": "invlbw", "ui": "inv8lbu", "si": "inv8lbu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "8cb": { "nc": "cbw", "exc": "8cb", "elc": "6cb", "iq": 1, "n": "Double Bow", "durability": 36, "min2d": 11, "max2d": 26, "rs": 58, "rd": 73, "hi": 1, "gt": 0, "i": "invcbw", "ui": "invcbwu", "si": "invcbwu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "8s8": { "nc": "sbb", "exc": "8s8", "elc": "6s7", "iq": 1, "n": "Short Siege Bow", "durability": 40, "min2d": 13, "max2d": 30, "rs": 65, "rd": 80, "hi": 1, "gt": 0, "i": "invsbb", "ui": "inv8s8u", "si": "inv8s8u", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "8l8": { "nc": "lbb", "exc": "8l8", "elc": "6l7", "iq": 1, "n": "Large Siege Bow", "durability": 44, "min2d": 10, "max2d": 42, "rs": 80, "rd": 95, "hi": 1, "gt": 0, "i": "invlbb", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "8sw": { "nc": "swb", "exc": "8sw", "elc": "6sw", "iq": 1, "n": "Rune Bow", "durability": 48, "min2d": 14, "max2d": 35, "rs": 73, "rd": 103, "hi": 1, "gt": 0, "i": "invswb", "ui": "invswbu", "si": "invswbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "8lw": { "nc": "lwb", "exc": "8lw", "elc": "6lw", "iq": 1, "n": "Gothic Bow", "durability": 55, "min2d": 10, "max2d": 50, "rs": 95, "rd": 118, "hi": 1, "gt": 0, "i": "invlwb", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "8lx": { "nc": "lxb", "exc": "8lx", "elc": "6lx", "iq": 1, "n": "Arbalest", "durability": 30, "min2d": 14, "max2d": 27, "rs": 52, "rd": 61, "hi": 1, "gt": 0, "i": "invlxb", "ui": "inv8lxu", "si": "inv8lxu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "8mx": { "nc": "mxb", "exc": "8mx", "elc": "6mx", "iq": 1, "n": "Siege Crossbow", "durability": 40, "min2d": 20, "max2d": 42, "rs": 80, "rd": 70, "hi": 1, "gt": 0, "i": "invmxb", "ui": "inv8mxu", "si": "inv8mxu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "8hx": { "nc": "hxb", "exc": "8hx", "elc": "6hx", "iq": 1, "n": "Ballista", "durability": 50, "min2d": 33, "max2d": 55, "rs": 110, "rd": 80, "hi": 1, "gt": 0, "i": "invhxb", "ui": "invhxbu", "si": "invhxbu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "8rx": { "nc": "rxb", "exc": "8rx", "elc": "6rx", "iq": 1, "n": "Chu-Ko-Nu", "durability": 40, "min2d": 14, "max2d": 32, "rs": 80, "rd": 95, "hi": 1, "gt": 0, "i": "invrxb", "ui": "invrxbu", "si": "invrxbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "qf1": { "nc": "fla", "exc": "", "elc": "", "iq": 0, "n": "Khalim's Flail", "durability": 30, "mind": 1, "maxd": 15, "rs": 41, "rd": 35, "hi": 1, "gt": 0, "i": "invqf1", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "qf2": { "nc": "fla", "exc": "", "elc": "", "iq": 0, "n": "Khalim's Will", "durability": 30, "mind": 1, "maxd": 15, "hi": 1, "gt": 0, "i": "invqf2", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "ktr": { "nc": "ktr", "exc": "9ar", "elc": "7ar", "iq": 0, "n": "Katar", "durability": 48, "mind": 4, "maxd": 7, "rs": 20, "rd": 20, "hi": 1, "gt": 0, "i": "invktr", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "eq2n": "Assassin Item", "c": ["Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "wrb": { "nc": "wrb", "exc": "9wb", "elc": "7wb", "iq": 0, "n": "Wrist Blade", "durability": 52, "mind": 5, "maxd": 9, "rs": 33, "rd": 33, "hi": 1, "gt": 0, "i": "invktr", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "eq2n": "Assassin Item", "c": ["Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "axf": { "nc": "axf", "exc": "9xf", "elc": "7xf", "iq": 0, "n": "Hatchet Hands", "durability": 56, "mind": 2, "maxd": 15, "rs": 37, "rd": 37, "hi": 1, "gt": 0, "i": "invaxf", "ui": "invaxfu", "si": "invaxfu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "eq2n": "Assassin Item", "c": ["Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "ces": { "nc": "ces", "exc": "9cs", "elc": "7cs", "iq": 0, "n": "Cestus", "durability": 72, "mind": 7, "maxd": 15, "rs": 42, "rd": 42, "hi": 1, "gt": 0, "i": "invaxf", "ui": "invaxfu", "si": "invaxfu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "eq2n": "Assassin Item", "c": ["Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "clw": { "nc": "clw", "exc": "9lw", "elc": "7lw", "iq": 0, "n": "Claws", "durability": 64, "mind": 8, "maxd": 15, "rs": 46, "rd": 46, "hi": 1, "gt": 0, "i": "invclw", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "eq2n": "Assassin Item", "c": ["Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "btl": { "nc": "btl", "exc": "9tw", "elc": "7tw", "iq": 0, "n": "Blade Talons", "durability": 69, "mind": 10, "maxd": 14, "rs": 50, "rd": 50, "hi": 1, "gt": 0, "i": "invclw", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "eq2n": "Assassin Item", "c": ["Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "skr": { "nc": "skr", "exc": "9qr", "elc": "7qr", "iq": 0, "n": "Scissors Katar", "durability": 68, "mind": 9, "maxd": 17, "rs": 55, "rd": 55, "hi": 1, "gt": 0, "i": "invskr", "ui": "invskru", "si": "invskru", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "eq2n": "Assassin Item", "c": ["Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "9ar": { "nc": "ktr", "exc": "9ar", "elc": "7ar", "iq": 1, "n": "Quhab", "durability": 48, "mind": 11, "maxd": 24, "rs": 57, "rd": 57, "hi": 1, "gt": 0, "i": "invktr", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "eq2n": "Assassin Item", "c": ["Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "9wb": { "nc": "wrb", "exc": "9wb", "elc": "7wb", "iq": 1, "n": "Wrist Spike", "durability": 56, "mind": 13, "maxd": 27, "rs": 66, "rd": 66, "hi": 1, "gt": 0, "i": "invktr", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "eq2n": "Assassin Item", "c": ["Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "9xf": { "nc": "axf", "exc": "9xf", "elc": "7xf", "iq": 1, "n": "Fascia", "durability": 64, "mind": 8, "maxd": 37, "rs": 69, "rd": 69, "hi": 1, "gt": 0, "i": "invaxf", "ui": "invaxfu", "si": "invaxfu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "eq2n": "Assassin Item", "c": ["Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "9cs": { "nc": "ces", "exc": "9cs", "elc": "7cs", "iq": 1, "n": "Hand Scythe", "durability": 72, "mind": 16, "maxd": 37, "rs": 73, "rd": 73, "hi": 1, "gt": 0, "i": "invaxf", "ui": "invaxfu", "si": "invaxfu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "9lw": { "nc": "clw", "exc": "9lw", "elc": "7lw", "iq": 1, "n": "Greater Claws", "durability": 52, "mind": 18, "maxd": 37, "rs": 76, "rd": 76, "hi": 1, "gt": 0, "i": "invclw", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "9tw": { "nc": "btl", "exc": "9tw", "elc": "7tw", "iq": 1, "n": "Greater Talons", "durability": 69, "mind": 21, "maxd": 35, "rs": 79, "rd": 79, "hi": 1, "gt": 0, "i": "invclw", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "9qr": { "nc": "skr", "exc": "9qr", "elc": "7qr", "iq": 1, "n": "Scissors Quhab", "durability": 68, "mind": 19, "maxd": 40, "rs": 82, "rd": 82, "hi": 1, "gt": 0, "i": "invskr", "ui": "invskru", "si": "invskru", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "7ar": { "nc": "ktr", "exc": "9ar", "elc": "7ar", "iq": 2, "n": "Suwayyah", "durability": 48, "mind": 39, "maxd": 52, "rs": 99, "rd": 99, "hi": 1, "gt": 0, "i": "invktr", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "7wb": { "nc": "wrb", "exc": "9wb", "elc": "7wb", "iq": 2, "n": "Wrist Sword", "durability": 56, "mind": 34, "maxd": 45, "rs": 105, "rd": 105, "hi": 1, "gt": 0, "i": "invktr", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "7xf": { "nc": "axf", "exc": "9xf", "elc": "7xf", "iq": 2, "n": "War Fist", "durability": 64, "mind": 44, "maxd": 53, "rs": 108, "rd": 108, "hi": 1, "gt": 0, "i": "invaxf", "ui": "invaxfu", "si": "invaxfu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "7cs": { "nc": "ces", "exc": "9cs", "elc": "7cs", "iq": 2, "n": "Battle Cestus", "durability": 72, "mind": 36, "maxd": 42, "rs": 110, "rd": 110, "hi": 1, "gt": 0, "i": "invaxf", "ui": "invaxfu", "si": "invaxfu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "7lw": { "nc": "clw", "exc": "9lw", "elc": "7lw", "iq": 2, "n": "Feral Claws", "durability": 52, "mind": 22, "maxd": 53, "rs": 113, "rd": 113, "hi": 1, "gt": 0, "i": "invclw", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "7tw": { "nc": "btl", "exc": "9tw", "elc": "7tw", "iq": 2, "n": "Runic Talons", "durability": 69, "mind": 24, "maxd": 44, "rs": 115, "rd": 115, "hi": 1, "gt": 0, "i": "invclw", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "7qr": { "nc": "skr", "exc": "9qr", "elc": "7qr", "iq": 2, "n": "Scissors Suwayyah", "durability": 68, "mind": 40, "maxd": 51, "rs": 118, "rd": 118, "hi": 1, "gt": 0, "i": "invskr", "ui": "invskru", "si": "invskru", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Hand to Hand", "c": ["Hand to Hand 2", "Hand to Hand", "Melee Weapon", "Weapon", "Assassin Item", "Class Specific"] }, "7ha": { "nc": "hax", "exc": "9ha", "elc": "7ha", "iq": 2, "n": "Tomahawk", "durability": 28, "mind": 33, "maxd": 58, "rs": 125, "rd": 67, "hi": 1, "gt": 0, "i": "invhax", "ui": "invhaxu", "si": "invhaxu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "7ax": { "nc": "axe", "exc": "9ax", "elc": "7ax", "iq": 2, "n": "Small Crescent", "durability": 24, "mind": 38, "maxd": 60, "rs": 115, "rd": 83, "hi": 1, "gt": 0, "i": "invaxe", "ui": "invaxeu", "si": "invaxeu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "72a": { "nc": "2ax", "exc": "92a", "elc": "72a", "iq": 2, "n": "Ettin Axe", "durability": 24, "mind": 33, "maxd": 66, "rs": 145, "rd": 45, "hi": 1, "gt": 0, "i": "inv2ax", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "7mp": { "nc": "mpi", "exc": "9mp", "elc": "7mp", "iq": 2, "n": "War Spike", "durability": 26, "mind": 30, "maxd": 48, "rs": 133, "rd": 54, "hi": 1, "gt": 0, "i": "invmpi", "ui": "invmpiu", "si": "invmpiu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "7wa": { "nc": "wax", "exc": "9wa", "elc": "7wa", "iq": 2, "n": "Berserker Axe", "durability": 26, "mind": 24, "maxd": 71, "rs": 138, "rd": 59, "hi": 1, "gt": 0, "i": "invwax", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "7la": { "nc": "lax", "exc": "9la", "elc": "7la", "iq": 2, "n": "Feral Axe", "durability": 30, "min2d": 25, "max2d": 123, "rs": 196, "hi": 1, "gt": 0, "i": "invlax", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "7ba": { "nc": "bax", "exc": "9ba", "elc": "7ba", "iq": 2, "n": "Silver-edged Axe", "durability": 35, "min2d": 62, "max2d": 110, "rs": 166, "rd": 65, "hi": 1, "gt": 0, "i": "invbrx", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "7bt": { "nc": "btx", "exc": "9bt", "elc": "7bt", "iq": 2, "n": "Decapitator", "durability": 40, "min2d": 49, "max2d": 137, "rs": 189, "rd": 33, "hi": 1, "gt": 0, "i": "invbtx", "ui": "invbtxu", "si": "invbtxu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "7ga": { "nc": "gax", "exc": "9ga", "elc": "7ga", "iq": 2, "n": "Champion Axe", "durability": 50, "min2d": 59, "max2d": 94, "rs": 167, "rd": 59, "hi": 1, "gt": 0, "i": "invgax", "ui": "invgaxu", "si": "invgaxu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "7gi": { "nc": "gix", "exc": "9gi", "elc": "7gi", "iq": 2, "n": "Glorious Axe", "durability": 50, "min2d": 60, "max2d": 124, "rs": 164, "rd": 55, "hi": 1, "gt": 0, "i": "invgix", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Melee Weapon", "c": ["Axe", "Melee Weapon", "Weapon"] }, "7wn": { "nc": "wnd", "exc": "9wn", "elc": "7wn", "iq": 2, "n": "Polished Wand", "durability": 22, "mind": 18, "maxd": 33, "rs": 25, "hi": 1, "gt": 0, "i": "invwnd", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "7yw": { "nc": "ywn", "exc": "9yw", "elc": "7yw", "iq": 2, "n": "Ghost Wand", "durability": 14, "mind": 20, "maxd": 40, "rs": 25, "hi": 1, "gt": 0, "i": "invywn", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "7bw": { "nc": "bwn", "exc": "9bw", "elc": "7bw", "iq": 2, "n": "Lich Wand", "durability": 17, "mind": 10, "maxd": 31, "rs": 25, "hi": 1, "gt": 0, "i": "invbwn", "ui": "invbwnu", "si": "invbwnu", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "7gw": { "nc": "gwn", "exc": "9gw", "elc": "7gw", "iq": 2, "n": "Unearthed Wand", "durability": 18, "mind": 22, "maxd": 28, "rs": 25, "hi": 1, "gt": 0, "i": "invgwn", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Wand", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "7cl": { "nc": "clb", "exc": "9cl", "elc": "7cl", "iq": 2, "n": "Truncheon", "durability": 55, "mind": 35, "maxd": 43, "rs": 88, "rd": 43, "hi": 1, "gt": 0, "i": "invclb", "ui": "invclbu", "si": "invclbu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Club", "Blunt", "Melee Weapon", "Weapon"] }, "7sc": { "nc": "scp", "exc": "9sc", "elc": "7sc", "iq": 2, "n": "Mighty Scepter", "durability": 50, "mind": 40, "maxd": 52, "rs": 125, "rd": 65, "hi": 1, "gt": 0, "i": "invscp", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Scepter", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "7qs": { "nc": "gsc", "exc": "9qs", "elc": "7qs", "iq": 2, "n": "Seraph Rod", "durability": 60, "mind": 45, "maxd": 54, "rs": 108, "rd": 69, "hi": 1, "gt": 0, "i": "invgsc", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Scepter", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "7ws": { "nc": "wsp", "exc": "9ws", "elc": "7ws", "iq": 2, "n": "Caduceus", "durability": 70, "mind": 37, "maxd": 43, "rs": 97, "rd": 70, "hi": 1, "gt": 0, "i": "invwsp", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Staves And Rods", "c": ["Scepter", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "7sp": { "nc": "spc", "exc": "9sp", "elc": "7sp", "iq": 2, "n": "Tyrant Club", "durability": 65, "mind": 32, "maxd": 58, "rs": 133, "hi": 1, "gt": 0, "i": "invspc", "ui": "invspcu", "si": "invspcu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Club", "Blunt", "Melee Weapon", "Weapon"] }, "7ma": { "nc": "mac", "exc": "9ma", "elc": "7ma", "iq": 2, "n": "Reinforced Mace", "durability": 60, "mind": 41, "maxd": 49, "rs": 145, "rd": 46, "hi": 1, "gt": 0, "i": "invmac", "si": "inv7mas", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "7mt": { "nc": "mst", "exc": "9mt", "elc": "7mt", "iq": 2, "n": "Devil Star", "durability": 72, "mind": 43, "maxd": 53, "rs": 153, "rd": 44, "hi": 1, "gt": 0, "i": "invmst", "ui": "invmstu", "si": "invmstu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "7fl": { "nc": "fla", "exc": "9fl", "elc": "7fl", "iq": 2, "n": "Scourge", "durability": 65, "mind": 3, "maxd": 80, "rs": 125, "rd": 77, "hi": 1, "gt": 0, "i": "invfla", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Mace", "Blunt", "Melee Weapon", "Weapon"] }, "7wh": { "nc": "whm", "exc": "9wh", "elc": "7wh", "iq": 2, "n": "Legendary Mallet", "durability": 65, "mind": 50, "maxd": 61, "rs": 189, "hi": 1, "gt": 0, "i": "invwhm", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "7m7": { "nc": "mau", "exc": "9m9", "elc": "7m7", "iq": 2, "n": "Ogre Maul", "durability": 60, "min2d": 77, "max2d": 106, "rs": 225, "hi": 1, "gt": 0, "i": "invmau", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "7gm": { "nc": "gma", "exc": "9gm", "elc": "7gm", "iq": 2, "n": "Thunder Maul", "durability": 60, "min2d": 33, "max2d": 180, "rs": 253, "hi": 1, "gt": 0, "i": "invgma", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Blunt", "c": ["Hammer", "Blunt", "Melee Weapon", "Weapon"] }, "7ss": { "nc": "ssd", "exc": "9ss", "elc": "7ss", "iq": 2, "n": "Falcata", "durability": 24, "mind": 31, "maxd": 59, "rs": 150, "rd": 88, "hi": 1, "gt": 0, "i": "invssd", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7sm": { "nc": "scm", "exc": "9sm", "elc": "7sm", "iq": 2, "n": "Ataghan", "durability": 22, "mind": 26, "maxd": 46, "rs": 138, "rd": 95, "hi": 1, "gt": 0, "i": "invscm", "ui": "invscmu", "si": "invscmu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7sb": { "nc": "sbr", "exc": "9sb", "elc": "7sb", "iq": 2, "n": "Elegant Blade", "durability": 32, "mind": 33, "maxd": 45, "rs": 109, "rd": 122, "hi": 1, "gt": 0, "i": "invsbr", "ui": "invsbru", "si": "invsbru", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7fc": { "nc": "flc", "exc": "9fc", "elc": "7fc", "iq": 2, "n": "Hydra Edge", "durability": 32, "mind": 28, "maxd": 68, "rs": 142, "rd": 105, "hi": 1, "gt": 0, "i": "invflc", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7cr": { "nc": "crs", "exc": "9cr", "elc": "7cr", "iq": 2, "n": "Phase Blade", "durability": 0, "mind": 31, "maxd": 35, "rs": 25, "rd": 136, "hi": 1, "gt": 0, "i": "invcrs", "ui": "invcrsu", "si": "invcrsu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7bs": { "nc": "bsd", "exc": "9bs", "elc": "7bs", "iq": 2, "n": "Conquest Sword", "durability": 32, "mind": 37, "maxd": 53, "rs": 142, "rd": 112, "hi": 1, "gt": 0, "i": "invbsd", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7ls": { "nc": "lsd", "exc": "9ls", "elc": "7ls", "iq": 2, "n": "Cryptic Sword", "durability": 44, "mind": 5, "maxd": 77, "rs": 99, "rd": 109, "hi": 1, "gt": 0, "i": "invlsd", "ui": "invlsdu", "si": "invlsdu", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7wd": { "nc": "wsd", "exc": "9wd", "elc": "7wd", "iq": 2, "n": "Mythical Sword", "durability": 44, "mind": 40, "maxd": 50, "rs": 147, "rd": 124, "hi": 1, "gt": 0, "i": "invwsd", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "72h": { "nc": "2hs", "exc": "92h", "elc": "72h", "iq": 2, "n": "Legend Sword", "durability": 44, "mind": 22, "maxd": 56, "min2d": 50, "max2d": 94, "rs": 175, "rd": 100, "hi": 1, "gt": 0, "i": "inv2hs", "ui": "inv2hsu", "si": "inv2hsu", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7cm": { "nc": "clm", "exc": "9cm", "elc": "7cm", "iq": 2, "n": "Highland Blade", "durability": 50, "mind": 22, "maxd": 62, "min2d": 67, "max2d": 96, "rs": 171, "rd": 104, "hi": 1, "gt": 0, "i": "invclm", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7gs": { "nc": "gis", "exc": "9gs", "elc": "7gs", "iq": 2, "n": "Balrog Blade", "durability": 50, "mind": 15, "maxd": 75, "min2d": 55, "max2d": 118, "rs": 185, "rd": 87, "hi": 1, "gt": 0, "i": "invgis", "ui": "invgisu", "si": "invgisu", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7b7": { "nc": "bsw", "exc": "9b9", "elc": "7b7", "iq": 2, "n": "Champion Sword", "durability": 40, "mind": 24, "maxd": 54, "min2d": 71, "max2d": 83, "rs": 163, "rd": 103, "hi": 1, "gt": 0, "i": "invbsw", "ui": "invbswu", "si": "invbswu", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7fb": { "nc": "flb", "exc": "9fb", "elc": "7fb", "iq": 2, "n": "Colossus Sword", "durability": 50, "mind": 26, "maxd": 70, "min2d": 61, "max2d": 121, "rs": 182, "rd": 95, "hi": 1, "gt": 0, "i": "invflb", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7gd": { "nc": "gsd", "exc": "9gd", "elc": "7gd", "iq": 2, "n": "Colossus Blade", "durability": 50, "mind": 25, "maxd": 65, "min2d": 58, "max2d": 115, "rs": 189, "rd": 110, "hi": 1, "gt": 0, "i": "invgsd", "ui": "invgsdu", "si": "invgsdu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Sword", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7dg": { "nc": "dgr", "exc": "9dg", "elc": "7dg", "iq": 2, "n": "Bone Knife", "durability": 26, "mind": 23, "maxd": 49, "rs": 38, "rd": 75, "hi": 1, "gt": 0, "i": "invdgr", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7di": { "nc": "dir", "exc": "9di", "elc": "7di", "iq": 2, "n": "Mithril Point", "durability": 55, "mind": 37, "maxd": 53, "rs": 55, "rd": 98, "hi": 1, "gt": 0, "i": "invdir", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7kr": { "nc": "kri", "exc": "9kr", "elc": "7kr", "iq": 2, "n": "Fanged Knife", "durability": 36, "mind": 15, "maxd": 57, "rs": 42, "rd": 86, "hi": 1, "gt": 0, "i": "invkrs", "ui": "invkrsu", "si": "invkrsu", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7bl": { "nc": "bld", "exc": "9bl", "elc": "7bl", "iq": 2, "n": "Legend Spike", "durability": 47, "mind": 31, "maxd": 47, "rs": 65, "rd": 67, "hi": 1, "gt": 0, "i": "invbld", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Swords and Knives", "c": ["Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7tk": { "nc": "tkf", "exc": "9tk", "elc": "7tk", "iq": 2, "n": "Flying Knife", "s": 1, "durability": 6, "mind": 23, "maxd": 54, "minmd": 23, "maxmd": 54, "rs": 48, "rd": 141, "gt": 0, "i": "invtkn", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Knife", "c": ["Throwing Knife", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7ta": { "nc": "tax", "exc": "9ta", "elc": "7ta", "iq": 2, "n": "Flying Axe", "s": 1, "durability": 15, "mind": 17, "maxd": 65, "minmd": 15, "maxmd": 66, "rs": 88, "rd": 108, "gt": 0, "i": "invtax", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Axe", "c": ["Throwing Axe", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Axe", "Melee Weapon", "Weapon"] }, "7bk": { "nc": "bkf", "exc": "9bk", "elc": "7bk", "iq": 2, "n": "Winged Knife", "s": 1, "durability": 20, "mind": 27, "maxd": 35, "minmd": 23, "maxmd": 39, "rs": 45, "rd": 142, "gt": 0, "i": "invbkf", "ui": "invtk3", "iw": 1, "ih": 2, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Knife", "c": ["Throwing Knife", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Knife", "Swords and Knives", "Melee Weapon", "Weapon"] }, "7b8": { "nc": "bal", "exc": "9b8", "elc": "7b8", "iq": 2, "n": "Winged Axe", "s": 1, "durability": 16, "mind": 11, "maxd": 56, "minmd": 7, "maxmd": 60, "rs": 96, "rd": 122, "gt": 0, "i": "invbal", "iw": 2, "ih": 3, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Axe", "c": ["Throwing Axe", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Axe", "Melee Weapon", "Weapon"] }, "7ja": { "nc": "jav", "exc": "9ja", "elc": "7ja", "iq": 2, "n": "Hyperion Javelin", "s": 1, "durability": 10, "mind": 21, "maxd": 57, "minmd": 28, "maxmd": 55, "rs": 98, "rd": 123, "gt": 0, "i": "invjav", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7pi": { "nc": "pil", "exc": "9pi", "elc": "7pi", "iq": 2, "n": "Stygian Pilum", "s": 1, "durability": 12, "mind": 14, "maxd": 64, "minmd": 21, "maxmd": 75, "rs": 118, "rd": 112, "gt": 0, "i": "invpil", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7s7": { "nc": "ssp", "exc": "9s9", "elc": "7s7", "iq": 2, "n": "Balrog Spear", "s": 1, "durability": 14, "mind": 33, "maxd": 63, "minmd": 40, "maxmd": 62, "rs": 127, "rd": 95, "gt": 0, "i": "invssp", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7gl": { "nc": "glv", "exc": "9gl", "elc": "7gl", "iq": 2, "n": "Ghost Glaive", "s": 1, "durability": 16, "mind": 19, "maxd": 60, "minmd": 30, "maxmd": 85, "rs": 89, "rd": 137, "gt": 0, "i": "invglv", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7ts": { "nc": "tsp", "exc": "9ts", "elc": "7ts", "iq": 2, "n": "Winged Harpoon", "s": 1, "durability": 18, "mind": 27, "maxd": 35, "minmd": 11, "maxmd": 77, "rs": 76, "rd": 145, "gt": 0, "i": "invtsp", "iw": 1, "ih": 4, "it": 2, "ig": [], "eq1n": "Combo Weapon", "eq2n": "Spear", "c": ["Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7sr": { "nc": "spr", "exc": "9sr", "elc": "7sr", "iq": 2, "n": "Hyperion Spear", "durability": 30, "min2d": 35, "max2d": 119, "rs": 155, "rd": 120, "hi": 1, "gt": 0, "i": "invspr", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7tr": { "nc": "tri", "exc": "9tr", "elc": "7tr", "iq": 2, "n": "Stygian Pike", "durability": 35, "min2d": 29, "max2d": 144, "rs": 168, "rd": 97, "hi": 1, "gt": 0, "i": "invtri", "ui": "invtriu", "si": "invtriu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7br": { "nc": "brn", "exc": "9br", "elc": "7br", "iq": 2, "n": "Mancatcher", "durability": 28, "min2d": 42, "max2d": 92, "rs": 132, "rd": 134, "hi": 1, "gt": 0, "i": "invbrn", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7st": { "nc": "spt", "exc": "9st", "elc": "7st", "iq": 2, "n": "Ghost Spear", "durability": 28, "min2d": 18, "max2d": 155, "rs": 122, "rd": 163, "hi": 1, "gt": 0, "i": "invspt", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7p7": { "nc": "pik", "exc": "9p9", "elc": "7p7", "iq": 2, "n": "War Pike", "durability": 25, "min2d": 33, "max2d": 178, "rs": 165, "rd": 106, "hi": 1, "gt": 0, "i": "invpik", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spears and Polearms", "c": ["Spear", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7o7": { "nc": "bar", "exc": "9b7", "elc": "7o7", "iq": 2, "n": "Ogre Axe", "durability": 50, "min2d": 28, "max2d": 145, "rs": 195, "rd": 75, "hi": 1, "gt": 0, "i": "invbar", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7vo": { "nc": "vou", "exc": "9vo", "elc": "7vo", "iq": 2, "n": "Colossus Voulge", "durability": 50, "min2d": 17, "max2d": 165, "rs": 210, "rd": 55, "hi": 1, "gt": 0, "i": "invvou", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7s8": { "nc": "scy", "exc": "9s8", "elc": "7s8", "iq": 2, "n": "Thresher", "durability": 65, "min2d": 12, "max2d": 141, "rs": 152, "rd": 118, "hi": 1, "gt": 0, "i": "invscy", "ui": "invscyu", "si": "invscyu", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7pa": { "nc": "pax", "exc": "9pa", "elc": "7pa", "iq": 2, "n": "Cryptic Axe", "durability": 65, "min2d": 33, "max2d": 150, "rs": 165, "rd": 103, "hi": 1, "gt": 0, "i": "invpax", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7h7": { "nc": "hal", "exc": "9h9", "elc": "7h7", "iq": 2, "n": "Great Poleaxe", "durability": 55, "min2d": 46, "max2d": 127, "rs": 179, "rd": 99, "hi": 1, "gt": 0, "i": "invhal", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "7wc": { "nc": "wsc", "exc": "9wc", "elc": "7wc", "iq": 2, "n": "Giant Thresher", "durability": 55, "min2d": 40, "max2d": 114, "rs": 188, "rd": 140, "hi": 1, "gt": 0, "i": "invwsc", "iw": 2, "ih": 4, "it": 2, "ig": [], "eq1n": "Spears and Polearms", "c": ["Polearm", "Spears and Polearms", "Melee Weapon", "Weapon"] }, "6ss": { "nc": "sst", "exc": "8ss", "elc": "6ss", "iq": 2, "n": "Walking Stick", "durability": 20, "min2d": 69, "max2d": 85, "rs": 25, "hi": 1, "gt": 0, "i": "invsst", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "6ls": { "nc": "lst", "exc": "8ls", "elc": "6ls", "iq": 2, "n": "Stalagmite", "durability": 30, "min2d": 75, "max2d": 107, "rs": 63, "rd": 35, "hi": 1, "gt": 0, "i": "invlst", "iw": 1, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "6cs": { "nc": "cst", "exc": "8cs", "elc": "6cs", "iq": 2, "n": "Elder Staff", "durability": 35, "min2d": 80, "max2d": 93, "rs": 44, "rd": 37, "hi": 1, "gt": 0, "i": "invcst", "ui": "invcstu", "si": "invcstu", "iw": 1, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "6bs": { "nc": "bst", "exc": "8bs", "elc": "6bs", "iq": 2, "n": "Shillelagh", "durability": 40, "min2d": 65, "max2d": 108, "rs": 52, "rd": 27, "hi": 1, "gt": 0, "i": "invbst", "iw": 1, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "6ws": { "nc": "wst", "exc": "8ws", "elc": "6ws", "iq": 2, "n": "Archon Staff", "durability": 26, "min2d": 83, "max2d": 99, "rs": 34, "hi": 1, "gt": 0, "i": "invwst", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Staves And Rods", "c": ["Staff", "Staves And Rods", "Blunt", "Melee Weapon", "Weapon"] }, "6sb": { "nc": "sbw", "exc": "8sb", "elc": "6sb", "iq": 2, "n": "Spider Bow", "durability": 20, "min2d": 23, "max2d": 50, "rs": 64, "rd": 143, "hi": 1, "gt": 0, "i": "invsbw", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "6hb": { "nc": "hbw", "exc": "8hb", "elc": "6hb", "iq": 2, "n": "Blade Bow", "durability": 32, "min2d": 21, "max2d": 41, "rs": 76, "rd": 119, "hi": 1, "gt": 0, "i": "invhbw", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "6lb": { "nc": "lbw", "exc": "8lb", "elc": "6lb", "iq": 2, "n": "Shadow Bow", "durability": 28, "min2d": 15, "max2d": 59, "rs": 52, "rd": 188, "hi": 1, "gt": 0, "i": "invlbw", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "6cb": { "nc": "cbw", "exc": "8cb", "elc": "6cb", "iq": 2, "n": "Great Bow", "durability": 36, "min2d": 12, "max2d": 52, "rs": 121, "rd": 107, "hi": 1, "gt": 0, "i": "invcbw", "ui": "invcbwu", "si": "invcbwu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "6s7": { "nc": "sbb", "exc": "8s8", "elc": "6s7", "iq": 2, "n": "Diamond Bow", "durability": 40, "min2d": 33, "max2d": 40, "rs": 89, "rd": 132, "hi": 1, "gt": 0, "i": "invsbb", "ui": "invsbbu", "si": "invsbbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "6l7": { "nc": "lbb", "exc": "8l8", "elc": "6l7", "iq": 2, "n": "Crusader Bow", "durability": 44, "min2d": 15, "max2d": 63, "rs": 97, "rd": 121, "hi": 1, "gt": 0, "i": "invlbb", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "6sw": { "nc": "swb", "exc": "8sw", "elc": "6sw", "iq": 2, "n": "Ward Bow", "durability": 48, "min2d": 20, "max2d": 53, "rs": 72, "rd": 146, "hi": 1, "gt": 0, "i": "invswb", "ui": "invswbu", "si": "invswbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "6lw": { "nc": "lwb", "exc": "8lw", "elc": "6lw", "iq": 2, "n": "Hydra Bow", "durability": 55, "min2d": 10, "max2d": 68, "rs": 134, "rd": 167, "hi": 1, "gt": 0, "i": "invlwb", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Bow", "Missile Weapon", "Weapon"] }, "6lx": { "nc": "lxb", "exc": "8lx", "elc": "6lx", "iq": 2, "n": "Pellet Bow", "durability": 30, "min2d": 28, "max2d": 73, "rs": 83, "rd": 155, "hi": 1, "gt": 0, "i": "invlxb", "ui": "invlxbu", "si": "invlxbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "6mx": { "nc": "mxb", "exc": "8mx", "elc": "6mx", "iq": 2, "n": "Gorgon Crossbow", "durability": 40, "min2d": 25, "max2d": 87, "rs": 117, "rd": 105, "hi": 1, "gt": 0, "i": "invmxb", "ui": "invmxbu", "si": "invmxbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "6hx": { "nc": "hxb", "exc": "8hx", "elc": "6hx", "iq": 2, "n": "Colossus Crossbow", "durability": 50, "min2d": 32, "max2d": 91, "rs": 163, "rd": 77, "hi": 1, "gt": 0, "i": "invhxb", "ui": "invhxbu", "si": "invhxbu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "6rx": { "nc": "rxb", "exc": "8rx", "elc": "6rx", "iq": 2, "n": "Demon Crossbow", "durability": 40, "min2d": 26, "max2d": 40, "rs": 141, "rd": 98, "hi": 1, "gt": 0, "i": "invrxb", "ui": "invrxbu", "si": "invrxbu", "iw": 2, "ih": 3, "it": 8, "ig": [], "eq1n": "Missile Weapon", "c": ["Crossbow", "Missile Weapon", "Weapon"] }, "ob1": { "nc": "ob1", "exc": "ob6", "elc": "obb", "iq": 0, "n": "Eagle Orb", "durability": 20, "mind": 2, "maxd": 5, "hi": 1, "gt": 0, "i": "invob1", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "ob2": { "nc": "ob2", "exc": "ob7", "elc": "obc", "iq": 0, "n": "Sacred Globe", "durability": 30, "mind": 3, "maxd": 8, "hi": 1, "gt": 0, "i": "invob2", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "ob3": { "nc": "ob3", "exc": "ob8", "elc": "obd", "iq": 0, "n": "Smoked Sphere", "durability": 35, "mind": 4, "maxd": 10, "hi": 1, "gt": 0, "i": "invob3", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "ob4": { "nc": "ob4", "exc": "ob9", "elc": "obe", "iq": 0, "n": "Clasped Orb", "durability": 40, "mind": 5, "maxd": 12, "hi": 1, "gt": 0, "i": "invob4", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "ob5": { "nc": "ob5", "exc": "oba", "elc": "obf", "iq": 0, "n": "Jared's Stone", "durability": 50, "mind": 8, "maxd": 18, "hi": 1, "gt": 0, "i": "invob5", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "am1": { "nc": "am1", "exc": "am6", "elc": "amb", "iq": 0, "n": "Stag Bow", "durability": 48, "min2d": 7, "max2d": 12, "rs": 30, "rd": 45, "hi": 1, "gt": 0, "i": "invam1", "ui": "invswbu", "si": "invswbu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Bow", "eq2n": "Amazon Item", "c": ["Amazon Bow", "Bow", "Missile Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "am2": { "nc": "am2", "exc": "am7", "elc": "amc", "iq": 0, "n": "Reflex Bow", "durability": 55, "min2d": 9, "max2d": 19, "rs": 35, "rd": 60, "hi": 1, "gt": 0, "i": "invam2", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Bow", "eq2n": "Amazon Item", "c": ["Amazon Bow", "Bow", "Missile Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "am3": { "nc": "am3", "exc": "am8", "elc": "amd", "iq": 0, "n": "Maiden Spear", "durability": 28, "min2d": 18, "max2d": 24, "rs": 54, "rd": 40, "hi": 1, "gt": 0, "i": "invam3", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spear", "eq2n": "Amazon Item", "c": ["Amazon Spear", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "am4": { "nc": "am4", "exc": "am9", "elc": "ame", "iq": 0, "n": "Maiden Pike", "durability": 25, "min2d": 23, "max2d": 55, "rs": 63, "rd": 52, "hi": 1, "gt": 0, "i": "invam4", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spear", "eq2n": "Amazon Item", "c": ["Amazon Spear", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "am5": { "nc": "am5", "exc": "ama", "elc": "amf", "iq": 0, "n": "Maiden Javelin", "s": 1, "durability": 6, "mind": 8, "maxd": 14, "minmd": 6, "maxmd": 22, "rs": 33, "rd": 47, "gt": 0, "i": "invam5", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Javelin", "eq2n": "Amazon Item", "c": ["Amazon Javelin", "Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "ob6": { "nc": "ob1", "exc": "ob6", "elc": "obb", "iq": 1, "n": "Glowing Orb", "durability": 20, "mind": 8, "maxd": 21, "hi": 1, "gt": 0, "i": "invob1", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "ob7": { "nc": "ob2", "exc": "ob7", "elc": "obc", "iq": 1, "n": "Crystalline Globe", "durability": 30, "mind": 10, "maxd": 26, "hi": 1, "gt": 0, "i": "invob2", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "ob8": { "nc": "ob3", "exc": "ob8", "elc": "obd", "iq": 1, "n": "Cloudy Sphere", "durability": 35, "mind": 11, "maxd": 29, "hi": 1, "gt": 0, "i": "invob3", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "ob9": { "nc": "ob4", "exc": "ob9", "elc": "obe", "iq": 1, "n": "Sparkling Ball", "durability": 40, "mind": 13, "maxd": 32, "hi": 1, "gt": 0, "i": "invob4", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "oba": { "nc": "ob5", "exc": "oba", "elc": "obf", "iq": 1, "n": "Swirling Crystal", "durability": 50, "mind": 18, "maxd": 42, "hi": 1, "gt": 0, "i": "invob5", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "am6": { "nc": "am1", "exc": "am6", "elc": "amb", "iq": 1, "n": "Ashwood Bow", "durability": 48, "min2d": 16, "max2d": 29, "rs": 56, "rd": 77, "hi": 1, "gt": 0, "i": "invam1", "ui": "invswbu", "si": "invswbu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Bow", "eq2n": "Amazon Item", "c": ["Amazon Bow", "Bow", "Missile Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "am7": { "nc": "am2", "exc": "am7", "elc": "amc", "iq": 1, "n": "Ceremonial Bow", "durability": 55, "min2d": 19, "max2d": 41, "rs": 73, "rd": 110, "hi": 1, "gt": 0, "i": "invam2", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Bow", "eq2n": "Amazon Item", "c": ["Amazon Bow", "Bow", "Missile Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "am8": { "nc": "am3", "exc": "am8", "elc": "amd", "iq": 1, "n": "Ceremonial Spear", "durability": 28, "min2d": 34, "max2d": 51, "rs": 101, "rd": 80, "hi": 1, "gt": 0, "i": "invam3", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spear", "eq2n": "Amazon Item", "c": ["Amazon Spear", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "am9": { "nc": "am4", "exc": "am9", "elc": "ame", "iq": 1, "n": "Ceremonial Pike", "durability": 25, "min2d": 42, "max2d": 101, "rs": 115, "rd": 98, "hi": 1, "gt": 0, "i": "invam4", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spear", "eq2n": "Amazon Item", "c": ["Amazon Spear", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "ama": { "nc": "am5", "exc": "ama", "elc": "amf", "iq": 1, "n": "Ceremonial Javelin", "s": 1, "durability": 6, "mind": 18, "maxd": 35, "minmd": 18, "maxmd": 54, "rs": 25, "rd": 109, "gt": 0, "i": "invam5", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Javelin", "eq2n": "Amazon Item", "c": ["Amazon Javelin", "Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "obb": { "nc": "ob1", "exc": "ob6", "elc": "obb", "iq": 2, "n": "Heavenly Stone", "durability": 20, "mind": 21, "maxd": 46, "hi": 1, "gt": 0, "i": "invob1", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "obc": { "nc": "ob2", "exc": "ob7", "elc": "obc", "iq": 2, "n": "Eldritch Orb", "durability": 30, "mind": 18, "maxd": 50, "hi": 1, "gt": 0, "i": "invob2", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "obd": { "nc": "ob3", "exc": "ob8", "elc": "obd", "iq": 2, "n": "Demon Heart", "durability": 35, "mind": 23, "maxd": 55, "hi": 1, "gt": 0, "i": "invob3", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "obe": { "nc": "ob4", "exc": "ob9", "elc": "obe", "iq": 2, "n": "Vortex Orb", "durability": 40, "mind": 12, "maxd": 66, "hi": 1, "gt": 0, "i": "invob4", "iw": 1, "ih": 2, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "obf": { "nc": "ob5", "exc": "oba", "elc": "obf", "iq": 2, "n": "Dimensional Shard", "durability": 50, "mind": 30, "maxd": 53, "hi": 1, "gt": 0, "i": "invob5", "iw": 1, "ih": 3, "it": 8, "ig": [], "eq1n": "Weapon", "eq2n": "Sorceress Item", "c": ["Orb", "Weapon", "Sorceress Item", "Class Specific"] }, "amb": { "nc": "am1", "exc": "am6", "elc": "amb", "iq": 2, "n": "Matriarchal Bow", "durability": 48, "min2d": 20, "max2d": 47, "rs": 87, "rd": 187, "hi": 1, "gt": 0, "i": "invam1", "ui": "invswbu", "si": "invswbu", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Bow", "eq2n": "Amazon Item", "c": ["Amazon Bow", "Bow", "Missile Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "amc": { "nc": "am2", "exc": "am7", "elc": "amc", "iq": 2, "n": "Grand Matron Bow", "durability": 55, "min2d": 14, "max2d": 72, "rs": 108, "rd": 152, "hi": 1, "gt": 0, "i": "invam2", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Bow", "eq2n": "Amazon Item", "c": ["Amazon Bow", "Bow", "Missile Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "amd": { "nc": "am3", "exc": "am8", "elc": "amd", "iq": 2, "n": "Matriarchal Spear", "durability": 28, "min2d": 65, "max2d": 95, "rs": 114, "rd": 142, "hi": 1, "gt": 0, "i": "invam3", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spear", "eq2n": "Amazon Item", "c": ["Amazon Spear", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "ame": { "nc": "am4", "exc": "am9", "elc": "ame", "iq": 2, "n": "Matriarchal Pike", "durability": 25, "min2d": 37, "max2d": 153, "rs": 132, "rd": 149, "hi": 1, "gt": 0, "i": "invam4", "iw": 2, "ih": 4, "it": 8, "ig": [], "eq1n": "Spear", "eq2n": "Amazon Item", "c": ["Amazon Spear", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon", "Amazon Item", "Class Specific"] }, "amf": { "nc": "am5", "exc": "ama", "elc": "amf", "iq": 2, "n": "Matriarchal Javelin", "s": 1, "durability": 6, "mind": 30, "maxd": 54, "minmd": 35, "maxmd": 66, "rs": 107, "rd": 151, "gt": 0, "i": "invam5", "iw": 1, "ih": 3, "it": 2, "ig": [], "eq1n": "Javelin", "eq2n": "Amazon Item", "c": ["Amazon Javelin", "Javelin", "Combo Weapon", "Melee Weapon", "Weapon", "Thrown Weapon", "Weapon", "Spear", "Spears and Polearms", "Melee Weapon", "Weapon", "Amazon Item", "Class Specific"] } }, "other_items": { "elx": { "iq": 0, "n": "Elixir", "hi": 0, "gt": 0, "i": "invpot", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Elixir", "Miscellaneous"] }, "hpo": { "iq": 0, "hi": 0, "gt": 0, "i": "invrps", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Healing Potion", "Potion", "Miscellaneous"] }, "mpo": { "iq": 0, "hi": 0, "gt": 0, "i": "invbps", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Mana Potion", "Potion", "Miscellaneous"] }, "hpf": { "iq": 0, "hi": 0, "gt": 0, "i": "invrpl", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Healing Potion", "Potion", "Miscellaneous"] }, "mpf": { "iq": 0, "hi": 0, "gt": 0, "i": "invbpl", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Mana Potion", "Potion", "Miscellaneous"] }, "vps": { "iq": 0, "n": "Stamina Potion", "hi": 0, "gt": 0, "i": "invwps", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Stamina Potion", "Potion", "Miscellaneous"] }, "yps": { "iq": 0, "n": "Antidote Potion", "hi": 0, "gt": 0, "i": "invnps", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Antidote Potion", "Potion", "Miscellaneous"] }, "rvs": { "iq": 0, "n": "Rejuvenation Potion", "hi": 0, "gt": 0, "i": "invvps", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Healing Potion", "eq2n": "Mana Potion", "c": ["Rejuv Potion", "Healing Potion", "Potion", "Miscellaneous", "Mana Potion", "Potion", "Miscellaneous"] }, "rvl": { "iq": 0, "n": "Full Rejuvenation Potion", "hi": 0, "gt": 0, "i": "invvpl", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Healing Potion", "eq2n": "Mana Potion", "c": ["Rejuv Potion", "Healing Potion", "Potion", "Miscellaneous", "Mana Potion", "Potion", "Miscellaneous"] }, "wms": { "iq": 0, "n": "Thawing Potion", "hi": 0, "gt": 0, "i": "invyps", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Thawing Potion", "Potion", "Miscellaneous"] }, "tbk": { "iq": 0, "n": "Tome of Town Portal", "s": 1, "hi": 0, "gt": 0, "i": "invbbk", "iw": 1, "ih": 2, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Book", "Miscellaneous"] }, "ibk": { "iq": 0, "n": "Tome of Identify", "s": 1, "hi": 0, "gt": 0, "i": "invrbk", "iw": 1, "ih": 2, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Book", "Miscellaneous"] }, "amu": { "iq": 0, "n": "Amulet", "hi": 1, "gt": 1, "i": "invamu", "iw": 1, "ih": 1, "it": 0, "ig": ["invamu1", "invamu2", "invamu3"], "eq1n": "Miscellaneous", "c": ["Amulet", "Miscellaneous"] }, "vip": { "iq": 0, "n": "Top of the Horadric Staff", "hi": 0, "gt": 0, "i": "invvip", "ui": "invvip", "iw": 1, "ih": 1, "it": 0, "ig": ["invamu1", "invamu2", "invamu3"], "eq1n": "Miscellaneous", "c": ["Amulet", "Miscellaneous"] }, "rin": { "iq": 0, "n": "Ring", "hi": 1, "gt": 1, "i": "invrin", "iw": 1, "ih": 1, "it": 0, "ig": ["invrin1", "invrin2", "invrin3", "invrin4", "invrin5"], "eq1n": "Miscellaneous", "c": ["Ring", "Miscellaneous"] }, "gld": { "iq": 0, "n": "Gold", "s": 1, "hi": 0, "gt": 0, "i": "invgld", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Gold", "Miscellaneous"] }, "bks": { "iq": 0, "n": "Scroll of Inifuss", "hi": 0, "gt": 0, "i": "invscb", "iw": 2, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "bkd": { "iq": 0, "n": "Key to the Cairn Stones", "hi": 0, "gt": 0, "i": "invscb", "iw": 2, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "aqv": { "iq": 0, "n": "Arrows", "s": 1, "hi": 0, "gt": 0, "i": "invqvr", "iw": 1, "ih": 3, "it": 0, "ig": [], "eq1n": "Missile", "eq2n": "Second Hand", "c": ["Bow Quiver", "Missile", "Miscellaneous", "Second Hand"] }, "tch": { "iq": 0, "n": "Torch", "hi": 0, "gt": 0, "i": "invtrch", "iw": 1, "ih": 2, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Torch", "Miscellaneous"] }, "cqv": { "iq": 0, "n": "Bolts", "s": 1, "hi": 0, "gt": 0, "i": "invcqv", "iw": 1, "ih": 3, "it": 0, "ig": [], "eq1n": "Missile", "eq2n": "Second Hand", "c": ["Crossbow Quiver", "Missile", "Miscellaneous", "Second Hand"] }, "tsc": { "iq": 0, "n": "Scroll of Town Portal", "hi": 0, "gt": 0, "i": "invbsc", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Scroll", "Miscellaneous"] }, "isc": { "iq": 0, "n": "Scroll of Identify", "hi": 0, "gt": 0, "i": "invrsc", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Scroll", "Miscellaneous"] }, "hrt": { "iq": 0, "n": "Heart", "hi": 0, "gt": 0, "i": "invhrt", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "brz": { "iq": 0, "n": "Brain", "hi": 0, "gt": 0, "i": "invbrnz", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "jaw": { "iq": 0, "n": "Jawbone", "hi": 0, "gt": 0, "i": "invjaw", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "eyz": { "iq": 0, "n": "Eye", "hi": 0, "gt": 0, "i": "inveye", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "hrn": { "iq": 0, "n": "Horn", "hi": 0, "gt": 0, "i": "invhorn", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "tal": { "iq": 0, "n": "Tail", "hi": 0, "gt": 0, "i": "invtail", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "flg": { "iq": 0, "n": "Flag", "hi": 0, "gt": 0, "i": "invflag", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "fng": { "iq": 0, "n": "Fang", "hi": 0, "gt": 0, "i": "invfang", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "qll": { "iq": 0, "n": "Quill", "hi": 0, "gt": 0, "i": "invquil", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "sol": { "iq": 0, "n": "Soul", "hi": 0, "gt": 0, "i": "invsple", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "scz": { "iq": 0, "n": "Scalp", "hi": 0, "gt": 0, "i": "invscp", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "spe": { "iq": 0, "n": "Spleen", "hi": 0, "gt": 0, "i": "invsple", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Body Part", "Miscellaneous"] }, "key": { "iq": 0, "n": "Key", "s": 1, "hi": 0, "gt": 0, "i": "invkey", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Key", "Miscellaneous"] }, "luv": { "iq": 0, "n": "The Black Tower Key", "hi": 0, "gt": 0, "i": "invmph", "iw": 1, "ih": 2, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Key", "Miscellaneous"] }, "xyz": { "iq": 0, "hi": 0, "gt": 0, "i": "invxyz", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "j34": { "iq": 0, "n": "A Jade Figurine", "hi": 0, "gt": 0, "i": "invjbi", "iw": 1, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "g34": { "iq": 0, "n": "The Golden Bird", "hi": 0, "gt": 0, "i": "invgbi", "iw": 1, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "bbb": { "iq": 0, "n": "Lam Esen's Tome", "hi": 0, "gt": 0, "i": "invbbb", "iw": 2, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "box": { "iq": 0, "n": "Horadric Cube", "hi": 0, "gt": 0, "i": "invbox", "iw": 2, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "tr1": { "iq": 0, "n": "Horadric Scroll", "hi": 0, "gt": 0, "i": "invhscr", "iw": 2, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "mss": { "iq": 0, "n": "Mephisto's Soulstone", "hi": 0, "gt": 0, "i": "invmss", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "ass": { "iq": 0, "hi": 0, "gt": 0, "i": "invsbk", "iw": 2, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "qey": { "iq": 0, "n": "Khalim's Eye", "hi": 0, "gt": 0, "i": "inveye", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "qhr": { "iq": 0, "n": "Khalim's Heart", "hi": 0, "gt": 0, "i": "invhrt", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "qbr": { "iq": 0, "n": "Khalim's Brain", "hi": 0, "gt": 0, "i": "invbrnz", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "ear": { "iq": 0, "n": "Ear", "hi": 0, "gt": 0, "i": "invear", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Player Body Part", "Miscellaneous"] }, "gcv": { "iq": 0, "n": "Chipped Amethyst", "hi": 0, "gt": 0, "i": "invgsva", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Amethyst", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "att", "p": 0, "min": 40, "max": 40 }], [{ "m": "str", "p": 0, "min": 3, "max": 3 }], [{ "m": "ac", "p": 0, "min": 8, "max": 8 }]] }, "gfv": { "iq": 0, "n": "Flawed Amethyst", "hi": 0, "gt": 0, "i": "invgsvb", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Amethyst", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "att", "p": 0, "min": 60, "max": 60 }], [{ "m": "str", "p": 0, "min": 4, "max": 4 }], [{ "m": "ac", "p": 0, "min": 12, "max": 12 }]] }, "gsv": { "iq": 0, "n": "Amethyst", "hi": 0, "gt": 0, "i": "invgsvc", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Amethyst", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "att", "p": 0, "min": 80, "max": 80 }], [{ "m": "str", "p": 0, "min": 6, "max": 6 }], [{ "m": "ac", "p": 0, "min": 18, "max": 18 }]] }, "gzv": { "iq": 0, "n": "Flawless Amethyst", "hi": 0, "gt": 0, "i": "invgsvd", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Amethyst", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "att", "p": 0, "min": 100, "max": 100 }], [{ "m": "str", "p": 0, "min": 8, "max": 8 }], [{ "m": "ac", "p": 0, "min": 24, "max": 24 }]] }, "gpv": { "iq": 0, "n": "Perfect Amethyst", "hi": 0, "gt": 0, "i": "invgsve", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Amethyst", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "att", "p": 0, "min": 150, "max": 150 }], [{ "m": "str", "p": 0, "min": 10, "max": 10 }], [{ "m": "ac", "p": 0, "min": 30, "max": 30 }]] }, "gcy": { "iq": 0, "n": "Chipped Topaz", "hi": 0, "gt": 0, "i": "invgsya", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Topaz", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "ltng-min", "p": 0, "min": 1, "max": 1 }, { "m": "ltng-max", "p": 0, "min": 8, "max": 8 }], [{ "m": "mag%", "p": 0, "min": 9, "max": 9 }], [{ "m": "res-ltng", "p": 0, "min": 12, "max": 12 }]] }, "gfy": { "iq": 0, "n": "Flawed Topaz", "hi": 0, "gt": 0, "i": "invgsyb", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Topaz", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "ltng-min", "p": 0, "min": 1, "max": 1 }, { "m": "ltng-max", "p": 0, "min": 14, "max": 14 }], [{ "m": "mag%", "p": 0, "min": 13, "max": 13 }], [{ "m": "res-ltng", "p": 0, "min": 16, "max": 16 }]] }, "gsy": { "iq": 0, "n": "Topaz", "hi": 0, "gt": 0, "i": "invgsyc", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Topaz", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "ltng-min", "p": 0, "min": 1, "max": 1 }, { "m": "ltng-max", "p": 0, "min": 22, "max": 22 }], [{ "m": "mag%", "p": 0, "min": 16, "max": 16 }], [{ "m": "res-ltng", "p": 0, "min": 22, "max": 22 }]] }, "gly": { "iq": 0, "n": "Flawless Topaz", "hi": 0, "gt": 0, "i": "invgsyd", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Topaz", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "ltng-min", "p": 0, "min": 1, "max": 1 }, { "m": "ltng-max", "p": 0, "min": 30, "max": 30 }], [{ "m": "mag%", "p": 0, "min": 20, "max": 20 }], [{ "m": "res-ltng", "p": 0, "min": 28, "max": 28 }]] }, "gpy": { "iq": 0, "n": "Perfect Topaz", "hi": 0, "gt": 0, "i": "invgsye", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Topaz", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "ltng-min", "p": 0, "min": 1, "max": 1 }, { "m": "ltng-max", "p": 0, "min": 40, "max": 40 }], [{ "m": "mag%", "p": 0, "min": 24, "max": 24 }], [{ "m": "res-ltng", "p": 0, "min": 40, "max": 40 }]] }, "gcb": { "iq": 0, "n": "Chipped Sapphire", "hi": 0, "gt": 0, "i": "invgsba", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Sapphire", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "cold-min", "p": 0, "min": 1, "max": 1 }, { "m": "cold-max", "p": 0, "min": 3, "max": 3 }, { "m": "cold-len", "p": 0, "min": 25, "max": 25 }], [{ "m": "mana", "p": 0, "min": 10, "max": 10 }], [{ "m": "res-cold", "p": 0, "min": 12, "max": 12 }]] }, "gfb": { "iq": 0, "n": "Flawed Sapphire", "hi": 0, "gt": 0, "i": "invgsbb", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Sapphire", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "cold-min", "p": 0, "min": 3, "max": 3 }, { "m": "cold-max", "p": 0, "min": 5, "max": 5 }, { "m": "cold-len", "p": 0, "min": 35, "max": 35 }], [{ "m": "mana", "p": 0, "min": 17, "max": 17 }], [{ "m": "res-cold", "p": 0, "min": 16, "max": 16 }]] }, "gsb": { "iq": 0, "n": "Sapphire", "hi": 0, "gt": 0, "i": "invgsbc", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Sapphire", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "cold-min", "p": 0, "min": 4, "max": 4 }, { "m": "cold-max", "p": 0, "min": 7, "max": 7 }, { "m": "cold-len", "p": 0, "min": 50, "max": 50 }], [{ "m": "mana", "p": 0, "min": 24, "max": 24 }], [{ "m": "res-cold", "p": 0, "min": 22, "max": 22 }]] }, "glb": { "iq": 0, "n": "Flawless Sapphire", "hi": 0, "gt": 0, "i": "invgsbd", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Sapphire", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "cold-min", "p": 0, "min": 6, "max": 6 }, { "m": "cold-max", "p": 0, "min": 10, "max": 10 }, { "m": "cold-len", "p": 0, "min": 60, "max": 60 }], [{ "m": "mana", "p": 0, "min": 31, "max": 31 }], [{ "m": "res-cold", "p": 0, "min": 28, "max": 28 }]] }, "gpb": { "iq": 0, "n": "Perfect Sapphire", "hi": 0, "gt": 0, "i": "invgsbe", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Sapphire", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "cold-min", "p": 0, "min": 10, "max": 10 }, { "m": "cold-max", "p": 0, "min": 14, "max": 14 }, { "m": "cold-len", "p": 0, "min": 75, "max": 75 }], [{ "m": "mana", "p": 0, "min": 38, "max": 38 }], [{ "m": "res-cold", "p": 0, "min": 40, "max": 40 }]] }, "gcg": { "iq": 0, "n": "Chipped Emerald", "hi": 0, "gt": 0, "i": "invgsga", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Emerald", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "pois-min", "p": 0, "min": 34, "max": 34 }, { "m": "pois-max", "p": 0, "min": 34, "max": 34 }, { "m": "pois-len", "p": 0, "min": 75, "max": 75 }], [{ "m": "dex", "p": 0, "min": 3, "max": 3 }], [{ "m": "res-pois", "p": 0, "min": 12, "max": 12 }]] }, "gfg": { "iq": 0, "n": "Flawed Emerald", "hi": 0, "gt": 0, "i": "invgsgb", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Emerald", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "pois-min", "p": 0, "min": 51, "max": 51 }, { "m": "pois-max", "p": 0, "min": 51, "max": 51 }, { "m": "pois-len", "p": 0, "min": 100, "max": 100 }], [{ "m": "dex", "p": 0, "min": 4, "max": 4 }], [{ "m": "res-pois", "p": 0, "min": 16, "max": 16 }]] }, "gsg": { "iq": 0, "n": "Emerald", "hi": 0, "gt": 0, "i": "invgsgc", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Emerald", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "pois-min", "p": 0, "min": 82, "max": 82 }, { "m": "pois-max", "p": 0, "min": 82, "max": 82 }, { "m": "pois-len", "p": 0, "min": 125, "max": 125 }], [{ "m": "dex", "p": 0, "min": 6, "max": 6 }], [{ "m": "res-pois", "p": 0, "min": 22, "max": 22 }]] }, "glg": { "iq": 0, "n": "Flawless Emerald", "hi": 0, "gt": 0, "i": "invgsgd", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Emerald", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "pois-min", "p": 0, "min": 101, "max": 101 }, { "m": "pois-max", "p": 0, "min": 101, "max": 101 }, { "m": "pois-len", "p": 0, "min": 152, "max": 152 }], [{ "m": "dex", "p": 0, "min": 8, "max": 8 }], [{ "m": "res-pois", "p": 0, "min": 28, "max": 28 }]] }, "gpg": { "iq": 0, "n": "Perfect Emerald", "hi": 0, "gt": 0, "i": "invgsge", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Emerald", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "pois-min", "p": 0, "min": 143, "max": 143 }, { "m": "pois-max", "p": 0, "min": 143, "max": 143 }, { "m": "pois-len", "p": 0, "min": 179, "max": 179 }], [{ "m": "dex", "p": 0, "min": 10, "max": 10 }], [{ "m": "res-pois", "p": 0, "min": 40, "max": 40 }]] }, "gcr": { "iq": 0, "n": "Chipped Ruby", "hi": 0, "gt": 0, "i": "invgsra", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Ruby", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "fire-min", "p": 0, "min": 3, "max": 3 }, { "m": "fire-max", "p": 0, "min": 4, "max": 4 }], [{ "m": "hp", "p": 0, "min": 10, "max": 10 }], [{ "m": "res-fire", "p": 0, "min": 12, "max": 12 }]] }, "gfr": { "iq": 0, "n": "Flawed Ruby", "hi": 0, "gt": 0, "i": "invgsrb", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Ruby", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "fire-min", "p": 0, "min": 5, "max": 5 }, { "m": "fire-max", "p": 0, "min": 8, "max": 8 }], [{ "m": "hp", "p": 0, "min": 17, "max": 17 }], [{ "m": "res-fire", "p": 0, "min": 16, "max": 16 }]] }, "gsr": { "iq": 0, "n": "Ruby", "hi": 0, "gt": 0, "i": "invgsrc", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Ruby", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "fire-min", "p": 0, "min": 8, "max": 8 }, { "m": "fire-max", "p": 0, "min": 12, "max": 12 }], [{ "m": "hp", "p": 0, "min": 24, "max": 24 }], [{ "m": "res-fire", "p": 0, "min": 22, "max": 22 }]] }, "glr": { "iq": 0, "n": "Flawless Ruby", "hi": 0, "gt": 0, "i": "invgsrd", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Ruby", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "fire-min", "p": 0, "min": 10, "max": 10 }, { "m": "fire-max", "p": 0, "min": 16, "max": 16 }], [{ "m": "hp", "p": 0, "min": 31, "max": 31 }], [{ "m": "res-fire", "p": 0, "min": 28, "max": 28 }]] }, "gpr": { "iq": 0, "n": "Perfect Ruby", "hi": 0, "gt": 0, "i": "invgsre", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Ruby", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "fire-min", "p": 0, "min": 15, "max": 15 }, { "m": "fire-max", "p": 0, "min": 20, "max": 20 }], [{ "m": "hp", "p": 0, "min": 38, "max": 38 }], [{ "m": "res-fire", "p": 0, "min": 40, "max": 40 }]] }, "gcw": { "iq": 0, "n": "Chipped Diamond", "hi": 0, "gt": 0, "i": "invgswa", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Diamond", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-undead", "p": 0, "min": 28, "max": 28 }], [{ "m": "att", "p": 0, "min": 20, "max": 20 }], [{ "m": "res-all", "p": 0, "min": 6, "max": 6 }]] }, "gfw": { "iq": 0, "n": "Flawed Diamond", "hi": 0, "gt": 0, "i": "invgswb", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Diamond", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-undead", "p": 0, "min": 34, "max": 34 }], [{ "m": "att", "p": 0, "min": 40, "max": 40 }], [{ "m": "res-all", "p": 0, "min": 8, "max": 8 }]] }, "gsw": { "iq": 0, "n": "Diamond", "hi": 0, "gt": 0, "i": "invgswc", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Diamond", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-undead", "p": 0, "min": 44, "max": 44 }], [{ "m": "att", "p": 0, "min": 60, "max": 60 }], [{ "m": "res-all", "p": 0, "min": 11, "max": 11 }]] }, "glw": { "iq": 0, "n": "Flawless Diamond", "hi": 0, "gt": 0, "i": "invgswd", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Diamond", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-undead", "p": 0, "min": 54, "max": 54 }], [{ "m": "att", "p": 0, "min": 80, "max": 80 }], [{ "m": "res-all", "p": 0, "min": 14, "max": 14 }]] }, "gpw": { "iq": 0, "n": "Perfect Diamond", "hi": 0, "gt": 0, "i": "invgswe", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Diamond", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-undead", "p": 0, "min": 68, "max": 68 }], [{ "m": "att", "p": 0, "min": 100, "max": 100 }], [{ "m": "res-all", "p": 0, "min": 19, "max": 19 }]] }, "hp1": { "iq": 0, "n": "Minor Healing Potion", "hi": 0, "gt": 0, "i": "invhp1", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Healing Potion", "Potion", "Miscellaneous"] }, "hp2": { "iq": 0, "n": "Light Healing Potion", "hi": 0, "gt": 0, "i": "invhp2", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Healing Potion", "Potion", "Miscellaneous"] }, "hp3": { "iq": 0, "n": "Healing Potion", "hi": 0, "gt": 0, "i": "invhp3", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Healing Potion", "Potion", "Miscellaneous"] }, "hp4": { "iq": 0, "n": "Greater Healing Potion", "hi": 0, "gt": 0, "i": "invhp4", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Healing Potion", "Potion", "Miscellaneous"] }, "hp5": { "iq": 0, "n": "Super Healing Potion", "hi": 0, "gt": 0, "i": "invhp5", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Healing Potion", "Potion", "Miscellaneous"] }, "mp1": { "iq": 0, "n": "Minor Mana Potion", "hi": 0, "gt": 0, "i": "invmp1", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Mana Potion", "Potion", "Miscellaneous"] }, "mp2": { "iq": 0, "n": "Light Mana Potion", "hi": 0, "gt": 0, "i": "invmp2", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Mana Potion", "Potion", "Miscellaneous"] }, "mp3": { "iq": 0, "n": "Mana Potion", "hi": 0, "gt": 0, "i": "invmp3", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Mana Potion", "Potion", "Miscellaneous"] }, "mp4": { "iq": 0, "n": "Greater Mana Potion", "hi": 0, "gt": 0, "i": "invmp4", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Mana Potion", "Potion", "Miscellaneous"] }, "mp5": { "iq": 0, "n": "Super Mana Potion", "hi": 0, "gt": 0, "i": "invmp5", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Mana Potion", "Potion", "Miscellaneous"] }, "skc": { "iq": 0, "n": "Chipped Skull", "hi": 0, "gt": 0, "i": "invskc", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Skull", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "manasteal", "p": 0, "min": 1, "max": 1 }, { "m": "lifesteal", "p": 0, "min": 2, "max": 2 }], [{ "m": "regen", "p": 0, "min": 2, "max": 2 }, { "m": "regen-mana", "p": 0, "min": 8, "max": 8 }], [{ "m": "thorns", "p": 0, "min": 4, "max": 4 }]] }, "skf": { "iq": 0, "n": "Flawed Skull", "hi": 0, "gt": 0, "i": "invskf", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Skull", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "manasteal", "p": 0, "min": 2, "max": 2 }, { "m": "lifesteal", "p": 0, "min": 2, "max": 2 }], [{ "m": "regen", "p": 0, "min": 3, "max": 3 }, { "m": "regen-mana", "p": 0, "min": 8, "max": 8 }], [{ "m": "thorns", "p": 0, "min": 8, "max": 8 }]] }, "sku": { "iq": 0, "n": "Skull", "hi": 0, "gt": 0, "i": "invsku", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Skull", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "manasteal", "p": 0, "min": 2, "max": 2 }, { "m": "lifesteal", "p": 0, "min": 3, "max": 3 }], [{ "m": "regen", "p": 0, "min": 3, "max": 3 }, { "m": "regen-mana", "p": 0, "min": 12, "max": 12 }], [{ "m": "thorns", "p": 0, "min": 12, "max": 12 }]] }, "skl": { "iq": 0, "n": "Flawless Skull", "hi": 0, "gt": 0, "i": "invskl", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Skull", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "manasteal", "p": 0, "min": 3, "max": 3 }, { "m": "lifesteal", "p": 0, "min": 3, "max": 3 }], [{ "m": "regen", "p": 0, "min": 4, "max": 4 }, { "m": "regen-mana", "p": 0, "min": 12, "max": 12 }], [{ "m": "thorns", "p": 0, "min": 16, "max": 16 }]] }, "skz": { "iq": 0, "n": "Perfect Skull", "hi": 0, "gt": 0, "i": "invskz", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Gem", "c": ["Skull", "Gem", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "manasteal", "p": 0, "min": 3, "max": 3 }, { "m": "lifesteal", "p": 0, "min": 4, "max": 4 }], [{ "m": "regen", "p": 0, "min": 5, "max": 5 }, { "m": "regen-mana", "p": 0, "min": 19, "max": 19 }], [{ "m": "thorns", "p": 0, "min": 20, "max": 20 }]] }, "hrb": { "iq": 0, "n": "Herb", "hi": 0, "gt": 0, "i": "invhrb", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Herb", "Miscellaneous"] }, "cm1": { "iq": 0, "n": "Small Charm", "hi": 0, "gt": 0, "i": "invchm", "iw": 1, "ih": 1, "it": 0, "ig": ["invch1", "invch4", "invch7"], "eq1n": "Charm", "c": ["Small Charm", "Charm", "Miscellaneous"] }, "cm2": { "iq": 0, "n": "Large Charm", "hi": 0, "gt": 0, "i": "invwnd", "iw": 1, "ih": 2, "it": 0, "ig": ["invch2", "invch5", "invch8"], "eq1n": "Charm", "c": ["Medium Charm", "Charm", "Miscellaneous"] }, "cm3": { "iq": 0, "n": "Grand Charm", "hi": 0, "gt": 0, "i": "invsst", "iw": 1, "ih": 3, "it": 8, "ig": ["invch3", "invch6", "invch9"], "eq1n": "Charm", "c": ["Large Charm", "Charm", "Miscellaneous"] }, "rps": { "iq": 0, "s": 1, "hi": 0, "gt": 0, "i": "invrps", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Healing Potion", "Potion", "Miscellaneous"] }, "rpl": { "iq": 0, "s": 1, "hi": 0, "gt": 0, "i": "invrpl", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Healing Potion", "Potion", "Miscellaneous"] }, "bps": { "iq": 0, "s": 1, "hi": 0, "gt": 0, "i": "invbps", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Mana Potion", "Potion", "Miscellaneous"] }, "bpl": { "iq": 0, "s": 1, "hi": 0, "gt": 0, "i": "invbpl", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Potion", "c": ["Mana Potion", "Potion", "Miscellaneous"] }, "r01": { "iq": 0, "n": "El Rune", "hi": 0, "gt": 0, "i": "invrEl", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "light", "min": 1, "max": 1 }, { "m": "att", "min": 50, "max": 50 }], [{ "m": "light", "min": 1, "max": 1 }, { "m": "ac", "min": 15, "max": 15 }], [{ "m": "light", "min": 1, "max": 1 }, { "m": "ac", "min": 15, "max": 15 }]] }, "r02": { "iq": 0, "n": "Eld Rune", "hi": 0, "gt": 0, "i": "invrEld", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "att-undead", "min": 50, "max": 50 }, { "m": "dmg-undead", "min": 75, "max": 75 }], [{ "m": "stamdrain", "min": 15, "max": 15 }], [{ "m": "block", "min": 7, "max": 7 }]] }, "r03": { "iq": 0, "n": "Tir Rune", "hi": 0, "gt": 0, "i": "invrTir", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "mana-kill", "min": 2, "max": 2 }], [{ "m": "mana-kill", "min": 2, "max": 2 }], [{ "m": "mana-kill", "min": 2, "max": 2 }]] }, "r04": { "iq": 0, "n": "Nef Rune", "hi": 0, "gt": 0, "i": "invrNef", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "knock", "min": 1, "max": 1 }], [{ "m": "ac-miss", "min": 30, "max": 30 }], [{ "m": "ac-miss", "min": 30, "max": 30 }]] }, "r05": { "iq": 0, "n": "Eth Rune", "hi": 0, "gt": 0, "i": "invrEth", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "reduce-ac", "min": 25, "max": 25 }], [{ "m": "regen-mana", "min": 15, "max": 15 }], [{ "m": "regen-mana", "min": 15, "max": 15 }]] }, "r06": { "iq": 0, "n": "Ith Rune", "hi": 0, "gt": 0, "i": "invrIth", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-max", "min": 9, "max": 9 }], [{ "m": "dmg-to-mana", "min": 15, "max": 15 }], [{ "m": "dmg-to-mana", "min": 15, "max": 15 }]] }, "r07": { "iq": 0, "n": "Tal Rune", "hi": 0, "gt": 0, "i": "invrTal", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-pois", "p": 125, "min": 154, "max": 154 }], [{ "m": "res-pois", "min": 30, "max": 30 }], [{ "m": "res-pois", "min": 35, "max": 35 }]] }, "r08": { "iq": 0, "n": "Ral Rune", "hi": 0, "gt": 0, "i": "invrRal", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-fire", "min": 5, "max": 30 }], [{ "m": "res-fire", "min": 30, "max": 30 }], [{ "m": "res-fire", "min": 35, "max": 35 }]] }, "r09": { "iq": 0, "n": "Ort Rune", "hi": 0, "gt": 0, "i": "invrOrt", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-ltng", "min": 1, "max": 50 }], [{ "m": "res-ltng", "min": 30, "max": 30 }], [{ "m": "res-ltng", "min": 35, "max": 35 }]] }, "r10": { "iq": 0, "n": "Thul Rune", "hi": 0, "gt": 0, "i": "invrThul", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-cold", "p": 75, "min": 3, "max": 14 }], [{ "m": "res-cold", "min": 30, "max": 30 }], [{ "m": "res-cold", "min": 35, "max": 35 }]] }, "r11": { "iq": 0, "n": "Amn Rune", "hi": 0, "gt": 0, "i": "invrAmn", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "lifesteal", "min": 7, "max": 7 }], [{ "m": "thorns", "min": 14, "max": 14 }], [{ "m": "thorns", "min": 14, "max": 14 }]] }, "r12": { "iq": 0, "n": "Sol Rune", "hi": 0, "gt": 0, "i": "invrSol", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg-min", "min": 9, "max": 9 }], [{ "m": "red-dmg", "min": 7, "max": 7 }], [{ "m": "red-dmg", "min": 7, "max": 7 }]] }, "r13": { "iq": 0, "n": "Shael Rune", "hi": 0, "gt": 0, "i": "invrShae", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "swing2", "min": 20, "max": 20 }], [{ "m": "balance2", "min": 20, "max": 20 }], [{ "m": "block2", "min": 20, "max": 20 }]] }, "r14": { "iq": 0, "n": "Dol Rune", "hi": 0, "gt": 0, "i": "invrDol", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "howl", "min": 32, "max": 32 }], [{ "m": "regen", "min": 7, "max": 7 }], [{ "m": "regen", "min": 7, "max": 7 }]] }, "r15": { "iq": 0, "n": "Hel Rune", "hi": 0, "gt": 0, "i": "invrHel", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "ease", "min": -20, "max": -20 }], [{ "m": "ease", "min": -15, "max": -15 }], [{ "m": "ease", "min": -15, "max": -15 }]] }, "r16": { "iq": 0, "n": "Io Rune", "hi": 0, "gt": 0, "i": "invrIo", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "vit", "min": 10, "max": 10 }], [{ "m": "vit", "min": 10, "max": 10 }], [{ "m": "vit", "min": 10, "max": 10 }]] }, "r17": { "iq": 0, "n": "Lum Rune", "hi": 0, "gt": 0, "i": "invrLum", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "enr", "min": 10, "max": 10 }], [{ "m": "enr", "min": 10, "max": 10 }], [{ "m": "enr", "min": 10, "max": 10 }]] }, "r18": { "iq": 0, "n": "Ko Rune", "hi": 0, "gt": 0, "i": "invrKo", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dex", "min": 10, "max": 10 }], [{ "m": "dex", "min": 10, "max": 10 }], [{ "m": "dex", "min": 10, "max": 10 }]] }, "r19": { "iq": 0, "n": "Fal Rune", "hi": 0, "gt": 0, "i": "invrFal", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "str", "min": 10, "max": 10 }], [{ "m": "str", "min": 10, "max": 10 }], [{ "m": "str", "min": 10, "max": 10 }]] }, "r20": { "iq": 0, "n": "Lem Rune", "hi": 0, "gt": 0, "i": "invrLem", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "gold%", "min": 75, "max": 75 }], [{ "m": "gold%", "min": 50, "max": 50 }], [{ "m": "gold%", "min": 50, "max": 50 }]] }, "r21": { "iq": 0, "n": "Pul Rune", "hi": 0, "gt": 0, "i": "invrPul", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "att-demon", "min": 100, "max": 100 }, { "m": "dmg-demon", "min": 75, "max": 75 }], [{ "m": "ac%", "min": 30, "max": 30 }], [{ "m": "ac%", "min": 30, "max": 30 }]] }, "r22": { "iq": 0, "n": "Um Rune", "hi": 0, "gt": 0, "i": "invrUm", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "openwounds", "min": 25, "max": 25 }], [{ "m": "res-all", "min": 15, "max": 15 }], [{ "m": "res-all", "min": 22, "max": 22 }]] }, "r23": { "iq": 0, "n": "Mal Rune", "hi": 0, "gt": 0, "i": "invrMal", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "noheal", "min": 1, "max": 1 }], [{ "m": "red-mag", "min": 7, "max": 7 }], [{ "m": "red-mag", "min": 7, "max": 7 }]] }, "r24": { "iq": 0, "n": "Ist Rune", "hi": 0, "gt": 0, "i": "invrIst", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "mag%", "min": 30, "max": 30 }], [{ "m": "mag%", "min": 25, "max": 25 }], [{ "m": "mag%", "min": 25, "max": 25 }]] }, "r25": { "iq": 0, "n": "Gul Rune", "hi": 0, "gt": 0, "i": "invrGul", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "att%", "min": 20, "max": 20 }], [{ "m": "res-pois-max", "min": 5, "max": 5 }], [{ "m": "res-pois-max", "min": 5, "max": 5 }]] }, "r26": { "iq": 0, "n": "Vex Rune", "hi": 0, "gt": 0, "i": "invrVex", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "manasteal", "min": 7, "max": 7 }], [{ "m": "res-fire-max", "min": 5, "max": 5 }], [{ "m": "res-fire-max", "min": 5, "max": 5 }]] }, "r27": { "iq": 0, "n": "Ohm Rune", "hi": 0, "gt": 0, "i": "invrOhm", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "dmg%", "min": 50, "max": 50 }], [{ "m": "res-cold-max", "min": 5, "max": 5 }], [{ "m": "res-cold-max", "min": 5, "max": 5 }]] }, "r28": { "iq": 0, "n": "Lo Rune", "hi": 0, "gt": 0, "i": "invrLo", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "deadly", "min": 20, "max": 20 }], [{ "m": "res-ltng-max", "min": 5, "max": 5 }], [{ "m": "res-ltng-max", "min": 5, "max": 5 }]] }, "r29": { "iq": 0, "n": "Sur Rune", "hi": 0, "gt": 0, "i": "invrSur", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "stupidity", "min": 1, "max": 1 }], [{ "m": "mana%", "min": 5, "max": 5 }], [{ "m": "mana", "min": 50, "max": 50 }]] }, "r30": { "iq": 0, "n": "Ber Rune", "hi": 0, "gt": 0, "i": "invrBer", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "crush", "min": 20, "max": 20 }], [{ "m": "red-dmg%", "min": 8, "max": 8 }], [{ "m": "red-dmg%", "min": 8, "max": 8 }]] }, "r31": { "iq": 0, "n": "Jah Rune", "hi": 0, "gt": 0, "i": "invrJo", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "ignore-ac", "min": 1, "max": 1 }], [{ "m": "hp%", "min": 5, "max": 5 }], [{ "m": "hp", "min": 50, "max": 50 }]] }, "r32": { "iq": 0, "n": "Cham Rune", "hi": 0, "gt": 0, "i": "invrCham", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "freeze", "min": 3, "max": 3 }], [{ "m": "nofreeze", "min": 1, "max": 1 }], [{ "m": "nofreeze", "min": 1, "max": 1 }]] }, "r33": { "iq": 0, "n": "Zod Rune", "hi": 0, "gt": 0, "i": "invrZod", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Socket Filler", "c": ["Rune", "Socket Filler", "Miscellaneous"], "m": [[{ "m": "indestruct", "min": 1, "max": 1 }], [{ "m": "indestruct", "min": 1, "max": 1 }], [{ "m": "indestruct", "min": 1, "max": 1 }]] }, "jew": { "iq": 0, "n": "Jewel", "hi": 0, "gt": 0, "i": "invgswe", "iw": 1, "ih": 1, "it": 0, "ig": ["invjw1", "invjw2", "invjw3", "invjw4", "invjw5", "invjw6"], "eq1n": "Socket Filler", "c": ["Jewel", "Socket Filler", "Miscellaneous"] }, "ice": { "iq": 0, "n": "Malah's Potion", "hi": 0, "gt": 0, "i": "invxyz", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "0sc": { "iq": 0, "n": "Scroll of Knowledge", "hi": 0, "gt": 0, "i": "invrsc", "iw": 1, "ih": 1, "it": 0, "ig": [], "eq1n": "Miscellaneous", "c": ["Scroll", "Miscellaneous"] }, "tr2": { "iq": 0, "n": "Scroll of Resistance", "hi": 0, "gt": 0, "i": "invscb", "iw": 2, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "pk1": { "iq": 0, "n": "Key of Terror", "hi": 0, "gt": 0, "i": "invmph", "iw": 1, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "pk2": { "iq": 0, "n": "Key of Hate", "hi": 0, "gt": 0, "i": "invmph", "iw": 1, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "pk3": { "iq": 0, "n": "Key of Destruction", "hi": 0, "gt": 0, "i": "invmph", "iw": 1, "ih": 2, "it": 0, "ig": [], "c": ["Quest"] }, "dhn": { "iq": 0, "n": "Diablo's Horn", "hi": 0, "gt": 0, "i": "invfang", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "bey": { "iq": 0, "n": "Baal's Eye", "hi": 0, "gt": 0, "i": "inveye", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "mbr": { "iq": 0, "n": "Mephisto's Brain", "hi": 0, "gt": 0, "i": "invbrnz", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "toa": { "iq": 0, "n": "Token of Absolution", "hi": 0, "gt": 0, "i": "invtoa", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "tes": { "iq": 0, "n": "Twisted Essence of Suffering", "hi": 0, "gt": 0, "i": "invtes", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "ceh": { "iq": 0, "n": "Charged Essence of Hatred", "hi": 0, "gt": 0, "i": "invceh", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "bet": { "iq": 0, "n": "Burning Essence of Terror", "hi": 0, "gt": 0, "i": "invbet", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "fed": { "iq": 0, "n": "Festering Essence of Destruction", "hi": 0, "gt": 0, "i": "invfed", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] }, "std": { "iq": 0, "n": "Standard of Heroes", "hi": 0, "gt": 0, "i": "invflag", "iw": 1, "ih": 1, "it": 0, "ig": [], "c": ["Quest"] } } };


/***/ })

/******/ });
//# sourceMappingURL=constants_99.bundle.js.map

d2s.constants = constants_99.constants;
module.exports = d2s;

