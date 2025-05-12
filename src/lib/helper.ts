import type { Database } from "./types"

export function getDatabases(): Promise<Database[]> {
    return new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(
            "(async() => { window.IDB_databases = await indexedDB.databases()})()",
            () => {
                setTimeout(() => {
                    chrome.devtools.inspectedWindow.eval("window.IDB_databases", (result: Database[]) => {
                        resolve(result ?? [])
                    })
                }, 100)
            }
        )
    })
}

export function getObjectStores(databaseName: string): Promise<{}> {
    return new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(
            `
                    (() => {
            delete window.IDB_stores
            let connection = indexedDB.open("${databaseName}")

            connection.onsuccess = (e) => {
                const database = e.target.result

                if(database.objectStoreNames.length == 0) {
                    database.close()
                }

                const transaction = database.transaction(Object.values(database.objectStoreNames), "readonly")

                transaction.onerror = e => {
                    database.close()
                }

                transaction.oncomplete = (e) => {
                    window.IDB_stores = objectStores
                    database.close()
                }

                const objectStores = {}

                for (const item of transaction.objectStoreNames) {
                        const store = transaction.objectStore(item)
                        objectStores[store.name] = {}

                        store.openCursor().onsuccess = (e) => {
                            const cursor = e.target.result

                            if (cursor) {
                                objectStores[store.name][cursor.key] = cursor.value
                                cursor.continue()
                            }
                        }
                    }
            }
        })()
            `,
            () => {
                setTimeout(() => {
                    chrome.devtools.inspectedWindow.eval("window.IDB_stores", (result: {}) => {

                        resolve(result ?? {})
                    })
                }, 100)
            }
        )
    })
}