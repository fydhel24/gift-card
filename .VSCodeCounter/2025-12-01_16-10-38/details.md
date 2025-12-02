# Details

Date : 2025-12-01 16:10:38

Directory d:\\PROYECTOCALENDARIO\\proyectogiftcard

Total : 204 files,  31783 codes, 1465 comments, 1855 blanks, all 35103 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.github/workflows/lint.yml](/.github/workflows/lint.yml) | YAML | 31 | 5 | 10 | 46 |
| [.github/workflows/tests.yml](/.github/workflows/tests.yml) | YAML | 39 | 0 | 12 | 51 |
| [.prettierignore](/.prettierignore) | Ignore | 2 | 0 | 1 | 3 |
| [.prettierrc](/.prettierrc) | JSON | 25 | 0 | 1 | 26 |
| [app/Actions/Fortify/CreateNewUser.php](/app/Actions/Fortify/CreateNewUser.php) | PHP | 29 | 5 | 6 | 40 |
| [app/Actions/Fortify/PasswordValidationRules.php](/app/Actions/Fortify/PasswordValidationRules.php) | PHP | 10 | 5 | 4 | 19 |
| [app/Actions/Fortify/ResetUserPassword.php](/app/Actions/Fortify/ResetUserPassword.php) | PHP | 18 | 5 | 6 | 29 |
| [app/Http/Controllers/ClienteController.php](/app/Http/Controllers/ClienteController.php) | PHP | 149 | 29 | 32 | 210 |
| [app/Http/Controllers/ClienteDashboardController.php](/app/Http/Controllers/ClienteDashboardController.php) | PHP | 68 | 8 | 16 | 92 |
| [app/Http/Controllers/Controller.php](/app/Http/Controllers/Controller.php) | PHP | 7 | 0 | 4 | 11 |
| [app/Http/Controllers/Settings/PasswordController.php](/app/Http/Controllers/Settings/PasswordController.php) | PHP | 26 | 6 | 7 | 39 |
| [app/Http/Controllers/Settings/ProfileController.php](/app/Http/Controllers/Settings/ProfileController.php) | PHP | 41 | 9 | 14 | 64 |
| [app/Http/Controllers/Settings/TwoFactorAuthenticationController.php](/app/Http/Controllers/Settings/TwoFactorAuthenticationController.php) | PHP | 26 | 6 | 6 | 38 |
| [app/Http/Controllers/TarjetaGiftCardController.php](/app/Http/Controllers/TarjetaGiftCardController.php) | PHP | 314 | 64 | 68 | 446 |
| [app/Http/Controllers/UserController.php](/app/Http/Controllers/UserController.php) | PHP | 72 | 13 | 16 | 101 |
| [app/Http/Middleware/HandleAppearance.php](/app/Http/Middleware/HandleAppearance.php) | PHP | 14 | 5 | 5 | 24 |
| [app/Http/Middleware/HandleInertiaRequests.php](/app/Http/Middleware/HandleInertiaRequests.php) | PHP | 30 | 19 | 7 | 56 |
| [app/Http/Middleware/RoleMiddleware.php](/app/Http/Middleware/RoleMiddleware.php) | PHP | 26 | 5 | 7 | 38 |
| [app/Http/Requests/Settings/ProfileUpdateRequest.php](/app/Http/Requests/Settings/ProfileUpdateRequest.php) | PHP | 23 | 5 | 5 | 33 |
| [app/Http/Requests/Settings/TwoFactorAuthenticationRequest.php](/app/Http/Requests/Settings/TwoFactorAuthenticationRequest.php) | PHP | 17 | 8 | 6 | 31 |
| [app/Models/Cliente.php](/app/Models/Cliente.php) | PHP | 35 | 0 | 7 | 42 |
| [app/Models/Movimiento.php](/app/Models/Movimiento.php) | PHP | 31 | 0 | 7 | 38 |
| [app/Models/TarjetaGiftCard.php](/app/Models/TarjetaGiftCard.php) | PHP | 38 | 1 | 7 | 46 |
| [app/Models/User.php](/app/Models/User.php) | PHP | 34 | 17 | 7 | 58 |
| [app/Policies/ClientePolicy.php](/app/Policies/ClientePolicy.php) | PHP | 58 | 29 | 16 | 103 |
| [app/Policies/TarjetaGiftCardPolicy.php](/app/Policies/TarjetaGiftCardPolicy.php) | PHP | 62 | 36 | 17 | 115 |
| [app/Providers/AppServiceProvider.php](/app/Providers/AppServiceProvider.php) | PHP | 19 | 8 | 5 | 32 |
| [app/Providers/FortifyServiceProvider.php](/app/Providers/FortifyServiceProvider.php) | PHP | 70 | 18 | 19 | 107 |
| [app/Services/GiftCardService.php](/app/Services/GiftCardService.php) | PHP | 24 | 15 | 7 | 46 |
| [bootstrap/app.php](/bootstrap/app.php) | PHP | 27 | 2 | 5 | 34 |
| [bootstrap/providers.php](/bootstrap/providers.php) | PHP | 5 | 0 | 2 | 7 |
| [components.json](/components.json) | JSON | 21 | 0 | 1 | 22 |
| [composer.json](/composer.json) | JSON | 101 | 0 | 1 | 102 |
| [composer.lock](/composer.lock) | JSON | 10,072 | 0 | 1 | 10,073 |
| [config/app.php](/config/app.php) | PHP | 22 | 82 | 23 | 127 |
| [config/auth.php](/config/auth.php) | PHP | 28 | 74 | 14 | 116 |
| [config/cache.php](/config/cache.php) | PHP | 64 | 35 | 19 | 118 |
| [config/database.php](/config/database.php) | PHP | 118 | 43 | 23 | 184 |
| [config/filesystems.php](/config/filesystems.php) | PHP | 36 | 32 | 13 | 81 |
| [config/fortify.php](/config/fortify.php) | PHP | 27 | 105 | 26 | 158 |
| [config/inertia.php](/config/inertia.php) | PHP | 21 | 23 | 12 | 56 |
| [config/logging.php](/config/logging.php) | PHP | 79 | 33 | 21 | 133 |
| [config/mail.php](/config/mail.php) | PHP | 57 | 43 | 19 | 119 |
| [config/permission.php](/config/permission.php) | PHP | 34 | 121 | 48 | 203 |
| [config/queue.php](/config/queue.php) | PHP | 65 | 45 | 20 | 130 |
| [config/services.php](/config/services.php) | PHP | 20 | 11 | 8 | 39 |
| [config/session.php](/config/session.php) | PHP | 23 | 160 | 35 | 218 |
| [database/factories/UserFactory.php](/database/factories/UserFactory.php) | PHP | 36 | 17 | 7 | 60 |
| [database/migrations/0001\_01\_01\_000000\_create\_users\_table.php](/database/migrations/0001_01_01_000000_create_users_table.php) | PHP | 38 | 6 | 6 | 50 |
| [database/migrations/0001\_01\_01\_000001\_create\_cache\_table.php](/database/migrations/0001_01_01_000001_create_cache_table.php) | PHP | 25 | 6 | 5 | 36 |
| [database/migrations/0001\_01\_01\_000002\_create\_jobs\_table.php](/database/migrations/0001_01_01_000002_create_jobs_table.php) | PHP | 46 | 6 | 6 | 58 |
| [database/migrations/2025\_08\_26\_100418\_add\_two\_factor\_columns\_to\_users\_table.php](/database/migrations/2025_08_26_100418_add_two_factor_columns_to_users_table.php) | PHP | 25 | 6 | 7 | 38 |
| [database/migrations/2025\_11\_25\_144900\_create\_clientes\_table.php](/database/migrations/2025_11_25_144900_create_clientes_table.php) | PHP | 30 | 6 | 4 | 40 |
| [database/migrations/2025\_11\_25\_150819\_create\_tarjeta\_gift\_cards\_table.php](/database/migrations/2025_11_25_150819_create_tarjeta_gift_cards_table.php) | PHP | 28 | 6 | 5 | 39 |
| [database/migrations/2025\_11\_25\_152709\_create\_movimientos\_table.php](/database/migrations/2025_11_25_152709_create_movimientos_table.php) | PHP | 26 | 6 | 4 | 36 |
| [database/migrations/2025\_11\_26\_222402\_create\_permission\_tables.php](/database/migrations/2025_11_26_222402_create_permission_tables.php) | PHP | 103 | 8 | 24 | 135 |
| [database/seeders/AdminUserSeeder.php](/database/seeders/AdminUserSeeder.php) | PHP | 68 | 8 | 13 | 89 |
| [database/seeders/DatabaseSeeder.php](/database/seeders/DatabaseSeeder.php) | PHP | 13 | 16 | 7 | 36 |
| [database/seeders/DemoDataSeeder.php](/database/seeders/DemoDataSeeder.php) | PHP | 161 | 8 | 13 | 182 |
| [database/seeders/RolesAndPermissionsSeeder.php](/database/seeders/RolesAndPermissionsSeeder.php) | PHP | 95 | 21 | 20 | 136 |
| [eslint.config.js](/eslint.config.js) | JavaScript | 34 | 1 | 2 | 37 |
| [package-lock.json](/package-lock.json) | JSON | 7,986 | 0 | 1 | 7,987 |
| [package.json](/package.json) | JSON | 77 | 0 | 1 | 78 |
| [phpunit.xml](/phpunit.xml) | XML | 35 | 0 | 1 | 36 |
| [public/favicon.svg](/public/favicon.svg) | XML | 3 | 0 | 1 | 4 |
| [public/index.php](/public/index.php) | PHP | 10 | 4 | 7 | 21 |
| [public/logo.svg](/public/logo.svg) | XML | 16 | 0 | 1 | 17 |
| [resources/css/app.css](/resources/css/app.css) | PostCSS | 123 | 0 | 21 | 144 |
| [resources/js/app.tsx](/resources/js/app.tsx) | TypeScript JSX | 29 | 1 | 6 | 36 |
| [resources/js/components/Clientes/ClientesDataTable.tsx](/resources/js/components/Clientes/ClientesDataTable.tsx) | TypeScript JSX | 229 | 1 | 7 | 237 |
| [resources/js/components/Clientes/CreateCliente.tsx](/resources/js/components/Clientes/CreateCliente.tsx) | TypeScript JSX | 182 | 1 | 16 | 199 |
| [resources/js/components/Clientes/EditCliente.tsx](/resources/js/components/Clientes/EditCliente.tsx) | TypeScript JSX | 186 | 1 | 17 | 204 |
| [resources/js/components/Clientes/ShowCliente.tsx](/resources/js/components/Clientes/ShowCliente.tsx) | TypeScript JSX | 95 | 0 | 4 | 99 |
| [resources/js/components/GiftCards/ClientSelector.tsx](/resources/js/components/GiftCards/ClientSelector.tsx) | TypeScript JSX | 37 | 1 | 5 | 43 |
| [resources/js/components/GiftCards/CreateGiftCard.tsx](/resources/js/components/GiftCards/CreateGiftCard.tsx) | TypeScript JSX | 123 | 1 | 11 | 135 |
| [resources/js/components/GiftCards/DataTable.tsx](/resources/js/components/GiftCards/DataTable.tsx) | TypeScript JSX | 206 | 2 | 8 | 216 |
| [resources/js/components/GiftCards/EditGiftCard.tsx](/resources/js/components/GiftCards/EditGiftCard.tsx) | TypeScript JSX | 156 | 1 | 15 | 172 |
| [resources/js/components/GiftCards/QRDialog.tsx](/resources/js/components/GiftCards/QRDialog.tsx) | TypeScript JSX | 92 | 1 | 5 | 98 |
| [resources/js/components/GiftCards/ShowGiftCard.tsx](/resources/js/components/GiftCards/ShowGiftCard.tsx) | TypeScript JSX | 172 | 0 | 9 | 181 |
| [resources/js/components/Movements/MovementsTable.tsx](/resources/js/components/Movements/MovementsTable.tsx) | TypeScript JSX | 341 | 4 | 13 | 358 |
| [resources/js/components/RoleGuard.tsx](/resources/js/components/RoleGuard.tsx) | TypeScript JSX | 57 | 7 | 14 | 78 |
| [resources/js/components/Transactions/TransactionForm.tsx](/resources/js/components/Transactions/TransactionForm.tsx) | TypeScript JSX | 254 | 5 | 18 | 277 |
| [resources/js/components/Users/UsersDataTable.tsx](/resources/js/components/Users/UsersDataTable.tsx) | TypeScript JSX | 127 | 2 | 5 | 134 |
| [resources/js/components/alert-error.tsx](/resources/js/components/alert-error.tsx) | TypeScript JSX | 23 | 0 | 2 | 25 |
| [resources/js/components/app-content.tsx](/resources/js/components/app-content.tsx) | TypeScript JSX | 22 | 0 | 4 | 26 |
| [resources/js/components/app-header.tsx](/resources/js/components/app-header.tsx) | TypeScript JSX | 238 | 2 | 11 | 251 |
| [resources/js/components/app-logo-icon.tsx](/resources/js/components/app-logo-icon.tsx) | TypeScript JSX | 12 | 0 | 2 | 14 |
| [resources/js/components/app-logo.tsx](/resources/js/components/app-logo.tsx) | TypeScript JSX | 15 | 0 | 2 | 17 |
| [resources/js/components/app-shell.tsx](/resources/js/components/app-shell.tsx) | TypeScript JSX | 16 | 0 | 5 | 21 |
| [resources/js/components/app-sidebar-header.tsx](/resources/js/components/app-sidebar-header.tsx) | TypeScript JSX | 17 | 0 | 2 | 19 |
| [resources/js/components/app-sidebar.tsx](/resources/js/components/app-sidebar.tsx) | TypeScript JSX | 60 | 0 | 6 | 66 |
| [resources/js/components/appearance-dropdown.tsx](/resources/js/components/appearance-dropdown.tsx) | TypeScript JSX | 64 | 0 | 4 | 68 |
| [resources/js/components/appearance-tabs.tsx](/resources/js/components/appearance-tabs.tsx) | TypeScript JSX | 26 | 0 | 5 | 31 |
| [resources/js/components/breadcrumbs.tsx](/resources/js/components/breadcrumbs.tsx) | TypeScript JSX | 48 | 0 | 2 | 50 |
| [resources/js/components/delete-user.tsx](/resources/js/components/delete-user.tsx) | TypeScript JSX | 112 | 0 | 9 | 121 |
| [resources/js/components/heading-small.tsx](/resources/js/components/heading-small.tsx) | TypeScript JSX | 16 | 0 | 1 | 17 |
| [resources/js/components/heading.tsx](/resources/js/components/heading.tsx) | TypeScript JSX | 16 | 0 | 1 | 17 |
| [resources/js/components/icon.tsx](/resources/js/components/icon.tsx) | TypeScript JSX | 13 | 0 | 3 | 16 |
| [resources/js/components/input-error.tsx](/resources/js/components/input-error.tsx) | TypeScript JSX | 16 | 0 | 2 | 18 |
| [resources/js/components/nav-footer.tsx](/resources/js/components/nav-footer.tsx) | TypeScript JSX | 52 | 0 | 2 | 54 |
| [resources/js/components/nav-main.tsx](/resources/js/components/nav-main.tsx) | TypeScript JSX | 36 | 0 | 2 | 38 |
| [resources/js/components/nav-user.tsx](/resources/js/components/nav-user.tsx) | TypeScript JSX | 53 | 0 | 3 | 56 |
| [resources/js/components/text-link.tsx](/resources/js/components/text-link.tsx) | TypeScript JSX | 21 | 0 | 3 | 24 |
| [resources/js/components/two-factor-recovery-codes.tsx](/resources/js/components/two-factor-recovery-codes.tsx) | TypeScript JSX | 154 | 0 | 11 | 165 |
| [resources/js/components/two-factor-setup-modal.tsx](/resources/js/components/two-factor-setup-modal.tsx) | TypeScript JSX | 315 | 0 | 24 | 339 |
| [resources/js/components/ui/alert.tsx](/resources/js/components/ui/alert.tsx) | TypeScript JSX | 60 | 0 | 7 | 67 |
| [resources/js/components/ui/avatar.tsx](/resources/js/components/ui/avatar.tsx) | TypeScript JSX | 46 | 0 | 6 | 52 |
| [resources/js/components/ui/badge.tsx](/resources/js/components/ui/badge.tsx) | TypeScript JSX | 41 | 0 | 6 | 47 |
| [resources/js/components/ui/breadcrumb.tsx](/resources/js/components/ui/breadcrumb.tsx) | TypeScript JSX | 99 | 0 | 11 | 110 |
| [resources/js/components/ui/button.tsx](/resources/js/components/ui/button.tsx) | TypeScript JSX | 53 | 0 | 6 | 59 |
| [resources/js/components/ui/card.tsx](/resources/js/components/ui/card.tsx) | TypeScript JSX | 60 | 0 | 9 | 69 |
| [resources/js/components/ui/checkbox.tsx](/resources/js/components/ui/checkbox.tsx) | TypeScript JSX | 27 | 0 | 4 | 31 |
| [resources/js/components/ui/code-display.tsx](/resources/js/components/ui/code-display.tsx) | TypeScript JSX | 22 | 0 | 3 | 25 |
| [resources/js/components/ui/collapsible.tsx](/resources/js/components/ui/collapsible.tsx) | TypeScript JSX | 27 | 0 | 5 | 32 |
| [resources/js/components/ui/dialog.tsx](/resources/js/components/ui/dialog.tsx) | TypeScript JSX | 121 | 0 | 13 | 134 |
| [resources/js/components/ui/dropdown-menu.tsx](/resources/js/components/ui/dropdown-menu.tsx) | TypeScript JSX | 238 | 0 | 18 | 256 |
| [resources/js/components/ui/icon.tsx](/resources/js/components/ui/icon.tsx) | TypeScript JSX | 11 | 0 | 4 | 15 |
| [resources/js/components/ui/input-otp.tsx](/resources/js/components/ui/input-otp.tsx) | TypeScript JSX | 62 | 0 | 8 | 70 |
| [resources/js/components/ui/input.tsx](/resources/js/components/ui/input.tsx) | TypeScript JSX | 18 | 0 | 4 | 22 |
| [resources/js/components/ui/label.tsx](/resources/js/components/ui/label.tsx) | TypeScript JSX | 19 | 0 | 4 | 23 |
| [resources/js/components/ui/navigation-menu.tsx](/resources/js/components/ui/navigation-menu.tsx) | TypeScript JSX | 157 | 0 | 12 | 169 |
| [resources/js/components/ui/placeholder-pattern.tsx](/resources/js/components/ui/placeholder-pattern.tsx) | TypeScript JSX | 17 | 0 | 4 | 21 |
| [resources/js/components/ui/select.tsx](/resources/js/components/ui/select.tsx) | TypeScript JSX | 167 | 0 | 13 | 180 |
| [resources/js/components/ui/separator.tsx](/resources/js/components/ui/separator.tsx) | TypeScript JSX | 23 | 0 | 4 | 27 |
| [resources/js/components/ui/sheet.tsx](/resources/js/components/ui/sheet.tsx) | TypeScript JSX | 125 | 0 | 13 | 138 |
| [resources/js/components/ui/sidebar.tsx](/resources/js/components/ui/sidebar.tsx) | TypeScript JSX | 654 | 13 | 55 | 722 |
| [resources/js/components/ui/skeleton.tsx](/resources/js/components/ui/skeleton.tsx) | TypeScript JSX | 11 | 0 | 3 | 14 |
| [resources/js/components/ui/spinner.tsx](/resources/js/components/ui/spinner.tsx) | TypeScript JSX | 13 | 0 | 4 | 17 |
| [resources/js/components/ui/switch.tsx](/resources/js/components/ui/switch.tsx) | TypeScript JSX | 35 | 0 | 3 | 38 |
| [resources/js/components/ui/table.tsx](/resources/js/components/ui/table.tsx) | TypeScript JSX | 104 | 0 | 11 | 115 |
| [resources/js/components/ui/toggle-group.tsx](/resources/js/components/ui/toggle-group.tsx) | TypeScript JSX | 65 | 0 | 7 | 72 |
| [resources/js/components/ui/toggle.tsx](/resources/js/components/ui/toggle.tsx) | TypeScript JSX | 41 | 0 | 5 | 46 |
| [resources/js/components/ui/tooltip.tsx](/resources/js/components/ui/tooltip.tsx) | TypeScript JSX | 53 | 0 | 7 | 60 |
| [resources/js/components/user-info.tsx](/resources/js/components/user-info.tsx) | TypeScript JSX | 30 | 0 | 3 | 33 |
| [resources/js/components/user-menu-content.tsx](/resources/js/components/user-menu-content.tsx) | TypeScript JSX | 73 | 0 | 5 | 78 |
| [resources/js/hooks/use-appearance.tsx](/resources/js/hooks/use-appearance.tsx) | TypeScript JSX | 58 | 4 | 23 | 85 |
| [resources/js/hooks/use-clipboard.ts](/resources/js/hooks/use-clipboard.ts) | TypeScript | 22 | 1 | 10 | 33 |
| [resources/js/hooks/use-initials.tsx](/resources/js/hooks/use-initials.tsx) | TypeScript JSX | 11 | 0 | 5 | 16 |
| [resources/js/hooks/use-mobile-navigation.ts](/resources/js/hooks/use-mobile-navigation.ts) | TypeScript | 6 | 1 | 2 | 9 |
| [resources/js/hooks/use-mobile.tsx](/resources/js/hooks/use-mobile.tsx) | TypeScript JSX | 15 | 0 | 7 | 22 |
| [resources/js/hooks/use-two-factor-auth.ts](/resources/js/hooks/use-two-factor-auth.ts) | TypeScript | 89 | 0 | 16 | 105 |
| [resources/js/layouts/app-layout.tsx](/resources/js/layouts/app-layout.tsx) | TypeScript JSX | 12 | 0 | 3 | 15 |
| [resources/js/layouts/app/app-header-layout.tsx](/resources/js/layouts/app/app-header-layout.tsx) | TypeScript JSX | 16 | 0 | 2 | 18 |
| [resources/js/layouts/app/app-sidebar-layout.tsx](/resources/js/layouts/app/app-sidebar-layout.tsx) | TypeScript JSX | 20 | 0 | 2 | 22 |
| [resources/js/layouts/auth-layout.tsx](/resources/js/layouts/auth-layout.tsx) | TypeScript JSX | 17 | 0 | 2 | 19 |
| [resources/js/layouts/auth/auth-card-layout.tsx](/resources/js/layouts/auth/auth-card-layout.tsx) | TypeScript JSX | 46 | 0 | 3 | 49 |
| [resources/js/layouts/auth/auth-simple-layout.tsx](/resources/js/layouts/auth/auth-simple-layout.tsx) | TypeScript JSX | 41 | 0 | 4 | 45 |
| [resources/js/layouts/auth/auth-split-layout.tsx](/resources/js/layouts/auth/auth-split-layout.tsx) | TypeScript JSX | 59 | 0 | 4 | 63 |
| [resources/js/layouts/settings/layout.tsx](/resources/js/layouts/settings/layout.tsx) | TypeScript JSX | 80 | 1 | 8 | 89 |
| [resources/js/lib/utils.ts](/resources/js/lib/utils.ts) | TypeScript | 15 | 0 | 4 | 19 |
| [resources/js/pages/Cliente/Movimientos.tsx](/resources/js/pages/Cliente/Movimientos.tsx) | TypeScript JSX | 119 | 3 | 10 | 132 |
| [resources/js/pages/Cliente/Tarjetas.tsx](/resources/js/pages/Cliente/Tarjetas.tsx) | TypeScript JSX | 80 | 0 | 7 | 87 |
| [resources/js/pages/Clientes/Create.tsx](/resources/js/pages/Clientes/Create.tsx) | TypeScript JSX | 37 | 0 | 4 | 41 |
| [resources/js/pages/Clientes/Edit.tsx](/resources/js/pages/Clientes/Edit.tsx) | TypeScript JSX | 38 | 0 | 5 | 43 |
| [resources/js/pages/Clientes/Index.tsx](/resources/js/pages/Clientes/Index.tsx) | TypeScript JSX | 51 | 0 | 6 | 57 |
| [resources/js/pages/Clientes/Show.tsx](/resources/js/pages/Clientes/Show.tsx) | TypeScript JSX | 38 | 0 | 5 | 43 |
| [resources/js/pages/Dashboard/Index.tsx](/resources/js/pages/Dashboard/Index.tsx) | TypeScript JSX | 340 | 11 | 22 | 373 |
| [resources/js/pages/Encargado/AsignarTarjetas.tsx](/resources/js/pages/Encargado/AsignarTarjetas.tsx) | TypeScript JSX | 289 | 5 | 19 | 313 |
| [resources/js/pages/GiftCards/Create.tsx](/resources/js/pages/GiftCards/Create.tsx) | TypeScript JSX | 37 | 0 | 4 | 41 |
| [resources/js/pages/GiftCards/Edit.tsx](/resources/js/pages/GiftCards/Edit.tsx) | TypeScript JSX | 38 | 0 | 5 | 43 |
| [resources/js/pages/GiftCards/Index.tsx](/resources/js/pages/GiftCards/Index.tsx) | TypeScript JSX | 50 | 0 | 6 | 56 |
| [resources/js/pages/GiftCards/Show.tsx](/resources/js/pages/GiftCards/Show.tsx) | TypeScript JSX | 38 | 0 | 5 | 43 |
| [resources/js/pages/Movements/Index.tsx](/resources/js/pages/Movements/Index.tsx) | TypeScript JSX | 72 | 1 | 7 | 80 |
| [resources/js/pages/Transactions/Index.tsx](/resources/js/pages/Transactions/Index.tsx) | TypeScript JSX | 32 | 0 | 4 | 36 |
| [resources/js/pages/Users/Edit.tsx](/resources/js/pages/Users/Edit.tsx) | TypeScript JSX | 136 | 0 | 14 | 150 |
| [resources/js/pages/Users/Index.tsx](/resources/js/pages/Users/Index.tsx) | TypeScript JSX | 42 | 1 | 6 | 49 |
| [resources/js/pages/auth/confirm-password.tsx](/resources/js/pages/auth/confirm-password.tsx) | TypeScript JSX | 46 | 0 | 5 | 51 |
| [resources/js/pages/auth/forgot-password.tsx](/resources/js/pages/auth/forgot-password.tsx) | TypeScript JSX | 61 | 1 | 8 | 70 |
| [resources/js/pages/auth/login.tsx](/resources/js/pages/auth/login.tsx) | TypeScript JSX | 112 | 0 | 9 | 121 |
| [resources/js/pages/auth/register.tsx](/resources/js/pages/auth/register.tsx) | TypeScript JSX | 108 | 0 | 8 | 116 |
| [resources/js/pages/auth/reset-password.tsx](/resources/js/pages/auth/reset-password.tsx) | TypeScript JSX | 87 | 0 | 8 | 95 |
| [resources/js/pages/auth/two-factor-challenge.tsx](/resources/js/pages/auth/two-factor-challenge.tsx) | TypeScript JSX | 123 | 0 | 9 | 132 |
| [resources/js/pages/auth/verify-email.tsx](/resources/js/pages/auth/verify-email.tsx) | TypeScript JSX | 39 | 1 | 5 | 45 |
| [resources/js/pages/dashboard.tsx](/resources/js/pages/dashboard.tsx) | TypeScript JSX | 34 | 0 | 3 | 37 |
| [resources/js/pages/settings/appearance.tsx](/resources/js/pages/settings/appearance.tsx) | TypeScript JSX | 29 | 0 | 6 | 35 |
| [resources/js/pages/settings/password.tsx](/resources/js/pages/settings/password.tsx) | TypeScript JSX | 129 | 0 | 18 | 147 |
| [resources/js/pages/settings/profile.tsx](/resources/js/pages/settings/profile.tsx) | TypeScript JSX | 132 | 0 | 17 | 149 |
| [resources/js/pages/settings/two-factor.tsx](/resources/js/pages/settings/two-factor.tsx) | TypeScript JSX | 129 | 0 | 9 | 138 |
| [resources/js/pages/welcome.tsx](/resources/js/pages/welcome.tsx) | TypeScript JSX | 806 | 0 | 3 | 809 |
| [resources/js/ssr.tsx](/resources/js/ssr.tsx) | TypeScript JSX | 20 | 0 | 3 | 23 |
| [resources/js/types/giftCard.ts](/resources/js/types/giftCard.ts) | TypeScript | 61 | 1 | 6 | 68 |
| [resources/js/types/index.d.ts](/resources/js/types/index.d.ts) | TypeScript | 41 | 0 | 7 | 48 |
| [resources/js/types/vite-env.d.ts](/resources/js/types/vite-env.d.ts) | TypeScript | 0 | 1 | 1 | 2 |
| [resources/views/app.blade.php](/resources/views/app.blade.php) | PHP | 40 | 0 | 10 | 50 |
| [routes/console.php](/routes/console.php) | PHP | 6 | 0 | 3 | 9 |
| [routes/settings.php](/routes/settings.php) | PHP | 21 | 0 | 8 | 29 |
| [routes/web.php](/routes/web.php) | PHP | 62 | 15 | 18 | 95 |
| [tests/Feature/Auth/AuthenticationTest.php](/tests/Feature/Auth/AuthenticationTest.php) | PHP | 62 | 0 | 22 | 84 |
| [tests/Feature/Auth/EmailVerificationTest.php](/tests/Feature/Auth/EmailVerificationTest.php) | PHP | 67 | 0 | 25 | 92 |
| [tests/Feature/Auth/PasswordConfirmationTest.php](/tests/Feature/Auth/PasswordConfirmationTest.php) | PHP | 15 | 0 | 7 | 22 |
| [tests/Feature/Auth/PasswordResetTest.php](/tests/Feature/Auth/PasswordResetTest.php) | PHP | 51 | 0 | 22 | 73 |
| [tests/Feature/Auth/RegistrationTest.php](/tests/Feature/Auth/RegistrationTest.php) | PHP | 15 | 0 | 4 | 19 |
| [tests/Feature/Auth/TwoFactorChallengeTest.php](/tests/Feature/Auth/TwoFactorChallengeTest.php) | PHP | 35 | 0 | 10 | 45 |
| [tests/Feature/Auth/VerificationNotificationTest.php](/tests/Feature/Auth/VerificationNotificationTest.php) | PHP | 24 | 0 | 9 | 33 |
| [tests/Feature/DashboardTest.php](/tests/Feature/DashboardTest.php) | PHP | 9 | 0 | 4 | 13 |
| [tests/Feature/ExampleTest.php](/tests/Feature/ExampleTest.php) | PHP | 5 | 0 | 3 | 8 |
| [tests/Feature/Settings/PasswordUpdateTest.php](/tests/Feature/Settings/PasswordUpdateTest.php) | PHP | 39 | 0 | 11 | 50 |
| [tests/Feature/Settings/ProfileUpdateTest.php](/tests/Feature/Settings/ProfileUpdateTest.php) | PHP | 64 | 0 | 21 | 85 |
| [tests/Feature/Settings/TwoFactorAuthenticationTest.php](/tests/Feature/Settings/TwoFactorAuthenticationTest.php) | PHP | 61 | 0 | 18 | 79 |
| [tests/Pest.php](/tests/Pest.php) | PHP | 10 | 31 | 7 | 48 |
| [tests/TestCase.php](/tests/TestCase.php) | PHP | 6 | 1 | 4 | 11 |
| [tests/Unit/ExampleTest.php](/tests/Unit/ExampleTest.php) | PHP | 4 | 0 | 1 | 5 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 21 | 88 | 9 | 118 |
| [vite.config.ts](/vite.config.ts) | TypeScript | 26 | 0 | 2 | 28 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)