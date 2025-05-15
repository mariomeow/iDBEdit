<script lang="ts">
	//@ts-nocheck
	import Centered from "./components/Centered.svelte"
	import Panel from "./components/Panel.svelte"
	import { getDatabases } from "./lib/helper"
	import Content from "./components/Content.svelte"
	import { activeTab, data, devMode, states } from "./lib/global.svelte"
	import Create from "./components/Create.svelte"

	$effect(() => {
		if (devMode) {
			data.databases = [
				{
					name: "woohoo"
				},
				{
					name: "xD"
				},
				{
					name: "kodeine"
				}
			]
		} else {
			data.databases = getDatabases()
		}
	})
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
		</Centered>
	{/if}
{/await}
