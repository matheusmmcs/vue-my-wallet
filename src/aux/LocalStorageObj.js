

export default {
    setItem: function(alias, data) {
        localStorage.setItem(alias, JSON.stringify(data));
    },
    getItem: function(alias) {
        let data = localStorage.getItem(alias);
        return data ? JSON.parse(data) : null;
    },
    removeItem: function(alias) {
        localStorage.removeItem(alias);
    }
}