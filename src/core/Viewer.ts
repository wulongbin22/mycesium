
import * as Cesium from "cesium";
import { useCesium } from '@gvol-org/daassdk.cesium';
(window as any).Cesium =Cesium

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

          console.log("this.viewer",this.viewer.imageryLayers);

          // 设置沙箱允许使用JS
      const iframe = document.getElementsByClassName("cesium-infoBox-iframe")[0];
      iframe.setAttribute(
        "sandbox",
        "allow-same-origin allow-scripts allow-popups allow-forms"
      );
      iframe.setAttribute("src", "");
      (iframe as any).value = '';
      (this.viewer.cesiumWidget.creditContainer as any).style.display = "none";
      this.scene = this.viewer.scene;

    //   this.viewer.imageryLayers.remove(this.viewer.imageryLayers.get(0))
    //   this.viewer.imageryLayers.addImageryProvider(
    //     new Cesium.WebMapTileServiceImageryProvider(
    //       {
    //         url: 'http://{s}.tianditu.gov.cn/img_w/wmts?tk=589d716f51345fac17b7942ab3eb62e5',
    //         layer:'img',
    //         style:'default',
    //         tileMatrixSetID:'w',
    //         subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
    //         format:'tiles',
    //         maximumLevel: 18}
    //     //   {
    //     //     //影像底图
    //     //     url:
    //     //         'http://t0.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk='+'589d716f51345fac17b7942ab3eb62e5',
    //     //     // subdomains: subdomains,//URL模板中用于{s}占位符的子域。如果该参数是单个字符串，则字符串中的每个字符都是一个子域。如果它是一个数组，数组中的每个元素都是一个子域
    //     //     layer: "tdtAnnoLayer",
    //     //     style: 'default',
    //     //     format: "image/jpeg",
    //     //     // subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
    //     //     tileMatrixSetID: 'w', //使用谷歌的瓦片切片方式
    //     //     show: true
    //     // } as any
    //     )
    // );
    // return;

      const instance = useCesium(this.viewer);
    
      //添加星图图层
      instance.addLayer({
          name: 'yingxiang',
          index: 0,
          baseUrl: "https://tiles1.geovisearth.com/base/v1/img/{z}/{x}/{y}",
          tmsIds: "w",
          visible:true,
          format:'webp',
          token: "bf78bb0fe9bf35f87c6d4c9b4ac4a3a69fbccb87f90712777936e9a662c9718e",
          minimumLevel: 0,
          maximumLevel: 18,
      } as any);

    }

    createBuild(url:string){
          this.build = new Cesium.Cesium3DTileset({
            url:url,
          });
          this.scene.globe.depthTestAgainstTerrain = true;
          this.scene.primitives.add(  this.build);
          this.viewer.zoomTo(  this.build);
      
          return this.build.readyPromise.then((tileset) => {
            // document.activeElement()
              setTimeout(()=>{this.viewer.zoomTo(tileset)},100);
              // tileset.style = new Cesium.Cesium3DTileStyle({
              //   color: "rgba(255, 0, 0, 0.5)",
              // });
              return tileset
          });
    }

    // changeMapLayer(data){
    //   this.viewer.imageryLayers.removeAll();
    //   this.viewer.imageryLayers.add()
    // }
}