<script lang="ts">
	import { activeTab } from "../../lib/global.svelte"
	import { createObjectField } from "../../lib/helper"

	let { store }: { store: string } = $props()

	let fieldName = $state<string>("")
	let fieldValue = $state<string>("")
</script>

<form
	class="field-node"
	onsubmit={async (e) => {
		e.preventDefault()

		await createObjectField(activeTab.database!, store, e)
	}}
>
	<h1>Create a new field</h1>
	<input type="text" placeholder="Enter field name" name="fieldName" bind:value={fieldName} />
	<input type="text" placeholder="Enter field value" name="fieldValue" bind:value={fieldValue} />
	<button disabled={fieldName.length == 0 || fieldValue.length == 0}>Create</button>
</form>
