<script lang="ts">
    import { onMount } from "svelte";

	/**
	* Component for Alert messages.
	* @prop {visible} - controls the visibilty of the alert
	* @prop {background} - controls the background color of the alert use Colors ENUM.
	* @prop {message} - controls what the alert displays. 
	*/
	export let visible = "hidden";
	export let message = "";
	export let styles: IStyles;

	let css:string = "";
	$:styleStr = css;

	onMount( () => 
	{
		css = FormatStylesString();
	});

	function FormatStylesString()
	{
		let str:string = "";

		Object.keys(styles).forEach((style:string) => 
		{
			if(styles?.[style])
				str += `${style}: ${styles[style]};`;
		});

		return str;
	}
</script>
<alert class="{visible}" style="{ css !== "" ? styleStr : ""}" >
	<p>
		{message}
	</p>
</alert>
<style lang="scss">
	alert{
		cursor:default;
		&.hidden{
			@include alert-base;
			@include alert-hidden;
		}
	
		&.visible{
			@include alert-base;
			@include alert-visible;
		}
	}
</style>