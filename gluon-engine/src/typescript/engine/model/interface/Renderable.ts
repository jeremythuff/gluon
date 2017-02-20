export interface Renderable {

	init() :Promise<any>;
	load() :Promise<any>;
	update() :void;
	render() :void;
	destroy() :void;

}