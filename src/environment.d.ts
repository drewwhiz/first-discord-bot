declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      GOOGLE_API_KEY: string;
      WEATHER_API_KEY: string;
      DEFAULT_ZIP: string;
      RESTRICTED_CHANNEL: string;
      MOD_REPORT_CHANNEL: string;
      SERIOUS_CHANNELS: string;
    }
  }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};