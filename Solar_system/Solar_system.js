window.onload =

    function(){

   //Cameras and WebGl renderer
    let OnCamera;
    const scene = new THREE.Scene();
    const FrontCamera = new THREE.PerspectiveCamera( 29, window.innerWidth / window.innerHeight, 1, 10000 );
    const UpperCamera = new THREE.PerspectiveCamera( 52, window.innerWidth / window.innerHeight, 1, 10000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    FrontCamera.position.set( 0, 0, 600);
    UpperCamera.position.set( 0, 100, 390);
    UpperCamera.lookAt(new THREE.Vector3( 0, -25, 0));

    //Audio settings (Per abilitare l'audio serve fornire a mano se si usa chrome i privilegi dalle impostazioni, io ho dovuto far così...
    const listener = new THREE.AudioListener();
    UpperCamera.add( listener );

    const sound = new THREE.Audio( listener );

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'templates/interstellar.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.9 );
        sound.play();
    });

    //Stars settings
    const star_geometry = new THREE.BufferGeometry();
    const star_material = new THREE.PointsMaterial({color:0xffffff});
    const stars = new THREE.Points(star_geometry,star_material);
    const starsV = [];
    for (let i=0; i < 10000; i++){
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 500;
        starsV.push(x,y,z);
    }

    star_geometry.setAttribute('position', new THREE.Float32BufferAttribute(starsV,3));

    scene.add(stars);

    //Sun's settings
    var sun_geometry = new THREE.SphereGeometry(30, 40, 15);
    var sun_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/sun.jpg')});
    var sun = new THREE.Mesh(sun_geometry, sun_material);
    sun.matrixAutoUpdate = false;

    scene.add(sun);

    //Mercury's settings
    var mercury_geometry = new THREE.SphereGeometry(4, 40, 15);
    var mercury_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/mars.jpg')});
    var mercury = new THREE.Mesh(mercury_geometry, mercury_material);
    mercury.matrixAutoUpdate = false;
    mercury.castShadow = true;
    sun.add(mercury);

    //Venus's settings
    var venus_geometry = new THREE.SphereGeometry(5, 40, 15);
    var venus_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/venus.jpg')});
    var venus = new THREE.Mesh(venus_geometry, venus_material);
    venus.matrixAutoUpdate = false;
    venus.receiveShadow = true;
    venus.castShadow = true;
    sun.add(venus);

    //Earth's settings
    var earth_geometry =  new THREE.SphereGeometry(7, 30, 15);
    var earth_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/earth.jpg')});
    var earth = new THREE.Mesh(earth_geometry, earth_material);
    earth.phiStart = 23.0
    earth.receiveShadow = true;
    earth.matrixAutoUpdate = false;
    sun.add(earth)

    //Moon's settings
    var moon_geometry =  new THREE.SphereGeometry(2.5, 30, 15);
    var moon_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/moon.jpg')});
    var moon = new THREE.Mesh(moon_geometry, moon_material);
    moon.matrixAutoUpdate = false;
    moon.castShadow = true;
    earth.add(moon);

    //Mars's settings
    var mars_geometry =  new THREE.SphereGeometry(6, 30, 15);
    var mars_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/mars.jpg')});
    var mars = new THREE.Mesh(mars_geometry, mars_material);
    mars.matrixAutoUpdate = false;
    mars.receiveShadow = true;
    mars.castShadow = true;
    sun.add(mars);

    //Jupiter's settings
    var jupiter_geometry =  new THREE.SphereGeometry(10, 30, 15);
    var jupiter_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/jupiter.jpg')});
    var jupiter = new THREE.Mesh(jupiter_geometry, jupiter_material);
    jupiter.matrixAutoUpdate = false;
    jupiter.receiveShadow = true;
    jupiter.castShadow = true;
    sun.add(jupiter);

    //Jupiter's sat settings
    var satellar_geometry =  new THREE.SphereGeometry(3.5, 30, 15);
    var satellar_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/satellar.jpg')});
    var satellar = new THREE.Mesh(satellar_geometry, satellar_material);
    satellar.matrixAutoUpdate = false;
    satellar.castShadow = true;
    jupiter.add(satellar);

    //Saturn's settings
    var saturn_geometry =  new THREE.SphereGeometry(10.5, 30, 15);
    var saturn_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/saturn.jpg')});
    var saturn = new THREE.Mesh(saturn_geometry, saturn_material);
    saturn.receiveShadow = true;
    saturn.castShadow = true;
    saturn.matrixAutoUpdate = false;
    sun.add(saturn);
    var saturn_ring_geometry = new THREE.RingGeometry( 12, 19, 50, 22 , 60.0);
    var saturn_ring_material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('templates/rings.png'), side: THREE.DoubleSide} );
    var saturn_ring = new THREE.Mesh( saturn_ring_geometry, saturn_ring_material );
    saturn_ring.receiveShadow = true;
    saturn_ring.rotation.x = + 46;
    saturn.add(saturn_ring);

    //Uranus's settings
    var uranus_geometry =  new THREE.SphereGeometry(8, 30, 15);
    var uranus_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/uranus.jpg')});
    var uranus = new THREE.Mesh(uranus_geometry, uranus_material);
    uranus.receiveShadow = true;
    uranus.castShadow = true;
    uranus.matrixAutoUpdate = false;
    sun.add(uranus);
    var uranus_ring_geometry = new THREE.RingGeometry( 9.5, 13, 50, 22 , 60.0);
    var uranus_ring_material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('templates/uranus_ring.png'), side: THREE.DoubleSide} );
    var uranus_ring = new THREE.Mesh( uranus_ring_geometry, uranus_ring_material );
    uranus.add(uranus_ring);

    //Neptune's settings
    var neptune_geometry =  new THREE.SphereGeometry(8, 30, 15);
    var neptune_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('templates/neptune.jpg')});
    var neptune = new THREE.Mesh(neptune_geometry, neptune_material);
    neptune.matrixAutoUpdate = false;
    neptune.receiveShadow = true;
    scene.add(neptune);

    //Mercury's orbit
    var orbit1_geometry = new THREE.RingGeometry( 44.5, 45.5, 100);
    var orbit1_material = new THREE.MeshBasicMaterial( { color: 0x404040} );
    var orbit1 = new THREE.Mesh( orbit1_geometry,orbit1_material );
    orbit1.rotation.x = THREE.Math.degToRad(-90);
    scene.add(orbit1);

    //Venus's orbit
    var orbit2_geometry = new THREE.RingGeometry( 64.5, 65.5, 100);
    var orbit2_material = new THREE.MeshBasicMaterial( { color: 0x404040} );
    var orbit2 = new THREE.Mesh( orbit2_geometry,orbit2_material );
    orbit2.rotation.x = THREE.Math.degToRad(-90);
    scene.add(orbit2);

    //Earth's orbit
    var orbit3_geometry = new THREE.RingGeometry( 89.5, 90.5, 100);
    var orbit3_material = new THREE.MeshBasicMaterial( { color: 0x404040} );
    var orbit3 = new THREE.Mesh( orbit3_geometry,orbit3_material );
    orbit3.rotation.x = THREE.Math.degToRad(-90);
    scene.add(orbit3);

    //Moon's orbit
    var orbit3_1_geometry = new THREE.RingGeometry( 12.5, 13.5, 100);
    var orbit3_1_material = new THREE.MeshBasicMaterial( { color: 0x404040} );
    var orbit3_1 = new THREE.Mesh( orbit3_1_geometry,orbit3_1_material );
    orbit3_1.rotation.x = THREE.Math.degToRad(-90);
    earth.add(orbit3_1);

    //Mars's orbit
    var orbit4_geometry = new THREE.RingGeometry( 124.5, 125.5, 100);
    var orbit4_material = new THREE.MeshBasicMaterial( { color: 0x404040} );
    var orbit4 = new THREE.Mesh( orbit4_geometry,orbit4_material );
    orbit4.rotation.x = THREE.Math.degToRad(-90);
    scene.add(orbit4);

    //Jupiter's orbit
    var orbit5_geometry = new THREE.RingGeometry( 159.5, 160.5, 100);
    var orbit5_material = new THREE.MeshBasicMaterial( { color: 0x404040} );
    var orbit5 = new THREE.Mesh( orbit5_geometry,orbit5_material );
    orbit5.rotation.x = THREE.Math.degToRad(-90);
    scene.add(orbit5);

    //Jupiter's sat orbit
    var orbit5_1_geometry = new THREE.RingGeometry( 19.5, 20.5, 100);
    var orbit5_1_material = new THREE.MeshBasicMaterial( { color: 0x404040} );
    var orbit5_1 = new THREE.Mesh( orbit5_1_geometry,orbit5_1_material );
    orbit5_1.rotation.x = THREE.Math.degToRad(-90);
    jupiter.add(orbit5_1);

    //Saturn's orbit
    var orbit6_geometry = new THREE.RingGeometry( 204.5, 205.5, 100);
    var orbit6_material = new THREE.MeshBasicMaterial( { color: 0x404040} );
    var orbit6 = new THREE.Mesh( orbit6_geometry,orbit6_material );
    orbit6.rotation.x = THREE.Math.degToRad(-90);
    scene.add(orbit6);

    //Uranus's orbit
    var orbit7_geometry = new THREE.RingGeometry( 239.5, 240.5, 100);
    var orbit7_material = new THREE.MeshBasicMaterial( { color: 0x404040} );
    var orbit7 = new THREE.Mesh( orbit7_geometry,orbit7_material );
    orbit7.rotation.x = THREE.Math.degToRad(-90);
    scene.add(orbit7);

    //Neptune's orbit
    var orbit8_geometry = new THREE.RingGeometry( 274.5, 275.5, 100);
    var orbit8_material = new THREE.MeshBasicMaterial( { color: 0x404040} );
    var orbit8 = new THREE.Mesh( orbit8_geometry,orbit8_material );
    orbit8.rotation.x = THREE.Math.degToRad(-90);
    scene.add(orbit8);

    //Illuminations
    const sunlight = new THREE.PointLight( 0x404040, 10, 1000 );
    sunlight.position.set( 0, 0, 0 );
    const light1 = new THREE.PointLight( 0x404040, 6, 70 );
    light1.position.set( 50, 0, 0 );
    const light2 = new THREE.PointLight( 0x404040, 6, 70 );
    light2.position.set( -50, 0, 0 );
    const light3 = new THREE.PointLight( 0x404040, 6, 70 );
    light3.position.set( 0, 40,  60);
    const light4 = new THREE.PointLight( 0x404040, 6, 70 );
    light4.position.set( 0, -40, 60);

    const lightamb = new THREE.AmbientLight( 0x404040 );
    lightamb.position.set( 0, 0, 10).normalize();

    scene.add( lightamb );
    scene.add( sunlight );
    scene.add( light1 );
    scene.add( light2 );
    scene.add( light3 );
    scene.add( light4 );

    //Resize window event
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        FrontCamera.aspect = window.innerWidth / window.innerHeight
        FrontCamera.updateProjectionMatrix()
        UpperCamera.aspect = window.innerWidth / window.innerHeight
        UpperCamera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render_scene();
    }

    //Key press event
    document.addEventListener( 'keydown', onKeyDown );
    function onKeyDown( event ) {

        switch ( event.keyCode ) {

            case 70: /*F*/

                OnCamera = FrontCamera;
                break;

            case 85: /*U*/

                OnCamera = UpperCamera;
                break;
        }
    }

    //Rendering e animazioni

    function animate(){

        requestAnimationFrame(animate)

        render_scene()

    }

    var render_scene = function(){

        var now = Date.now()
        render_scene.time = now;

        var rot_sun = new THREE.Matrix4().makeRotationY(0.00005*now);
        var rot_saturn = new THREE.Matrix4().makeRotationY(0.00025*now);
        var rot_jupiter = new THREE.Matrix4().makeRotationY(0.00024*now);
        var rot_mars = new THREE.Matrix4().makeRotationY(0.00045*now);
        var rot_earth = new THREE.Matrix4().makeRotationY(0.00037*now);
        var rot_moon = new THREE.Matrix4().makeRotationY(0.001*now);
        var rot_mercury = new THREE.Matrix4().makeRotationY(0.00067*now);
        var rot_venus = new THREE.Matrix4().makeRotationY(0.00055*now);
        var rot_satellar = new THREE.Matrix4().makeRotationY(0.001*now);
        var rot_uranus = new THREE.Matrix4().makeRotationY(0.00022*now);
        var rot_neptune = new THREE.Matrix4().makeRotationY(0.00025*now);

        var tras_sun = new THREE.Matrix4().makeTranslation(0, 0, 0);
        var tras_mercury = new THREE.Matrix4().makeTranslation(45, 0, 0);
        var tras_venus = new THREE.Matrix4().makeTranslation(65, 0, 0);
        var tras_earth = new THREE.Matrix4().makeTranslation(90, 0, 0);
        var tras_moon = new THREE.Matrix4().makeTranslation(13, 0, 0);
        var tras_mars = new THREE.Matrix4().makeTranslation(125, 0, 0);
        var tras_jupiter = new THREE.Matrix4().makeTranslation(160, 0, 0);
        var tras_satellar = new THREE.Matrix4().makeTranslation(20, 0, 0);
        var tras_saturn = new THREE.Matrix4().makeTranslation(205, 0, 0);
        var tras_uranus = new THREE.Matrix4().makeTranslation(240, 0, 0);
        var tras_neptune = new THREE.Matrix4().makeTranslation(275, 0, 0);

        //displacement and rotation planets
        sun.matrix = tras_sun.multiply(rot_sun);
        saturn.matrix = tras_saturn.multiply(rot_saturn);
        saturn.matrix = rot_saturn.multiply(tras_saturn);
        jupiter.matrix = tras_jupiter.multiply(rot_jupiter);
        jupiter.matrix = rot_jupiter.multiply(tras_jupiter);
        mars.matrix = tras_mars.multiply(rot_mars);
        mars.matrix = rot_mars.multiply(tras_mars);
        venus.matrix = tras_venus.multiply(rot_venus);
        venus.matrix = rot_venus.multiply(tras_venus);
        mercury.matrix = tras_mercury.multiply(rot_mercury);
        mercury.matrix = rot_mercury.multiply(tras_mercury);
        earth.matrix = tras_earth.multiply(rot_earth);
        earth.matrix = rot_earth.multiply(tras_earth);
        moon.matrix = rot_moon.multiply(tras_moon);
        satellar.matrix = rot_satellar.multiply(tras_satellar);
        uranus.matrix = rot_uranus.multiply(tras_uranus);
        neptune.matrix = rot_neptune.multiply(tras_neptune);


        if ( OnCamera == UpperCamera ) {
            renderer.render(scene, UpperCamera);
        }
        else if (OnCamera == FrontCamera)
            renderer.render(scene, FrontCamera);
        else {
            renderer.render(scene, UpperCamera);
        }

    }
    animate();

}















