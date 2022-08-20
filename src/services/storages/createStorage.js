class BaseStorage {
  constructor(name) {
    this.name = name;
    this.instance = window.localStorage;
  }

  buildKey(key) {
    return `@${this.name}-${key}`;
  }

  setValue(key, value) {
    const customKey = this.buildKey(key);
    this.instance.setItem(customKey, JSON.stringify(value));
  }

  getValue(key) {
    const customKey = this.buildKey(key);
    const value = this.instance.getItem(customKey);

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  setlistValue = (lists) => {
    lists.map((list) => {
      this.setValue(list.key, list.value);
      return true;
    });
  };

  clear() {
    const arr = []; // Array to hold the keys
    // Iterate over localStorage and insert the keys that meet the condition into arr
    for (let i = 0; i < localStorage.length; i += 1) {
      if (localStorage.key(i).startsWith(this.buildKey(''))) {
        arr.push(localStorage.key(i));
      }
    }

    // Iterate over arr and remove the items by key
    // eslint-disable-next-line no-restricted-syntax
    for (const element of arr) {
      localStorage.removeItem(element);
    }
  }
}

export default (name) => new BaseStorage(name);
