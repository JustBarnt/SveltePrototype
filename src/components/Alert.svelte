<script lang="ts">
	import { componentStore as alerts } from "@stores/stores";
	import { createEventDispatcher, onMount } from "svelte";
	import { backInOut } from "svelte/easing";
	import { fade } from "svelte/transition";
	
	let internalAtt:ComponentManagement = { id: null, name: null, extras: null }; 
	export let visible = "hidden";
	export let message = "";
	export let styles: IStyles;
	export let expiration: number | never = undefined;

	let css:string = "";
	let inAnimation: any = { easing: backInOut };
	let outAnimation: any;

	const dispatch = createEventDispatcher();
	const animation: any = { in:inAnimation, out:outAnimation };

	$:styleStr = css;
	
	onMount(() =>
	{
		css = FormatStylesString();
		AlertCreated();
	});

	const AlertCreated = () => 
	{
		internalAtt = { id: $alerts.length+1, name: `alerts_${$alerts.length+1}`, extras: message };
		$alerts[$alerts.length] = internalAtt;
		expiration !== undefined ? setTimeout(() => { DestorySelf(); }, expiration) : null;
	}; 

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

	function DestorySelf()
	{
		$alerts.filter((value:any) => value.id !== internalAtt.id ? alerts.set([ { ...value } ]) : [...$alerts]);
		dispatch("destroyed", { destroy: true });
	}

</script>
<alert class={visible} style={ css !== "" ? styleStr : ""} in:fade={{ easing: backInOut }} out:fade={{ easing: backInOut }}>
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