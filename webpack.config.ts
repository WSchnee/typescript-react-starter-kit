import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import packageJSON from './package.json'

const srcResolve = (dir: string) => path.join(__dirname, 'src', dir)

const config: webpack.Configuration = {
    entry: './src/index.tsx',

    resolve: {
        alias: {
            actions: srcResolve('actions'),
            components: srcResolve('components'),
            reducers: srcResolve('reducers'),
            styles: srcResolve('styles'),
            csource: srcResolve('csource'),
            shaders: srcResolve('shaders'),
            models: srcResolve('models'),
            classes: srcResolve('classes'),
            primitives: srcResolve('primitives'),
            sagas: srcResolve('sagas'),
            content: srcResolve('content'),
            types: srcResolve('types'),
            images: srcResolve('images')
        },
        extensions: packageJSON.jest.moduleFileExtensions.map(ext => `.${ext}`)
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/, // Do not remove or move
                use: [
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            sourceMap: true
                        }
                    },
                    ...['postcss-loader', 'sass-loader'].map(loader => ({
                        loader,
                        options: { sourceMap: true }
                    }))
                ]
            },
            {
                test: /\.(c|cpp)$/,
                use: {
                    loader: 'cpp-wasm-loader',
                    options: {
                        // publicPath: __dirname,
                        // emccPath: '',
                        emccFlags: ['-O3']
                    }
                }
            },
            {
                test: /\.glsl$/,
                use: [
                  {
                    loader: path.resolve('loaders/GlslLoader.ts')
                  }
                ]
            },
            {
                test: /\.obj$/,
                use: [
                  {
                    loader: path.resolve('loaders/ObjLoader.ts')
                  }
                ]
            },
            {
                test: /\.bmp/,
                use: [
                  {
                    loader: path.resolve('loaders/BmpLoader.ts')
                  }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {sourceMap: true}
            }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: packageJSON.name
                .split('-')
                .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                .join(' '),
            version: packageJSON.version,
            template: 'static/index.ejs'
        }),
        new webpack.DefinePlugin({
            'process.env.PACKAGE_NAME': JSON.stringify(packageJSON.name),
            'process.env.PACKAGE_VERSION': JSON.stringify(packageJSON.version)
        })
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: path.resolve(__dirname, 'node_modules'),
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },

    stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: true,
        timings: false,
        version: false,
        warnings: true
    }
}

export default config
