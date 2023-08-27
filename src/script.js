function draw(e) {
	const time = e * 0.01;
	const toCamera = input => {
		const v = input._;
		return v.multXY((v.z + 1000) * 0.001);
	};
	const stepSize = isPreviewEmbed() ? 10 : 6;
	const ringCount = isPreviewEmbed() ? 18 : 30;
	beginPath();
	for(let i = 0; i < ringCount; i++) {
		const ringTime = i / THIRD;
		const peakCount = (i + 1) * 4;
		const cir = peakCount * 30;
		const rad = cir / TAU;
		const pointCount = round(cir / stepSize);
		const iPointCount = 1 / pointCount;
		for(let j = 0; j < pointCount; j++) {
			const jt = j * iPointCount;
			const angle = jt * TAU;
			const v = Vector.fa(angle, rad);
			v.z = sin(time + angle * peakCount + ringTime) * 10;
			v.rotateYZ(QUARTER_PI);
			(j ? lineTo : moveTo)(toCamera(v));
		}
		closePath();
	}
	stroke(hsl(0, 0, 100));
}