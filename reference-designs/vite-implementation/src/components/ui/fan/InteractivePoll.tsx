
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Text from "@/components/ui/typography/Text";
import Heading from "@/components/ui/typography/Heading";
import { ButtonNew } from "@/components/ui/ButtonNew";
import { polls } from "@/mock-data/fanContentData";

interface InteractivePollProps {
  className?: string;
  pollId?: number;
}

const InteractivePoll: React.FC<InteractivePollProps> = ({ 
  className,
  pollId = 1 // Default to first poll
}) => {
  // Get the poll data based on the ID, or use the first one as fallback
  const pollData = polls.find(poll => poll.id === pollId) || polls[0];
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(() => 
    pollData.options.map(option => option.votes)
  );
  
  const totalVotes = votes.reduce((acc, curr) => acc + curr, 0);
  
  const handleVote = () => {
    if (selectedOption !== null) {
      const newVotes = [...votes];
      newVotes[selectedOption] = newVotes[selectedOption] + 1;
      setVotes(newVotes);
      setHasVoted(true);
    }
  };
  
  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col",
        className
      )}
    >
      <div className="p-6 flex flex-col h-full">
        <Heading level={4} className="mb-4">{pollData.question}</Heading>
        
        {!hasVoted ? (
          <>
            <form className="space-y-3 flex-grow">
              {pollData.options.map((option, index) => (
                <div 
                  key={option.id}
                  className="flex items-center"
                >
                  <div 
                    onClick={() => setSelectedOption(index)}
                    className={cn(
                      "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center cursor-pointer transition-colors",
                      selectedOption === index 
                        ? "border-primary bg-primary" 
                        : "border-gray hover:border-primary-light"
                    )}
                  >
                    {selectedOption === index && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <label 
                    className="cursor-pointer flex-grow"
                    onClick={() => setSelectedOption(index)}
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </form>
            
            <div className="mt-6">
              <ButtonNew 
                variant="accent" 
                disabled={selectedOption === null}
                onClick={handleVote}
                className="w-full"
              >
                Submit Vote
              </ButtonNew>
            </div>
          </>
        ) : (
          <div className="space-y-4 flex-grow">
            {pollData.options.map((option, index) => {
              const percentage = Math.round((votes[index] / totalVotes) * 100);
              
              return (
                <div key={option.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{option.text}</span>
                    <span className="font-bold">{percentage}%</span>
                  </div>
                  <div className="w-full bg-light-gray rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
            
            <Text size="small" color="muted" className="mt-4 text-center">
              Total votes: {totalVotes}
            </Text>
            
            <div className="mt-4">
              <ButtonNew 
                variant="tertiary"
                onClick={() => {
                  setHasVoted(false);
                  setSelectedOption(null);
                }}
                size="sm"
                className="w-full"
              >
                Vote Again
              </ButtonNew>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractivePoll;
