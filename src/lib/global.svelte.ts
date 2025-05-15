import type { ActiveTab, Data, State } from "./types"

export let devMode = $state<boolean>(false)

export let activeTab = $state<ActiveTab>({})

export let states = $state<State>({
    saving: false,
    creating: false,
    deletingDatabase: false
})

export let data = $state<Data>({
    databases: [],
    fields: {}
})