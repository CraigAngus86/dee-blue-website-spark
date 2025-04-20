import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/layout/Container";
import Section from "@/components/ui/layout/Section";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import ClubLogo from "@/components/ui/image/ClubLogo";
import ResponsiveImage from "@/components/ui/image/ResponsiveImage";
import { 
  getCompetitorLogo, 
  getNewsImage, 
  getPlayerImage, 
  getTeamImage, 
  getStadiumImage,
  getMatchDayImage,
  getSponsorLogo,
  getPlaceholderImage
} from "@/lib/image";

const ImageUtilsDemo: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <Container>
          <Heading level={1} className="mb-6">Image Utilities Demo</Heading>
          <Text className="mb-8">Testing the image utility functions and components.</Text>
          
          <Section>
            <Heading level={2} className="mb-4">Club Logos</Heading>
            <div className="flex flex-wrap gap-8 mb-12">
              <div className="p-4 bg-white rounded-md shadow-sm">
                <Text className="mb-2">Dark Logo</Text>
                <ClubLogo background="dark" size="lg" />
              </div>
              <div className="p-4 bg-primary rounded-md shadow-sm">
                <Text className="mb-2 text-white">Light Logo</Text>
                <ClubLogo background="light" size="lg" />
              </div>
            </div>
          </Section>
          
          <Section>
            <Heading level={2} className="mb-4">Competitor Logos</Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {['Buckie', 'Brora', 'Formartine', 'Fraserburgh'].map((team) => (
                <div key={team} className="flex flex-col items-center">
                  <div className="w-20 h-20 flex items-center justify-center bg-white p-2 rounded-full shadow-sm mb-2">
                    <ResponsiveImage
                      src={getCompetitorLogo(team)}
                      alt={`${team} logo`}
                      className="max-h-full"
                      objectFit="contain"
                    />
                  </div>
                  <Text size="small">{team}</Text>
                </div>
              ))}
            </div>
          </Section>
          
          <Section>
            <Heading level={2} className="mb-4">News Images</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="overflow-hidden rounded-md shadow-sm">
                  <ResponsiveImage
                    src={getNewsImage(index)}
                    alt={`News ${index + 1}`}
                    aspectRatio="4/3"
                    className="w-full"
                  />
                  <div className="p-2 bg-white">
                    <Text size="small">News Image {index + 1}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Section>
          
          <Section>
            <Heading level={2} className="mb-4">Player Images</Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {['Ewen', 'Gilly', 'Hamish', 'Jevan', 'Lachie', 'Laws', 'Luke', 'Mags'].map((player) => (
                <div key={player} className="flex flex-col items-center">
                  <div className="overflow-hidden rounded-md shadow-sm w-32">
                    <ResponsiveImage
                      src={getPlayerImage(player)}
                      alt={player}
                      aspectRatio="3/4"
                      rounded="md"
                    />
                  </div>
                  <Text size="small" className="mt-2">{player}</Text>
                </div>
              ))}
            </div>
          </Section>
          
          <Section>
            <Heading level={2} className="mb-4">Team Images</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="overflow-hidden rounded-md shadow-sm">
                  <ResponsiveImage
                    src={getTeamImage(index)}
                    alt={`Team Image ${index}`}
                    aspectRatio={index === 0 ? "16/9" : "1/1"}
                    rounded="md"
                  />
                  <div className="p-2 bg-white">
                    <Text size="small">{index === 0 ? "Squad Photo" : `Training Photo ${index}`}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Section>
          
          <Section>
            <Heading level={2} className="mb-4">Stadium Image</Heading>
            <div className="overflow-hidden rounded-md shadow-sm max-w-3xl mb-12">
              <ResponsiveImage
                src={getStadiumImage()}
                alt="Spain Park Stadium"
                aspectRatio="16/9"
                rounded="md"
                shadow="md"
              />
              <div className="p-2 bg-white">
                <Text size="small">Spain Park Stadium</Text>
              </div>
            </div>
          </Section>
          
          <Section>
            <Heading level={2} className="mb-4">Matchday Image</Heading>
            <div className="overflow-hidden rounded-md shadow-sm max-w-3xl mb-12">
              <ResponsiveImage
                src={getMatchDayImage()}
                alt="Match Day"
                aspectRatio="16/9"
                rounded="md"
                shadow="md"
              />
              <div className="p-2 bg-white">
                <Text size="small">Match Day Image</Text>
              </div>
            </div>
          </Section>
          
          <Section>
            <Heading level={2} className="mb-4">Sponsor Logos</Heading>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {['AD23', 'BJK', 'GDI', 'Global', 'Three60', 'Saltire'].map((sponsor) => (
                <div key={sponsor} className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-md shadow-sm w-full h-32 flex items-center justify-center">
                    <ResponsiveImage
                      src={getSponsorLogo(sponsor)}
                      alt={`${sponsor} logo`}
                      className="max-h-20"
                      objectFit="contain"
                    />
                  </div>
                  <Text size="small" className="mt-2">{sponsor}</Text>
                </div>
              ))}
            </div>
          </Section>
          
          <Section>
            <Heading level={2} className="mb-4">Placeholder Images</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <ResponsiveImage
                src={getPlaceholderImage(400, 300, "Player")}
                alt="Placeholder for player"
                rounded="md"
                shadow="sm"
              />
              <ResponsiveImage
                src={getPlaceholderImage(400, 300, "News")}
                alt="Placeholder for news"
                rounded="md"
                shadow="sm"
              />
              <ResponsiveImage
                src={getPlaceholderImage(400, 300, "Match")}
                alt="Placeholder for match"
                rounded="md"
                shadow="sm"
              />
            </div>
          </Section>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImageUtilsDemo;
