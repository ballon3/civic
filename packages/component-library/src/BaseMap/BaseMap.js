/* eslint-disable no-nested-ternary */
import React, { Component } from "react";
import MapGL, { NavigationControl, Marker } from "react-map-gl";
import Dimensions from "react-dimensions";
import { css } from "emotion";
import PropTypes from "prop-types";
import createRef from "create-react-ref/lib/createRef";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import { isEqual } from "lodash";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFja29yZWdvbiIsImEiOiJjamk0MGZhc2cwNDl4M3FsdHAwaG54a3BnIn0.Fq1KA0IUwpeKQlFIoaEn_Q";
const CIVIC_LIGHT = "mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg";
const CIVIC_DARK = "mapbox://styles/mapbox/dark-v9";

const mapWrapper = css`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const navControl = css`
  position: absolute;
  left: 0;
  z-index: 1;
`;

class BaseMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        longitude: props.initialLongitude,
        latitude: props.initialLatitude,
        zoom: props.initialZoom,
        minZoom: 6,
        maxZoom: 20,
        pitch: props.initialPitch,
        bearing: 0,
        scrollZoom: true
      },
      tooltipInfo: null,
      x: null,
      y: null,
      mounted: false
    };
    this.mapRef = createRef();
  }

  componentDidMount() {
    // Geocoder requires a ref to the map component
    this.setState({ mounted: true });
  }

  componentWillReceiveProps(props) {
    const { updateViewport } = props;
    if (updateViewport) {
      const updatedViewportProps = {
        zoom: props.initialZoom,
        pitch: props.initialPitch,
        longitude: props.initialLongitude,
        latitude: props.initialLatitude
      };

      // Remove all keys that have null/undefined values to keep defaults
      Object.keys(updatedViewportProps).forEach(key => {
        if (updatedViewportProps[key] == null) {
          delete updatedViewportProps[key];
        }
      });

      this.setState(prevState => ({
        viewport: { ...prevState.viewport, ...updatedViewportProps }
      }));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      mapboxData: previousMapboxData,
      mapboxLayerOptions: previousMapboxLayerOptions
    } = prevProps;
    const {
      mapboxData,
      mapboxDataId,
      mapboxLayerOptions,
      mapboxLayerId
    } = this.props;
    if (!isEqual(previousMapboxData, mapboxData)) {
      const map = this.mapRef.current.getMap();
      map.getSource(mapboxDataId).setData(mapboxData);
    }

    if (!isEqual(previousMapboxLayerOptions, mapboxLayerOptions)) {
      const map = this.mapRef.current.getMap();
      const updatedProperties = Object.keys(mapboxLayerOptions).filter(
        m => !isEqual(previousMapboxLayerOptions[m], mapboxLayerOptions[m])
      );
      updatedProperties.forEach(p =>
        map.setPaintProperty(mapboxLayerId, p, mapboxLayerOptions[p])
      );
    }
  }

  onHover = ({ object, x, y }) => {
    this.setState({
      tooltipInfo: object,
      x,
      y
    });
  };

  onViewportChange = viewport => {
    this.setState(prevState => ({
      viewport: { ...prevState.viewport, ...viewport }
    }));
  };

  render() {
    const { viewport, tooltipInfo, x, y, mounted } = this.state;

    const {
      height,
      containerHeight,
      containerWidth,
      civicMapStyle,
      mapboxToken,
      navigation,
      geocoder,
      locationMarker,
      geocoderOptions,
      geocoderOnChange,
      mapGLOptions,
      children,
      useContainerHeight,
      onBaseMapClick,
      mapboxData,
      mapboxDataId,
      mapboxLayerType,
      mapboxLayerOptions,
      mapboxLayerId,
      locationMarkerCoord
    } = this.props;

    viewport.width = containerWidth || 500;
    viewport.height = useContainerHeight ? containerHeight : height;

    const childrenLayers = React.Children.map(children, child => {
      return React.cloneElement(child, {
        viewport,
        tooltipInfo,
        x,
        y,
        onHover: info => this.onHover(info)
      });
    });

    const onMapLoad = () => {
      if (!mapboxData || !mapboxLayerType || !mapboxLayerOptions) return;
      const map = this.mapRef.current.getMap();
      map.addSource(mapboxDataId, {
        type: "geojson",
        data: mapboxData
      });
      map.addLayer(
        {
          id: mapboxLayerId,
          type: mapboxLayerType,
          source: mapboxDataId,
          paint: mapboxLayerOptions
        },
        "waterway-label"
      );
    };

    const baseMapboxStyleURL =
      civicMapStyle === "light"
        ? CIVIC_LIGHT
        : civicMapStyle === "dark"
        ? CIVIC_DARK
        : CIVIC_LIGHT;

    return (
      <div className={mapWrapper}>
        <MapGL
          className="MapGL"
          {...viewport}
          mapStyle={baseMapboxStyleURL}
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={newViewport => this.onViewportChange(newViewport)}
          ref={this.mapRef}
          {...mapGLOptions}
          onClick={onBaseMapClick}
          onLoad={onMapLoad}
        >
          <div className={navControl}>
            {navigation && (
              <NavigationControl
                className="NavigationControl"
                onViewportChange={newViewport =>
                  this.onViewportChange(newViewport)
                }
              />
            )}
          </div>
          {locationMarker && (
            <Marker
              latitude={locationMarkerCoord.latitude}
              longitude={locationMarkerCoord.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <span role="img" aria-label="star">
                ❌
              </span>
            </Marker>
          )}
          {geocoder && mounted && (
            <Geocoder
              mapRef={{ current: this.mapRef.current }}
              mapboxApiAccessToken={mapboxToken}
              onViewportChange={newViewport => {
                this.onViewportChange(newViewport);
                // eslint-disable-next-line no-unused-expressions
                !!geocoderOnChange && geocoderOnChange(newViewport);
              }}
              options={{ ...geocoderOptions }}
            />
          )}
          {childrenLayers}
        </MapGL>
      </div>
    );
  }
}

BaseMap.propTypes = {
  initialLongitude: PropTypes.number,
  initialLatitude: PropTypes.number,
  initialZoom: PropTypes.number,
  initialPitch: PropTypes.number,
  height: PropTypes.number,
  containerHeight: PropTypes.number,
  containerWidth: PropTypes.number,
  mapboxToken: PropTypes.string,
  civicMapStyle: PropTypes.string,
  navigation: PropTypes.bool,
  locationMarker: PropTypes.bool,
  locationMarkerCoord: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }),
  geocoder: PropTypes.bool,
  geocoderOptions: PropTypes.shape({}),
  geocoderOnChange: PropTypes.func,
  mapGLOptions: PropTypes.shape({}),
  children: PropTypes.node,
  useContainerHeight: PropTypes.bool,
  updateViewport: PropTypes.bool,
  onBaseMapClick: PropTypes.func,
  mapboxDataId: PropTypes.string,
  mapboxData: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  mapboxLayerType: PropTypes.string,
  mapboxLayerId: PropTypes.string,
  mapboxLayerOptions: PropTypes.shape({})
};

BaseMap.defaultProps = {
  mapboxToken: MAPBOX_TOKEN,
  navigation: true,
  geocoder: false,
  useContainerHeight: false,
  updateViewport: true,
  initialLongitude: -122.6765,
  initialLatitude: 45.5231,
  initialZoom: 9.5,
  initialPitch: 0,
  height: 500,
  locationMarkerCoord: {
    latitude: 0,
    longitude: 0
  }
};

export default Dimensions()(BaseMap);
