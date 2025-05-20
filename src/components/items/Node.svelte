<script lang="ts">
	import { activeTab } from "../../lib/global.svelte"
	import { deleteObjectStore, deleteStoreField } from "../../lib/helper"
	import FieldNode from "../items/FieldNode.svelte"

	let { key, values } = $props()
</script>

<div class="node">
	<h1>
		{key}
		<button
			class="delete"
			onclick={async (e) => {
				e.preventDefault()

				await deleteObjectStore(activeTab.database!, key)
			}}>x</button
		>
	</h1>
	{#each Object.entries(values) as [key2, value]}
		<div class="node-input">
			<h1>
				{key2}
				<button
					class="delete"
					onclick={async (e) => {
						e.preventDefault()

						await deleteStoreField(activeTab.database!, key, key2)
					}}>x</button
				>
			</h1>
			<input type="text" name={key + "|" + key2} value={JSON.stringify(value)} />
		</div>
	{/each}
	<FieldNode store={key} />
</div>
