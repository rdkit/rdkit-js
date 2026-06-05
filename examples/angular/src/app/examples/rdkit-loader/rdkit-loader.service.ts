import { Injectable, OnDestroy } from "@angular/core";
import initRDKitModule, { RDKitModule } from "@rdkit/rdkit";
import { Observable, ReplaySubject } from "rxjs";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RDKitLoaderService implements OnDestroy {
  private rdkitSubject$!: ReplaySubject<RDKitModule>;

  /**
   * Tidy up the subject on closing
   */
  ngOnDestroy(): void {
    this.rdkitSubject$.complete();
  }

  /**
   * Returns an observable with the RDKit module in it.
   *
   * If RDKit isn't set, its going to be initialized, and then sent through the subject.
   * Subsequent calls listen to the same subject, which emits the instance when init is complete,
   * or instantly when its already initialized.
   *
   * @returns An Observable containing the RDKit Module
   */
  getRDKit(): Observable<RDKitModule> {
    if (!this.rdkitSubject$) {
      this.rdkitSubject$ = new ReplaySubject(1);
      initRDKitModule({ locateFile: () => '/RDKit_minimal.wasm' }).then(
        (instance: RDKitModule) => {
          // instance.prefer_coordgen(true)
          this.rdkitSubject$.next(instance);
        },
        (error) => {
          this.rdkitSubject$.error(error);
        }
      );
    }
    return this.rdkitSubject$.asObservable().pipe(first());
  }
}
