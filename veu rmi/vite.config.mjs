// Plugins
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Fonts from 'unplugin-fonts/vite';
import Layouts from 'vite-plugin-vue-layouts';
import Vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import svgLoader from 'vite-svg-loader';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        VueRouter(),
        Layouts(),
        Vue({
            template: { transformAssetUrls }
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
        Vuetify({
            autoImport: true,
            styles: {
                configFile: 'src/styles/settings.scss'
            }
        }),
        svgLoader({
            defaultImport: 'url'
        }),
        viteStaticCopy({
            targets: [
                {
                    src: './.Ui5RepositoryBinaryFiles',
                    dest: ''
                }
            ]
        }),
        Components(),
        Fonts({
            custom: {
                families: [
                    {
                        name: 'Rubik',
                        local: 'Rubik',

                        src: './src/assets/fonts/Rubik/*.ttf',

                        /**
                         * This function allow you to transform the font object before it is used
                         * to generate the `@font-rule` and head tags.
                         */
                        transform(font) {
                            switch (font.basename) {
                                case 'Rubik-Light':
                                case 'Rubik-LightItalic':
                                    font.weight = 300;
                                    break;
                                case 'Rubik-Regular':
                                case 'Rubik-Italic':
                                    font.weight = 400;
                                    break;
                                case 'Rubik-Medium':
                                case 'Rubik-MediumItalic':
                                    font.weight = 500;
                                    break;
                                case 'Rubik-SemiBold':
                                case 'Rubik-SemiBoldItalic':
                                    font.weight = 600;
                                    break;
                                case 'Rubik-Bold':
                                case 'Rubik-BoldItalic':
                                    font.weight = 700;
                                    break;
                                case 'Rubik-ExtraBold':
                                case 'Rubik-ExtraBoldItalic':
                                    font.weight = 800;
                                    break;
                                case 'Rubik-Black':
                                case 'Rubik-BlackItalic':
                                    font.weight = 900;
                                    break;
                            }

                            // we can also return null to skip the font
                            return font;
                        }
                    }
                ],
                display: 'auto',
                preload: true,
                prefetch: false,
                injectTo: 'head-prepend'
            }
            // google: {
            //     families: [
            //         {
            //             name: 'Rubik',
            //             styles: 'wght@100;300;400;500;700;900'
            //         }
            //     ]
            // }
        }),
        AutoImport({
            imports: ['vue', 'vue-router'],
            eslintrc: {
                enabled: true
            },
            vueTemplate: true
        })
    ],
    build: {
        sourcemap: true
    },
    define: { 'process.env': {} },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
    },
    server: {
        host: 'localhost',
        port: 3000,
        proxy: {
            '/sap': {
                changeOrigin: true,
                target: 'http://gsaperd01.mami.gov.il:8000',
                secure: false
            }
        }
    }
});
