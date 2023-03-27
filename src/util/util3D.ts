//利用translation对模型的经度、纬度、高度进行修改

import * as Cesium from "cesium";
// export function translation(tileset,longitude, latitude, height)
// {
//         //3dtile模型的边界球体
//         var boundingSphere = tileset.boundingSphere;
//         //迪卡尔空间直角坐标=>地理坐标（弧度制）
//         var cartographic_original = Cesium.Cartographic.fromCartesian(boundingSphere.center);
//         //设置新的经度、纬度、高度
//         var cartographic_offset  = Cesium.Cartographic.fromDegrees(longitude, latitude, height)
//         //地理坐标（弧度制）=>迪卡尔空间直角坐标
//         var Cartesian3_original = Cesium.Cartesian3.fromRadians(cartographic_original.longitude, cartographic_original.latitude, cartographic_original.height);
//         var Cartesian3_offset  = Cesium.Cartesian3.fromRadians(cartographic_offset.longitude, cartographic_offset.latitude, cartographic_offset.height);
//         //获得地面和offset的转换
//         var translation = Cesium.Cartesian3.subtract(Cartesian3_offset, Cartesian3_original, new Cesium.Cartesian3());
//         //修改模型矩阵
//         tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
// }

export function changeHeight(tileset:any ,x,y,height) {
        height = Number(height);
        if (isNaN(height)) {
            return;
        }
        //记录原始坐标系
        if(tileset.$height===undefined){
                tileset.$center=Cesium.Cartesian3.clone(tileset.boundingSphere.center);
                const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
                tileset.$height=cartographic.height;
                tileset.$longitude=cartographic.longitude;
                tileset.$latitude=cartographic.latitude;
                tileset.$enuMatrix=Cesium.Transforms.eastNorthUpToFixedFrame(tileset.boundingSphere.center); 
        }

        const local_translation = new Cesium.Cartesian3(
                x,
                y,
                height
              );
              console.log(x,y,height)
        const result = Cesium.Matrix4.multiplyByPoint(
        tileset.$enuMatrix,
        local_translation,
        new Cesium.Cartesian3()
        ); // 转换矩阵左乘局部平移向量，结果存储在 result 中，结果是世界坐标下的平移终点向量

        const world_translation = Cesium.Cartesian3.subtract(
        result,
        tileset.$center,
        new Cesium.Cartesian3()
        ); // 向量相减，得到世界坐标下的平移向量

        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(world_translation); // 构造平移矩阵并赋值
}

export function showPosition(viewer:Cesium.Viewer){
        const entity:any = viewer.entities.add({
                label: {
                  show: false,
                  showBackground: true,
                  font: "14px monospace",
                  horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                  verticalOrigin: Cesium.VerticalOrigin.TOP,
                  pixelOffset: new Cesium.Cartesian2(15, 0),
                },
              });
          
              // Mouse over the globe to see the cartographic position
              
           const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
              handler.setInputAction(function (movement) {
                const cartesian = viewer.camera.pickEllipsoid(
                  movement.position,
                  viewer.scene.globe.ellipsoid
                );
                createPOI(viewer,cartesian)
                if (cartesian) {
                
                  const cartographic = Cesium.Cartographic.fromCartesian(
                    cartesian
                  );
                  const longitudeString = Cesium.Math.toDegrees(
                    cartographic.longitude
                  ).toFixed(2);
                  const latitudeString = Cesium.Math.toDegrees(
                    cartographic.latitude
                  ).toFixed(2);
                  console.log('>>',Cesium.Math.toDegrees(
                        cartographic.longitude
                      ),Cesium.Math.toDegrees(
                        cartographic.latitude
                      ))
          
                  entity.position = cartesian;
                  entity.label.show = true;
                  entity.label.text =
                    `Lon: ${`   ${longitudeString}`.slice(-7)}\u00B0` +
                    `\nLat: ${`   ${latitudeString}`.slice(-7)}\u00B0`;
                } else {
                  entity.label.show = false;
                }

              }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}


export function createPOI(viewer,pos){
        return viewer.entities.add({
        name: "Blank blue pin",
        position: pos,//Cesium.Cartesian3.fromDegrees(-75.170726, 39.9208667),
        billboard: {
                image: 'myAssets/icon.png',
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        },
        });

}