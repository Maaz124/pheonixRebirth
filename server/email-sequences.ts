// Email marketing sequences for the Phoenix Method™ platform

export interface EmailTemplate {
  id: string;
  subject: string;
  content: string;
  sendAfterDays: number;
  sequence: string;
  ctaText?: string;
  ctaUrl?: string;
}

// Lead Magnet Sequence - Free Assessment Follow-up
export const leadMagnetSequence: EmailTemplate[] = [
  {
    id: "lm-welcome",
    subject: "🌟 Your Phoenix Assessment Results + Welcome Gift Inside",
    sendAfterDays: 0,
    sequence: "lead_magnet",
    content: `
Hi {{firstName}},

Welcome to the Phoenix Method™ community! 🔥

Your free assessment results are ready, and I have some insights that might surprise you about where you are in your healing journey.

**Your Phoenix Assessment Results:**
Based on your responses, you're currently in the {{assessmentPhase}} phase of trauma recovery. This means you're ready for {{nextSteps}}.

**What this means for your healing:**
- You've already shown incredible strength by taking this assessment
- Your nervous system is {{nervousSystemState}}
- The next breakthrough is closer than you think

**FREE BONUS:** I'm including my "7 Signs You're Healing" checklist - most women don't realize they're already making progress!

[DOWNLOAD YOUR RESULTS + BONUS]

Tomorrow, I'll share the #1 mistake that keeps women stuck in survival mode (and how to avoid it).

Your transformation starts now,
Dr. Sarah Phoenix

P.S. Did you know that 94% of women who complete the Phoenix Method™ report feeling "completely transformed" within 90 days? Your results could be just around the corner.
    `,
    ctaText: "Download Your Results + Bonus",
    ctaUrl: "/download-assessment-results"
  },
  
  {
    id: "lm-mistake",
    subject: "The #1 mistake keeping you stuck in survival mode",
    sendAfterDays: 1,
    sequence: "lead_magnet",
    content: `
Hi {{firstName}},

Yesterday, I shared your Phoenix Assessment results. Today, I want to tell you about the #1 mistake I see women make in their healing journey.

**The Mistake: Trying to "think" your way out of trauma.**

Here's what I mean...

Most women believe they can overcome trauma through willpower and positive thinking. They tell themselves:
- "I should be over this by now"
- "I just need to be stronger"
- "Other people have it worse"

But here's the truth: **Trauma lives in your nervous system, not your mind.**

Your brain is literally wired to keep you in survival mode. No amount of positive thinking can rewire these neural pathways.

**The Solution?**

You need a trauma-informed approach that works with your nervous system, not against it.

That's exactly what the Phoenix Method™ does. Our 7-phase program rewires your brain at the neurological level.

**What happens when you get this right:**
✓ Your anxiety melts away naturally
✓ You feel safe in your own body
✓ Boundaries become effortless
✓ You attract healthy relationships

Tomorrow, I'll share the neuroscience behind why traditional therapy sometimes isn't enough.

Your nervous system is ready to heal,
Dr. Sarah Phoenix

P.S. {{firstName}}, I'm curious - what resonated most with your assessment results? Hit reply and let me know. I read every email personally.
    `
  },
  
  {
    id: "lm-neuroscience",
    subject: "Why your brain keeps you stuck (and how to break free)",
    sendAfterDays: 2,
    sequence: "lead_magnet",
    content: `
Hi {{firstName}},

Let me share something that will change how you think about your healing journey forever.

**Your brain has three parts:**
1. The thinking brain (neocortex)
2. The emotional brain (limbic system)  
3. The survival brain (brainstem)

When you experience trauma, your survival brain takes over. It's designed to keep you alive, not happy.

**Here's what happens:**
- Your survival brain scans for danger 24/7
- It triggers fight/flight/freeze responses
- It overrides your thinking brain
- You feel anxious, panicked, or numb

**The problem with traditional therapy:**
It focuses on the thinking brain, but trauma lives in the survival brain.

**The Phoenix Method™ difference:**
We work directly with your nervous system to restore safety and calm.

**Phase 1: Pause the Panic**
You'll learn to activate your vagus nerve and shift from survival to safety in minutes, not months.

**Phase 2: Honor Your Humanity**
You'll develop the self-compassion that rewires your brain for healing.

And that's just the beginning...

{{firstName}}, are you ready to work WITH your nervous system instead of against it?

[LEARN MORE ABOUT THE 7 PHASES]

Healing is your birthright,
Dr. Sarah Phoenix
    `,
    ctaText: "Learn More About The 7 Phases",
    ctaUrl: "/method-overview"
  },
  
  {
    id: "lm-stories",
    subject: "From panic attacks to peaceful nights (Sarah's story)",
    sendAfterDays: 3,
    sequence: "lead_magnet",
    content: `
Hi {{firstName}},

I want to share Sarah M.'s story with you because it might sound familiar...

**Before Phoenix Method™:**
- Panic attacks every morning
- Couldn't sleep without racing thoughts
- Felt like she was "going crazy"
- Avoided social situations
- Constant fear of the next attack

**After 90 days with Phoenix Method™:**
- Sleeps peacefully through the night
- Handles stress with grace
- Set boundaries with toxic family members
- Started dating again
- Feels "like herself" for the first time in years

**What changed everything for Sarah?**

Phase 4: Establish Boundaries

"I learned that my panic attacks weren't random," Sarah told me. "They happened when I said yes to things I wanted to say no to."

**Sarah's breakthrough:**
She discovered that boundaries aren't walls - they're gates. You decide what gets in and what stays out.

**The Phoenix Method™ boundary framework:**
1. Identify your boundary violations
2. Practice saying no without guilt
3. Communicate boundaries clearly
4. Maintain boundaries consistently
5. Repair when boundaries are crossed

{{firstName}}, what if you could feel as peaceful as Sarah does now?

The women who succeed with Phoenix Method™ have one thing in common: they stop waiting for "someday" and start healing today.

[START YOUR PHOENIX JOURNEY]

You deserve to feel free,
Dr. Sarah Phoenix

P.S. Sarah sent me a video testimonial last month. She's glowing, confident, and completely transformed. That could be you 90 days from now.
    `,
    ctaText: "Start Your Phoenix Journey",
    ctaUrl: "/pricing"
  },
  
  {
    id: "lm-urgency",
    subject: "{{firstName}}, don't let another year slip by...",
    sendAfterDays: 5,
    sequence: "lead_magnet",
    content: `
Hi {{firstName}},

I need to ask you something important:

**How long have you been "planning" to heal?**

6 months? A year? Longer?

I get it. Healing feels scary. What if it doesn't work? What if you're too broken? What if you're the exception?

But here's what I know after helping 10,000+ women transform their trauma...

**You're not broken. You're not the exception. You're ready.**

**The cost of waiting:**
- Another year of anxiety
- Another year of toxic relationships  
- Another year of feeling disconnected from yourself
- Another year of survival mode

**The gift of starting now:**
- Your nervous system begins healing immediately
- You break generational trauma patterns
- You model healing for your children
- You reclaim your life

{{firstName}}, I created Phoenix Method™ because I was tired of seeing women wait for "someday."

**Someday isn't a day of the week.**

Your transformation is one decision away.

[CLAIM YOUR SPOT IN PHOENIX METHOD™]

The Phoenix in you is ready to rise,
Dr. Sarah Phoenix

P.S. Our next group starts Monday. Will you be there, or will you still be "planning to heal" next year?
    `,
    ctaText: "Claim Your Spot",
    ctaUrl: "/pricing"
  }
];

// Nurture Sequence - For those not ready to buy yet
export const nurtureSequence: EmailTemplate[] = [
  {
    id: "nurture-boundaries",
    subject: "The boundary script that changed everything",
    sendAfterDays: 7,
    sequence: "nurture",
    content: `
Hi {{firstName}},

A Phoenix Method™ student shared this with me yesterday:

"I used your boundary script with my toxic mother-in-law. For the first time in 10 years, she actually respected my decision. I almost cried with relief."

**The script that works:**

"I understand you feel [their emotion] about [the situation]. I've made the decision to [your boundary]. This isn't up for discussion, but I'm happy to talk about other things."

**Why this works:**
1. Validates their feelings (disarms defensiveness)
2. States your boundary clearly (no room for negotiation)
3. Redirects to positive connection (maintains relationship)

**Example in action:**
"I understand you feel disappointed that we won't be coming for Christmas. I've made the decision to start our own traditions at home. This isn't up for discussion, but I'd love to plan a visit in the new year."

Try this script this week and see what happens.

Boundaries are self-love in action,
Dr. Sarah Phoenix
    `
  },
  
  {
    id: "nurture-self-compassion",
    subject: "The phrase that stops shame spirals instantly",
    sendAfterDays: 14,
    sequence: "nurture",
    content: `
Hi {{firstName}},

You know that voice in your head? The one that says:

"You're so stupid."
"You always mess up."
"Everyone else has it figured out."

**What if I told you there's one phrase that can stop shame spirals instantly?**

Here it is:

**"This is a moment of suffering. Suffering is part of being human. May I be kind to myself in this moment."**

**Why this works:**
- Acknowledges reality without judgment
- Connects you to shared humanity
- Activates self-compassion neural pathways

**When to use it:**
- After making a mistake
- During anxiety attacks
- When comparing yourself to others
- Anytime shame shows up

This simple phrase rewires your brain for self-compassion instead of self-criticism.

Try it today and notice the shift.

You deserve your own kindness,
Dr. Sarah Phoenix
    `
  }
];

// Customer Onboarding Sequence
export const onboardingSequence: EmailTemplate[] = [
  {
    id: "onboard-welcome",
    subject: "🔥 Welcome to Phoenix Method™ - Your transformation starts NOW",
    sendAfterDays: 0,
    sequence: "onboarding",
    content: `
Hi {{firstName}},

Welcome to the Phoenix Method™ family! 🎉

You've just made the most important decision of your healing journey. I'm so proud of you for choosing yourself.

**Your Phoenix Method™ account is ready:**
- All 7 phases are now unlocked
- Your personalized dashboard is waiting
- Interactive exercises are ready to begin

**Start here:**
Log in and complete your Phase 1 foundation assessment. This will calibrate the program to your specific needs.

**What to expect in your first 7 days:**
Day 1: Foundation assessment + nervous system education
Day 2: Your first panic-stopping technique
Day 3: Trauma-informed breathing exercises  
Day 4: Beginning boundary awareness
Day 5: Self-compassion foundations
Day 6: Progress check-in
Day 7: Your first transformation milestone

**Phoenix Method™ Community:**
You now have access to our private community of 10,000+ healing women. Introduce yourself and feel the support.

**Need help?**
Reply to this email anytime. I personally read every message.

Your Phoenix is rising,
Dr. Sarah Phoenix

[ACCESS YOUR PROGRAM NOW]
    `,
    ctaText: "Access Your Program Now",
    ctaUrl: "/dashboard"
  }
];

export const emailSequences = {
  leadMagnet: leadMagnetSequence,
  nurture: nurtureSequence,
  onboarding: onboardingSequence
};