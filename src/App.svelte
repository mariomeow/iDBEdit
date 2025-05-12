<script lang="ts">
	import type { Database } from "./lib/types"
	import Centered from "./components/Centered.svelte"
	import Panel from "./components/Panel.svelte"
	import { getDatabases } from "./lib/helper"
	import Content from "./components/Content.svelte"
	import { activeTab } from "./lib/global.svelte"

	/*
	let databases = $state<Promise<Database[] | []>>([
		{
			name: "woohoo"
		},
		{
			name: "xD"
		},
		{
			name: "kodeine"
		}
	])
	*/

	let databases = $state<Promise<Database[] | []>>(getDatabases())
</script>

<svelte:head>
	<title>iDBEdit - Manage IndexedDB records</title>
</svelte:head>

{#await databases then databaseList}
	{#if databaseList.length > 0}
		<main>
			<Panel databases={databaseList} />
			{#if activeTab.database}
				<Content />
			{/if}
		</main>
	{:else}
		<Centered>
			<h1>No IndexedDB databases found for this website</h1>
		</Centered>
	{/if}
{/await}
