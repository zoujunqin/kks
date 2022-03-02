{
  mode: 'production',
  context: '/Users/zoujunqin/Desktop/vue2.0',
  devtool: 'source-map',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: '/Users/zoujunqin/Desktop/vue2.0/dist',
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  resolve: {
    alias: {
      '@': '/Users/zoujunqin/Desktop/vue2.0/src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      '/Users/zoujunqin/Desktop/vue2.0/node_modules',
      '/Users/zoujunqin/Desktop/vue2.0/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        },
        makePlugin: function () { /* omitted long function */ },
        moduleLoader: function () { /* omitted long function */ },
        topLevelLoader: {
          apply: function nothing() {
            // ¯\_(ツ)_/¯
          }
        },
        bind: function () { /* omitted long function */ },
        tsLoaderOptions: function () { /* omitted long function */ },
        forkTsCheckerOptions: function () { /* omitted long function */ }
      }
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/zoujunqin/Desktop/vue2.0/node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      '/Users/zoujunqin/Desktop/vue2.0/node_modules',
      '/Users/zoujunqin/Desktop/vue2.0/node_modules/@vue/cli-service/node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        }
      }
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/zoujunqin/Desktop/vue2.0/node_modules/.cache/vue-loader',
              cacheIdentifier: '4eb097c1'
            }
          },
          {
            loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/vue-loader/lib/index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: '/Users/zoujunqin/Desktop/vue2.0/node_modules/.cache/vue-loader',
              cacheIdentifier: '4eb097c1'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        exclude: [
          '/Users/zoujunqin/Desktop/vue2.0/build/utils/src/icons'
        ],
        use: [
          {
            loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/file-loader/dist/cjs.js',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/url-loader/dist/cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/file-loader/dist/cjs.js',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: 'raw-loader'
              },
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal') */
          {
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal') */
          {
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal') */
          {
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/sass-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal') */
          {
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal') */
          {
            use: [
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/mini-css-extract-plugin/dist/loader.js',
                options: {
                  hmr: false,
                  publicPath: '../'
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/css-loader/dist/cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/postcss-loader/src/index.js',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/cache-loader/dist/cjs.js',
            options: {
              cacheDirectory: '/Users/zoujunqin/Desktop/vue2.0/node_modules/.cache/babel-loader',
              cacheIdentifier: '7f9bf500'
            }
          },
          {
            loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/thread-loader/dist/cjs.js'
          },
          {
            loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/babel-loader/lib/index.js'
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          '/Users/zoujunqin/Desktop/vue2.0/node_modules/@vue/cli-service/lib'
        ],
        use: [
          {
            loader: '/Users/zoujunqin/Desktop/vue2.0/node_modules/eslint-loader/index.js',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              cacheIdentifier: '1e8f8e58',
              emitWarning: false,
              emitError: false,
              eslintPath: '/Users/zoujunqin/Desktop/vue2.0/node_modules/eslint',
              formatter: undefined
            }
          }
        ]
      },
      /* config.module.rule('icons') */
      {
        test: /\.svg$/,
        rules: [
          {
            test: /\.svg$/,
            include: [
              '/Users/zoujunqin/Desktop/vue2.0/build/utils/src/icons'
            ],
            use: [
              {
                loader: 'svg-sprite-loader',
                options: {
                  symbolId: 'icon-[name]'
                }
              }
            ]
          }
        ]
      }
    ],
    unknownContextCritical: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: true,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"production"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }
    ),
    /* config.plugin('optimize-css') */
    new OptimizeCssnanoPlugin(
      {
        sourceMap: false,
        cssnanoOptions: {
          preset: [
            'default',
            {
              mergeLonghand: false,
              cssDeclarationSorter: false
            }
          ]
        }
      }
    ),
    /* config.plugin('hash-module-ids') */
    new HashedModuleIdsPlugin(
      {
        hashDigest: 'hex'
      }
    ),
    /* config.plugin('named-chunks') */
    new NamedChunksPlugin(
      function () { /* omitted long function */ }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: 'vue2.0',
        templateParameters: function () { /* omitted long function */ },
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true
        },
        template: '/Users/zoujunqin/Desktop/vue2.0/public/index.html'
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: '/Users/zoujunqin/Desktop/vue2.0/public',
          to: '/Users/zoujunqin/Desktop/vue2.0/dist',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    ),
    /* config.plugin('dll-reference-plugin') */
    new DllReferencePlugin(
      {
        context: '/Users/zoujunqin/Desktop/vue2.0',
        manifest: {
          name: '_vendor_648e4a00c5a816ef0f3d',
          content: {
            './node_modules/axios/lib/utils.js': {
              id: 0,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/webpack/buildin/global.js': {
              id: 1,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/process/browser.js': {
              id: 2,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/bind.js': {
              id: 3,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/buildURL.js': {
              id: 4,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/cancel/isCancel.js': {
              id: 5,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/defaults.js': {
              id: 6,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/adapters/xhr.js': {
              id: 7,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/createError.js': {
              id: 8,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/mergeConfig.js': {
              id: 9,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/cancel/Cancel.js': {
              id: 10,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/vue/dist/vue.runtime.esm.js': {
              id: 12,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/timers-browserify/main.js': {
              id: 13,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/setimmediate/setImmediate.js': {
              id: 14,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/vuex/dist/vuex.esm.js': {
              id: 15,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default',
                  'Store',
                  'createLogger',
                  'createNamespacedHelpers',
                  'install',
                  'mapActions',
                  'mapGetters',
                  'mapMutations',
                  'mapState'
                ]
              }
            },
            './node_modules/vue-router/dist/vue-router.esm.js': {
              id: 16,
              buildMeta: {
                exportsType: 'namespace',
                providedExports: [
                  'default'
                ]
              }
            },
            './node_modules/axios/index.js': {
              id: 17,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/axios.js': {
              id: 18,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/Axios.js': {
              id: 19,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/InterceptorManager.js': {
              id: 20,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/dispatchRequest.js': {
              id: 21,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/transformData.js': {
              id: 22,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/normalizeHeaderName.js': {
              id: 23,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/settle.js': {
              id: 24,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/enhanceError.js': {
              id: 25,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/cookies.js': {
              id: 26,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/core/buildFullPath.js': {
              id: 27,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/isAbsoluteURL.js': {
              id: 28,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/combineURLs.js': {
              id: 29,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/parseHeaders.js': {
              id: 30,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/isURLSameOrigin.js': {
              id: 31,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/cancel/CancelToken.js': {
              id: 32,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/spread.js': {
              id: 33,
              buildMeta: {
                providedExports: true
              }
            },
            './node_modules/axios/lib/helpers/isAxiosError.js': {
              id: 34,
              buildMeta: {
                providedExports: true
              }
            }
          }
        }
      }
    ),
    /* config.plugin('hard-source-webpack-plugin') */
    new HardSourceWebpackPlugin(),
    /* config.plugin('add-asset-html-webpack-plugin') */
    new AddAssetHtmlPlugin(
      {
        filepath: '/Users/zoujunqin/Desktop/vue2.0/build/utils/public/vendor/*.js',
        publicPath: './vendor',
        outputPath: './vendor'
      }
    )
  ],
  entry: {
    app: [
      './src/main.js'
    ]
  }
}
