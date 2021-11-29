/// <reference path='./vendor/babylon.d.ts' />

// Récupérer le canvas
const canvas = document.getElementById('renderCanvas');

// Créer un moteur BabylonJS
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
    // Créer une scène
    const scene = new BABYLON.Scene(engine);

    // Créer une caméra
    // const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -5), scene);
    // const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 0, -5), scene);
    const camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(25, -25, -50), scene);
    camera.radius = 5;
    camera.attachControl(canvas, true);

    // Créer une lumière
    // const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    // const light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 5, 0), scene);
    const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(5, -1, 0), scene);

    // Créer une boîte
    const box = BABYLON.MeshBuilder.CreateBox('box', { size: 1 }, scene);
    box.rotation.x = 2;
    box.rotation.y = 3;

    camera.lockedTarget = box;

    // Créer une sphère
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
        segments: 32,
        diameter: 2
    }, scene);
    sphere.position = new BABYLON.Vector3(3, 0, 0);
    sphere.scaling = new BABYLON.Vector3(.5, .5, .5);

    // Créer un avion
    const plane = BABYLON.MeshBuilder.CreatePlane('plane', {}, scene);
    plane.position = new BABYLON.Vector3(-3, 0, 0);

    // Créer une ligne
    const points = [
        new BABYLON.Vector3(2, 0, 0),
        new BABYLON.Vector3(2, 1, 1),
        new BABYLON.Vector3(2, 1, 0),
    ];
    const lines = BABYLON.MeshBuilder.CreateLines('lines', { points }, scene);

    // Créer un matériaux
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    material.emissiveColor = new BABYLON.Color3(0, 1, 0);

    box.material = material;

    const material2 = new BABYLON.StandardMaterial('material2', scene);
    material2.diffuseTexture = new BABYLON.Texture('assets/images/dark_rock.png', scene);

    sphere.material = material2;

    return scene;
}

// Créer notre scène
const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});