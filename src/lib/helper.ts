import { data, states } from "./global.svelte"
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
            const connection = indexedDB.open(${JSON.stringify(databaseName)})

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

export function saveChanges(e: SubmitEvent): Promise<void> {
    e.preventDefault()

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    const database = formData.get("database")

    let storesSet: Set<string> | string = new Set()
    let formEntries: [string, any][] | string = []

    formData.delete("database")

    for (const [key, value] of formData.entries()) {
        const keyParts = key.split("|")

        storesSet.add(keyParts[0])
        formEntries.push([key, value])
    }

    return new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(
            `
        (() => {
         const connection = indexedDB.open(${JSON.stringify(database)})

            connection.onsuccess = (e) => {

                const database = e.target.result

                const transaction = database.transaction(${JSON.stringify(Array.from(storesSet))}, "readwrite")
                
                for (const [key, value] of ${JSON.stringify(formEntries)}) {
                    const keyValues = key.split("|")

                    const store = transaction.objectStore(keyValues[0])

                    store.put(value, keyValues[1])
                }

                transaction.oncomplete = (e) => {
                    database.close()
                }

                transaction.onerror = e => {
                    database.close()
                }
            }
         })()
            `, () => {
            setTimeout(() => {
                states.saving = false
                resolve()
            }, 100)
        }
        )
    })
}

export function createDatabase(database: string): Promise<void> {
    return new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(
            `(() => { 
                indexedDB.open(${JSON.stringify(database)})
            })()`,
            () => {
                setTimeout(() => {
                    data.databases = getDatabases()
                    resolve()
                }, 100)
            }
        )
    })
}