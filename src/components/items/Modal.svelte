<script lang="ts">
	let { name }: { name: string } = $props()

	let enterElement: HTMLButtonElement
</script>

<div class="modal">
	<input
		type="text"
		placeholder="Enter object store name"
		name="objectStoreName"
		onkeypress={(e: KeyboardEvent) => {
			if (e.code == "Enter") enterElement.click()
		}}
	/>
	<button {name} bind:this={enterElement}>Enter</button>
</div>
