export interface WrappedLine {
  text: string;
  x: number;
  y: number;
}

export const wrapText = (
  ctx: CanvasRenderingContext2D | undefined | null,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): WrappedLine[] => {
  if (!ctx) return [];

  const words: string[] = text.split(' ');
  let line = '';
  let testLine = '';
  const lineArray: WrappedLine[] = [];

  for (let n = 0; n < words.length; n++) {
    testLine += `${words[n]} `;

    const testWidth = ctx.measureText(testLine).width;

    console.log('testWidth', testWidth);

    if (testWidth > maxWidth && n > 0) {
      lineArray.push({ text: line, x, y });
      y += lineHeight;
      line = `${words[n]} `;
      testLine = `${words[n]} `;
    } else {
      line += `${words[n]} `;
    }

    if (n === words.length - 1) {
      lineArray.push({ text: line, x, y });
    }
  }

  return lineArray;
};

export default wrapText;
