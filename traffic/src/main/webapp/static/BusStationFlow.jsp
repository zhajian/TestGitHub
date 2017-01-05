<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>站点流量</title>
  <link rel="stylesheet" href="https://js.arcgis.com/4.0/esri/css/main.css">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <!--<link rel="stylesheet" href="https://js.arcgis.com/3.15/esri/css/esri.css">-->
  <style>
    html, body, #viewDiv {
      height: 100%;
      margin: 0;
    }

    #meta {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 200px;
      height: 30px;
      z-index: 40;
      background: #ffffff;
      color: #777777;
      padding: 5px;
      border: 2px solid #666666;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      font-size: 12px;
    }
  </style>

  <script src="https://js.arcgis.com/4.0/"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

  <script>
    var totalFlowLayer;
    var onFlowLayer;
    var offFlowLayer;

    require([
      "esri/Map",
      "esri/Camera",
      "esri/views/SceneView",
      "esri/layers/TileLayer",
      "esri/Basemap",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/layers/FeatureLayer",
      "esri/geometry/Point",
      "esri/geometry/support/webMercatorUtils",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/renderers/SimpleRenderer",
      "esri/symbols/PointSymbol3D",
      "esri/symbols/ObjectSymbol3DLayer",
      "esri/layers/support/Field",
      "esri/layers/support/LabelClass",
      "esri/symbols/TextSymbol",
      "esri/symbols/TextSymbol3DLayer",
      "esri/symbols/LabelSymbol3D",
      'dojo/request/xhr',
      "dojo/domReady!"
    ], function(
      Map,
      Camera,
      SceneView,
      TileLayer,
      Basemap,
      Graphic,
      GraphicsLayer,
      FeatureLayer,
      Point,
      webMercatorUtils,
      SimpleMarkerSymbol,
      SimpleRenderer,
      PointSymbol3D,
      ObjectSymbol3DLayer,
      Field,
      LabelClass,
      TextSymbol,
      TextSymbol3DLayer,
      LabelSymbol3D,
      xhr){
      var tileLayer = new TileLayer("http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer");
      var basemap = new Basemap({
        baseLayers: [tileLayer],
        title: "中国街区图",
        id: "street"
      });
      var map = new Map({
        basemap: basemap,
        logo: false
      });

      var camera = new Camera({
        heading: 0,
        tilt: 70,
        position: {
          x: 13526800,
          y: 3645000,
          z: 6000,
          spatialReference: {wkid: 102100}
        }
      });

      var view = new SceneView({
        container: "viewDiv",
        map: map,
        viewingMode: "local",
        camera: camera
      });



      xhr("BusStation.json", {
        handleAs: "json"
      }).then(function(data){
        var features = data.features;
        var graphicArray = [];

        var minTotal = Number.MAX_VALUE;
        var maxTotal = Number.MIN_VALUE;

        var minOn = Number.MAX_VALUE;
        var maxOn = Number.MIN_VALUE;

        var minOff = Number.MAX_VALUE;
        var maxOff = Number.MIN_VALUE;

        features.forEach(function(graphicObject){
          var point = new Point({
            x: graphicObject.geometry.x,
            y: graphicObject.geometry.y
          });
          graphicObject.attributes.onFlow = Math.round(Math.random() * 1000);
          graphicObject.attributes.offFlow = Math.round(Math.random() * 1000);
          graphicObject.attributes.totalFlow = graphicObject.attributes.onFlow + graphicObject.attributes.offFlow;

          minTotal = Math.min(graphicObject.attributes.totalFlow, minTotal);
          maxTotal = Math.max(graphicObject.attributes.totalFlow, maxTotal);

          minOn = Math.min(graphicObject.attributes.onFlow, minOn);
          maxOn = Math.max(graphicObject.attributes.onFlow, maxOn);

          minOff = Math.min(graphicObject.attributes.offFlow, minOff);
          maxOff = Math.max(graphicObject.attributes.offFlow, maxOff);

          var stationGraphic = new Graphic({
            geometry: webMercatorUtils.geographicToWebMercator(point),
            attributes: graphicObject.attributes
          });
          graphicArray.push(stationGraphic);

        });


        var totalFlowRenderer = new SimpleRenderer({
          symbol: new PointSymbol3D({
            symbolLayers: [new ObjectSymbol3DLayer({
              resource: {
                primitive: "cylinder"
              }
            })]
          }),
          visualVariables: [{
            type: "color",
            field: "totalFlow",
            maxDataValue: maxTotal,
            minDataValue: minTotal,
            colors: [
              [0, 255, 0],
              [255, 0, 0]
            ]
          }, {
            type: "size",
            field: "totalFlow",
            minDataValue: minTotal,
            maxDataValue: maxTotal,
            minSize: 0,
            maxSize: 2000,
            axis: "height"
          }, {
            type: "size",
            minSize: 100,
            axis: "width"
          }]
        });

        var onFlowRenderer = new SimpleRenderer({
          symbol: new PointSymbol3D({
            symbolLayers: [new ObjectSymbol3DLayer({
              resource: {
                primitive: "cylinder"
              }
            })]
          }),
          visualVariables: [{
            type: "color",
            field: "onFlow",
            maxDataValue: maxOn,
            minDataValue: minOn,
            colors: [
              [0, 255, 0],
              [255, 0, 0]
            ]
          }, {
            type: "size",
            field: "onFlow",
            minDataValue: minOn,
            maxDataValue: maxOn,
            minSize: 0,
            maxSize: 1000,
            axis: "height"
          }, {
            type: "size",
            minSize: 100,
            axis: "width"
          }]
        });

        var offFlowRenderer = new SimpleRenderer({
          symbol: new PointSymbol3D({
            symbolLayers: [new ObjectSymbol3DLayer({
              resource: {
                primitive: "cylinder"
              }
            })]
          }),
          visualVariables: [{
            type: "color",
            field: "offFlow",
            maxDataValue: maxOff,
            minDataValue: minOff,
            colors: [
              [0, 255, 0],
              [255, 0, 0]
            ]
          }, {
            type: "size",
            field: "offFlow",
            minDataValue: minOff,
            maxDataValue: maxOff,
            minSize: 0,
            maxSize: 1000,
            axis: "height"
          }, {
            type: "size",
            minSize: 100,
            axis: "width"
          }]
        });


        var totalFlowLabelClass = new LabelClass({
          labelExpressionInfo: {
            value: "{BS_NAME}\n总客流{totalFlow}人"
          },
          symbol: new LabelSymbol3D({
            symbolLayers: [new TextSymbol3DLayer({
              font: {weight: "bold"},
              material: { color: [0, 0, 0] },
              size: 12
            })]
          })
        });

        var onFlowLabelClass = new LabelClass({
          labelExpressionInfo: {
            value: "{BS_NAME}\n上客{onFlow}人"
          },
          symbol: new LabelSymbol3D({
            symbolLayers: [new TextSymbol3DLayer({
              font: {weight: "bold"},
              material: { color: [0, 0, 0] },
              size: 12
            })]
          })
        });

        var offFlowLabelClass = new LabelClass({
          labelExpressionInfo: {
            value: "{BS_NAME}\n下客{offFlow}人"
          },
          symbol: new LabelSymbol3D({
            symbolLayers: [new TextSymbol3DLayer({
              font: {weight: "bold"},
              material: { color: [0, 0, 0] },
              size: 12
            })]
          })
        });


        totalFlowLayer = new FeatureLayer({
          source: graphicArray,
          fields: data.fields,
          objectIdField: "OBJECTID",
          geometryType: "point",
          opacity: 0.8
        });

        totalFlowLayer.renderer = totalFlowRenderer;
        totalFlowLayer.labelsVisible = true;
        totalFlowLayer.labelingInfo = [totalFlowLabelClass];
        totalFlowLayer.visible = true;
        map.add(totalFlowLayer);


        onFlowLayer = new FeatureLayer({
          source: graphicArray,
          fields: data.fields,
          objectIdField: "OBJECTID",
          geometryType: "point",
          opacity: 0.8
        });
        onFlowLayer.renderer = onFlowRenderer;
        onFlowLayer.labelsVisible = true;
        onFlowLayer.labelingInfo = [onFlowLabelClass];
        onFlowLayer.visible = false;
        map.add(onFlowLayer);

        offFlowLayer = new FeatureLayer({
          source: graphicArray,
          fields: data.fields,
          objectIdField: "OBJECTID",
          geometryType: "point",
          opacity: 0.8
        });
        offFlowLayer.renderer = offFlowRenderer;
        offFlowLayer.labelsVisible = true;
        offFlowLayer.labelingInfo = [offFlowLabelClass];
        offFlowLayer.visible = false;
        map.add(offFlowLayer);


      }, function(err){
        throw(err);
      });
    });

    function setRendererType(rendererType) {
      switch (rendererType) {
        case "totalFlow":
          totalFlowLayer.visible = true;
          onFlowLayer.visible = false;
          offFlowLayer.visible = false;
          break;

        case "onFlow":
          totalFlowLayer.visible = false;
          onFlowLayer.visible = true;
          offFlowLayer.visible = false;
          break;

        case "offFlow":
          totalFlowLayer.visible = false;
          onFlowLayer.visible = false;
          offFlowLayer.visible = true;
          break;
      }
    }

  </script>


</head>
<body class="claro">
<div data-dojo-type="dijit/layout/BorderContainer"
     data-dojo-props="design:'headline',gutters:false" style="width: 100%; height: 100%; margin: 0;">
  <div id="viewDiv" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'center'">
    <div id="meta">
      <form role="form">
        <label class="radio-inline">
          <input type="radio" name="optradio" checked onclick="setRendererType('totalFlow')">总客流
        </label>
        <label class="radio-inline">
          <input type="radio" name="optradio" onclick="setRendererType('onFlow')">上客
        </label>
        <label class="radio-inline">
          <input type="radio" name="optradio" onclick="setRendererType('offFlow')">下客
        </label>
      </form>
    </div>
  </div>
</div>
</body>
</html>