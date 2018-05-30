import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, number, selectV2, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { IconMap } from '../src';

import data from '../src/IconMap/data.json';

const displayName = IconMap.displayName || 'IconMap';

const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

const demoMap = () => {
  const optionsStyle = {
    'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
    'Label Maker': 'mapbox://styles/themendozaline/cjg627xuw08mk2spjsb8jmho7',
    'Moonlight': 'mapbox://styles/themendozaline/cjgq6r2lg00072rmqj1wocgdq',
    'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
    'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
    'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
    'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
  };
  const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Scenic']);

  const opacityOptions = {
     range: true,
     min: 0,
     max: 1,
     step: 0.1,
  };
  const opacity = number('Opacity:', 1, opacityOptions);

  const iconAtlas = 'https://i.imgur.com/29Kt7Ii.png';

  const iconMapping = {
    "School": {
      "x": 0,
      "y": 0,
      "width": 250,
      "height": 250,
      "mask": true,
    },
    "Hospital": {
      "x": 250,
      "y": 0,
      "width": 250,
      "height": 250,
      "mask": true,
    },
    "Fire Station": {
      "x": 0,
      "y": 250,
      "width": 250,
      "height": 250,
      "mask": true,
    },
    "Pin": {
      "x": 250,
      "y": 250,
      "width": 250,
      "height": 250,
      "mask": true,
    },
  };

  const zoomScale = zoom => zoom > 15.5 ? 65 :
    zoom > 14.5 ? 55 :
    zoom > 13.5 ? 45 :
    zoom > 12.5 ? 35 :
    zoom > 11.5 ? 25 :
    zoom > 10.5 ? 15 :
    zoom > 9.5 ? 10 :
    zoom > 8.5 ? 5 :
    zoom > 7.5 ? 2.5 :
    1;

  const getPosition = d => d.geometry.coordinates;

  const getIcon = d => d.properties.ICON;

  const iconSizeOptions = {
     range: true,
     min: 1,
     max: 10,
     step: 1,
  };
  const iconSize = number('Icon Size:', 5, iconSizeOptions);

  const getSize = f => iconSize;

  const getColor = d => d.properties.ICON === 'Hospital' ? [30,144,255] :
    d.properties.ICON === 'School' ? [255,165,0] :
    d.properties.ICON === 'Fire Station' ? [220,20,60] :
    [50, 205, 50];

  const autoHighlight = boolean('Auto Highlight:', false);

  const visible = boolean('Visible:', true);

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
    >
      <IconMap
        data={data.features}
        opacity={opacity}
        iconAtlas={iconAtlas}
        iconMapping={iconMapping}
        iconSizeScale={zoomScale}
        getPosition={getPosition}
        getIcon={getIcon}
        getSize={getSize}
        getColor={getColor}
        autoHighlight={autoHighlight}
        onLayerClick={info => action('Layer clicked:', { depth: 2 })(info, info.object)}
        visible={visible}
      />
    </BaseMap>
  );
};

export default () => storiesOf(displayName, module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Simple usage',
    (demoMap)
  );
