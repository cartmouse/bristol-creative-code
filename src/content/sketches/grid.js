export const meta = {
	title: 'Grid',
	author: 'cartmouse'
};

export default function sketch(p) {
	const cols = 12;
	const rows = 8;
	let t = 0;

	const canvasSize = 1000;

	p.setup = () => {
		p.createCanvas(canvasSize, canvasSize);
		p.background(0, 0, 0, 0);
		p.noStroke();
	};

	p.draw = () => {
		p.clear();
		const cellW = p.width / cols;
		const cellH = p.height / rows;
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				const phase = t + (x + y) * 0.3;
				const size = (p.sin(phase) * 0.5 + 0.5) * p.min(cellW, cellH) * 0.7;
				p.fill(20);
				p.rect(x * cellW + (cellW - size) / 2, y * cellH + (cellH - size) / 2, size, size);
			}
		}
		t += 0.05;
	};
}
