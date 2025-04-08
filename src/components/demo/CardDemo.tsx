
import React from "react";
import Heading from "../ui/typography/Heading";
import Text from "../ui/typography/Text";
import Container from "../ui/layout/Container";
import Section from "../ui/layout/Section";
import { CardNew, CardNewHeader, CardNewContent, CardNewFooter, CardNewMedia, CardNewTitle, CardNewDescription } from "../ui/CardNew";
import { ButtonNew } from "../ui/ButtonNew";
import Grid from "../ui/layout/Grid";
import { Calendar, ArrowRight, User } from "lucide-react";

const CardDemo: React.FC = () => {
  return (
    <Section spacing="xl">
      <Container>
        <Heading level={1} className="mb-12">Card System</Heading>
        
        <div className="space-y-16">
          {/* Card Elevations */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Card Elevations</Heading>
            <Grid columns={{ default: 1, sm: 2, md: 3, lg: 5 }}>
              <div className="space-y-2">
                <CardNew elevation="flat" className="h-32 flex items-center justify-center">
                  <Text weight="semibold">Flat</Text>
                </CardNew>
                <Text size="small" color="muted" className="text-center">Border only, no shadow</Text>
              </div>
              
              <div className="space-y-2">
                <CardNew elevation="sm" className="h-32 flex items-center justify-center">
                  <Text weight="semibold">Shadow SM</Text>
                </CardNew>
                <Text size="small" color="muted" className="text-center">Light shadow, subtle elevation</Text>
              </div>
              
              <div className="space-y-2">
                <CardNew elevation="md" className="h-32 flex items-center justify-center">
                  <Text weight="semibold">Shadow MD</Text>
                </CardNew>
                <Text size="small" color="muted" className="text-center">Medium shadow, standard elevation</Text>
              </div>
              
              <div className="space-y-2">
                <CardNew elevation="lg" className="h-32 flex items-center justify-center">
                  <Text weight="semibold">Shadow LG</Text>
                </CardNew>
                <Text size="small" color="muted" className="text-center">Large shadow, higher elevation</Text>
              </div>
              
              <div className="space-y-2">
                <CardNew elevation="xl" className="h-32 flex items-center justify-center">
                  <Text weight="semibold">Shadow XL</Text>
                </CardNew>
                <Text size="small" color="muted" className="text-center">Extra large shadow, highest elevation</Text>
              </div>
            </Grid>
          </div>
          
          {/* Card with Hover Effect */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Card with Hover Effect</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <CardNew hoverEffect elevation="sm">
                <CardNewContent>
                  <CardNewTitle>Hover Effect Card</CardNewTitle>
                  <CardNewDescription>This card animates on hover, lifting slightly with an increased shadow.</CardNewDescription>
                </CardNewContent>
              </CardNew>
              
              <CardNew hoverEffect elevation="md">
                <CardNewContent>
                  <CardNewTitle>Hover Effect Card</CardNewTitle>
                  <CardNewDescription>Medium elevation card with hover animation effect.</CardNewDescription>
                </CardNewContent>
              </CardNew>
              
              <CardNew hoverEffect elevation="lg">
                <CardNewContent>
                  <CardNewTitle>Hover Effect Card</CardNewTitle>
                  <CardNewDescription>Large elevation card with hover animation effect.</CardNewDescription>
                </CardNewContent>
              </CardNew>
            </div>
          </div>
          
          {/* News Card Example */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">News Card Example</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <CardNew key={item} hoverEffect>
                  <CardNewMedia>
                    <img 
                      src="https://placehold.co/600x400" 
                      alt="News article thumbnail" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-primary text-xs font-semibold px-2 py-1 rounded">
                      NEWS
                    </div>
                  </CardNewMedia>
                  <CardNewContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={14} className="text-gray" />
                      <Text size="xs" color="muted">May 15, 2023</Text>
                    </div>
                    <CardNewTitle>Banks o' Dee FC signs new sponsorship deal</CardNewTitle>
                    <CardNewDescription className="line-clamp-2">
                      The club is proud to announce a major new sponsorship deal that will boost our facilities and community programs.
                    </CardNewDescription>
                    <ButtonNew variant="tertiary" size="sm" iconRight={<ArrowRight size={16} />} className="mt-4">
                      Read More
                    </ButtonNew>
                  </CardNewContent>
                </CardNew>
              ))}
            </div>
          </div>
          
          {/* Match Card Example */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Match Card Example</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <CardNew elevation="md" hoverEffect>
                <CardNewHeader className="bg-primary text-white">
                  <div className="text-center">
                    <Text size="small" weight="semibold" color="white">Scottish Cup</Text>
                    <Text size="xs" color="white">Quarter Final</Text>
                  </div>
                </CardNewHeader>
                <CardNewContent>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-light-gray rounded-full flex items-center justify-center">
                        <span className="font-bold">BD</span>
                      </div>
                      <Text weight="bold" className="mt-2">Banks o' Dee</Text>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-light-gray px-3 py-2 rounded-md">
                        <Heading level={3}>3 - 1</Heading>
                      </div>
                      <Text size="xs" color="muted" className="mt-1">Full Time</Text>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-light-gray rounded-full flex items-center justify-center">
                        <span className="font-bold">FC</span>
                      </div>
                      <Text weight="bold" className="mt-2">Formartine Utd</Text>
                    </div>
                  </div>
                </CardNewContent>
                <CardNewFooter className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <Calendar size={14} className="text-gray" />
                    <Text size="small" color="muted">May 7, 2023 • Spain Park Stadium</Text>
                  </div>
                  <ButtonNew variant="primary" size="sm" className="w-full mt-2">
                    Match Report
                  </ButtonNew>
                </CardNewFooter>
              </CardNew>
              
              <CardNew elevation="md" hoverEffect>
                <CardNewHeader className="bg-light-gray">
                  <div className="text-center">
                    <Text size="small" weight="semibold">Highland League</Text>
                    <Text size="xs" color="muted">Matchday 28</Text>
                  </div>
                </CardNewHeader>
                <CardNewContent>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-light-gray rounded-full flex items-center justify-center">
                        <span className="font-bold">BD</span>
                      </div>
                      <Text weight="bold" className="mt-2">Banks o' Dee</Text>
                    </div>
                    
                    <div className="text-center">
                      <div className="px-3 py-2">
                        <Heading level={5}>VS</Heading>
                      </div>
                      <Text size="xs" color="accent" weight="bold" className="mt-1">UPCOMING</Text>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-light-gray rounded-full flex items-center justify-center">
                        <span className="font-bold">BFC</span>
                      </div>
                      <Text weight="bold" className="mt-2">Buckie FC</Text>
                    </div>
                  </div>
                </CardNewContent>
                <CardNewFooter className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <Calendar size={14} className="text-gray" />
                    <Text size="small" color="muted">May 21, 2023 • 15:00 • Spain Park Stadium</Text>
                  </div>
                  <ButtonNew variant="accent" size="sm" className="w-full mt-2">
                    Get Tickets
                  </ButtonNew>
                </CardNewFooter>
              </CardNew>
              
              <CardNew elevation="md" hoverEffect>
                <CardNewHeader className="bg-light-gray">
                  <div className="text-center">
                    <Text size="small" weight="semibold">Scottish Cup</Text>
                    <Text size="xs" color="muted">Semi Final</Text>
                  </div>
                </CardNewHeader>
                <CardNewContent>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-light-gray rounded-full flex items-center justify-center">
                        <span className="font-bold">RFC</span>
                      </div>
                      <Text weight="bold" className="mt-2">Rangers FC</Text>
                    </div>
                    
                    <div className="text-center">
                      <div className="px-3 py-2">
                        <Heading level={5}>VS</Heading>
                      </div>
                      <Text size="xs" color="accent" weight="bold" className="mt-1">UPCOMING</Text>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-light-gray rounded-full flex items-center justify-center">
                        <span className="font-bold">BD</span>
                      </div>
                      <Text weight="bold" className="mt-2">Banks o' Dee</Text>
                    </div>
                  </div>
                </CardNewContent>
                <CardNewFooter className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <Calendar size={14} className="text-gray" />
                    <Text size="small" color="muted">June 5, 2023 • 19:45 • Hampden Park</Text>
                  </div>
                  <ButtonNew variant="accent" size="sm" className="w-full mt-2">
                    Get Tickets
                  </ButtonNew>
                </CardNewFooter>
              </CardNew>
            </div>
          </div>
          
          {/* Player Card Example */}
          <div className="space-y-6">
            <Heading level={2} className="pb-2 border-b border-medium-gray">Player Card Example</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <CardNew key={item} hoverEffect>
                  <CardNewMedia aspectRatio="1/1" className="bg-gradient-to-b from-primary to-primary-light">
                    <img 
                      src="https://placehold.co/400x600/FFFFFF/00105A" 
                      alt="Player photo" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-0 w-full py-4 bg-gradient-to-t from-primary to-transparent">
                      <div className="text-center">
                        <Text weight="bold" color="white" className="text-2xl">14</Text>
                      </div>
                    </div>
                  </CardNewMedia>
                  <CardNewContent>
                    <CardNewTitle className="text-center">Jamie Buglass</CardNewTitle>
                    <Text size="small" color="muted" className="text-center">Midfielder</Text>
                    
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="text-center border-r border-medium-gray">
                        <Text weight="bold" size="small">28</Text>
                        <Text size="xs" color="muted">Apps</Text>
                      </div>
                      <div className="text-center border-r border-medium-gray">
                        <Text weight="bold" size="small">12</Text>
                        <Text size="xs" color="muted">Goals</Text>
                      </div>
                      <div className="text-center">
                        <Text weight="bold" size="small">7</Text>
                        <Text size="xs" color="muted">Assists</Text>
                      </div>
                    </div>
                  </CardNewContent>
                  <CardNewFooter className="flex justify-center">
                    <ButtonNew 
                      variant="tertiary" 
                      size="sm" 
                      iconRight={<User size={14} />}
                    >
                      Player Profile
                    </ButtonNew>
                  </CardNewFooter>
                </CardNew>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default CardDemo;
