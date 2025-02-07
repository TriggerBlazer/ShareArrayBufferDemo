import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/build/three.module.js';

const state = {
	width: 300, // canvas default
	height: 150, // canvas default
};

function main(data) {

	const { canvas } = data;
	const renderer = new THREE.WebGLRenderer({ canvas });

	state.width = canvas.width;
	state.height = canvas.height;

	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 4;

	const scene = new THREE.Scene();
	const colors = [0xFFFFFF, 0xFFFF00, 0xFF45FF, 0x00FFFF, 0x4447FF, 0xFFFF45, 0xFF00FF, 0x44aa88, 0x8844aa, 0xaa8844];


	{
		const intensity = 1;
		const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
		light.position.set(- 1, 2, 4);
		const light2 = new THREE.DirectionalLight(0xFFFFFF, intensity);
		light2.position.set(2, 2, 2);
		scene.add(light);
		scene.add(light2);

	}

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth, 100, 10);

	function makeInstance(geometry, color, x) {

		const material = new THREE.MeshPhysicalMaterial({
			color: color,
			roughness: Math.random(),
			metalness: Math.random(),
		});

		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		cube.position.x = x;

		return cube;

	}

	let cubes = [];
	for (let index = 0; index < 5000; index++) {
		cubes.push(makeInstance(geometry, colors[index % 10], 0, index))
		cubes.push(makeInstance(geometry, colors[(index + 1) % 10], - 2, index))
		cubes.push(makeInstance(geometry, colors[(index + 2) % 10], 2, index))
	}


	function resizeRendererToDisplaySize(renderer) {

		const canvas = renderer.domElement;
		const width = state.width;
		const height = state.height;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {

			renderer.setSize(width, height, false);

		}

		return needResize;

	}

	function render(time) {

		time *= 0.001;

		if (resizeRendererToDisplaySize(renderer)) {

			camera.aspect = state.width / state.height;
			camera.updateProjectionMatrix();

		}

		cubes.forEach((cube, ndx) => {

			const speed = 1 + ndx * .1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;

		});

		renderer.render(scene, camera);

		requestAnimationFrame(render);

	}

	requestAnimationFrame(render);

}

function size(data) {

	state.width = data.width;
	state.height = data.height;

}

const handlers = {
	main,
	size,
};

self.onmessage = function (e) {

	const fn = handlers[e.data.type];
	if (typeof fn !== 'function') {

		throw new Error('no handler for type: ' + e.data.type);

	}

	fn(e.data);

};
