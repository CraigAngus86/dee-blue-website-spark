
interface ComparisonFeature {
  name: string;
  matchDaySponsor: boolean | string;
  matchBallSponsor: boolean | string;
  standardHospitality: boolean | string;
  isPremium?: boolean;
}

export const comparisonData: ComparisonFeature[] = [
  {
    name: "Number of Guests",
    matchDaySponsor: "10",
    matchBallSponsor: "8",
    standardHospitality: "1",
  },
  {
    name: "Arrival Time",
    matchDaySponsor: "2 hours before kick-off",
    matchBallSponsor: "90 mins before kick-off",
    standardHospitality: "1 hour before kick-off",
  },
  {
    name: "Complimentary Drinks Package",
    matchDaySponsor: true,
    matchBallSponsor: true,
    standardHospitality: false,
    isPremium: true,
  },
  {
    name: "Food Service",
    matchDaySponsor: "Three-course meal",
    matchBallSponsor: "Two-course meal",
    standardHospitality: "One-course meal",
  },
  {
    name: "Boardroom Access",
    matchDaySponsor: true,
    matchBallSponsor: false,
    standardHospitality: false,
    isPremium: true,
  },
  {
    name: "Man of the Match Selection",
    matchDaySponsor: true,
    matchBallSponsor: false,
    standardHospitality: false,
    isPremium: true,
  },
  {
    name: "Programme Recognition",
    matchDaySponsor: true,
    matchBallSponsor: true,
    standardHospitality: false,
  },
  {
    name: "Social Media Promotion",
    matchDaySponsor: true,
    matchBallSponsor: true,
    standardHospitality: false,
  },
];

export const packagePrices = {
  matchDaySponsor: "£1,000",
  matchBallSponsor: "£800",
  standardHospitality: "£90 per head"
};
