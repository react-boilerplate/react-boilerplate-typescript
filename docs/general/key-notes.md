# Key Notes & Differences

## Styled Components

To be able to type styled components you must import from `styles/styled-components` instead of `styled-components` directly. Exports are explicitly typed.

## CSS modules

CSS modules with typescript require slightly more work than regular CSS. Details are here: https://medium.com/@sapegin/css-modules-with-typescript-and-webpack-6b221ebe5f10. TL;DR version, if you want to use CSS modules, in internals/webpack/webpack.base.babel.js:L47 replace

        use: ['style-loader', 'css-loader'],

with

        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true
            }
          },
        ],

To tell webpack to ignore the generated css.d.ts files, add the following to the plugins section on line 132

        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),

## Immer

`Immer` is removed and state is held with normal js objects. Typescript provides compile-time immutability with `readonly` interfaces. Type-safety with `immer` is unnecessarily complicated in this case.

## Webpack

`ts-loader` with a parallel type checker is used to maximize the typescript transpiling speed and then babel-loader is applied to transpile to es5.

> This is NOT a super strictly typed code. Type-safety logic can easily be generalized to make everything super type-safe.
