export class TeamLogoMapper {
  private logoMap: Record<string, string> = {
    ARI: "arizona-cardinals-logo-transparent.png",
    ATL: "atlanta-falcons-logo-transparent.png",
    BAL: "baltimore-ravens-logo-transparent.png",
    BUF: "buffalo-bills-logo-transparent.png",
    CAR: "carolina-panthers-logo-transparent.png",
    CHI: "chicago-bears-logo-transparent.png",
    CIN: "cincinnati-bengals-logo-transparent.png",
    CLE: "cleveland-browns-logo-transparent.png",
    DAL: "dallas-cowboys-logo-transparent.png",
    DEN: "denver-broncos-logo-transparent.png",
    DET: "detroit-lions-logo-transparent.png",
    GB: "green-bay-packers-logo-transparent.png",
    HOU: "houston-texans-logo-transparent.png",
    IND: "indianapolis-colts-logo-transparent.png",
    JAX: "jacksonville-jaguars-logo-transparent.png",
    KC: "kansas-city-chiefs-logo-transparent.png",
    LAC: "los-angeles-chargers-logo-transparent.png",
    LAR: "los-angeles-rams-logo-transparent.png",
    LV: "las-vegas-raiders-logo-transparent.png",
    MIA: "miami-dolphins-logo-transparent.png",
    MIN: "minnesota-vikings-logo-transparent.png",
    NE: "new-england-patriots-logo-transparent.png",
    NO: "new-orleans-saints-logo-transparent.png",
    NYG: "new-york-giants-logo-transparent.png",
    NYJ: "new-york-jets-logo-transparent.png",
    PHI: "philadelphia-eagles-logo-transparent.png",
    PIT: "pittsburgh-steelers-logo-transparent.png",
    SEA: "seattle-seahawks-logo-transparent.png",
    SF: "san-francisco-49ers-logo-transparent.png",
    TB: "tampa-bay-buccaneers-logo-transparent.png",
    TEN: "tennessee-titans-logo-transparent.png",
    WAS: "washington-commanders-logo-transparent.png",
  };

  public getTeamLogoPaths(): Record<string, string> {
    return this.logoMap;
  }
}
