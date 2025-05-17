import type { ActiveTab, Data, State } from "./types"

export let activeTab = $state<ActiveTab>({})

export let states = $state<State>({
    saving: false,
    creating: false,
    deletingDatabase: false,
    addingObjectStore: false
})

export let data = $state<Data>({
    databases: [],
    fields: {}
})