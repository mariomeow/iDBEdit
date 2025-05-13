import type { ActiveTab } from "./types"

export let activeTab = $state<ActiveTab>({})

export let state = $state<{ saving: boolean }>({
    saving: false
})