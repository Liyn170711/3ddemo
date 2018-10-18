/**
 * html 创建完成执行方法
 */
function creationComplete () {
    initViewer(); //初始化三维视图
    testCartesian3(); // 
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
}

/**
 * 测试Cartesian3坐标运算
 */
function testCartesian3 () {
    testCartesian3Add(); // 测试Cartesian3坐标 add 运算（两坐标对应x、y、z分量相加）
    testCartesian3Cross(); // 测试Cartesian3坐标 cross 运算 （两坐标的交叉乘积）
    testCartesian3Distance(); // 测试Cartesian3坐标 distance 运算 （两坐标之间的距离）
    testCartesian3DistaneSquared(); // 测试Cartesian3坐标 distanceSquared 运算 （两坐标距离的平方）
    testCartesian3DivideByScalar(); // 测试Cartesian3坐标 divideByScalar 运算 （坐标除以标量）
    testCartesian3DivideComponents(); // 测试Cartesian3坐标 divideComponents 运算 （两坐标的各分量相除，坐标1除以坐标2）
    testCartesian3Dot(); // 测试Cartesian3坐标 dot 运算 （两坐标的点乘，各分量乘积的和）
    testCartesian3Magnitude(); // 测试Cartesian3坐标 magnitude 运算 （求坐标矢量的模，坐标各分量平方和开根号）
    testCartesian3MagnitudeSquared(); // 测试Cartesian3坐标 magnitudeSquared 运算 （求坐标矢量的模平方，坐标各分量平方和）
    testCartesian3Lerp(); // 测试Cartesian3坐标 lerp 运算 （两坐标的插值坐标）
    testCartesian3MaximumByComponent(); // 测试Cartesian3坐标 maximumByComponent 运算 （两坐标各分量坐标最大值组成的坐标）
    testCartesian3MaximumComponent(); // 测试Cartesian3坐标 maximumComponent 运算 （一个坐标的最大分量值）
    testCartesian3Midpoint(); // 测试Cartesian3坐标 midpoint 运算 （求两坐标组成线段的中心点坐标）
    testCartesian3MinimumByComponent(); // 测试Cartesian3坐标 minimumByComponent 运算 （两坐标各分量最小值组成的坐标）
    testCartesian3MinimumComponent(); // 测试Cartesian3坐标 minimumComponent 运算 （一个坐标的最小分量值）
    testCartesian3MostOrthogonalAxis(); // 测试Cartesian3坐标 mostOrthogonalAxis 运算 （一个坐标的最正交坐标轴的单位向量）
    testCartesian3MultiplyByScalar(); // 测试Cartesian3坐标 multiplyByScalar 运算 （坐标乘以标量）
    testCartesian3MultiplyComponents(); // 测试Cartesian3坐标 multiplyComponents 运算 （两坐标各分量相乘）
    testCartesian3Negate(); // 测试Cartesian3坐标 negate 运算 （一个坐标各分量相反数组成的新坐标）
    testCartesian3Normalize(); // 测试Cartesian3坐标 normalize 运算 （一个坐标单位化）
    testCartesian3ProjectVector(); // 测试Cartesian3坐标 projectVector 运算 （坐标1在坐标2上的投影坐标）
    testCartesian3Substract(); // 测试Cartesian3坐标 substract 运算 （坐标1各分量减去坐标2各分量）
}

/**
 * 测试Cartesian3坐标 add 运算
 * （对应x、y、z分量相加）
 */
function testCartesian3Add () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let carte3_add = new Cesium.Cartesian3(0,0,0);
    Cesium.Cartesian3.add(carte3_1, carte3_2, carte3_add); // 计算Cartesian3的和运算 （对应x、y、z分量相加）结果：(5, 7, 9)
    console.log("after add Cartesian3：", carte3_add.toString()); 

}
/**
 * 测试Cartesian3坐标 cross 运算
 * （计算Cartesian3的叉乘运算）
 */
function testCartesian3Cross () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let carte3_cross = new Cesium.Cartesian3(0,0,0);
    Cesium.Cartesian3.cross(carte3_1, carte3_2, carte3_cross); // 计算Cartesian3的叉乘运算 结果：(-3, 6, -3)
    console.log("after cross Cartesian3：", carte3_cross.toString()); 

}

/**
 * 测试Cartesian3坐标 distance 运算
 * （计算Cartesian3的距离）
 */
function testCartesian3Distance () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let distance = Cesium.Cartesian3.distance(carte3_1, carte3_2); // 计算Cartesian3的距离 结果：
    console.log("after distance Cartesian3, distance ：", distance); 

}

/**
 * 测试Cartesian3坐标 distanceSquared 运算
 * （计算Cartesian3的距离平方）
 */
function testCartesian3DistaneSquared () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let distance = Cesium.Cartesian3.distanceSquared(carte3_1, carte3_2); // 计算Cartesian3的距离平方 结果：27
    console.log("after distanceSquared Cartesian3, distance ：", distance); 
}

/**
 * 测试Cartesian3坐标 divideByScalar 运算
 * （计算Cartesian3除以一个标量）
 */
function testCartesian3DivideByScalar () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.divideByScalar(carte3_1, 2, result); // 计算Cartesian3除以一个标量，结果: (0.5, 1, 1.5)
    console.log("after divideByScalar Cartesian3, result ：", result); 
}

/**
 * 测试Cartesian3坐标 divideComponents 运算
 * （carte3_1与carte3_2对应分量相除）
 */
function testCartesian3DivideComponents () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.divideComponents(carte3_1, carte3_2, result); // carte3_1与carte3_2对应分量相除，结果: (0.25, 0.4, 0.5)
    console.log("after divideComponents Cartesian3, result ：", result); 
}

/**
 * 测试Cartesian3坐标 dot 运算
 * （内积即点乘：两向量对应分量的乘积相加）
 */
function testCartesian3Dot () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.dot(carte3_1, carte3_2, result); // carte3_1与carte3_2对应分量的乘积相加，结果: 32
    console.log("after dot Cartesian3, result ：", result); 
}

/**
 * 测试Cartesian3坐标 magnitude 运算
 * （向量的模）
 */
function testCartesian3Magnitude () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let result = Cesium.Cartesian3.magnitude(carte3_1); // 向量的模：向量各分量平方和开根号，结果: 根号14
    console.log("after magnitude Cartesian3, result ：", result); 
}

/**
 * 测试Cartesian3坐标 magnitudeSquared 运算
 * （向量的模的平方和）
 */
function testCartesian3MagnitudeSquared () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let result = Cesium.Cartesian3.magnitudeSquared(carte3_1); // 向量的模：向量各分量平方和，结果: 14
    console.log("after magnitudeSquared Cartesian3, result ：", result); 
}

/**
 * 测试Cartesian3坐标 lerp 运算
 * （计算两个向量的插值）
 */
function testCartesian3Lerp () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.lerp(carte3_1, carte3_2, -1, result); // 计算两个向量的插值:参数（起点向量，终点向量，距离:1是两个向量之间的距离，1时是(7, 8, 9)） 
    console.log("after lerp Cartesian3, result ：", result.toString()); 
}

/**
 * 测试Cartesian3坐标 maximumByComponent 运算
 * （获取两个三维笛卡尔坐标分量的最大值组成的坐标）
 */
function testCartesian3MaximumByComponent () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.maximumByComponent(carte3_1, carte3_2, result); // 获取两个三维笛卡尔坐标分量的最大值组成的坐标，结果：(4,5,6) 
    console.log("after maximumByComponent Cartesian3, result ：", result.toString()); 
}

/**
 * 测试Cartesian3坐标 maximumComponent 运算
 * （获取三维笛卡尔坐标分量的最大值）
 */
function testCartesian3MaximumComponent () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let result = Cesium.Cartesian3.maximumComponent(carte3_1); // 取三维笛卡尔坐标分量的最大值，结果：3 
    console.log("after maximumComponent Cartesian3, result ：", result); 
}

/**
 * 测试Cartesian3坐标 midpoint 运算
 * （获取两个三维笛卡尔坐标之间连线的中点坐标）
 */
function testCartesian3Midpoint () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.midpoint(carte3_1, carte3_2, result); // 获取两个三维笛卡尔坐标之间连线的中点坐标，结果：(2.5, 3.5, 4.5) 
    console.log("after midpoint Cartesian3, result ：", result.toString()); 
}

/**
 * 测试Cartesian3坐标 minimumByComponent 运算
 * （获取两个三维笛卡尔坐标分量的最大值组成的坐标）
 */
function testCartesian3MinimumByComponent () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.minimumByComponent(carte3_1, carte3_2, result); // 获取两个三维笛卡尔坐标分量的最小值组成的坐标，结果：(1,2,3) 
    console.log("after minimumByComponent Cartesian3, result ：", result.toString()); 
}

/**
 * 测试Cartesian3坐标 minimumComponent 运算
 * （获取三维笛卡尔坐标分量的最大值）
 */
function testCartesian3MinimumComponent () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let result = Cesium.Cartesian3.minimumComponent(carte3_1); // 取三维笛卡尔坐标分量的最小值，结果：1
    console.log("after minimumComponent Cartesian3, result ：", result); 
}

/**
 * 测试Cartesian3坐标 mostOrthogonalAxis 运算
 * （与三维笛卡尔坐标最正交坐标轴（单位向量））
 */
function testCartesian3MostOrthogonalAxis () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.mostOrthogonalAxis(carte3_1); // 计算与三维笛卡尔坐标最正交坐标轴（单位向量）
    console.log("after mostOrthogonalAxis Cartesian3, result ：", result.toString()); 
}

/**
 * 测试Cartesian3坐标 multiplyByScalar 运算
 * （三维笛卡尔坐标与标量的乘积）
 */
function testCartesian3MultiplyByScalar () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.multiplyByScalar(carte3_1, 2, result); // 三维笛卡尔坐标与标量的乘积，结果：(2, 4, 6)
    console.log("after multiplyByScalar Cartesian3, result ：", result.toString()); 
}

/**
 * 测试Cartesian3坐标 multiplyComponents 运算
 * （两个三维笛卡尔坐标各分量的乘积组成的新坐标）
 */
function testCartesian3MultiplyComponents () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(4,5,6);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.multiplyComponents(carte3_1, carte3_2, result); // 两个三维笛卡尔坐标各分量的乘积组成的新坐标，结果：(4,10,18)
    console.log("after multiplyComponents Cartesian3, result ：", result.toString()); 
}

/**
 * 测试Cartesian3坐标 negate 运算
 * （三维笛卡尔坐标各分量取相反数组成的新坐标）
 */
function testCartesian3Negate () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.negate(carte3_1, result); // 三维笛卡尔坐标各分量取相反数组成的新坐标，结果：(-1,-2,-3)
    console.log("after negate Cartesian3, result ：", result.toString()); 
}

/**
 * 测试Cartesian3坐标 normalize 运算
 * （三维笛卡尔坐标单位化（即各分量的平方和为1））
 */
function testCartesian3Normalize () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.normalize(carte3_1, result); // 三维笛卡尔坐标单位化（即各分量的平方和为1）
    console.log("after normalize Cartesian3, result ：", result.toString()); 
}

/**
 * 测试Cartesian3坐标 projectVector 运算
 * （计算三维坐标1在三维坐标2上的投影坐标）
 */
function testCartesian3ProjectVector () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(0,0,1);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.projectVector(carte3_1, carte3_2, result); // 计算三维坐标1在三维坐标2上的投影坐标，结果：(0,0,3)
    console.log("after projectVector Cartesian3, result ：", result.toString()); 
}

/**
 * 测试Cartesian3坐标 subtract 运算
 * （坐标1减去坐标2各分量组成的新坐标）
 */
function testCartesian3Substract () {
    let carte3_1 = new Cesium.Cartesian3(1,2,3);
    let carte3_2 = new Cesium.Cartesian3(0,0,1);
    let result = new Cesium.Cartesian3(0,0,0);
    result = Cesium.Cartesian3.subtract(carte3_1, carte3_2, result); // 坐标1减去坐标2各分量组成的新坐标，结果：(1,2,2)
    console.log("after subtract Cartesian3, result ：", result.toString()); 
}