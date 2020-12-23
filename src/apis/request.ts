function stringifyParams(params) {
    if (!params) return '';
    return Object.keys(params).map((key) => {
        let item = params[key];
        if ([undefined, null, NaN].includes(item)) item = "";
        if (typeof item === "object") item = JSON.stringify(item);
        return `${key}=${encodeURIComponent(item)}`;
    }).join("&");
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error: any = new Error(response.statusText);
    error.response = response;
    throw error;
}

function toJson(response) {
    // 判断是否是下载文件请求
    const contentType = response.headers.get("content-type") || "";
    if (/application\/(x-msdownload|octet-stream|vnd\.ms-excel|pdf|zip)/.test(contentType)) {
        return response;
    }
    return response.json();
}

const DEFAULT_HEADERS: any = {
    "cache-control": "no-cache",
    "X-Requested-With": "Fetch",
    "Content-Type": 'application/json; charset=utf-8',
    "Accept": "application/json",
};

/**
 * Requests a URL, returning a promise.
 */
export default {
    get(url: string, params?: object, headers?: object): Promise<any> {
        let path = url;
        let conn;

        if (url.indexOf("?") === -1) {
            conn = "?";
        } else if (/\?$/.test(url)) {
            conn = "";
        } else {
            conn = "&";
        }

        path += `${conn}${stringifyParams(params)}`;

        return fetch(path, {
            method: "get",
            headers: { ...DEFAULT_HEADERS, "referer-url": window.location.href, ...(headers || {}) },
            credentials: "include",
        })
            .then(checkStatus)
            .then(toJson)
    },
};
