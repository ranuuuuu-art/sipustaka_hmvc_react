import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob(
    ['./pages/**/*.tsx', '../../Modules/*/resources/js/pages/**/*.tsx'],
    { eager: true },
);

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) => {
        const path = name.includes('::')
            ? `../../Modules/${name.replace('::', '/resources/js/pages/')}.tsx`
            : `./pages/${name}.tsx`;

        const page = pages[path];

        if (!page) {
            throw new Error(`Halaman Inertia tidak ditemukan: ${name} (dicari di: ${path})`);
        }

        return page as any;
    },

    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name === 'dashboard' || name.includes('::'):
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },

    strictMode: true,

    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },

    progress: {
        color: '#4B5563',
    },
});

if (typeof window !== 'undefined') {
    initializeTheme();
}