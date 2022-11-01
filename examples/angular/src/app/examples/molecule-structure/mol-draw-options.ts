/**
 * RDKit colours are arrays of 4 numbers, in the range 0.0 => 1.0, in the order RGBA
 * 
 * RDKit accept
 */
export type DrawColour = [number, number, number, number];

export interface MolDrawOptions {
    addAtomIndices?: boolean,
    addBondIndices?: boolean,
    additionalAtomLabelPadding?: number,
    addStereoAnnotation?: boolean,
    annotationFontScale?: number,
    atomHighlightsAreCircles?: boolean,
    atomLabelDeuteriumTritium?: boolean,
    atomLabels?: { [key: number]: string },
    backgroundColour?: DrawColour,
    bondLineWidth?: number,
    centreMoleculesBeforeDrawing?: boolean,
    circleAtoms?: boolean,
    clearBackground?: boolean,
    continuousHighlight?: boolean,
    dummiesAreAttachments?: boolean,
    explicitMethyl?: boolean,
    fillHighlights?: boolean,
    fixedBondLength?: number,
    fixedScale?: number,
    flagCloseContactsDist?: number,
    fontFile?: string,
    highlightBondWidthMultiplier?: number,
    highlightColour?: DrawColour,
    highlightRadius?: number,
    includeAtomTags?: boolean,
    includeMetadata?: boolean,
    includeRadicals?: boolean,
    legendColour?: DrawColour,
    legendFontSize?: number,
    maxFontSize?: number,
    minFontSize?: number,
    multipleBondOffset?: number,
    padding?: number,
    prepareMolsBeforeDrawing?: boolean,
    rotate?: number,
    scaleBondWidth?: boolean,
    scaleHighlightBondWidth?: boolean,
    symbolColour?: DrawColour,
}

export interface MolHighlight {
    atoms: number[];
    bonds: number[];
}

export interface DrawingParameters extends MolDrawOptions {
    width?: number;
    height?: number;
    atoms?: number[];
    bonds?: number[];
}