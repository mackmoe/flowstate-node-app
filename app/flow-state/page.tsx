import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";
import Callout from "@/components/Callout";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Flow State — FlowState FM",
  description: "The science behind deep focus and optimal performance. Learn how FlowState FM helps you achieve peak productivity.",
  openGraph: {
    title: "Flow State — FlowState FM",
    description: "The science behind deep focus and optimal performance.",
  },
};

const principles = [
  {
    title: "Clear Goals",
    description: "Know exactly what you're working toward. Ambiguity disrupts flow.",
  },
  {
    title: "Immediate Feedback",
    description: "Real-time awareness of your progress keeps you locked in.",
  },
  {
    title: "Challenge-Skill Balance",
    description: "The task must stretch you without overwhelming. The sweet spot.",
  },
  {
    title: "Elimination of Distractions",
    description: "Your environment must support singular focus. No interruptions.",
  },
];

const readingList = [
  {
    title: "Flow: The Psychology of Optimal Experience",
    author: "Mihaly Csikszentmihalyi",
    year: "1990",
  },
  {
    title: "Deep Work: Rules for Focused Success",
    author: "Cal Newport",
    year: "2016",
  },
  {
    title: "The Rise of Superman",
    author: "Steven Kotler",
    year: "2014",
  },
  {
    title: "Stealing Fire",
    author: "Steven Kotler & Jamie Wheal",
    year: "2017",
  },
];

export default function FlowStatePage() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <Container size="md">
        {/* Header */}
        <SectionHeader
          title="Flow State"
          subtitle="Understanding the neuroscience of deep work and optimal performance."
          accent="pink"
          centered
        />
        
        {/* Introduction */}
        <div className="mb-16">
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Flow state is a mental condition where you're fully immersed in an activity, 
              experiencing heightened focus, creativity, and productivity. Time distorts. 
              Self-consciousness fades. You and the task become one.
            </p>
            
            <p className="text-lg text-gray-400 leading-relaxed">
              First documented by psychologist Mihaly Csikszentmihalyi in the 1970s, 
              flow represents peak human performance—a state where your brain operates 
              at maximum efficiency with minimum effort.
            </p>
          </div>
        </div>
        
        {/* Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">
            The Four Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card hover={false} className="border-l-4 border-brand-cyan h-full">
                  <h3 className="text-xl font-bold mb-3">{principle.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{principle.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
        
        {/* How FlowState FM Helps */}
        <div className="mb-16">
          <Callout variant="info" className="text-center">
            <h3 className="text-2xl font-serif font-bold mb-3">How FlowState FM Helps</h3>
            <p className="text-gray-300 leading-relaxed">
              Our curated soundscapes eliminate auditory distractions while providing 
              subtle rhythmic structure that guides your brain into alpha and theta wave states—
              the neurological signature of flow.
            </p>
          </Callout>
        </div>
        
        {/* Reading List */}
        <div>
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">
            Essential Reading
          </h2>
          <Card hover={false}>
            <ul className="space-y-4">
              {readingList.map((book, index) => (
                <li key={index} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{book.title}</h4>
                    <p className="text-sm text-gray-400">
                      {book.author} • {book.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          
          <p className="text-sm text-gray-500 text-center mt-6">
            No medical claims. Consult research and professionals for health advice.
          </p>
        </div>
      </Container>
    </main>
  );
}
