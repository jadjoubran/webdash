class Backend {
  constructor(pluginName) {
    if (!pluginName) {
      throw Error("Must provide plugin name");
    }

    if (pluginName.startsWith("webdash-")) {
      pluginName = pluginName.replace(/^webdash\-/, "");
    }

    this._baseUrl = `/api/${pluginName}/`;
    this._defaultHeaders = {
      "Content-Type": "application/json"
    };
    this._defaultBody = {};
  }

  getBaseUrl() {
    return this._baseUrl;
  }

  getDefaultHeaders() {
    return this._defaultHeaders;
  }

  getDefaultBody() {
    return this._defaultBody;
  }

  handleLeadingSlash(endpoint) {
    if (endpoint.startsWith("/")) {
      endpoint = endpoint.substr(1);
    }
    return endpoint;
  }

  async get(endpoint = "") {
    endpoint = this.handleLeadingSlash(endpoint);
    const response = await fetch(this.getBaseUrl() + endpoint);
    const data = await response.json();
    return data;
  }

  async post(endpoint = "", body = undefined, headers = {}) {
    return await this._send("POST", endpoint, body, headers);
  }

  async put(endpoint = "", body = undefined, headers = {}) {
    return await this._send("PUT", endpoint, body, headers);
  }

  async delete(endpoint = "", body = undefined, headers = {}) {
    return await this._send("DELETE", endpoint, body, headers);
  }

  async _send(method, endpoint = "", body = undefined, headers = {}) {
    endpoint = this.handleLeadingSlash(endpoint);
    const response = await fetch(this.getBaseUrl() + endpoint, {
      method,
      headers: Object.assign(this.getDefaultHeaders(), headers),
      body: JSON.stringify(Object.assign(this.getDefaultBody(), body))
    });
    return await response.json();
  }
}

window.Backend = Backend;
