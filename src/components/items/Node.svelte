<script lang="ts">
	import { activeTab } from "../../lib/global.svelte"
	import { deleteObjectStore } from "../../lib/helper"

	let { key, values } = $props()
</script>

<form
	onsubmit={async (e) => {
		e.preventDefault()

		const attribute: string | null | undefined = e.submitter?.getAttribute("name")

		if (attribute) {
			const attsplit: string[] = attribute.split("|")

			if (attsplit[0] == "deleteStore") {
				await deleteObjectStore(activeTab.database!, attsplit[1])
			}
		}
	}}
>
	<div class="node">
		<h1>{key} <button class="delete" name={`deleteStore|${key}`}>x</button></h1>
		{#each Object.entries(values) as [key2, value]}
			<div class="node-input">
				{key2}
				<input type="text" name={key + "|" + key2} {value} />
			</div>
		{/each}
	</div>
</form>
