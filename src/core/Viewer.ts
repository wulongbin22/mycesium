
import * as Cesium from "cesium";
export default class Viewer{
    viewer:Cesium.Viewer;
    scene:Cesium.Scene;
    build:Cesium.Cesium3DTileset;
    constructor(){

        // cesium默认资源路径
        (window as any).CESIUM_BASE_URL = "/";
        // 设置默认的视角为中国
          Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
        // 西边经度
        89.5,
        // 南边维度
        20.4,
        // 东边经度
        110.4,
        // 北边维度
        61.2
        );

        this.viewer = new Cesium.Viewer("cesiumContainer", {
            // 是否显示信息窗口
            // infoBox: false,
            // 是否创建动画
            animation: false,
            // 是否显示图层选择器
            baseLayerPicker: false,
            // 是否显示全屏按钮
            fullscreenButton: false,
            // 是否显示右上角的查询按钮
            geocoder: false,
            // 是否显示HOME按钮
            homeButton: false,
            // 是否显示场景控制按钮
            sceneModePicker: false,
            // 是否显示帮助按钮
            navigationHelpButton: false,
            // 是否显示时间轴
            timeline: false,
          });

          // 设置沙箱允许使用JS
      const iframe = document.getElementsByClassName("cesium-infoBox-iframe")[0];
      iframe.setAttribute(
        "sandbox",
        "allow-same-origin allow-scripts allow-popups allow-forms"
      );
      iframe.setAttribute("src", "");

          (this.viewer.cesiumWidget.creditContainer as any).style.display = "none";

          this.scene = this.viewer.scene;
    }

    createBuild(url:string){
          this.build = new Cesium.Cesium3DTileset({
            url:url,
          });
          this.scene.globe.depthTestAgainstTerrain = true;
          this.scene.primitives.add(  this.build);
          this.viewer.zoomTo(  this.build);
      
          return this.build.readyPromise.then((tileset) => {
              this.viewer.zoomTo(tileset);
              return tileset
          });
    }
}