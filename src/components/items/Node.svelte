<script lang="ts">
	let { key, values } = $props()
</script>

<div class="node">
	<h1>{key}</h1>
	<div class="node-input">
		{values}
	</div>
</div>
