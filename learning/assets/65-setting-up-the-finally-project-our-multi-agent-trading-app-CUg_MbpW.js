var e=`# Setting Up the FiNALLY Project Our Multi-Agent Trading App

> Week 3 · Day 1

## Overview

Welcome back to VS Code. We're going to be spending a lot of time in here this week.

Bring up your favorite terminal with control. Backtick is the only terminal in an all your favorite terminal, but whatever your terminal.

Bring it up and then go into your home directory and into your projects directory and you're going to do a git clone of just a sort of basic scaffolding I've got in place for you. Here it is.

## You will learn

- Understand the main ideas covered in **Setting Up the FiNALLY Project Our Multi-Agent Trading App**
- Follow the practical walkthrough from Week 3, Day 1
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

It's the project is called finally. Finally, because it's our final week, it's when we're going multi-agent, then it's also finally because that's the answer for finance ally. We're going to build a live trader workstation with cool market data and stuff happening, and it's going to feel like our high-end application, and we're going to do it with an army of agents.

We're going to do it with an army of agents. We're going to do it all this week. It's in this repo, finally.

Clone it and then open it up as a new project, and I will see you there. Okay, so you open it up as a project, by going into projects, and then going into projects, finally, and it's showing you now. And it should look something like this.

There might be more files in here, because I'm sort of figuring out how much I want to give you as a starting point. And we're going to work on some of this together. We're going to set up a whole foundation that we can then give to a bunch of agents to build the whole project for us in as much of a like a one shot experience as we can do.

But let me just talk you through it, close everything down. Let me show you what we've got here. So in finally your starting point should look something like this.

There is a the usual there's an empty ish read me. There's a claw dot MD that will go through in a second. There's a bunch of directories that are empty that may not even show up for you because they're empty like a back-end DB front-end.

These are all completely empty and there's one called planning which has a single document planned.md and then there's also an empty test. Alright that's that's the, there's a useful get-enort and then there's the, of course, the claw.md that we will look at now. And there's also .env file where I put my open router key in there, just copied it from before.

Okay, into the claw.md, it's very short. Finally project, the finance ally, finally, I'm probably not the first person to think about. But still, it works nicely for this project.

And it just says, all project documentation is in the planning directory. This is that point I made about one of the stabilizing forces is to get all of your different coding agents to be converging on shared documentation, which is where they can leave information for each other to keep them all communicating closely. The key document is in plan.md, included and full here, and then I'm using that at notation as a way of ensuring that this entire document gets brought into context every time it has no choice.

So it all sort of revolves around this plan.md and this is going to be our tool for how we control the build of the whole application. And so this document, which I'll open in preview mode, so we sit nice and formatted, this is going to be our business requirements. That is what I want us to build.

And the first stage is us building this out so that it feels like it's robust. So the vision is that we're building a stunning AI powered trading workstation. It doesn't matter if you don't know about financial services.

### Deep dive

This is still going to make sense to you. If you know what stocks and shares are, that's all you need. It's going to stream live market data.

It's going to let users trade in a simulated portfolio. And it's going to integrate an LLM assistant that can analyze portfolios and execute trades on your behalf. It looks and feels like a modern Bloomberg terminal with an AI co-pilot, which could be a whole product in its own.

This could be a real product. And I say in this vision that it's the capstone project for the course, built entirely by coding agents, demonstrating how orchestrated agents can produce a production quality full stack application into agents interact through files in the planning directory. That lays the scene out there for you and also for the AI agents.

Okay, and I should confess that I started with a paragraph like that, and I just put it in, it actually in Claude, in Claude.ai, the chatbot, and iterated a bit for most of the rest of this. So most of the rest of this is just based on generated, but from some question and answering with me, which is a good way to do it. You could also do it in Cloud Code, but I chose just to use the chat product.

So the user experience explains that it's all going to run in Docker, that a browser will open to local host, and that you'll be able to then do things at Watch Prices Stream, monitor the portfolio, chat with an AI assistant. There's a bit about the visual design and the usual colour scheme that I like, but you should put in your own colour scheme. This architecture thing here was generated of course by Claude, and it's very clear that there are some roots explained here.

We're going to be very consistent with how we've done some of the prior projects. Use SQLite. We're going to have like a background task for market data.

Okay, and then there's some explanation as to why. The directory structure is laid out there and it's consistent with what's already been set up. And there's some stuff about the boundaries between areas, because as you can imagine, we're going to be looking into having multiple coding agents working on different parts.

So focusing on the boundaries is really important because agents need to know what they're responsible for and how they have to interact with each other. Next section explains about the environment variables that there's going to be an open route API key, which you already have. And then optionally, an API key to something called massive formerly known as polygon that I cover in some of my other courses.

It's optional because the idea is you don't need to have real market data because this product will include a simulated market data. So it can be just as cool without having to pay a cent. You can see everything going on as if it's a live market.

And that can be a great way to build out trading agents, like equity traders, because you want to see how they respond to simulated data as well as the real thing. But you'll be able, it should, should you wish to pay for proper equity market data or even crypto or options or whatever you like. You should be able to switch that in with an API key change.

Okay. And then that's all explained in this next section on market data explaining that there's two different options and explaining how we will use the SSE approach the same way that information is streamed back when you're working with an AI as a way of streaming back market data live onto the user interface. And then we're going simple with the database.

### Putting it together

We're going to use SQLite as before, lazily set up the first time you launch the app, a little bit more sophisticated than last week that it's going to persist between sessions, as you can see if you read through it, but still quite simplistic. But it should be an easy task to upgrade this, to use like a database like Superbase, so it's an API-based Postgres database on the cloud, if you wish to. But we'll keep it simple for this, 'cause we're trying to build the app, not necessarily worry about sort of third party integrations.

Bit more on the API endpoints, and then more about the LLM integration, we're gonna use the same sub-rebrbras approach or open-rooter approach, because I love the way it's so fast. You don't need to use cerebras if you don't want to. And we're going to use structured outputs just as we did in week two, so we can have an interactive conversation with an LLM and allow it to do things like make trading decisions and change the way that the user interface looks.

So that's all parts of how this is explained. And you can see that I've included a dot-clawed, and I've just copied in the cerebras skill that we made in Week 2, so we're just taking that same skill again. So we've got the skill, it can use it right away.

We know how that works. We know that just by putting that folder in there, it's just going to have this new skill. That's the crazy thing about skills, and stuff about how it will execute automatically.

This reads a little bit LLM generated, but it doesn't matter. It's fine. And then front end design, how the screens will be laid out.

I chatted with Claude a while about this to make sure that it's happy with it. And then the way that it's all going to be deployed super simply in one Docker container, just as we did last week, it's a really easy pattern. LLM's love to try and put things into multiple Docker containers and make it more complicated than it needs to be.

This is where it did that to start with. And I came in and said, no, that's not necessary. We don't need it.

That's the kind of place where human involvement is so important. And it can be half people that aren't familiar with these kinds of architectures. And you just have to really challenge yourself to ask the pointed questions of, could this be simpler?

Make sure that it is as simple as possible. All right, and then how we'll be able to start and stop. I'm one of the great benefits of having it all be in one Docker container like this, it also means that should you wish, we can easily deploy it to the cloud.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

It's the project is called finally. Finally, because it's our final week, it's when we're going multi-agent, then it's also finally because that's the answer for finance ally. We're going to build a live trader workstation with cool market data and stuff happening, and it's going to feel like our high-end application, and we're going to do it with an army of agents.

## Practical tips

- And the first stage is us building this out so that it feels like it's robust. So the vision is that we're building a stunning AI powered trading workstation. It doesn't matter if you don't know about financial services.
- So focusing on the boundaries is really important because agents need to know what they're responsible for and how they have to interact with each other. Next section explains about the environment variables that there's going to be an open route API key, which you already have. And then optionally, an API key to something called massive formerly known as polygon that I cover in some of my other courses.
- It's optional because the idea is you don't need to have real market data because this product will include a simulated market data. So it can be just as cool without having to pay a cent. You can see everything going on as if it's a live market.
- Bit more on the API endpoints, and then more about the LLM integration, we're gonna use the same sub-rebrbras approach or open-rooter approach, because I love the way it's so fast. You don't need to use cerebras if you don't want to. And we're going to use structured outputs just as we did in week two, so we can have an interactive conversation with an LLM and allow it to do things like make trading decisions and change the way that the user interface looks.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

We could easily just take this and put it up there on a hugging face space perhaps, or even deployed to AWS App Runner or something like that, ways that we cover on my production course if you wish to go live with this afterwards. And then finally stuff about how we will test it with unit tests and end-to-end tests. That is the documentation. That is the business requirements docs slightly fleshed out with Claude, and it is our starting point for the finally project, a juicy, great big project, which is gonna feel immensely satisfying and which as much as possible we're going to try and run using multiple agents in controlled chaos.
`;export{e as default};