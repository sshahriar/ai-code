var e=`# Claude Code Pro Sub-Agents, Hooks, Swarms & Controlled Chaos

> Week 3 · Day 1

## Overview

It's week three, it's a big finale week and I am going to give you a week to remember. Just you wait and see, welcome to week three of the AI CODA course.

This is going to be really terrific starting with a yellow day, a product day, more of Claude Code. Let's get into it.

And just to add to the sizzle, for me, just this week, the new version of Claude, Claude 4.6 Opus has come out and also Codex 5.3 and this is old news for you maybe you're already on Claude version 10 by now but for me it's completely new and I absolutely love it I've been having a blast and I can't wait to experience this with you this week and wow do I have a week lined up for you it's about today looking at multi-agent sub-agents, hooks, swarms, lots of stuff, giving you the layer of the land with the deeper functionality you get into with these CLI platforms. Then tomorrow's sandboxing, such a critical topic.

## You will learn

- Understand the main ideas covered in **Claude Code Pro Sub-Agents, Hooks, Swarms & Controlled Chaos**
- Follow the practical walkthrough from Week 3, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

Then looking at the bigger picture of what it's like to work successfully with massive code bases. 'Cause it's all very well doing these cute, simple one-person projects. But what's it like how are you successful when you're working with a big code base debugging across a large project?

And then it's all about day four. Day four is when we go crazy. Day four is when we do all their new stuff, swarms and orchestrators and all that stuff, ending with a capstone project to remember.

And if I can take you back to what I had at the beginning of last week, and from week one, which was those eight stages of the evolution of the coding agent programmer from Steve Yege. You can see that we really focused on stage five last week as we went deep into using call code, using the CLI, letting diff scroll by. We're now heading into this other more radical territory of stages 6, 7, and 8 multi-agents and then many many agents are swarm and then orchestrating agents.

This is the bigger deal and it comes with with a lot of excitement and a little bit of chaos. And I'll also remind you of the time when I explained that there are these two different mindsets. There's the mindset you can have with a kind of mission critical enterprise software where you might be micromanaging, working closely with something like cool code.

You might be in the sort of mode where you are planning and executing and then reviewing and testing, and then going to the way of sort of spec driven design with Trustbook Verified Mindset. And this is very similar to how we were working at the end of last week when we were putting like issues into JIRA or into GitHub and then tracking it all the way through and testing the outcomes, leaving a lot to the CLI agent but still having a watchful eye on what's going on and really working with the kind of one agent, one U and Claude Code kind of construct. And then I went through the 2026 kind of techniques that are really surfacing, emerging in a big way now.

YOLO has been around for a while, but increasingly just going with it is working Ralph Loops. We experimented with them. They're really cool.

And then going all the way to this idea of multi-agent swarms, orchestration, that whole universe, which is what we will be unlocking this week. And yet again, as I remind you that you, you can pick the, the approach that works best for your skill set, for your risk appetite, for the appetite of the team around you, for the circumstances and type of project. But regardless of which one you choose, always keep in mind you're using the LLM, the coding agent as a tool to assist you to do your work more efficiently.

but ultimately you are accountable for the code you deliver. You're the boss, it's your work product. The coding agent is there to help you accelerate.

### Deep dive

So this week we're going to move fast. We're going to cover a lot of ground and never fear, I'm going to end the week by kind of laying out the whole ecosystem and giving you a good sense of exactly how to approach it and when to follow which technique. But generally speaking, the pro techniques we're gonna be covering a lot this week fall into two different balancing categories.

On the one hand, there are a lot of the techniques we're gonna be covered, which give you a kind of sense of chaos in the way they magnify everything going on. We've already met Yolo, of course, which you know what I mean now by chaos. It's like, "Oh like okay we're just gonna address it there's there's Ralph Loops which I definitely feel chaotic it's like okay I'm gonna set it going I'm gonna go and have have lunch or dinner or overnight come back and just see what's happened and then there's there's this thing called GSD that we will meet at some point there are swarms which is big multi-agent kind kind of let it all happen, all of these are different chaotic techniques.

And then contrasting with that, there is a sense of using these pro techniques to give you more control, the opposite. And what do I mean by control? You're probably wondering, what could this mean?

Well, what I mean is, for example, you can use the file system as your way of keeping everything connected and communicating, having all of your different processes, reading and writing files that keep track of architecture decisions, open questions, testing strategies, and use the file system heavily as your way of coordinating across everything going on. You can have self-correcting kinds of processes, this is contrasting with Ralph Loops, I guess, rather than just having things that just keep going bigger and bigger and bigger, you can have some of your processes responsible for testing, responsible for code reviews, keeping everything on rails, pulling everything in, a kind of negative feedback, if the chaos is a positive feedback. And Sandboxes, which we're covering tomorrow, are a way to make sure that all of the craziness that's going on is going on in a contained world that you can always destroy and throw away and start again.

And that gives you a lot more repeatability around a process that is a bit chaotic. And then finally, orchestration, which perhaps some people's minds belongs more in the chaos side of it, but orchestration is about having all of your agents out there, but having them have some kind of a hierarchy and roles and responsibilities such that maybe one agent is managing others and there's some coordination going on and in doing so you're sort of reeling in a bit, the craziness and you're having things in a more structured, organized way. So I would put orchestration firmly in the control side of the house.

And so with this in mind, with this idea that there's like, there's chaos and there's control. My suggestion is that what you are aiming for with this this week and these pro techniques is a world with controlled chaos. That is what we're looking to do here.

Think of it like in like a nuclear reactor, if you remember that when they put those rods down to control, it's like it's like a control chain reaction that's going on. And it's that mindset that you should be having with the pro coding agent techniques, controlled chaos. It's driven somewhat by how much is your project, what is your comfort zone to take risks, where are you at the moment, but that would decide how much control and how much chaos and how to balance the two.

I would always suggest begin with control. Don't start out. You can start out with some experiments with like running around loop with many iterations, with the kicking off a huge swarm.

### Putting it together

You can do some of these things to get some sort of foundational ideas out there. But then when it comes to the real project, I would start with more control and then gradually loosen your grip and allow more chaos as you see good results and then put back more control if things start going off the rails. And so a lot of this week is about striking that right balance, that sense of balancing the positive feedback of the chaos that just keeps getting bigger and bigger with the negative feedback loops of the control that reels things in and keeps things nicely on rails.

And that getting that right is how you achieve an amplification of what you're able to do and still getting good results. So with that in mind, we're going to go through a bunch of pro features. Today, I will quickly explain them and then we'll dig in and give them a try and a repo.

We are going to be looking at how do you create a slash command. We've used some slash commands. You can create your own.

So I just want to show you how to do that. We're going to look at multi-agents and sub-agents, explain the differences and use them. Multi-agents is not necessarily a well-defined term and is a bit of a bore of just saying, you can start up multiple code codes, basically.

Not much to it. Sub-agents is the great stuff. That's what we're really digging into.

Agent teams is the sort of new world, the new stuff. I will introduce it today. We won't use it until I think a day four of this week.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

Then looking at the bigger picture of what it's like to work successfully with massive code bases. 'Cause it's all very well doing these cute, simple one-person projects. But what's it like how are you successful when you're working with a big code base debugging across a large project?

## Practical tips

- And then it's all about day four. Day four is when we go crazy. Day four is when we do all their new stuff, swarms and orchestrators and all that stuff, ending with a capstone project to remember.
- And then going all the way to this idea of multi-agent swarms, orchestration, that whole universe, which is what we will be unlocking this week. And yet again, as I remind you that you, you can pick the, the approach that works best for your skill set, for your risk appetite, for the appetite of the team around you, for the circumstances and type of project. But regardless of which one you choose, always keep in mind you're using the LLM, the coding agent as a tool to assist you to do your work more efficiently.
- So this week we're going to move fast. We're going to cover a lot of ground and never fear, I'm going to end the week by kind of laying out the whole ecosystem and giving you a good sense of exactly how to approach it and when to follow which technique. But generally speaking, the pro techniques we're gonna be covering a lot this week fall into two different balancing categories.
- Well, what I mean is, for example, you can use the file system as your way of keeping everything connected and communicating, having all of your different processes, reading and writing files that keep track of architecture decisions, open questions, testing strategies, and use the file system heavily as your way of coordinating across everything going on. You can have self-correcting kinds of processes, this is contrasting with Ralph Loops, I guess, rather than just having things that just keep going bigger and bigger and bigger, you can have some of your processes responsible for testing, responsible for code reviews, keeping everything on rails, pulling everything in, a kind of negative feedback, if the chaos is a positive feedback. And Sandboxes, which we're covering tomorrow, are a way to make sure that all of the craziness that's going on is going on in a contained world that you can always destroy and throw away and start again.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Or yeah, day four. Hooks, which is very interesting and which allows us to achieve things like Ralph Loops. And then just a final topic is gonna be about ways that you can create your own plugin for sharing it around your team or even putting it on your own marketplace, which is a really neat pro feature as well. So this is just equipping you with more tools in your toolkit which will then put into practice in the coming days.
`;export{e as default};