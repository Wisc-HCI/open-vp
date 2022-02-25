"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTheme = void 0;

var getTheme = function getTheme(highlightColor, clearBackground) {
  return {
    name: 'SimpleVP',
    rounding: 4,
    defaultMode: 'dark',
    global: {
      colors: {
        text: '#ffffff',
        brand: highlightColor,
        background: clearBackground ? 'transparent' : '#111111',
        control: highlightColor
      },
      font: {
        family: "Helvetica"
      },
      focus: {
        border: {
          color: highlightColor
        }
      },
      input: {
        padding: 4,
        extend: {
          backgroundColor: '#FFFFFF55'
        }
      } // edgeSize: {large: 50, small: 10, medium: 15}

    },
    button: {
      border: {
        radius: "10px"
      }
    },
    radioButton: {
      size: "16px",
      border: {
        color: '#00000088'
      }
    },
    checkBox: {
      size: "20px",
      border: {
        color: '#00000088'
      },
      color: highlightColor,
      hover: {
        border: {
          color: '#00000088'
        }
      }
    },
    textInput: {
      disabled: {
        opacity: 1
      }
    }
  };
};

exports.getTheme = getTheme;