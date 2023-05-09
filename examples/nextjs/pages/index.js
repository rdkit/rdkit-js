import dynamic from "next/dynamic";
const MoleculeStructure = dynamic(
  () => import("../components/MoleculeStructure/MoleculeStructure"),
  { ssr: false }
);

export default function Home() {
  return (
    <MoleculeStructure
      structure="CSCC[C@H](NC(=O)[C@H](CC1=CNC2=C1C=CC=C2)NC(=O)CCNC(=O)OC(C)(C)C)C(=O)N[C@@H](CC(O)=O)C(=O)N[C@@H](CC1=CC=CC=C1)C(N)=O"
      id="smiles"
    />
  );
}
