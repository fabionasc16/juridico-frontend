export let environment = {
  production: true,
  NODE_ENV: "production",
  BASE_URL:'https://sistemas.saude.am.gov.br/sapej/',
  apiURL: "https://sistemas.saude.am.gov.br/sapej-backend/api",  
  apiURLSSO: "https://sistemas.saude.am.gov.br/sapej-backend/api/v1",
  timerUpdateRefreshToken: 1000 * 60 * 20 //20min,
};
