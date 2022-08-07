// Type definitons for RDKit.js
// Project: https://github.com/rdkit/rdkit-js
// Definitions by: adam-of-barot <https://github.com/adam-of-barot>

export interface JSMol {
  // string representations
  get_smiles(): string;
  get_cxsmiles(): string;
  get_smarts(): string;
  get_cxsmarts(): string;
  get_molblock(): string;
  get_v3Kmolblock(): string;
  get_pickle(): string;
  get_inchi(): string;
  get_json(): string;

  // array representation
  get_as_uint8array(): Uint8Array;

  // SVG representations
  get_svg(): string;
  get_svg(width: number, height: number): string;
  get_svg_with_highlights(details: string): string;

  // substructure match methods
  get_substruct_match(q: JSMol): string;
  get_substruct_matches(q: JSMol): string;

  // molecular descriptors
  get_descriptors(): string;

  // fingerprint methods
  get_morgan_fp(): string;
  get_morgan_fp(radius: number, len: number): string;
  get_morgan_fp_as_binary_text(): string;
  get_morgan_fp_as_binary_text(radius: number, len: number): string;
  get_morgan_fp_as_uint8array(): Uint8Array;
  get_morgan_fp_as_uint8array(radius: number, fplen: number): Uint8Array;
  get_pattern_fp(): string;
  get_pattern_fp(len: number): string;
  get_pattern_fp_as_binary_text(): string;
  get_pattern_fp_as_binary_text(len: number): string;
  get_pattern_fp_as_uint8array(): Uint8Array;
  get_pattern_fp_as_uint8array(fplen: number): Uint8Array;

  // abbreviation methods
  condense_abbreviations(): string;
  condense_abbreviations(maxCoverage: number, useLinkers: boolean): string;
  condense_abbreviations_from_defs(
    definitions: string,
    maxCoverage: number,
    useLinkers: boolean
  ): string;

  // coord generation
  generate_aligned_coords(templateMol: JSMol): string;
  generate_aligned_coords(templateMol: JSMol, useCoordGen: boolean): string;
  generate_aligned_coords(
    templateMol: JSMol,
    useCoordGen: boolean,
    allowOptionalAttachements: boolean
  ): string;
  generate_aligned_coords(
    templateMol: JSMol,
    useCoordGen: boolean,
    allowOptionalAttachements: boolean,
    acceptFailure: boolean
  ): string;
  is_valid(): boolean;
  has_coords(): boolean;
  get_stereo_tags(): string;
  get_aromatic_form(): string;
  get_kekule_form(): string;
  set_new_coords(): boolean;
  set_new_coords(useCoordGen: boolean): boolean;
  get_new_coords(): string;
  get_new_coords(useCoordGen: boolean): string;

  // property methods
  has_prop(key: string): boolean;
  get_prop_list(): string[];
  get_prop_list(includePrivate: boolean): string[];
  get_prop_list(includePrivate: boolean, includeComputed: boolean): string[];
  set_prop(key: string, val: string): boolean;
  set_prop(key: string, val: string, computed: boolean): boolean;
  get_prop(key: string): string;

  // hydrogen methods
  remove_hs(): string;
  add_hs(): string;

  // depiction methods
  normalize_depiction(): number;
  normalize_depiction(canonicalize: number): number;
  normalize_depiction(canonicalize: number, scaleFactor: number): number;
  straighten_depiction(): void;

  // canvas methods
  draw_to_canvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number
  ): void;
  draw_to_canvas_with_highlights(
    canvas: HTMLCanvasElement,
    details: string
  ): void;
  draw_to_canvas_with_offset(
    canvas: HTMLCanvasElement,
    offsetx: number,
    offsety: number,
    width: number,
    height: number
  ): void;
}

export interface SubstructLibrary {
  add_mol(m: JSMol): number;
  add_smiles(smi: string): number;
  add_trusted_smiles(smi: string): number;

  get_mol(i: number): JSMol;

  get_matches(q: JSMol): string;
  get_matches(q: JSMol, maxResults: number): string;
  get_matches(
    q: JSMol,
    useChirality: boolean,
    numThreads: number,
    maxResults: number
  ): string;
  count_matches(q: JSMol): number;
  count_matches(q: JSMol, useChirality: boolean, numThreads: number): number;
}

export interface RDKitModule {
  Mol: JSMol;
  SubstructLibrary: SubstructLibrary;
  get_mol(input: string, details_json: string): JSMol;
  get_mol_from_pickle(pkl: string): JSMol;
  get_mol_from_uint8array(pklAsUInt8Array: Uint8Array): JSMol;
  get_mol_copy(other: JSMol): JSMol;
  get_qmol(input: string): JSMol;
  get_inchikey_for_inchi(inchi: string): string;

  version(): string;
  prefer_coordgen(prefer: boolean): void;
  use_legacy_stereo_perception(value: boolean): void;
}

export type RDKitLoader = () => Promise<RDKitModule>;
