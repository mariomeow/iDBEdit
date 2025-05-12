<script lang="ts">
	import { activeTab } from "../lib/global.svelte"
	import { getObjectStores } from "../lib/helper"
	import Node from "./items/Node.svelte"
</script>

<section class="content">
	<h1>WOOHOO! {activeTab.database}</h1>
	{#await getObjectStores(activeTab.database!) then objectStores}
		{#each Object.entries(objectStores) as [key, values]}
			<Node {key} {values} />
		{/each}
	{/await}
</section>

<!---
<section class="content">
	<Node />
</section>
-->
