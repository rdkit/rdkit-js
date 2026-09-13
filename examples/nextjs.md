---
layout: page
title: Using RDKit.js with Next.js
menu: Next.js
permalink: /examples/nextjs/
---

RDKit + NextJS handles both server-side and client-side JavaScript.
We need a `.wasm` fix to resolve `locateFile` for the client-side,
and for server-side we need a `serverExternalPackages` configuration.

```bash
npx create-next-app@latest rdkit-next --typescript --src-dir --app --no-tailwind --no-eslint
cd rdkit-next
npm install @rdkit/rdkit
```

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@rdkit/rdkit"],
  turbopack: {
    resolveAlias: {
      "RDKit_minimal.wasm":
        "./node_modules/@rdkit/rdkit/dist/RDKit_minimal.wasm",
      fs: { browser: "./src/lib/dummy.ts" },
    },
  },
};

export default nextConfig;
```

```ts
// src/lib/dummy.ts - stub for emscripten's Node probe in the browser bundle
export default {};
```

### Client

```tsx
// src/app/rdkit-demo.tsx
"use client";

import { useEffect, useState } from "react";
import initRDKitModule from "@rdkit/rdkit";

const wasmUrl = new URL("RDKit_minimal.wasm", import.meta.url).href;

export default function RdkitDemo() {
  const [text, setText] = useState("Loading…");

  useEffect(() => {
    initRDKitModule({ locateFile: () => wasmUrl }).then((RDKit) => {
      const lines = [`RDKit version: ${RDKit.version()}`];
      const mol = RDKit.get_mol("CCO");
      if (!mol) {
        lines.push("Failed to parse SMILES");
      } else {
        lines.push(`SMILES: ${mol.get_smiles()}`);
        lines.push(`Atoms: ${mol.get_num_atoms()}`);
        lines.push(`MW: ${JSON.parse(mol.get_descriptors()).amw}`);
        mol.delete();
      }
      setText(lines.join("\n"));
    });
  }, []);

  return <pre>{text}</pre>;
}
```

Use it from `src/app/page.tsx` with `"use client"` content, or:

```tsx
import RdkitDemo from "./rdkit-demo";

export default function Home() {
  return <RdkitDemo />;
}
```

### Server (API route)

```ts
// src/app/api/rdkit/route.ts
import { NextResponse } from "next/server";
import initRDKitModule from "@rdkit/rdkit";

export async function GET() {
  const RDKit = await initRDKitModule();
  const mol = RDKit.get_mol("CCO");
  if (!mol) {
    return NextResponse.json(
      { error: "Failed to parse SMILES" },
      { status: 500 },
    );
  }

  const payload = {
    version: RDKit.version(),
    smiles: mol.get_smiles(),
    atoms: mol.get_num_atoms(),
    amw: JSON.parse(mol.get_descriptors()).amw,
  };
  mol.delete();

  return NextResponse.json(payload);
}
```
