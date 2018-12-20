var viewer = null; // 三维视图
var camera = null; // 三维视图相机
var scene = null; // 三维视图场景
var logging = null; // 提示log的dom 

/**
 * html 创建完成执行方法
 */
function creationComplete () {
    initViewer(); //初始化三维视图
    initDrawer(); // 初始化绘制工具
    logging = document.getElementById('logging'); // 实例提示的dom
}

/**
 * 初始化三维视图
 */
function initViewer()  {
    viewer = new Cesium.Viewer("cesiumer",{
        animation: false, // 动画控件，控制视图动画的播放速度
        timeline: false, // 时间线,指示当前时间，并允许用户跳到特定的时间
        infoBox: false, //Disable InfoBox widget
        selectionIndicator: false, //Disable selection indicator
        shouldAnimate: true, // Enable animations
        terrainProvider: Cesium.createWorldTerrain()
    }); // 初始化三维视图
    scene = viewer.scene; // 三维场景
    camera = viewer.camera; // 相机
    camera.flyTo({ // 设置相机位置角度
        destination: Cesium.Cartesian3.fromDegrees(108.0, 34.0, 100000),
        duration: 5,
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
    //Enable lighting based on sun/moon positions
    viewer.scene.globe.enableLighting = true;

    //Enable depth testing so things behind the terrain disappear.
    viewer.scene.globe.depthTestAgainstTerrain = true;

    //Set the random number seed for consistent results.
    Cesium.Math.setRandomNumberSeed(3);
}

/**
 * 初始化绘制工具
 */
function initDrawer () {
    // start the draw helper to enable shape creation and editing
    var drawHelper = new DrawHelper(viewer); // 构造会绘制工具
    var toolbar = drawHelper.addToolbar(document.getElementById("toolbar"), { // 添加绘制工具条
        buttons: ['marker', 'polyline', 'polygon', 'circle', 'extent'] // 按钮数组
    });
    toolbar.addListener('markerCreated', handleMarkerCreated); // 处理图标绘制完成
    toolbar.addListener('polylineCreated', handlePolylineCreated); // 处理线绘制完成
    toolbar.addListener('polygonCreated', handlePolygonCreated); // 处理多边形绘制完成
    toolbar.addListener('extentCreated', handleExtentCreated); // 处理矩形绘制完成
    toolbar.addListener('circleCreated', handleCircleCreated); // 处理圆形绘制完成
}

/**
 * 处理图标绘制完成
 * @param {*} event
 */
function handleMarkerCreated (event) {
    loggingMessage('Marker created at ' + event.position.toString());
    // create one common billboard collection for all billboards
    var b = new Cesium.BillboardCollection();
    scene.primitives.add(b);
    var billboard = b.add({
        show : true,
        position : event.position,
        pixelOffset : new Cesium.Cartesian2(0, 0),
        eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
        horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
        verticalOrigin : Cesium.VerticalOrigin.CENTER,
        scale : 1.0,
        image: './img/glyphicons_242_google_maps.png',
        color : new Cesium.Color(1.0, 1.0, 1.0, 1.0)
    });
    billboard.setEditable();
}

/**
 * 处理线绘制完成
 * @param {*} event
 */
function handlePolylineCreated (event) {
    var positions = event.positions;
    console.log('绘制的位置：', positions);
    loggingMessage('Polyline created with ' + positions.length + ' points');
    var polyline = new DrawHelper.PolylinePrimitive({
        positions: positions,
        width: 5,
        geodesic: true
    });
    scene.primitives.add(polyline);
    polyline.setEditable();
    polyline.addListener('onEdited', function(event2) {
        loggingMessage('Polyline edited, ' + event2.positions.length + ' points');
    });
}

/**
 * 处理多边形绘制完成
 * @param {*} event
 */
function handlePolygonCreated (event) {
    loggingMessage('Polygon created with ' + event.positions.length + ' points');
    var polygon = new DrawHelper.PolygonPrimitive({
        positions: event.positions,
        material : Cesium.Material.fromType('Checkerboard')
    });
    scene.primitives.add(polygon);
    polygon.setEditable();
    polygon.addListener('onEdited', function(event) {
        loggingMessage('Polygon edited, ' + event.positions.length + ' points');
    });
}

/**
 * 处理矩形绘制完成
 * @param {*} event
 */
function handleExtentCreated (event) {
    var extent = event.extent;
    loggingMessage('Extent created (N: ' + extent.north.toFixed(3) + ', E: ' + extent.east.toFixed(3) + ', S: ' + extent.south.toFixed(3) + ', W: ' + extent.west.toFixed(3) + ')');
    var extentPrimitive = new DrawHelper.ExtentPrimitive({
        extent: extent,
        material: Cesium.Material.fromType(Cesium.Material.StripeType)
    });
    scene.primitives.add(extentPrimitive);
    extentPrimitive.setEditable();
    extentPrimitive.addListener('onEdited', function(event) {
        loggingMessage('Extent edited: extent is (N: ' + event.extent.north.toFixed(3) + ', E: ' + event.extent.east.toFixed(3) + ', S: ' + event.extent.south.toFixed(3) + ', W: ' + event.extent.west.toFixed(3) + ')');
    });
}

/**
 * 处理圆绘制完成
 * @param {*} event
 */
function handleCircleCreated (event) {
    loggingMessage('Circle created: center is ' + event.center.toString() + ' and radius is ' + event.radius.toFixed(1) + ' meters');
    var circle = new DrawHelper.CirclePrimitive({
        center: event.center,
        radius: event.radius,
        material: Cesium.Material.fromType(Cesium.Material.RimLightingType)
    });
    scene.primitives.add(circle);
    circle.setEditable();
    circle.addListener('onEdited', function(event) {
        loggingMessage('Circle edited: radius is ' + event.radius.toFixed(1) + ' meters');
    });
}

/**
 * 输出位置信息
 * @param {*} message 信息
 */
function loggingMessage(message) {
    logging.innerHTML = message;
}