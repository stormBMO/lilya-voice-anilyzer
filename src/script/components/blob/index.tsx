import React from 'react'
import SimplexNoise from 'simplex-noise';
// @ts-ignore
import { spline } from '@georgedoescode/spline'


const Blob = ({ ready }: { ready: boolean }) => {
  // our <path> element
  const path = document.querySelector("path");
  // used to set our custom property values
  const root = document.documentElement;

  let hueNoiseOffset = 0;
  let noiseStep;
  if (ready) {
    noiseStep = 0.01
  } else {
    noiseStep = 0.003
  }

  const simplex = new SimplexNoise();

  const createPoints = () => {
    const points = [];
    // how many points do we need
    const numPoints = 6;
    // used to equally space each point around the circle
    const angleStep = (Math.PI * 2) / numPoints;
    // the radius of the circle
    const rad = 75;

    for (let i = 1; i <= numPoints; i++) {
      const theta = i * angleStep;

      const x = 100 + Math.cos(theta) * rad;
      const y = 100 + Math.sin(theta) * rad;

      points.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000
      });
    }

    return points;
  }

  const map = (n: number, start1: number, end1: number, start2: number, end2: number) => {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  }

  const noise = (x: number, y: number) => {
    return simplex.noise2D(x, y);
  }

  const points = createPoints();

  (function animate() {
    if (path) path.setAttribute("d", spline(points, 1, true));

    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
      const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
      const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
      const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

      point.x = x;
      point.y = y;

      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;
    }

    const hueNoise = noise(hueNoiseOffset, hueNoiseOffset);
    const hue = map(hueNoise, -1, 1, 0, 360);

    root.style.setProperty("--startColor", `hsl(${hue}, 100%, 75%)`);
    root.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`);
    document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`;

    hueNoiseOffset += noiseStep / 6;

    requestAnimationFrame(animate);
  })();




  return (
    <svg viewBox="0 0 200 200">
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop id="gradientStop1" offset="0%" stopColor="var(--startColor)" />
          <stop id="gradientStop2 " offset="100%" stopColor="var(--stopColor)" />
        </linearGradient>
      </defs>
      <path d="" fill="url('#gradient')"></path>
    </svg>
  )
}

export default React.memo(Blob)