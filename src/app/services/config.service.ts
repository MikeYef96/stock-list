import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configLoaded = signal(false);
  rapidApiKey = signal('');
  rapidApiHost = signal('');

  constructor(private http: HttpClient) {}

  async loadConfig(): Promise<void> {
    try {
      const config = await firstValueFrom(
        this.http.get<{ rapidApiKey: string; rapidApiHost: string }>(
          `${environment.baseUrl}/config`
        )
      );
      console.log('✅ Config loaded from backend');
      this.rapidApiKey.set(config.rapidApiKey);
      this.rapidApiHost.set(config.rapidApiHost);
      this.configLoaded.set(true);
    } catch (error) {
      console.error('❌ Failed to load config:', error);
    }
  }
}
