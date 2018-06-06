import { Injectable } from '@angular/core';
import { Log } from 'ng2-logger';
import { BehaviorSubject } from 'rxjs';

/*
  Note: all API methods in this particular service should follow the following name format:
  api_...._janus()
*/
@Injectable()
export class JanusService {

  /*  General   */
  private log_j: any = Log.create('janus.service');

  /* constants */
  private server: string = "https://janus.conf.meetecho.com/janus";

  /* Janus handlers */
  public janus: any;

  /*
    Life keeps track of the Janus state.
    false = uninitialized
    true = success

    on error = error
    on complete = error or destroyed
  */
  public life_j = new BehaviorSubject(false);

  constructor(janusServer: string) {
    try {
      this.api_initialize_janus(janusServer);
    } catch (error) {
      console.log("Janus service error: " + error);      
    }
  }

  api_initialize_janus(server?: string) {
    if (server) {
      this.log_j.d(`Setting server = ${server}`);
      this.server = server;
    } // else use default
 
    // Initialize the library (all console debuggers enabled)
    Janus.init({ debug: "all", callback: this.janus_initialized.bind(this) });

  }

  janus_initialized(): void {
    this.log_j.d("initialized janus");
    this.janus_startSession();
  }

  janus_startSession(): void {
    // Create session
    this.janus = new Janus(
      {
        server: this.server,
        success: this.janus_signal_ready_for_plugins.bind(this),
        error: this.janus_signal_error.bind(this),
        destroyed: this.janus_signal_destroyed.bind(this)
      });
  }

  janus_signal_ready_for_plugins(): void {
    this.life_j.next(true);
  }

  janus_signal_error(error): void {
    Janus.error(error);
    this.life_j.error(error);
  }

  janus_signal_destroyed(): void {
    Janus.log("Janus connection destoyed!");
    this.life_j.complete();
  }

  api_destroy_janus() {
    this.janus.destroy();
  }
}
