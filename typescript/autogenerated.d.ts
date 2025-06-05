export interface StringList {
  size(): number;
  push_back(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): void;
  resize(_0: number, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): void;
  set(_0: number, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): boolean;
  get(_0: number): any;
  delete(): void;
}

export interface Mol {
  get_prop_list(): StringList;
  convert_to_aromatic_form(): void;
  convert_to_kekule_form(): void;
  straighten_depiction(): void;
  is_valid(): boolean;
  set_new_coords(): boolean;
  set_new_coords(_0: boolean): boolean;
  get_prop_list(_0: boolean, _1: boolean): StringList;
  get_prop_list(_0: boolean): StringList;
  add_hs_in_place(): boolean;
  remove_hs_in_place(): boolean;
  straighten_depiction(_0: boolean): void;
  has_coords(): number;
  get_num_atoms(_0: boolean): number;
  get_num_atoms(): number;
  get_num_bonds(): number;
  normalize_depiction(): number;
  normalize_depiction(_0: number): number;
  normalize_depiction(_0: number, _1: number): number;
  get_smiles(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_cxsmiles(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_smarts(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_cxsmarts(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_molblock(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_molblock(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_v3Kmolblock(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_v3Kmolblock(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_inchi(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_json(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_svg(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_svg(_0: number, _1: number): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_svg_with_highlights(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_substruct_match(_0: Mol): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_substruct_matches(_0: Mol): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_descriptors(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_morgan_fp(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_morgan_fp(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_pattern_fp(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_topological_torsion_fp(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_topological_torsion_fp(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_rdkit_fp(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_rdkit_fp(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_atom_pair_fp(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_atom_pair_fp(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_maccs_fp(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_stereo_tags(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_aromatic_form(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_kekule_form(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_new_coords(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_new_coords(_0: boolean): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  has_prop(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): boolean;
  set_prop(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _2: boolean): boolean;
  set_prop(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): boolean;
  get_prop(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  clear_prop(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): boolean;
  condense_abbreviations(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  condense_abbreviations(_0: number, _1: boolean): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  add_hs(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  remove_hs(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_as_uint8array(): any;
  draw_to_canvas_with_offset(_0: any, _1: number, _2: number, _3: number, _4: number): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  draw_to_canvas(_0: any, _1: number, _2: number): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  draw_to_canvas_with_highlights(_0: any, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  generate_aligned_coords(_0: Mol, _1: any): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_morgan_fp_as_uint8array(): any;
  get_morgan_fp_as_uint8array(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): any;
  get_pattern_fp(_0: any): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_pattern_fp_as_uint8array(): any;
  get_pattern_fp_as_uint8array(_0: any): any;
  get_topological_torsion_fp_as_uint8array(): any;
  get_topological_torsion_fp_as_uint8array(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): any;
  get_rdkit_fp_as_uint8array(): any;
  get_rdkit_fp_as_uint8array(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): any;
  get_atom_pair_fp_as_uint8array(): any;
  get_atom_pair_fp_as_uint8array(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): any;
  get_maccs_fp_as_uint8array(): any;
  get_frags(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): any;
  get_frags(): any;
  delete(): void;
}

export interface MolList {
  next(): Mol;
  reset(): void;
  at_end(): boolean;
  append(_0: Mol): number;
  insert(_0: number, _1: Mol): number;
  at(_0: number): Mol;
  pop(_0: number): Mol;
  size(): number;
  delete(): void;
}

export interface Reaction {
  get_svg(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_svg(_0: number, _1: number): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_svg_with_highlights(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  draw_to_canvas_with_offset(_0: any, _1: number, _2: number, _3: number, _4: number): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  draw_to_canvas(_0: any, _1: number, _2: number): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  draw_to_canvas_with_highlights(_0: any, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  delete(): void;
}

export interface SubstructLibrary {
  add_mol(_0: Mol): number;
  get_mol(_0: number): Mol;
  count_matches(_0: Mol, _1: boolean, _2: number): number;
  count_matches(_0: Mol, _1: boolean): number;
  count_matches(_0: Mol): number;
  size(): number;
  add_smiles(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): number;
  add_trusted_smiles(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): number;
  get_trusted_smiles(_0: number): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_matches(_0: Mol, _1: boolean, _2: number, _3: number): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_matches(_0: Mol, _1: number): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_matches(_0: Mol): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  add_trusted_smiles_and_pattern_fp(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _1: any): number;
  get_pattern_fp_as_uint8array(_0: number): any;
  get_matches_as_uint32array(_0: Mol, _1: boolean, _2: number, _3: number): any;
  get_matches_as_uint32array(_0: Mol, _1: number): any;
  get_matches_as_uint32array(_0: Mol): any;
  delete(): void;
}

export interface Log {
  clear_buffer(): void;
  get_buffer(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  delete(): void;
}

export interface MainModule {
  StringList: {new(): StringList};
  Mol: {new(): Mol};
  MolList: {new(): MolList};
  Reaction: {new(): Reaction};
  SubstructLibrary: {new(): SubstructLibrary};
  Log: {new(): Log};
  get_mol_copy(_0: Mol): Mol;
  enable_logging(): void;
  disable_logging(): void;
  prefer_coordgen(_0: boolean): void;
  use_legacy_stereo_perception(_0: boolean): boolean;
  allow_non_tetrahedral_chirality(_0: boolean): boolean;
  version(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_inchikey_for_inchi(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  get_mol(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): Mol;
  get_mol(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): Mol;
  get_qmol(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): Mol;
  set_log_capture(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): Log;
  set_log_tee(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): Log;
  get_rxn(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _1: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): Reaction;
  get_rxn(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string): Reaction;
  get_mol_from_uint8array(_0: any): Mol;
}