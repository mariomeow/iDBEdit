<script lang="ts">
	import { activeTab } from "../lib/global.svelte"
	import { createDatabase } from "../lib/helper"
	import type { Database } from "../lib/types"

	let { databases }: { databases: Database[] } = $props()
</script>

<section class="panel">
	<button onclick={() => createDatabase("HMM")}>+</button>
	{#each databases as { name }, i (i)}
		<button
			class:darken={activeTab.index != null && activeTab.index != undefined && activeTab.index != i}
			onclick={async () => {
				if (activeTab.index == i) {
					activeTab.index = undefined
					activeTab.database = undefined
				} else {
					activeTab.index = i
					activeTab.database = name
				}
			}}>{name}</button
		>
	{/each}
</section>
