import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { GluonRendererComponent } from "./gluon-renderer.component";

@NgModule({
	declarations: [
		GluonRendererComponent
	],
	imports: [
		RouterModule.forRoot(
		[
  			{ path: '', redirectTo: 'render', pathMatch: 'full' },
  			{ path: 'render', component: GluonRendererComponent }
  		], 
		{
			useHash: true
		})
	],
	bootstrap: [
		GluonRendererComponent
	]
})
export class GluonRendererModule {}