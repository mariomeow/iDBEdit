<script lang="ts">
	import { states } from "../lib/global.svelte"
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
</div>
