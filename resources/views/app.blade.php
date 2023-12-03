<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="author" content="Calvin Tandika" />
        <meta name="description" content="A simple yet useful bookkeeping app" />
        <link rel="canonical" href="{{ url()->current() }}" />

        @routes
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead
    </head>
    <body class="font-sans antialiased" style="margin:0; background: #f5f5f5 !important">
        @inertia
    </body>
</html>
