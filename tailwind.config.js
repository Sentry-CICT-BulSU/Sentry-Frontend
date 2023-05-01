/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

const colors = require('tailwindcss/colors')

module.exports = {
    prefix: '',
    mode: 'jit',
    important: false,
    content: ['./src/**/*.{html,ts}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                'fade-in-down': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-10px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                'fade-out-down': {
                    from: {
                        opacity: '1',
                        transform: 'translateY(0px)',
                    },
                    to: {
                        opacity: '0',
                        transform: 'translateY(10px)',
                    },
                },
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                'fade-out-up': {
                    from: {
                        opacity: '1',
                        transform: 'translateY(0px)',
                    },
                    to: {
                        opacity: '0',
                        transform: 'translateY(10px)',
                    },
                },
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
                'fade-in-down': 'fade-in-down 0.3s ease-out',
                'fade-out-down': 'fade-out-down 0.3s ease-out',
                'fade-in-up': 'fade-in-up 0.3s ease-out',
                'fade-out-up': 'fade-out-up 0.3s ease-out',
            },
            boxShadow: {
                custom: '0px 0px 50px 0px rgb(82 63 105 / 15%)',
            },
            colors: {
                night: {
                    50: '#e4e4eb',
                    100: '#bbbace',
                    200: '#8f8ead',
                    300: '#66658c',
                    400: '#4b4777',
                    500: '#302a62',
                    600: '#2b245b',
                    700: '#241c51',
                    800: '#1c1445',
                    900: '#130030',
                },
                primary: {
                    50: '#F9F5FF',
                    300: '#D6BBFB',
                    600: '#7F56D9',
                    700: '#6941C6',
                    800: '#53389E',
                },
                orange: {
                    50: '#FFF7ED',
                    300: '#FDBA74',
                    600: '#DD6B20',
                    700: '#C05621',
                    800: '#9C4221',
                },
                red: {
                    50: '#FEF2F2',
                    300: '#FCA5A5',
                    600: '#DC2626',
                    700: '#B91C1C',
                    800: '#991B1B',
                },
                blue: {
                    50: '#EFF6FF',
                    300: '#63B3ED',
                    600: '#2563EB',
                    700: '#1D4ED8',
                    800: '#1E40AF',
                },
                teal: {
                    50: '#E6FFFA',
                    300: '#4FD1C5',
                    600: '#319795',
                    700: '#2C7A7B',
                    800: '#285E61',
                },

            },
            fontFamily: {
                sans: ['Inter', 'poppins', 'sans-serif'],
                poppins: ['Poppins', 'system-ui', 'sans-serif'],
                nunito: ['Nunito Sans', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {},
        scrollbar: ['dark', 'rounded']
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('tailwind-scrollbar'),
        require('daisyui'),
    ],
    daisyui: {
        themes: false,
    },
}
