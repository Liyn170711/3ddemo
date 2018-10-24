var viewer = null; // 三维视图
var camera = null; // 三维视图相机
var scene = null; // 三维视图场景
var logging = null; // 提示log的dom 
var startDate = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16)); // 开始时间
var stopDate = null; // 结束时间
var flyingEntity = null; // 飞行实体
var trackArr = null; // 轨迹实体数组

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
        // terrainProvider: Cesium.createWorldTerrain()
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
    // viewer.scene.globe.depthTestAgainstTerrain = true;

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
    // var polyline = new DrawHelper.PolylinePrimitive({
    //     positions: positions,
    //     width: 5,
    //     geodesic: true
    // });
    // scene.primitives.add(polyline);
    // polyline.setEditable();
    // polyline.addListener('onEdited', function(event2) {
    //     loggingMessage('Polyline edited, ' + event2.positions.length + ' points');
    // });
    // 测试飞行漫游
    // testTravelPath(positions);
    /********************************实验点、线相连****************************** */
    var pinBuilder = new Cesium.PinBuilder(); // 构造针头工厂
    trackArr = new Array();
    var lineEntity = viewer.entities.add({
        name : 'Orange line with black outline at height and following the surface',
        polyline : {
            positions : positions,
            width : 5,
            material : new Cesium.PolylineOutlineMaterialProperty({
                color : Cesium.Color.ORANGE,
                // outlineWidth : 2,
                // outlineColor : Cesium.Color.BLACK,
            }),
            zIndex: 1001,
            clampToGround : true
        }
    });
    trackArr.push(lineEntity);
    for (let index = 0; index < positions.length; index++) { // 遍历位置数组
        let position = positions[index]; // 位置
        let text = 'point：' + (index+1); 
        var pointEntity = viewer.entities.add({
            position : position,
            point : {
                pixelSize : 5,
                color : Cesium.Color.RED,
                outlineColor : Cesium.Color.WHITE,
                outlineWidth : 2,
                zIndex: 1002
            },
            label : {
                text : text,
                font : '14pt monospace',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth : 2,
                verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                pixelOffset : new Cesium.Cartesian2(0, -9),
                zIndex: 1003
            }
        })
        trackArr.push(pointEntity);
        var pinEntity = viewer.entities.add({
            name : text,
            position : position,
            billboard : {
                image : pinBuilder.fromText((index+1), Cesium.Color.ROYALBLUE, 72).toDataURL(),
                verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                zIndex: 1001
            }
        });
        trackArr.push(pinEntity);
    }
    viewer.zoomTo(viewer.entities, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90)));
    testStreamLine(positions); // 测试流动的线效果
}

/**
 * 测试流动的线效果
 * positions 位置数组
 */
function testStreamLine (positions) {
    var animateTime = 5000; // 动画持续时间为5秒
    var start = 0; // 开始时间
    for (let i = 0; i < 9; i++) { // 遍历9次，颜色透明度递增的线
        var StreamLineEntity = viewer.entities.add({
            polyline : {
                positions : new Cesium.CallbackProperty((time, result) => {
                    var end = Cesium.JulianDate.toDate(time).getTime();
                    if (start == 0) {
                        start = end;
                    }
                    var index = ((end - start) % animateTime)/animateTime * positions.length; // index可能是小数，可根据情况进行取整
                    console.log("位置索引: ", index);
                    return positions.slice(index+i-1,index+i+1); // 选取临近的两点组成线段的位置
                }, false),
                width : 5,
                material : Cesium.Color.WHITE.withAlpha(0.1*i+0.1), // 设置颜色
                zIndex: 1005,
                clampToGround : true,
            }
        })
        trackArr.push(StreamLineEntity);
    }
}

/**
 * 清除线轨迹
 */
function clearPolylineTrack () {
    if (trackArr && trackArr.length > 0) {
        for (const entity of trackArr) { // 遍历轨迹实体数组
            viewer.entities.remove(entity); // 移除实体
        }
        trackArr = null;
    }
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

/**
 * 测试飞行漫游 
 * @param {*} positions Cartesian3坐标数组
 */
function testTravelPath (positions) {
    let seconds = 30 * (positions.length-2); // 飞行的总时间，秒数
    timeSettings(seconds); // 时间设置
    let property = new Cesium.SampledPositionProperty(); // 构造位置属性对象
    for (let index = 0; index < positions.length; index++) { // 遍历位置数组
        let time = Cesium.JulianDate.addSeconds(startDate, index*30, new Cesium.JulianDate()); // 时间
        let position = positions[index]; // 位置
        property.addSample(time, position); // 添加位置属性对象中
        viewer.entities.add({
            position : position,
            point : {
                pixelSize : 5,
                color : Cesium.Color.RED,
                outlineColor : Cesium.Color.WHITE,
                outlineWidth : 2
            }
        })
    }
    //Actually create the entity
    flyingEntity = viewer.entities.add({
        //Set the entity availability to the same interval as the simulation time.
        availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
            start : startDate,
            stop : stopDate
        })]),
        //Use our computed positions
        position : property,

        //Automatically compute orientation based on position movement.
        orientation : new Cesium.VelocityOrientationProperty(property),
        //Load the Cesium plane model to represent the entity
        model : {
            uri : '../../../SampleData/models/CesiumAir/Cesium_Air.gltf',
            minimumPixelSize : 64
        },
        //Show the path as a pink line sampled in 1 second increments.
        path : {
            resolution : 1,
            material : new Cesium.PolylineGlowMaterialProperty({
                glowPower : 0.1,
                color : Cesium.Color.BLUE
            }),
            width : 10
        }
    });
    viewTopDown(); // 视角设置为上帝视角
    // viewFlyingEntity(); // 视角设置为追踪飞行实体
    // viewSide(); // 视角设置为边界视角
}

/**
 * 时间设置
 * @param {*} seconds
 */
function timeSettings (seconds) {
    stopDate = Cesium.JulianDate.addSeconds(startDate, seconds, new Cesium.JulianDate()); // 设置飞行结束时间
    //Make sure viewer is at the desired time.（确保视图在指定的时间）
    viewer.clock.startTime = startDate.clone();
    viewer.clock.stopTime = stopDate.clone();
    viewer.clock.currentTime = startDate.clone();
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
    viewer.clock.multiplier = 10; // 设置时间变化量
    //Set timeline to simulation bounds
    // viewer.timeline.zoomTo(startDate, stopDate);
}

/**
 * 视角设置为上帝视角
 */
function viewTopDown () {
    viewer.trackedEntity = undefined;
    viewer.zoomTo(viewer.entities, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90)));
}

/**
 * track the entity as it moves 视角设置为追踪飞行实体
 */
function viewFlyingEntity () {
    viewer.trackedEntity = flyingEntity;
}

/**
 * view side 视角设置为边界视角 
 */
function viewSide () {
    viewer.trackedEntity = undefined;
    viewer.zoomTo(viewer.entities, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-90), Cesium.Math.toRadians(-15), 7500));
}
