<script lang="ts">
	import { activeTab, data, devMode, states } from "../lib/global.svelte"
	import { deleteDatabase, getObjectStores, saveChanges } from "../lib/helper"
	import Node from "./items/Node.svelte"
	import Toolbar from "./Toolbar.svelte"

	$effect(() => {
		if (devMode) {
			data.fields = {
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
		} else {
			data.fields = getObjectStores(activeTab.database!)
		}
	})
</script>

<section class="content">
	{#await data.fields then objectStores}
		{#if Object.keys(objectStores).length > 0}
			<form
				onsubmit={(e) => {
					e.preventDefault()

					const attribute: string | null | undefined = e.submitter?.getAttribute("name")

					if (attribute) {
						if (attribute == "save") {
							states.saving = true
							saveChanges(e)
						}
						if (attribute == "delete") {
							states.deletingDatabase = true
							deleteDatabase(activeTab.database!)
						}
					}
				}}
			>
				<Toolbar />
				{#each Object.entries(objectStores) as [key, values], i (i)}
					<Node {key} {values} />
				{/each}
				<input type="hidden" value={activeTab.database} name="database" />
			</form>
		{:else}
			<h1 class="emptyh1">
				{activeTab.database} has no stored values,
				<button
					onclick={() => {
						deleteDatabase(activeTab.database!)
					}}>delete?</button
				>
			</h1>
		{/if}
	{/await}
</section>
