# Including RDKit JS in your Angular project

## Via CDN
If you are including it via the CDN, add the script tag to your `index.html` file
```html
<script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script>
```

## Via NPM Distribution
To use the NPM distributed package, instead of copying the assets, add the following to your `angular.json` config:
 - Under `scripts` for the project, add the `RDKit_minimal.js` file path:
```json
"scripts": [
    ...,
    "node_modules/@rdkit/rdkit/dist/RDKit_minimal.js"
]
```
 - Under `assets` for the project, add the following to include the WASM file at the correct location:
```json
"assets": [
    ...,
    {
        "glob": "RDKit_minimal.wasm",
        "input": "node_modules/@rdkit/rdkit/dist/",
        "output": "/"
    }
],
```

# Loading RDKit JS
The normal loading method can be used, however, we can make better use of Angular's structure by using a Service and RXJS:
```ts
@Injectable({
  providedIn: 'root'
})
export class RDKitLoaderService implements OnDestroy {
  
  private rdkitSubject$!: ReplaySubject<RDKitModule>

  constructor() { }

  ngOnDestroy(): void {
    this.rdkitSubject$.complete();
  }

  getRDKit(): Observable<RDKitModule>{
    if(!this.rdkitSubject$){

      this.rdkitSubject$ = new ReplaySubject(1);

      window.initRDKitModule().then(
        (instance: RDKitModule) => {
          this.rdkitSubject$.next(instance)
        },
        error => {
          this.rdkitSubject$.error(error)
        }
      )
    }
    return this.rdkitSubject$.asObservable().pipe(first())
  }
}
```
Instead of assigning the RDKit instance to the window and using it from there, we can use a ReplaySubject to stash the instance, and return an Observable of the ReplaySubject. It can be used as the following:

```ts
constructor(private rdkitService: RDKitLoaderService){
    this.rdkitService.getRDKit().subscribe(
        (rdkit: RDKitModule) => {
            // use from here
        }
    )
}
```