<script lang="ts">
	/**
	* Component for Alert messages.
	* @prop {visible} - controls the visibilty of the alert
	* @prop {background} - controls the background color of the alert use Colors ENUM.
	* @prop {message} - controls what the alert displays. 
	*/
	export let visible = "hidden";
	export let background = "";
	export let message = "";
</script>
<alert class="{visible}" style:background>
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