<script lang="ts">
	import { states } from "../lib/global.svelte"
	import Modal from "./items/Modal.svelte"

	let addModal = $state<boolean>(false)
</script>

<div class="toolbar">
	<button name="save">
		{#if states.saving}
			Saving...
		{:else}
			Save
		{/if}
	</button>
	<button name="delete">
		{#if states.deletingDatabase}
			Deleting...
		{:else}
			Delete
		{/if}
	</button>
	<button
		onclick={(e) => {
			e.preventDefault()
			if (e.currentTarget == e.target) addModal = !addModal
		}}
	>
		{#if states.addingObjectStore}
			Adding...
		{:else}
			Add
		{/if}
	</button>
	{#if addModal}
		<Modal name="add" />
	{/if}
</div>
