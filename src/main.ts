import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
    enableProdMode();
}

function bootstrap() {
    platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err));
}

if (document.readyState === 'complete') {
    bootstrap();
} else {
    document.addEventListener('DOMContentLoaded', bootstrap);
}
