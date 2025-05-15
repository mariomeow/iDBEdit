<script lang="ts">
	import { createDatabase } from "../lib/helper"

	let database = $state<string>("")
	let button_state = $state<string>("Create")
</script>

<div class="create">
	<form
		onsubmit={(e) => {
			e.preventDefault()

			if (database.length == 0) return

			button_state = "Creating..."
			createDatabase(database)
		}}
	>
		<div class="cfgroup">
			<h1>Create a database</h1>
			<input type="text" placeholder="Enter database name" bind:value={database} />
		</div>
		<button type="submit" disabled={database.length == 0}>{button_state}</button>
	</form>
</div>
