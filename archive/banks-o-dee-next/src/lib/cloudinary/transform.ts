
import { Transformation } from '@cloudinary/url-gen';
import { pad } from '@cloudinary/url-gen/actions/resize';
import { Gravity } from '@cloudinary/url-gen/qualifiers';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'; // Fixed import from Focus to FocusOn
import { source } from '@cloudinary/url-gen/actions/overlay';
import { text } from '@cloudinary/url-gen/actions/overlay';
import { Position } from '@cloudinary/url-gen/qualifiers/position';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity/compass';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { opacity } from '@cloudinary/url-gen/actions/adjust';

// Helper function to create a transformation for stadium images
export const createStadiumImageTransformation = () => {
  return (transformation: Transformation) => {
    transformation
      .resize(pad().width(600).height(400).gravity(autoGravity().autoFocus(FocusOn.subject())))
  };
};

// Helper function to create a transformation for player profile images
export const createPlayerProfileImageTransformation = () => {
  return (transformation: Transformation) => {
    transformation
      .resize(pad().width(300).height(400).gravity(autoGravity().autoFocus(FocusOn.subject())))
  };
};

// Helper function to create a transformation for sponsor logos
export const createSponsorLogoTransformation = () => {
  return (transformation: Transformation) => {
    transformation
      .resize(scale().width(200))
      .adjust(opacity(80));
  };
};

export const createTextOverlay = (textContent: string, options: any = {}) => {
  // Default configuration for text overlay
  const fontFamily = options.fontFamily || 'montserrat';
  const fontSize = options.fontSize || 24;
  const fontWeight = options.fontWeight || 'bold';
  const textColor = options.textColor || 'white';
  const backgroundColor = options.backgroundColor || 'rgb:000000';
  const padding = options.padding || 20;
  const position = options.position || 'south';
  const offsetX = options.offsetX || 0;
  const offsetY = options.offsetY || 0;
  const opacity = options.opacity || 100;

  return (transformation: Transformation) => {
    const textStyle = new TextStyle()
      .fontFamily(fontFamily)
      .fontSize(fontSize)
      .fontWeight(fontWeight);

    // Fix the text overlay - pass both the string and the style
    return transformation.overlay(
      source(text(textContent, textStyle)).color(textColor).backgroundColor(backgroundColor) // Fixed: Pass both arguments to text() and use color() method correctly
    );
  };
};

// Helper function to create a transformation for stadium images with text overlay
export const createStadiumImageTransformationWithText = (textContent: string, options: any = {}) => {
  return (transformation: Transformation) => {
    transformation
      .resize(pad().width(600).height(400).gravity(autoGravity().autoFocus(FocusOn.subject())))
      .chain(createTextOverlay(textContent, options));
  };
};
