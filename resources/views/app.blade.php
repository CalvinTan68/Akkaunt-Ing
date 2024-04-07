<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="canonical" href="{{ config('app.url') }}" />
    <meta name="author" content="Calvin Tandika" />

    <meta name="title" content="{{ config('app.name') }}">
    <meta name="description" content="{{ config('app.desc') }}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ config('app.url') }}" />
    <meta property="og:title" content="{{ config('app.name') }}" />
    <meta property="og:description" content="{{ config('app.desc') }}" />
    <meta property="og:image" content="{{ asset('favicon.ico') }}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="{{ config('app.url') }}" />
    <meta property="twitter:title" content="{{ config('app.name') }}" />
    <meta property="twitter:description" content="{{ config('app.desc') }}" />
    <meta property="twitter:image" content="{{ asset('favicon.ico') }}" />

    <title inertia>{{ config('app.name') }}</title>
    @routes
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @vite('resources/css/app.css')
    @inertiaHead
</head>

<body class="font-sans antialiased" style="margin: 0 !important;background: #f5f5f5 !important;">
    @inertia
</body>

</html>