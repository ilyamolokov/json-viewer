class JsonViewer {
  constructor() {}

  async process() {
    this.clearResult();

    const textAreaValue = this.$<HTMLInputElement>("#textarea").value;
    const parsedJson = await this.parseJson(textAreaValue);

    if (!parsedJson) {
      console.error("Not a valid JSON input");
      return;
    }

    this.$<HTMLElement>("#view-panel").appendChild(
      this.buildTree({ JSON: parsedJson })
    );
  }

  buildTree(node: Record<string, unknown>): HTMLElement {
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
        const el = this.$<HTMLElement>(`#${id}-${key}`);
        if (el.style.display === "none") {
          el.style.display = "block";
          button.textContent = "-";
        } else {
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
      } else if (this.isArray(value)) {
        span.textContent = key;
        li.appendChild(button);
        li.appendChild(span);
        li.appendChild(this.renderArray(value, `${id}-${key}`));
      } else {
        span.textContent = `${key} : ${
          type === "string" ? `"${value}"` : value
        }`;
        li.appendChild(span);
      }

      ul.appendChild(li);
    }

    return ul;
  }

  clearInput() {
    this.$<HTMLInputElement>("#textarea").value = "";
  }

  clearResult() {
    this.$<HTMLElement>("#view-panel").innerHTML = "";
  }

  clearAll() {
    this.clearInput();
    this.clearResult();
  }

  renderObject(node: Record<string, unknown>, id: string): HTMLElement {
    const ul = document.createElement("ul");
    ul.setAttribute("id", id);

    for (const key in node) {
      const li = document.createElement("li");
      const span = document.createElement("span");

      const button = document.createElement("button");
      button.classList.add("expand");
      button.textContent = "+";
      button.addEventListener("click", () => {
        const el = this.$<HTMLElement>(`#${id}-${key}`);
        if (el.style.display === "none") {
          el.style.display = "block";
          button.textContent = "-";
        } else {
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
      } else if (this.isArray(value)) {
        span.textContent = key;
        li.appendChild(button);
        li.appendChild(span);
        const array = this.renderArray(value, `${id}-${key}`);
        array.style.display = "none";
        li.appendChild(array);
      } else {
        span.textContent = `${key} : ${
          type === "string" ? `"${value}"` : value
        }`;
        li.appendChild(span);
      }

      ul.appendChild(li);
    }

    return ul;
  }

  renderArray(arr: unknown[], id: string): HTMLElement {
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
        const el = this.$<HTMLElement>(`#${id}-${i}`);
        if (el.style.display === "none") {
          el.style.display = "block";
          button.textContent = "-";
        } else {
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
      } else if (this.isArray(item)) {
        span.textContent = i.toString();
        li.appendChild(button);
        li.appendChild(span);
        const array = this.renderArray(item, `${id}-${i}`);
        array.style.display = "none";
        li.appendChild(array);
      } else {
        span.textContent = `${i} : ${type === "string" ? `"${item}"` : item}`;
        li.appendChild(span);
      }

      ul.appendChild(li);
    }

    return ul;
  }

  getType(value: unknown) {
    if (value === null) return "null";
    if (this.isArray(value)) return "array";
    return typeof value;
  }

  isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }

  async parseJson(string: string): Promise<{ [key: string]: unknown } | null> {
    try {
      return JSON.parse(string);
    } catch (e) {
      return null;
    }
  }

  $<T>(selector: string, context?: HTMLElement) {
    return <T>(context ?? document).querySelector(selector);
  }

  $$<T>(selector: string, context?: HTMLElement) {
    return <T>(context ?? document).querySelectorAll(selector);
  }
}
const jsonViewer = new JsonViewer();

