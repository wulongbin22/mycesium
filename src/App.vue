<template>
    <div>
      <div id="cesiumContainer" ref="cesiumContainer">
          
      </div>
      <div id="cesiumUI">
        <div class="sliderUI">
            <span class="label">offX:</span>
            <a-slider class="slider" v-if="isInit" v-model:value="offx" :min="-50" :max="50" :step="0.1"  @change="onOffChange"/>
        </div>
        <div class="sliderUI">
            <span class="label">offY:</span>
            <a-slider class="slider" v-if="isInit" v-model:value="offy" :min="-50" :max="50" :step="0.1"  @change="onOffChange"/>
        </div>
        <div class="sliderUI">
            <span class="label">height:</span>
            <a-slider class="slider" v-if="isInit" v-model:value="height" :min="-50" :max="50" :step="0.1"  @change="onOffChange"/>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import "./style/widgets.css";
import {changeHeight, showPosition} from './util/util3D'
import Viewer from './core/Viewer';


let viewer:Viewer;

export default {
  name: 'App',
  components: {
    
  },
  data:()=>{
    return {
      offx:7,
      offy:-11.2,
      height:-24.4,
      isInit:false,
    }
  },
  methods:{
    onOffChange(){
        changeHeight(viewer.build,this.offx,this.offy,this.height)
    }
  },
  mounted(){
         viewer = new Viewer()
    

    viewer.createBuild('OSGB/tileset.json').then(() => {
      this.isInit=true;
      this.onOffChange()         
    });
    

    showPosition(viewer.viewer)

    // viewer.camera.flyTo({
    //   destination: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 1000),
    //   orientation: {
    //     heading: Cesium.Math.toRadians(0),
    //     pitch: Cesium.Math.toRadians(-90),
    //     roll: 0.0,
    //   },
    // });
  }
}
</script>

<style lang="less">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
}
#cesiumContainer {
  right:0;
  bottom:0;
  top:0;
  right:0;
  position: absolute;
}
#cesiumUI{
  position: absolute;
  left:0;
  right:0;
  top:0;
  height:100px;
}
.sliderUI{
  background: #2c3e50;
  display:flex;
  .label{
    color:#ffffff;

    text-align: right;
    line-height:20px;
    width:50px;
    margin:auto 0;
  }
  .slider{
    width:400px;
  }
}
</style>
