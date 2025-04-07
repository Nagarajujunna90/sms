import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';  // ✅ Use this instead of HttpClientModule

bootstrapApplication(AppComponent, {
  providers: [    provideHttpClient(), // ✅ Provide HttpClient
    provideRouter(routes)]
}).catch(err => console.error(err));
