import { Colors } from "@enums/enums";

export class Alerts implements IAlert
{
	public Directives: AlertDirectives = {
		active:false,
		canExpire:true,
		expiresIn: 1500
	};
	
	public Props: PropDirectives = {
		visible: "hidden",
		message: "Hello",
		color: Colors.BLUE
	};

	constructor(Directives:AlertDirectives, Properties:PropDirectives)
	{
		this.Directives.active = Directives.active;
		this.Directives.canExpire = Directives.canExpire;
		this.Directives.expiresIn = Directives.expiresIn;
		this.Props.visible = Properties?.visible;
		this.Props.message = Properties.message;
		this.Props.color = Properties.color;
	}

	/**
	* Updates the alerts parameters for creating/hiding(if canExpire is false) the alert.
	* @param {AlertDirectives} Directives - An object containing the directives that the alert uses.
	*/
	public SetAlert(Directives:AlertDirectives, Properties:PropDirectives):void
	{
		this.Directives = Directives;
		this.Props = Properties;
	}

	/**
	* Returns all properties
	* @return {IAlert} Returns an object referencing the IAlert interface.
	*/
	public GetAll(): IAlert
	{
		let Details: IAlert;
		Details.Directives = this.Directives;
		Details.Props = this.Props;
		return Details;
	}

	/**
	* Sets a single property by passing the name of the propert and the value
	* @param {String} name - The name of the properties: `active, canExpire, expiresIn, visible, message, color`
	* @param {any} value - the value to update the parameter to
	* @return {any} returns the value
	*/
	public Set(name: string, value: any): any
	{
		Alerts[name] = value;
		return value;
	}

	/**
	* Returns the set of directives used to control the alerts.
	* @return {Record<string, any>} retuns the object of directives.
	*/
	public get LifeCycle(): AlertDirectives
	{
		return this.Directives;
	}

	/**
	* Updates the alerts directives
	* @param {AlertDirectives} Directives - An object containing the directives that the alert uses.
	*/
	public set LifeCycle(Directives:AlertDirectives)
	{
		this.Directives.active = Directives.active;
		this.Directives.canExpire = Directives.canExpire;
		this.Directives.expiresIn = Directives.expiresIn;
	}

	public get Properties(): PropDirectives
	{
		return this.Props;
	}

	public set Properties(Properties:PropDirectives)
	{
		this.Props.visible = Properties?.visible;
		this.Props.message = Properties.message;
		this.Props.color = Properties.color;
	}
}