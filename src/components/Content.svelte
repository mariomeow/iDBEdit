<script lang="ts">
	import { activeTab, state } from "../lib/global.svelte"
	import { getObjectStores, saveChanges } from "../lib/helper"
	import Node from "./items/Node.svelte"
	import Toolbar from "./Toolbar.svelte"

	const hm = {
		keyvaluepairs: {
			save: "reznik",
			bloat: "goat",
			money: "mad"
		},
		keyvaluepairs2: {
			save: "reznik",
			bloat: "goat",
			money: "mad"
		},
		keyvaluepairs3: {
			save: "reznik",
			bloat: "goat",
			money: "mad"
		}
	}
</script>

<!---

-->

<section class="content">
	<form onsubmit={saveChanges}>
		<Toolbar />
		{#await getObjectStores(activeTab.database!) then objectStores}
			{#each Object.entries(objectStores) as [key, values], i (i)}
				<Node {key} {values} />
			{/each}
			<input type="hidden" value={activeTab.database} name="database" />
		{/await}
	</form>
</section>

<!---
<section class="content">
	<form onsubmit={saveChanges}>
		<Toolbar />
		{#each Object.entries(hm) as [key, values], i (i)}
			<Node {key} {values} />
		{/each}
		<input type="hidden" value={activeTab.database} name="database" />
	</form>
</section>
-->
