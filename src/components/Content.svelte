<script lang="ts">
	import { activeTab, data, states } from "../lib/global.svelte"
	import { createObjectStore, deleteDatabase, getObjectStores, saveChanges } from "../lib/helper"
	import Node from "./items/Node.svelte"
	import Toolbar from "./Toolbar.svelte"

	$effect(() => {
		data.fields = getObjectStores(activeTab.database!)
	})
</script>

<section class="content">
	{#await data.fields then objectStores}
		{#if Object.keys(objectStores).length > 0}
			<form
				onsubmit={async (e) => {
					e.preventDefault()

					const attribute: string | null | undefined = e.submitter?.getAttribute("name")

					if (attribute) {
						if (attribute == "add") {
							states.addingObjectStore = true
							await createObjectStore(activeTab.database!, e)
						} else if (attribute == "save") {
							states.saving = true
							await saveChanges(e)
						} else if (attribute == "delete") {
							states.deletingDatabase = true
							await deleteDatabase(activeTab.database!)
						}
					}
				}}
			>
				<Toolbar />
				{#each Object.entries(objectStores) as [key, values], i (i)}
					<Node {key} {values} />
				{/each}
				<input type="hidden" bind:value={activeTab.database} name="database" />
			</form>
		{:else}
			<h1 class="emptyh1">
				{activeTab.database} has no object stores,
				<button
					onclick={async () => {
						await deleteDatabase(activeTab.database!)
					}}>delete?</button
				>
			</h1>
			<div class="part-2">
				<h1>Create one:</h1>
				<form
					onsubmit={async (e) => {
						e.preventDefault()

						await createObjectStore(activeTab.database!, e)
					}}
				>
					<input type="text" placeholder="Enter object store name" name="objectStoreName" />
					<button>Enter</button>
				</form>
			</div>
		{/if}
	{/await}
</section>
