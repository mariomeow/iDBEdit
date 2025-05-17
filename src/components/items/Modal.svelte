<script lang="ts">
	let { name }: { name: string } = $props()

	let enterElement: HTMLButtonElement | undefined = $state()
</script>

<div class="modal">
	<input
		type="text"
		placeholder="Enter object store name"
		name="objectStoreName"
		onkeydown={(e: KeyboardEvent) => {
			if (e.code == "Enter") {
				e.preventDefault()

				if (enterElement) enterElement.click()
			}
		}}
	/>
	<button {name} bind:this={enterElement}>Enter</button>
</div>
