import { NgModule } from "@angular/core";

import { GluonRendererModule } from "./renderer/gluon-renderer.module";

@NgModule({
	imports: [
		GluonRendererModule,
    ]
})
export class GluonEngineModule {}