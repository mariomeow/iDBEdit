<script lang="ts">
	import Panel from "./components/Panel.svelte"
	import { createDatabase, getDatabases } from "./lib/helper"
	import Content from "./components/Content.svelte"
	import { activeTab, data, states } from "./lib/global.svelte"
	import Create from "./components/Create.svelte"
	import Centered from "./components/Centered.svelte"

	$effect(() => {
		data.databases = getDatabases()
	})

	let database = $state<string>("")
	let sendButton: HTMLButtonElement | undefined = $state()
</script>

<svelte:head>
	<title>iDBEdit - Manage IndexedDB records</title>
</svelte:head>

{#await data.databases then databaseList}
	{#if databaseList.length > 0}
		<main>
			<Panel databases={databaseList} />
			{#if activeTab.database}
				<Content />
			{:else if states.creating}
				<Create />
			{/if}
		</main>
	{:else}
		<Centered>
			<h1>No IndexedDB databases found for this website</h1>
			<div class="part">
				<h1>Create one:</h1>
				<div class="part-group">
					<input
						type="text"
						onkeydown={(e) => {
							if (e.code == "Enter") {
								if (sendButton) sendButton.click()
							}
						}}
						placeholder="Enter database name"
						bind:value={database}
					/>
					<button
						bind:this={sendButton}
						onclick={async () => {
							await createDatabase(database)
						}}>Enter</button
					>
				</div>
			</div>
		</Centered>
	{/if}
{/await}
