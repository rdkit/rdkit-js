'use client'

import React, { useRef, useEffect, useState } from "react";
import * as RDKitModule from "@rdkit/rdkit";
import _ from "lodash";

interface RDKitMolecule {
  get_substruct_matches(qmol: RDKitMolecule): string;
  get_svg_with_highlights(details: string): string;
  draw_to_canvas_with_highlights(canvas: HTMLCanvasElement, details: string): void;
  delete(): void;
}

interface RDKitInstance {
  get_mol(structure: string): RDKitMolecule | null;
  get_qmol(structure: string): RDKitMolecule | null;
}


interface UseRDKitReturn {
  RDKit: RDKitInstance | null;
  error: boolean;
}


interface MoleculeDetails {
  width: number;
  height: number;
  bondLineWidth: number;
  addStereoAnnotation: boolean;
  atoms?: number[];
  bonds?: number[];
  [key: string]: unknown; // Allow additional properties
}

// Substructure match result
interface SubstructMatch {
  atoms: number[];
  bonds: number[];
}

// Component props with strict typing
export interface MoleculeStructureProps {
  id: string;
  className?: string;
  svgMode?: boolean;
  width?: number;
  height?: number;
  structure: string;
  subStructure?: string;
  extraDetails?: Partial<MoleculeDetails>;
  drawingDelay?: number;
}

// Default props with proper typing
const defaultProps: Required<Pick<MoleculeStructureProps, 'subStructure' | 'className' | 'width' | 'height' | 'svgMode' | 'extraDetails'>> = {
  subStructure: "",
  className: "",
  width: 250,
  height: 200,
  svgMode: false,
  extraDetails: {},
};

const useRDKit = (): UseRDKitReturn => {
  const [RDKit, setRDKit] = useState<RDKitInstance | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    
    // Dynamically import the RDKit module
    // This allows for better tree-shaking and reduces bundle size
    (RDKitModule as { default(): Promise<RDKitInstance> }).default()
      .then((mod: RDKitInstance) => {
        if (isMounted) setRDKit(mod);
      })
      .catch(() => {
        if (isMounted) setError(true);
      });
      
    return () => {
      isMounted = false;
    };
  }, []);

  return { RDKit, error };
};

const MoleculeStructure: React.FC<MoleculeStructureProps> = (props) => {
  const {
    id,
    className,
    svgMode,
    width,
    height,
    structure,
    subStructure,
    extraDetails,
    drawingDelay,
  } = { ...defaultProps, ...props };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [svg, setSvg] = useState<string>("");
  const { RDKit, error } = useRDKit();

  const MOL_DETAILS: MoleculeDetails = {
    width,
    height,
    bondLineWidth: 1,
    addStereoAnnotation: true,
    ...extraDetails,
  };

  const isValidMol = (mol: RDKitMolecule | null): mol is RDKitMolecule => {
    return mol !== null;
  };

  const getMolDetails = (mol: RDKitMolecule, qmol: RDKitMolecule | null): string => {
    if (isValidMol(mol) && isValidMol(qmol)) {
      try {
        const subStructHighlightDetails: SubstructMatch[] = JSON.parse(
          mol.get_substruct_matches(qmol)
        );
        
        const subStructHighlightDetailsMerged: Partial<SubstructMatch> = !_.isEmpty(
          subStructHighlightDetails
        )
          ? subStructHighlightDetails.reduce(
              (acc: SubstructMatch, { atoms, bonds }: SubstructMatch): SubstructMatch => ({
                atoms: [...acc.atoms, ...atoms],
                bonds: [...acc.bonds, ...bonds],
              }),
              { bonds: [], atoms: [] }
            )
          : {};

        return JSON.stringify({
          ...MOL_DETAILS,
          ...subStructHighlightDetailsMerged,
        });
      } catch (parseError) {
        console.warn('Failed to parse substructure matches:', parseError);
        return JSON.stringify(MOL_DETAILS);
      }
    } else {
      return JSON.stringify(MOL_DETAILS);
    }
  };

  useEffect(() => {
    if (!RDKit || error) return;

    const draw = (): void => {
      const mol = RDKit.get_mol(structure || "invalid");
      const qmol = RDKit.get_qmol(subStructure || "invalid");
      const valid = isValidMol(mol);

      try {
        if (svgMode && valid) {
          const svgStr = mol.get_svg_with_highlights(getMolDetails(mol, qmol));
          setSvg(svgStr);
        } else if (valid && canvasRef.current) {
          mol.draw_to_canvas_with_highlights(
            canvasRef.current,
            getMolDetails(mol, qmol)
          );
        }
      } catch (drawError) {
        console.error('Failed to draw molecule:', drawError);
      } finally {
        // Clean up resources
        mol?.delete();
        qmol?.delete();
      }
    };

    if (drawingDelay && drawingDelay > 0) {
      const timeout = setTimeout(draw, drawingDelay);
      return () => clearTimeout(timeout);
    } else {
      draw();
    }
  }, [
    RDKit,
    error,
    structure,
    subStructure,
    svgMode,
    width,
    height,
    JSON.stringify(extraDetails),
    drawingDelay,
  ]);

  if (error) {
    return <span role="alert">Error loading renderer.</span>;
  }
  
  if (!RDKit) {
    return <span>Loading renderer...</span>;
  }

  // Validate molecule structure
  const mol = RDKit.get_mol(structure || "invalid");
  const valid = isValidMol(mol);
  mol?.delete();

  if (!valid) {
    return (
      <span 
        title={`Cannot render structure: ${structure}`}
        role="alert"
      >
        Render Error.
      </span>
    );
  }

  if (svgMode) {
    return (
      <div
        title={structure}
        className={`molecule-structure-svg ${className}`}
        style={{ width, height }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  return (
    <div className={`molecule-canvas-container ${className}`}>
      <canvas
        ref={canvasRef}
        title={structure}
        id={id}
        width={width}
        height={height}
      />
    </div>
  );
};

export default MoleculeStructure;
