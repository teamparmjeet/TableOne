// src/app/fonts.ts
import localFont from 'next/font/local'

export const bnCringeSerif = localFont({
  src: [
    { path: '../fonts/BNCringeSerifLight.ttf', weight: '300', style: 'normal' },
    { path: '../fonts/BNCringeSerifRegular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/BNCringeSerifMedium.ttf', weight: '500', style: 'normal' },
    { path: '../fonts/BNCringeSerifBold.ttf', weight: '700', style: 'normal' },
    { path: '../fonts/BNCringeSerifBlack.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-cringe-serif',
  display: 'swap',
})

export const gtZirkon = localFont({
  src: [
    { path: '../fonts/GTZirkon-Thin.ttf', weight: '100', style: 'normal' },
    { path: '../fonts/GTZirkon-ThinItalic.ttf', weight: '100', style: 'italic' },
    { path: '../fonts/GTZirkon-UltraLight.ttf', weight: '200', style: 'normal' },
    { path: '../fonts/GTZirkon-UltraLightItalic.ttf', weight: '200', style: 'italic' },
    { path: '../fonts/GTZirkon-Light.ttf', weight: '300', style: 'normal' },
    { path: '../fonts/GTZirkon-LightItalic.ttf', weight: '300', style: 'italic' },
    { path: '../fonts/GTZirkon-Book.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/GTZirkon-BookItalic.ttf', weight: '400', style: 'italic' },
    { path: '../fonts/GTZirkon-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/GTZirkon-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../fonts/GTZirkon-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../fonts/GTZirkon-MediumItalic.ttf', weight: '500', style: 'italic' },
    { path: '../fonts/GTZirkon-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../fonts/GTZirkon-BoldItalic.ttf', weight: '700', style: 'italic' },
    { path: '../fonts/GTZirkon-Black.ttf', weight: '900', style: 'normal' },
    { path: '../fonts/GTZirkon-BlackItalic.ttf', weight: '900', style: 'italic' },
  ],
  variable: '--font-gt-zirkon',
  display: 'swap',
})

export const pitchSans = localFont({
  src: [
    { path: '../fonts/PitchSans-Light.ttf', weight: '300', style: 'normal' },
    { path: '../fonts/PitchSans-LightItalic.ttf', weight: '300', style: 'italic' },
    { path: '../fonts/PitchSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/PitchSans-RegularItalic.ttf', weight: '400', style: 'italic' },
    { path: '../fonts/PitchSans-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../fonts/PitchSans-MediumItalic.ttf', weight: '500', style: 'italic' },
    { path: '../fonts/PitchSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../fonts/PitchSans-SemiBoldItalic.ttf', weight: '600', style: 'italic' },
    { path: '../fonts/PitchSans-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../fonts/PitchSans-BoldItalic.ttf', weight: '700', style: 'italic' },
  ],
  variable: '--font-pitch-sans',
  display: 'swap',
})