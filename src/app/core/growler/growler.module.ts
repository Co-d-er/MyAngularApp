import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnsureModuleLoadedOnceGuard } from '../ensureModuleLoadedOnceGuard';
import { GrowlerComponent } from './growler.component';
import { GrowlerService } from './growler.service';

@NgModule({
  imports: [CommonModule],
  exports: [GrowlerComponent],
  providers: [GrowlerService],
  declarations: [GrowlerComponent]
})
export class GrowlerModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: GrowlerModule) {
    super(parentModule);
  }
}
