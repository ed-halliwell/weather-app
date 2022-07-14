export interface ICurrentWeather {
  name: string;
  dt: string;
  wind: {
    speed: number;
    deg: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  main: {
    feels_like: number;
    temp: number;
  };
}

export interface PlaceNameContext {
  id: string;
  text: string;
  wikidata: string;
  short_code?: string;
}

export interface geoDataResponse {
  data: {
    features: [
      {
        text: string;
        context: [
          {
            id: string;
            text: string;
          }
        ];
      }
    ];
  };
}

export interface DailyForecast {
  date: string;
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  feels_like: {
    day: number;
    eve: number;
    morn: number;
    night: number;
  };
  weather: {
    description: string;
    main: string;
  };
  wind: {
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
  };
}
