// Type definitons for RDKit.js
// Project: https://github.com/rdkit/rdkit-js
// Definitions by: adam-of-barot <https://github.com/adam-of-barot>

type JSONString = string;

/** 
 * Represents a molecule object generated by RDKit.js
 * 
 * @remarks
 * JSMols are created using the {@link RDKitModule.get_mol | RDKitModule.get_mol()} methods. 
 */
export interface JSMol {

  /** Delete C++ mol objects manually from memory
   * 
   * See {@link https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management | Emscripten docs} for more details
   */
  delete(): void

  // string representations

  /** Returns the SMILES string */
  get_smiles(): string;

  /** Returns the Chemaxon Extended SMILES string */
  get_cxsmiles(): string;

  /** Returns the SMARTS string */
  get_smarts(): string;
  
  /** Returns the Chemaxon Extended SMARTS string */
  get_cxsmarts(): string;

  /** Returns the V2000 Molfile string*/
  get_molblock(): string;

  /** Returns the V3000 Molfile string */
  get_v3Kmolblock(): string;

  /** Returns the pickled string representation of the molecule */
  get_pickle(): string;

  /** Return the InChI string */
  get_inchi(): string;

  /** Returns the JSON representation */
  get_json(): string;


  // array representation

  /** Returns an unsigned integer array representation */
  get_as_uint8array(): Uint8Array;


  // SVG representations

  /** Returns an SVG of the molecule */
  get_svg(): string;

  /**
   * Returns an SVG of the molecule
   * 
   * @param width Width in pixels
   * @param height Height in pixels
   */
  get_svg(width: number, height: number): string;

  /**
   * Returns an SVG of the molcule, with atoms highlighted
   * 
   * @param details A stringified JSON object containing any of the following options https://www.rdkitjs.com/#drawing-molecules-all-options
   */
  get_svg_with_highlights(details: string): string;


  // substructure match methods

  /**
   * Returns a substructure match string
   * 
   * @param q query molecule
   * @returns A stringified JSON object containing the matched atoms and bonds of the parent molecule
   */
  get_substruct_match(q: JSMol): string;

  /**
   * Returns all substructure matches
   * 
   * @param q query molecule
   * @returns A stringified JSON object containing the matched atoms and bonds of the parent molecule
   */
  get_substruct_matches(q: JSMol): string;


  // molecular descriptors

  /** Returns a stringified JSON object of molecular descriptors */
  get_descriptors(): string;


  // fingerprint methods

  /**
   * Returns the Morgan fingerprint as string
   */
  get_morgan_fp(): string;

  /**
   * Returns the Morgan fingerprint as string.
   * 
   * You can also specify the following options
   * (passed as a stringified JSON object)
   * @param {number} radius fingerprint radius
   * @param {number} len fingerprint length
   */
  get_morgan_fp(options: JSONString): string;

  /**
   * Returns the Morgan fingerprint as binary
   */
  get_morgan_fp_as_binary_text(): string;

  /**
   * Returns the Morgan fingerprint as binary
   * 
   * @param radius fingerprint radius
   * @param len fingerprint length
   */
  get_morgan_fp_as_binary_text(radius: number, len: number): string;

  /**
   * Returns the Morgan fingerprint as an unsigned integer array
   */
  get_morgan_fp_as_uint8array(): Uint8Array;

  /**
   * Returns the Morgan fingerprint as an unsigned integer array
   * 
   * You can also specify the following options
   * (passed as a stringified JSON object)
   * @param {number} radius fingerprint radius
   * @param {number} fplen fingerprint length
   */
  get_morgan_fp_as_uint8array(options: JSONString): Uint8Array;

  /**
   * Returns the pattern fingerprint as string
   */
  get_pattern_fp(): string;

  /**
   * Returns the pattern fingerprint as string
   * 
   * you can also specify the following options
   * (passed as a stringified JSON object)
   * @param {number} len fingerprint length
   */
  get_pattern_fp(options: JSONString): string;

  /**
   * Returns the pattern fingerprint as binary
   */
  get_pattern_fp_as_binary_text(): string;

  /**
   * Returns the pattern fingerprint as binary
   * 
   * @param len fingerprint length
   */
  get_pattern_fp_as_binary_text(len: number): string;

  /**
   * Returns the pattern fingerprint as an unsigned integer array
   */
  get_pattern_fp_as_uint8array(): Uint8Array;

  /**
   * Returns the pattern fingerprint as an unsigned integer array
   * 
   * you can also specify the following options
   * (passed as a stringified JSON object)
   * @param {number} fplen fingerprint length
   */
  get_pattern_fp_as_uint8array(options: JSONString): Uint8Array;


  // abbreviation methods

  condense_abbreviations(): string;
  condense_abbreviations(maxCoverage: number, useLinkers: boolean): string;
  condense_abbreviations_from_defs(
    definitions: string,
    maxCoverage: number,
    useLinkers: boolean
  ): string;

  // coord generation

  /**
   * Aligns molecule with the template.
   * you can also specify the following options
   * (passed as a stringified JSON object)
   * @param {boolean} useCoordGen 
   * @param {boolean} allowOptionalAttachements
   * @param {boolean} acceptFailure
   */
  generate_aligned_coords(
    templateMol: JSMol,
    options: JSONString
  ): string;

  /**
   * @deprecated Please check the get_mol return value for non-nullness instead
   */
  is_valid(): boolean;

  /** Check is the molecule has any 2D coordinates generated */
  has_coords(): boolean;

  /** Returns a stringified JSON object containing the atoms and bonds of stereo centers */
  get_stereo_tags(): string;

  /** Returns the V2000 Molfile representation of the aromatic form of the molecule */
  get_aromatic_form(): string;

  /** Returns the V2000 Molfile representation of the kekule form of the molecule */
  get_kekule_form(): string;

  /** Generate new 2D coordinates */
  set_new_coords(): boolean;

  /**
   * Generate new 2D coordinates
   * 
   * @param useCoordGen use the CoordGen algorithm
   */
  set_new_coords(useCoordGen: boolean): boolean;

  /** Return a V2000 Molfile string with newly generated coordinates */
  get_new_coords(): string;

  /**
   * Return a V2000 Molfile string with newly generated coordinates
   * 
   * @param useCoordGen use the CoordGen algorithm
   */
  get_new_coords(useCoordGen: boolean): string;


  // property methods

  /**
   * Check whether the molecule has a certain property
   * 
   * @param key property name
   */
  has_prop(key: string): boolean;

  /** Returns the list of property names */
  get_prop_list(): string[];

  /**
   * Returns the list of property names
   * 
   * @param includePrivate set to true to include private properties
   */
  get_prop_list(includePrivate: boolean): string[];

  /**
   * Returns the list of property names
   * 
   * @param includePrivate set to true to include private properties
   * @param includeComputed set to true to include computed properties
   */
  get_prop_list(includePrivate: boolean, includeComputed: boolean): string[];

  /**
   * Sets a property on the molecule
   * 
   * @param key property name
   * @param val property value
   */
  set_prop(key: string, val: string): boolean;

  /**
   * Sets a property on the molecule
   * 
   * @param key property name
   * @param val property value
   * @param computed set true to flag the value as computed
   */
  set_prop(key: string, val: string, computed: boolean): boolean;

  /**
   * Get a property on the molecule
   * 
   * @param key property name
   */
  get_prop(key: string): string;


  // hydrogen methods

  /** 
   * Remove explicit hydrogens
   * 
   * @returns V2000 Molfile string without explicit hydrogens
   */
  remove_hs(): string;

  /** 
   * Add explicit hydrogens
   * 
   * @returns V2000 Molfile string with explicit hydrogens
   */
  add_hs(): string;


  // depiction methods

  normalize_depiction(): number;
  normalize_depiction(canonicalize: number): number;
  normalize_depiction(canonicalize: number, scaleFactor: number): number;
  straighten_depiction(): void;


  // canvas methods

  /**
   * Draw the molecule to an HTML5 canvas
   * 
   * @param canvas canvas ID
   * @param width width in pixels
   * @param height height in pixels
   */
  draw_to_canvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number
  ): void;

  /**
   * Draw the molecule to an HTML5 canvas, with atom highlights
   * 
   * @param canvas canvas ID
   * @param details A stringified JSON object containing any of the following options https://www.rdkitjs.com/#drawing-molecules-all-options
   */
  draw_to_canvas_with_highlights(
    canvas: HTMLCanvasElement,
    details: string
  ): void;

  /**
   * Draw the molecule to an HTML5 canvas with an offset
   * 
   * @param canvas canvas ID
   * @param offsetx offset X in pixels
   * @param offsety offset Y in pixels
   * @param width width in pixels
   * @param height height in pixels
   */
  draw_to_canvas_with_offset(
    canvas: HTMLCanvasElement,
    offsetx: number,
    offsety: number,
    width: number,
    height: number
  ): void;
}


/**
 * Represents a reaction object generated by RDKit.js
 * 
 * @remarks
 * JSReactions are created using the {@link RDKitModule.get_rxn | RDKitModule.get_rxn()} methods. 
 */
export interface JSReaction {

  /** Returns an SVG of the reaction */
  get_svg(): string;

  /**
   * Returns an SVG of the reaction
   * 
   * @param width Width in pixels
   * @param height Height in pixels
   */
  get_svg(width: number, height: number): string;

  /**
   * Returns an SVG of the reaction, with atoms highlighted
   * 
   * @param details A stringified JSON object containing any of the following options https://www.rdkitjs.com/#drawing-molecules-all-options
   */
  get_svg_with_highlights(details: string): string;

  /**
   * Draw the reaction to an HTML5 canvas
   * 
   * @param canvas canvas ID
   * @param width width in pixels
   * @param height height in pixels
   */
  draw_to_canvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number
  ): void;

  /**
   * Draw the reaction to an HTML5 canvas with an offset
   * 
   * @param canvas canvas ID
   * @param offsetx offset X in pixels
   * @param offsety offset Y in pixels
   * @param width width in pixels
   * @param height height in pixels
   */
  draw_to_canvas_with_offset(
    canvas: HTMLCanvasElement,
    offsetx: number,
    offsety: number,
    width: number,
    height: number
  ): void;

  /**
   * Draw the reaction to an HTML5 canvas, with atom highlights
   * 
   * @param canvas canvas ID
   * @param details A stringified JSON object containing any of the following options https://www.rdkitjs.com/#drawing-molecules-all-options
   */
  draw_to_canvas_with_highlights(
    canvas: HTMLCanvasElement,
    details: string
  ): void;

  /** Delete C++ reaction objects manually from memory
   * 
   * See {@link https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management | Emscripten docs} for more details
   */
  delete(): void;

  /**
   * @deprecated Please check the get_rxn return value for non-nullness instead
   */
  is_valid(): boolean
}


/** 
 * An object containing a collection of structures. Used for efficient substructure searching.
 * 
 * @remarks
 * Add molecules to the library with the {@link add_mol}, {@link add_smiles} or {@link add_trusted_smiles} methods.
 * 
 * Perform substructure searches with the {@link get_matches} method.
 */
export interface SubstructLibrary {

  /**
   * Add a molecule to the library
   * 
   * @param m molecule
   */
  add_mol(m: JSMol): number;

  /**
   * Add a molecule to the library
   * 
   * @param smi SMILES string
   */
  add_smiles(smi: string): number;

  /**
   * Add a molecule to the library.
   * 
   * Molecule validity will not be checked!
   * 
   * @param smi SMILES string (trusted to be valid)
   */
  add_trusted_smiles(smi: string): number;

  /**
   * Get a molecule from the library
   * 
   * @param i index of the molecule
   */
  get_mol(i: number): JSMol;

  /**
   * Get all molecules from the library matching the substructure query
   * 
   * @param q query molecule
   */
  get_matches(q: JSMol): string;

  /**
   * Get all molecules from the library matching the substructure query
   * 
   * @param q query molecule
   * @param maxResults maximum number of results
   */
  get_matches(q: JSMol, maxResults: number): string;

  /**
   * Get all molecules from the library matching the substructure query
   * 
   * @param q query molecule
   * @param useChirality set to true to enable chiral substructure searching
   * @param numThreads number of threads to use
   * @param maxResults maximum number of results
   */
  get_matches(
    q: JSMol,
    useChirality: boolean,
    numThreads: number,
    maxResults: number
  ): string;

  /**
   * Return the number of substructure matches
   * 
   * @param q query molecule
   */
  count_matches(q: JSMol): number;

  /**
   * Return the number of substructure matches
   * 
   * @param q query molecule
   * @param useChirality set to true to enable chiral substructure searching
   * @param numThreads number of threads to use
   */
  count_matches(q: JSMol, useChirality: boolean, numThreads: number): number;
}

// constructor interfaces

/** Returns a new SubstructLibrary instance */
interface SubstructLibraryConstructor {
  new(): SubstructLibrary
}

/** The main RDKit module */
export interface RDKitModule {
  SubstructLibrary: SubstructLibraryConstructor;

  /**
   * Create a molecule from a variety of input strings.
   * This will return null if the input is invalid.
   * 
   * @param input SMILES / SMARTS / MolFile / JSON string
   * @param details_json 
   */
  get_mol(input: string, details_json?: string): JSMol | null;

  /**
   * Create a molecule from a pickle string
   * 
   * @param pkl pickle string
   */
  get_mol_from_pickle(pkl: string): JSMol;

  /**
   * Create a molecule from an integer array
   * 
   * @param pklAsUInt8Array unsigned integer array
   */
  get_mol_from_uint8array(pklAsUInt8Array: Uint8Array): JSMol;

  /**
   * Create a copy of a molecule
   * 
   * @param other molecule to copy
   */
  get_mol_copy(other: JSMol): JSMol;

  /**
   * Create a query molecule
   * This will return null if the input is invalid.
   * 
   * @param input SMARTS string
   */
  get_qmol(input: string): JSMol | null;

  /**
   * Get the InChI key for an InChI string
   * 
   * @param inchi InChI string
   */
  get_inchikey_for_inchi(inchi: string): string;


  /**
   * Get the version number of the RDKit module
   */
  version(): string;

  /**
   * Set whether to prefer the CoordGen library's algorithm for coordinate generation
   * 
   * @param prefer
   */
  prefer_coordgen(prefer: boolean): void;

  /**
   * Set whether to use legacy stereo perception
   * 
   * @param value
   */
  use_legacy_stereo_perception(value: boolean): void;

  /**
   * Set whether to allow non-tetrahedral chirality
   * 
   * @param value
   */
  allow_non_tetrahedral_chirality(value: boolean): boolean;

  /**
   * Create a reaction from a variety of input strings.
   * This will return null if the input is invalid.
   * @param input 
   * @param details_json 
   */
  get_rxn(input: string, details_json?: string): JSReaction | null

}

type RDKitLoaderOptions = {
  /**
   * Optional path to the RDKit module .wasm file on your server.
   */
  locateFile?: () => string
}

/**
 * Loads the RDKit module asynchronously.
 * In order to use the RDKit module, calling this function is necessary.
 */
export type RDKitLoader = (options?: RDKitLoaderOptions) => Promise<RDKitModule>;

declare global {
  interface Window {
    initRDKitModule: RDKitLoader;
  }
}
