// Sample points from brain image — bright pixels become 3D points

export function sampleBrainFromImage(
  imageData: ImageData,
  count: number
): Float32Array {
  const { width, height, data } = imageData;
  const positions = new Float32Array(count * 3);

  let placed = 0;
  let attempts = 0;

  while (placed < count && attempts < count * 50) {
    attempts++;

    const px = Math.floor(Math.random() * width);
    const py = Math.floor(Math.random() * height);
    const idx = (py * width + px) * 4;

    // Use brightness — the brain image has bright dots on dark background
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const brightness = (r + g + b) / 3;

    // Only place points where the image is bright enough
    if (brightness < 5) continue;

    // Brighter pixels = higher chance of placing a point
    const prob = brightness / 255;
    if (Math.random() > prob) continue;

    // Normalize to centered coordinates (-1 to 1)
    const x = (px / width) * 2 - 1;
    const y = -((py / height) * 2 - 1); // flip Y

    // Add subtle depth — slight random Z for 3D feel
    const depth = 0.15;
    const z = (Math.random() - 0.5) * depth;

    positions[placed * 3] = x * 1.8;
    positions[placed * 3 + 1] = y * 1.6;
    positions[placed * 3 + 2] = z;
    placed++;
  }

  return positions;
}
