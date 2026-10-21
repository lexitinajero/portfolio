import { useEffect, useState } from "react";

const W = 32;
const H = 19;
const GROUND = H - 1;

type Pose = { dx: number; dip: number; nod: number };

const dance: Pose[] = [
  { dx: 0, dip: 0, nod: 0 },
  { dx: 0, dip: 2, nod: 1 },
  { dx: 1, dip: 1, nod: 0 },
  { dx: 2, dip: 0, nod: -1 },
  { dx: 1, dip: 2, nod: 1 },
  { dx: 0, dip: 0, nod: 0 },
  { dx: -1, dip: 2, nod: 1 },
  { dx: -2, dip: 0, nod: -1 },
  { dx: -1, dip: 1, nod: 0 },
];

const colors = ["", "#ffffff", "#8a8a8a", "#111111"];

function line(grid: number[][], x0: number, y0: number, x1: number, y1: number, c: number) {
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
  for (let i = 0; i <= steps; i++) {
    const x = Math.round(x0 + ((x1 - x0) * i) / (steps || 1));
    const y = Math.round(y0 + ((y1 - y0) * i) / (steps || 1));
    if (grid[y]?.[x] !== undefined && grid[y][x] !== 1) grid[y][x] = c;
  }
}

function buildFrame({ dx, dip, nod }: Pose) {
  const grid = Array.from({ length: H }, () => Array<number>(W).fill(0));
  const left = 4 + dx;
  const top = 4 + dip;

  const hipY = top + 3;
  const knee = (hipX: number) => [hipX - 3 - (dip > 1 ? 1 : 0), hipY + Math.ceil((GROUND - hipY) * 0.45)];
  for (const [hipOffset, footX, c] of [
    [6, 10, 2], [3, 7, 1],
    [18, 22, 2], [15, 19, 1],
  ]) {
    const hipX = left + hipOffset;
    const [kx, ky] = knee(hipX);
    line(grid, hipX, hipY, kx, ky, c);
    line(grid, kx, ky, footX, GROUND, c);
    if (grid[GROUND][footX + 1] !== undefined) grid[GROUND][footX + 1] = c;
  }

  for (let y = top; y < top + 4; y++) {
    for (let x = left + 1; x < left + 21; x++) {
      const corner = (y === top || y === top + 3) && (x === left + 1 || x === left + 20);
      if (!corner) grid[y][x] = 1;
    }
  }

  grid[top - 1][left + 8] = 1;
  grid[top - 1][left + 13] = 1;
  for (let x = left + 8; x <= left + 13; x++) grid[top - 2][x] = 1;

  const headTop = top + 1 + Math.max(0, nod);
  for (let y = headTop; y < headTop + 4; y++) {
    for (let x = left + 21; x < left + 26; x++) {
      const corner = y === headTop + 3 && x === left + 25;
      if (!corner) grid[y][x] = 1;
    }
  }
  grid[headTop + 1][left + 23] = 3;
  grid[headTop + 2][left + 23] = 3;
  return grid;
}

const frames = dance.map(buildFrame);

export function SpotDance({ beats = 3, pixel = 4 }: { beats?: number; pixel?: number }) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [i, setI] = useState(0);
  const total = reduced ? 0 : frames.length * beats;

  useEffect(() => {
    if (i >= total) return;
    const t = setTimeout(() => setI((n) => n + 1), 160);
    return () => clearTimeout(t);
  }, [i, total]);

  const grid = frames[i % frames.length];
  return (
    <svg
      className="spot-dance"
      role="img"
      aria-label="a pixel Spot dancing"
      width={W * pixel}
      height={H * pixel}
      viewBox={`0 0 ${W} ${H}`}
      shapeRendering="crispEdges"
    >
      {grid.flatMap((row, y) =>
        row.map((c, x) => (c ? <rect key={`${x},${y}`} x={x} y={y} width={1} height={1} fill={colors[c]} /> : null)),
      )}
    </svg>
  );
}

