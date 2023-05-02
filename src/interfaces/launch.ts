interface Rocket {
  rocket_name: string;
  rocket_type: string;
}

export interface Launch {
  id: string;
  mission_name: string;
  launch_date_unix: number;
  launch_date_local: string;
  launch_date_utc: string;
  rocket_name: string;
  rocket_type: string;
  rocket: Rocket;
}
