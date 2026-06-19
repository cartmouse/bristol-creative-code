export const meta = {
	title: 'Circles',
	author: 'cartmouse'
};

export default function sketch(p) {
	const canvasSize = 1000;
	p.setup = () => {
		p.createCanvas(canvasSize, canvasSize);
		p.background(0, 0, 0, 0);
		p.noStroke();
	};

	p.draw = () => {
		p.fill(p.random(255), p.random(255), p.random(255), 60);
		p.circle(p.random(canvasSize), p.random(canvasSize), p.random(40, 120));
	};
}
