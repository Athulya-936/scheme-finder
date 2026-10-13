// All data stays in THIS browser on THIS device. Nothing is sent anywhere.
// Small data (profile, checklist, settings) -> localStorage. Certificate files -> IndexedDB.
const Store = {
  get(k, d) { try { const v = localStorage.getItem('js_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('js_' + k, JSON.stringify(v)); return true; } catch (e) { alert('Your browser blocked or filled its storage.'); return false; } },
  clearAll() { Object.keys(localStorage).filter(k => k.startsWith('js_')).forEach(k => localStorage.removeItem(k)); return FileDB.wipe(); }
};

const FileDB = {
  db: null,
  open() {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((res, rej) => {
      if (!window.indexedDB) return rej(new Error('This browser cannot store files. Use Chrome, Edge or Firefox.'));
      const r = indexedDB.open('jansaathi', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('files');
      r.onsuccess = () => res((this.db = r.result));
      r.onerror = () => rej(r.error || new Error('Could not open file storage'));
    });
  },
  async run(mode, fn) {
    const db = await this.open();
    return new Promise((res, rej) => {
      const req = fn(db.transaction('files', mode).objectStore('files'));
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },
  put(key, blob) { return this.run('readwrite', s => s.put(blob, key)); },
  get(key) { return this.run('readonly', s => s.get(key)); },
  del(key) { return this.run('readwrite', s => s.delete(key)); },
  wipe() { if (this.db) { this.db.close(); this.db = null; } return new Promise(r => { if (!window.indexedDB) return r(); const q = indexedDB.deleteDatabase('jansaathi'); q.onsuccess = q.onerror = q.onblocked = () => r(); }); }
};

async function hashPin(pin, salt) {
  const text = salt + pin;
  if (window.crypto && crypto.subtle) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  let h = 5381; for (const c of text) h = ((h << 5) + h + c.charCodeAt(0)) | 0; return 'f' + h; // fallback if WebCrypto is unavailable
}
