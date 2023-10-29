<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <html data-theme="light"></html>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="description" content="To keep accounting data, there are a lot of options you can choose from. This web app is one of them.">

        {{-- <title inertia>{{ config('app.name', 'Akkaunt-Ing') }}</title> --}}
        <title inertia>{{ config('AKKAUNT-ING','AKKAUNT-ING') }}</title>

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link rel="preload" as="font" href="{{ asset('fonts/bodyfont400.woff') }}" type="font/woff" crossorigin>
        <link rel="preload" as="font" href="{{ asset('fonts/bodyfont500.woff') }}" type="font/woff" crossorigin>
        <link rel="stylesheet" href="{{ asset('css/font.css') }}">

        <!-- Scripts -->
        @routes
        <script src="{{ asset('js/app.js') }}" defer></script>
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
