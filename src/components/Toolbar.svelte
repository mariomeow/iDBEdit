<script lang="ts">
	import { state } from "../lib/global.svelte"
</script>

<div class="toolbar">
	<button
		onclick={() => {
			state.saving = true
		}}
	>
		{#if state.saving}
			Saving...
		{:else}
			Save
		{/if}
	</button>
</div>
