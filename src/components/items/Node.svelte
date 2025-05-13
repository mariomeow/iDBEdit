<script lang="ts">
	let { key, values } = $props()
</script>

<div class="node">
	<h1>{key}</h1>
	{#each Object.entries(values) as [key2, value]}
		<div class="node-input">
			{key2}
			<input type="text" name={key + "|" + key2} {value} />
		</div>
	{/each}
</div>
