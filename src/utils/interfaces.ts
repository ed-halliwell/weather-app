export interface IWeather {
  name: string;
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
