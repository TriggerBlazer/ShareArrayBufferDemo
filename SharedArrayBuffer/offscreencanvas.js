import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/build/three.module.js';

const state = {
	width: 300, // canvas default
	height: 150, // canvas default
};

const mainGroup = new THREE.Group();

function main(data) {

	const { canvas } = data;
	const renderer = new THREE.WebGLRenderer({ canvas });

	state.width = canvas.width;
	state.height = canvas.height;

	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 1;
	const far = 1000;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 600;

	const scene = new THREE.Scene();


	{
		const intensity = 1;
		const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
		light.position.set(- 1, 2, 4);
		const light2 = new THREE.DirectionalLight(0xFFFFFF, intensity);
		light2.position.set(2, 2, 2);
		scene.add(light);
		scene.add(light2);

	}

	scene.add(mainGroup);


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

		renderer.render(scene, camera);

		requestAnimationFrame(render);

	}

	requestAnimationFrame(render);

}


function dataBuffer(data) {
	const positions = data.buffer.positions;
	const colors = data.buffer.colors;

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
	geometry.computeVertexNormals();
	const material = new THREE.MeshPhongMaterial({ color: 0xFF45FF, side: THREE.DoubleSide });
	const mesh = new THREE.Mesh(geometry, material);
	mainGroup.add(mesh);
}

function updatePosition(data) {
	mainGroup.children[0].geometry.attributes.position.needsUpdate = true;
}



function size(data) {

	state.width = data.width;
	state.height = data.height;

}

const handlers = {
	main,
	size,
	dataBuffer,
	updatePosition
};

self.onmessage = function (e) {

	const fn = handlers[e.data.type];
	if (typeof fn !== 'function') {

		throw new Error('no handler for type: ' + e.data.type);

	}

	fn(e.data);

};
