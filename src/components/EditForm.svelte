<script>
	import { Utilities } from "../scripts/utilities/Utilities";
	export let data = undefined;
	
	let license = {};
	let downloadable = false;
	let json, jsonArry, jBlob, url, link;
	
	const ShowDownloads = () => downloadable = true;
	
	function PrepareJson(node)
	{
		json = JSON.stringify(data);
		jsonArry = [json];
		jBlob = new Blob(jsonArry, { type: "text/plain;charset=utf-8" });
		url = window.URL;
		link = url.createObjectURL(jBlob);

		return {
			destroy()
			{
				console.log("Component Destroyed");
			},
		};
	}
</script>


{#if data !== undefined}
	<div class="edit-license">
		<form class="edit-license" name="edit-license" id="EditLicense">
			{#each Object.entries(data[0]) as [key, value]}
				<label for={key}>{Utilities.FormatColumnHeader(key)}</label>
				<input type="text" id={key} name={key} bind:value={value}/>
			{/each}
			<input type="submit" value="Submit Edit" on:click|once|preventDefault={ShowDownloads}/>

			{#if downloadable}
				<button class="download-license" use:PrepareJson>
					<a href={link} download="license.txt">Download Updated License</a>
				</button>
			{/if}
		</form>
	</div>
{/if}