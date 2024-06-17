declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      GOOGLE_API_KEY: string;
      WEATHER_API_KEY: string;
      DEFAULT_ZIP: string;
    }
  }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};