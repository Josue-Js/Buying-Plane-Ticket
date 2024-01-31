<script setup lang="ts">
import { onMounted, watch, onUnmounted } from 'vue';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import { ILocation } from '../App.vue';
import { Animation } from '@amcharts/amcharts5/.internal/core/util/Entity';

import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";




const props = defineProps<{ location: ILocation }>();

var chart: am5map.MapChart;
var pointSeries: am5map.MapPointSeries;
var lineSeries: am5map.MapLineSeries;
var planeSeries: am5map.MapPointSeries;
var plane: am5.Graphics;
var animate: Animation<number | undefined>


onMounted(() => {
  let root = am5.Root.new("chartdiv");
  chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: 'translateX',
      panY: 'translateY',
      projection: am5map.geoMercator(),
    })
  );


  chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      exclude: ["AQ"],
      fill: am5.color(0xBFD7FC),
    })
  );

  lineSeries = chart.series.push(
    am5map.MapLineSeries.new(root, {
      stroke: am5.color(0x1D66D8),
      lineType: 'straight',
    })
  );



  pointSeries = chart.series.push(
    am5map.MapPointSeries.new(root, {
    })
  );
  pointSeries.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0x0A67F7)
      })
    });
  });



  planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
  plane = am5.Graphics.new(root, {
    svgPath:
      "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
    scale: 0.06,
    centerY: am5.p50,
    centerX: am5.p50,
    fill: am5.color(0x000000)
  });
  planeSeries.bullets.push(function () {
    var container = am5.Container.new(root, {});
    container.children.push(plane);
    return am5.Bullet.new(root, { sprite: container });
  });

  chart.appear(1000, 100);
});

onUnmounted(() => {
 
})


watch([() => props.location.origin, () => props.location.destination], (data) => {

  const locations = data.filter(item => item);

  pointSeries.data.clear();
  const points = locations.map(location => {
    return pointSeries.pushDataItem({
      latitude: location!.latitude,
      longitude: location!.longitude,
    })
  });


  var zoomCoordinates = { latitude: 0, longitude: 0 }
  var zoomLevel = 2;
  const latitudePoint0 = points[0].get('latitude') as number;
  const longitudePoint0 = points[0].get('longitude') as number;
  const latitudePoint1 = points[1].get('latitude') as number;
  const longitudePoint1 = points[1].get('longitude') as number;

  if (points.length == 1) {
    zoomCoordinates.latitude =  latitudePoint0
    zoomCoordinates.longitude = longitudePoint0;

  } else {
    const pointMiddleLatitude = (latitudePoint0 + latitudePoint1) / 2;
    const pointMiddleLongitude = (longitudePoint0 + longitudePoint1) / 2;

    zoomCoordinates.latitude = pointMiddleLatitude;
    zoomCoordinates.longitude = pointMiddleLongitude;
    zoomLevel = 1

    addPlane(points);
  }


  chart.zoomToGeoPoint(
    zoomCoordinates,
    zoomLevel,
    true,
    1500
  );

});

function addPlane(pointsConnect: am5.DataItem<am5map.IMapPointSeriesDataItem>[]) {

  lineSeries.dataItems.pop();
  const lineDataItem = lineSeries.pushDataItem({
    pointsToConnect: pointsConnect
  });

  planeSeries.dataItems.pop()
  var planeDataItem = planeSeries.pushDataItem({
    lineDataItem: lineDataItem,
    positionOnLine: 0,
    autoRotate: true,
  });
 

  planeDataItem.dataContext = {};

  if(animate) {
    animate.stop();
  }

  animate = planeDataItem.animate({
    key: "positionOnLine",
    to: 1,
    duration: 10000,
    loops: Infinity,
    easing: am5.ease.yoyo(am5.ease.linear)
  });


  planeDataItem.on("positionOnLine", (value) => {

    const dataContext = planeDataItem.dataContext as any;

    if (dataContext.prevPosition < value!) {
      plane.set("rotation", 0);
    }

    if (dataContext.prevPosition > value!) {
      plane.set("rotation", -180);
    }
    (planeDataItem.dataContext as {prevPosition}).prevPosition = value;
  });




}


</script>

<template>

  <div id="chartdiv" class="w-[calc(100%-630px)] h-full bg-ice">
  </div>
</template>