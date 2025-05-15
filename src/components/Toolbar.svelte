<script lang="ts">
	import { states } from "../lib/global.svelte"
</script>

<div class="toolbar">
	<button
		onclick={() => {
			states.saving = true
		}}
	>
		{#if states.saving}
			Saving...
		{:else}
			Save
		{/if}
	</button>
</div>
