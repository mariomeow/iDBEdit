import type { ActiveTab, Data } from "./types"

export let activeTab = $state<ActiveTab>({})

export let state = $state<{ saving: boolean }>({
    saving: false
})

export let data = $state<Data>({
    databases: []
})