<script lang="ts">
	import { activeTab, states } from "../lib/global.svelte"
	import type { Database } from "../lib/types"

	let { databases }: { databases: Database[] } = $props()
</script>

<section class="panel">
	<button
		class:darken={!states.creating && activeTab.index != undefined}
		onclick={() => {
			states.creating = !states.creating
			activeTab.database = undefined
			activeTab.index = undefined
		}}>+</button
	>
	{#each databases as { name }, i (i)}
		<button
			class:darken={states.creating ||
				(activeTab.index != null && activeTab.index != undefined && activeTab.index != i)}
			onclick={() => {
				if (activeTab.index == i) {
					activeTab.index = undefined
					activeTab.database = undefined
				} else {
					activeTab.index = i
					activeTab.database = name
				}

				states.creating = false
			}}>{name}</button
		>
	{/each}
</section>
