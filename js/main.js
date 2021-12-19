/// <reference path='./vendor/babylon.d.ts' />

// Récupérer le canvas
const canvas = document.getElementById('renderCanvas');

// Créer un moteur BabylonJS
const engine = new BABYLON.Engine(canvas, true);

// Fonction pour créer une camera
function createCamera(scene) {
    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 15, BABYLON.Vector3.Zero(), scene);
    camera.radius = 25;

    // Permettre à l'utilisateur de bouger la caméra
    camera.attachControl(canvas);

    // Limiter les mouvements de la caméra
    camera.lowerRadiusLimit = 20;
    camera.upperRadiusLimit = 160;
}

// Fonction pour créer une lumière
function createLight(scene) {
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;
    light.groundColor = new BABYLON.Color3(0, 0, 1);
}

// Fonction pour créer le soleil
function createSun(scene) {
    const sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene);
    sunMaterial.emissiveTexture = new BABYLON.Texture('assets/images/sun.jpg', scene);
    sunMaterial.diffuseColor = BABYLON.Color3.Black();
    sunMaterial.specularColor = BABYLON.Color3.Black();

    const sun = BABYLON.MeshBuilder.CreateSphere('sun', {
        segments: 16,
        diameter: 12
    }, scene);
    sun.material = sunMaterial;

    // Créer la lumière du soleil
    const sunLight = new BABYLON.PointLight('sunLight', BABYLON.Vector3.Zero(), scene);
    sunLight.intensity = 2;
}

// Fonction pour créer une planète
function createPlanet(scene) {
    const planetMaterial = new BABYLON.StandardMaterial('planetMaterial', scene);
    planetMaterial.diffuseTexture = new BABYLON.Texture('assets/images/sand.png', scene);
    planetMaterial.specularColor = BABYLON.Color3.Black();

    const planetMaterial2 = new BABYLON.StandardMaterial('planetMaterial2', scene);
    planetMaterial2.diffuseTexture = new BABYLON.Texture('assets/images/brown_rock.png', scene);
    planetMaterial2.specularColor = BABYLON.Color3.Black();

    const planetMaterial3 = new BABYLON.StandardMaterial('planetMaterial3', scene);
    planetMaterial3.diffuseTexture = new BABYLON.Texture('assets/images/dark_rock.png', scene);
    planetMaterial3.specularColor = BABYLON.Color3.Black();

    const planetMaterial4 = new BABYLON.StandardMaterial('planetMaterial4', scene);
    planetMaterial4.diffuseTexture = new BABYLON.Texture('assets/images/ice.jpg', scene);
    planetMaterial4.specularColor = BABYLON.Color3.Black();

    const planetMaterial5 = new BABYLON.StandardMaterial('planetMaterial5', scene);
    planetMaterial5.diffuseTexture = new BABYLON.Texture('assets/images/water.jpg', scene);
    planetMaterial5.specularColor = BABYLON.Color3.Black();

    const planetMaterial6 = new BABYLON.StandardMaterial('planetMaterial6', scene);
    planetMaterial6.diffuseTexture = new BABYLON.Texture('assets/images/gaz.jpg', scene);
    planetMaterial6.specularColor = BABYLON.Color3.Black();

    const planetMaterial7 = new BABYLON.StandardMaterial('planetMaterial7', scene);
    planetMaterial7.diffuseTexture = new BABYLON.Texture('assets/images/lava.jpg', scene);
    planetMaterial7.specularColor = BABYLON.Color3.Black();

    const planetMaterial8 = new BABYLON.StandardMaterial('planetMaterial8', scene);
    planetMaterial8.diffuseTexture = new BABYLON.Texture('assets/images/wood.jpg', scene);
    planetMaterial8.specularColor = BABYLON.Color3.Black();

    const planetMaterials = [
        planetMaterial,
        planetMaterial2,
        planetMaterial3,
        planetMaterial4,
        planetMaterial5,
        planetMaterial6,
        planetMaterial7,
        planetMaterial8
    ];

    const speeds = [0.01, 0.009, 0.008, 0.007, 0.006, 0.005, 0.004, 0.003];
    for (let i = 0; i < 8; i++) {
        const planet = BABYLON.MeshBuilder.CreateSphere(`planet${i}`, {
            segments: 16,
            diameter: 4
        }, scene);
        planet.position.x = (8 * i) + 16;
        planet.material = planetMaterials[i];

        planet.orbit = {
            radius: planet.position.x,
            speed: speeds[i],
            angle: 0
        }

        scene.registerBeforeRender(() => {
            planet.position.x = planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z = planet.orbit.radius * Math.cos(planet.orbit.angle);
            planet.orbit.angle += planet.orbit.speed;
        });
    }
}

// Fonction pour créer une Skybox
function createSkybox(scene) {
    const skyboxMaterial = new BABYLON.StandardMaterial('skyboxMaterial', scene);
    skyboxMaterial.backFaceCulling = false;

    // Enlever la réflexion sur la Skybox
    skyboxMaterial.specularColor = BABYLON.Color3.Black();
    skyboxMaterial.diffuseColor = BABYLON.Color3.Black();

    // Texturer les 6 côtés de notre boite
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/images/skybox/skybox', scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    const skybox = BABYLON.MeshBuilder.CreateBox('skybox', { size: 1000 }, scene);
    // Bouger la skybox avec la camera
    skybox.infiniteDistance = true;

    skybox.material = skyboxMaterial;
}

// Fonction pour créer le vaisseau
function createShip(scene) {
    BABYLON.SceneLoader.ImportMesh('', 'assets/models/', 'spaceCraft1.obj', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.position = new BABYLON.Vector3(0, -5, 15);
            mesh.scaling = new BABYLON.Vector3(.1, .1, .1);
        });
    });
}

// Fonction pour créer une scène
function createScene() {
    // Créer une scène
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.Black();

    // Créer une camera
    createCamera(scene);

    // Créer une lumière
    createLight(scene);

    // Créer le soleil
    createSun(scene);

    // Créer une première planète
    createPlanet(scene);

    // Créer une Skybox
    createSkybox(scene);

    // Créer un vaisseau
    createShip(scene);

    return scene;
}

// Créer notre scène
const mainScene = createScene();

engine.runRenderLoop(() => {
    mainScene.render();
});