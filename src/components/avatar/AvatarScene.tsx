import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const AvatarScene = () => {
  let mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let container = mountRef.current;
    if (!container) return;

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(15, 5, 20);
    camera.lookAt(scene.position);

    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientWidth);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 1, 0);
    scene.add(directionalLight);
    controls.update();

    // Create a simple geometric shape instead of loading external model
    let geometry = new THREE.BoxGeometry(2, 2, 2);
    let material = new THREE.MeshPhongMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.8
    });
    let cube = new THREE.Mesh(geometry, material);
    cube.name = "ThreeDeeObj";
    cube.position.set(0, 0, 0);
    scene.add(cube);

    let animate = function () {
      requestAnimationFrame(animate);

      let object = scene.getObjectByName('ThreeDeeObj');
      if (object) {
        object.rotation.y += 0.01;
      }

      // Rotate the ambientLight light around the scene
      ambientLight.position.x = 50 * Math.sin(Date.now() * 0.001);
      ambientLight.position.z = 50 * Math.cos(Date.now() * 0.001);
      ambientLight.position.y = 50 * Math.cos(Date.now() * 0.001);
      ambientLight.lookAt(0, 0, 0); // Keep the light pointing at the center

      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', function () {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }, false);

    return () => {
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="bg-transparent rounded-4">
      <div className="zoom" ref={mountRef}></div>
    </div>
  );
};