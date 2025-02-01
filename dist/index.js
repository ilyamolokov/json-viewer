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
class JsonViewer {
    constructor() { }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clearResult();
            const textAreaValue = this.$("#textarea").value;
            const parsedJson = yield this.parseJson(textAreaValue);
            if (!parsedJson) {
                console.error("Not a valid JSON input");
                return;
            }
            this.$("#view-panel").appendChild(this.buildTree({ JSON: parsedJson }));
        });
    }
    buildTree(node) {
        const id = "view-panel-root";
        const ul = document.createElement("ul");
        ul.setAttribute("id", id);
        for (const key in node) {
            const li = document.createElement("li");
            const span = document.createElement("span");
            const button = document.createElement("button");
            button.classList.add("expand");
            button.textContent = "-";
            button.addEventListener("click", () => {
                const el = this.$(`#${id}-${key}`);
                if (el.style.display === "none") {
                    el.style.display = "block";
                    button.textContent = "-";
                }
                else {
                    el.style.display = "none";
                    button.textContent = "+";
                }
            });
            const value = node[key];
            const type = this.getType(value);
            span.classList.add(type);
            if (this.isObject(value)) {
                span.textContent = key;
                li.appendChild(button);
                li.appendChild(span);
                li.appendChild(this.renderObject(value, `${id}-${key}`));
            }
            else if (this.isArray(value)) {
                span.textContent = key;
                li.appendChild(button);
                li.appendChild(span);
                li.appendChild(this.renderArray(value, `${id}-${key}`));
            }
            else {
                span.textContent = `${key} : ${type === "string" ? `"${value}"` : value}`;
                li.appendChild(span);
            }
            ul.appendChild(li);
        }
        return ul;
    }
    clearInput() {
        this.$("#textarea").value = "";
    }
    clearResult() {
        this.$("#view-panel").innerHTML = "";
    }
    clearAll() {
        this.clearInput();
        this.clearResult();
    }
    renderObject(node, id) {
        const ul = document.createElement("ul");
        ul.setAttribute("id", id);
        for (const key in node) {
            const li = document.createElement("li");
            const span = document.createElement("span");
            const button = document.createElement("button");
            button.classList.add("expand");
            button.textContent = "+";
            button.addEventListener("click", () => {
                const el = this.$(`#${id}-${key}`);
                if (el.style.display === "none") {
                    el.style.display = "block";
                    button.textContent = "-";
                }
                else {
                    el.style.display = "none";
                    button.textContent = "+";
                }
            });
            const value = node[key];
            const type = this.getType(value);
            span.classList.add(type);
            if (this.isObject(value)) {
                span.textContent = key;
                li.appendChild(button);
                li.appendChild(span);
                const obj = this.renderObject(value, `${id}-${key}`);
                obj.style.display = "none";
                li.appendChild(obj);
            }
            else if (this.isArray(value)) {
                span.textContent = key;
                li.appendChild(button);
                li.appendChild(span);
                const array = this.renderArray(value, `${id}-${key}`);
                array.style.display = "none";
                li.appendChild(array);
            }
            else {
                span.textContent = `${key} : ${type === "string" ? `"${value}"` : value}`;
                li.appendChild(span);
            }
            ul.appendChild(li);
        }
        return ul;
    }
    renderArray(arr, id) {
        const ul = document.createElement("ul");
        ul.setAttribute("id", id);
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            const li = document.createElement("li");
            const span = document.createElement("span");
            const button = document.createElement("button");
            button.classList.add("expand");
            button.textContent = "+";
            button.addEventListener("click", () => {
                const el = this.$(`#${id}-${i}`);
                if (el.style.display === "none") {
                    el.style.display = "block";
                    button.textContent = "-";
                }
                else {
                    el.style.display = "none";
                    button.textContent = "+";
                }
            });
            const type = this.getType(item);
            span.classList.add(type);
            if (this.isObject(item)) {
                span.textContent = i.toString();
                li.appendChild(button);
                li.appendChild(span);
                const obj = this.renderObject(item, `${id}-${i}`);
                obj.style.display = "none";
                li.appendChild(obj);
            }
            else if (this.isArray(item)) {
                span.textContent = i.toString();
                li.appendChild(button);
                li.appendChild(span);
                const array = this.renderArray(item, `${id}-${i}`);
                array.style.display = "none";
                li.appendChild(array);
            }
            else {
                span.textContent = `${i} : ${type === "string" ? `"${item}"` : item}`;
                li.appendChild(span);
            }
            ul.appendChild(li);
        }
        return ul;
    }
    getType(value) {
        if (value === null)
            return "null";
        if (this.isArray(value))
            return "array";
        return typeof value;
    }
    isObject(value) {
        return typeof value === "object" && value !== null && !Array.isArray(value);
    }
    isArray(value) {
        return Array.isArray(value);
    }
    parseJson(string) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return JSON.parse(string);
            }
            catch (e) {
                return null;
            }
        });
    }
    $(selector, context) {
        return (context !== null && context !== void 0 ? context : document).querySelector(selector);
    }
    $$(selector, context) {
        return (context !== null && context !== void 0 ? context : document).querySelectorAll(selector);
    }
}
const jsonViewer = new JsonViewer();
