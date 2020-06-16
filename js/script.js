window.onload = function() {
	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	context.beginPath();
	context.rect(0, 0, context.width / 2, context.height / 3);
	context.stroke();

	var tracker = new tracking.ObjectTracker('face');
	tracker.setInitialScale(4);
	tracker.setStepSize(2);
	tracker.setEdgesDensity(0.1);

	var synth = new Tone.Synth().toMaster();

	tracking.track('#video', tracker, { camera: true });

	tracker.on('track', function(event) {
		context.clearRect(0, 0, canvas.width, canvas.height);

		event.data.forEach(function(rect) {
			context.fillStyle = '#FF0000';
			context.fillRect(20, 20, 80, 80);

			context.fillStyle = '#FFA500';
			context.fillRect(210, 20, 80, 80);

			context.fillStyle = '#0000FF';
			context.fillRect(20, 150, 80, 80);

			context.fillStyle = '#a64ceb';
			context.fillRect(210, 150, 80, 80);

			if (rect.x + rect.width / 2 < 100) {
				if (rect.y + rect.height / 2 < canvas.height / 2) {
					context.strokeStyle = '#FF0000';
					synth.triggerAttackRelease('B4', 0.5);
				} else {
					synth.triggerAttackRelease('C4', 0.5);
					context.strokeStyle = '#0000FF';
				}
			} else if (rect.x + rect.width / 2 > 150) {
				if (rect.y + rect.height / 2 > canvas.height / 2) {
					context.strokeStyle = '#a64ceb';
					synth.triggerAttackRelease('G4', 0.5);
				} else {
					context.strokeStyle = '#FFA500';
					synth.triggerAttackRelease('E4', 0.5);
				}
			} else {
				context.strokeStyle = '#FFF';
			}

			context.strokeRect(rect.x, rect.y, rect.width, rect.height);
			context.font = '11px Helvetica';
			context.fillStyle = '#fff';
			context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
			context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
		});
	});
};
