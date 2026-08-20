var e=`# GSD Spec-Driven Design Meets Multi-Agent Orchestration

> Week 3 · Day 4

## Overview

Okay, we're ready for a completely different kind of orchestration. Now I will just mention that front end, even though we've done a checkout main, front end still has lots of stuff in it because this is git-ignored stuff.

So I'm just going to delete this whole folder like that and create a new front end folder so that we're definitely starting from scratch and not giving any hints away. I'm also going to come into dot-claud and make sure that our settings.json, if we look at this, and aren't we down, yes, it has some of these plugins, but it does not have the setting, the experimental setting, let's clear the screen and start again, and also we will stop Cloud Code from running right here.

That is a wrap on that previous version. Clear the screen.

## You will learn

- Understand the main ideas covered in **GSD Spec-Driven Design Meets Multi-Agent Orchestration**
- Follow the practical walkthrough from Week 3, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

previous version. Clear the screen. Okay, now let me introduce you to the second way that we are going to try and go crazy.

Along our journey together, I've mentioned a few times there's a technique called SDD spec driven design. And SDD is is about having plugins or tools or processes which walks through the process of putting together a spec and then executing on that spec. And in some ways, the feature dev plugin that we used is a nod to that.

There are some more formal ones that go through a more rigorous process. And there was a time when that was a big deal with Cloud Code, and it seems to be less so now, 'cause it feels like it's a slightly laborious approach. And you can give up a little bit more and just let it run with it more.

There is now a new thing that's come up, not that new anymore, but pretty new, which is seen as a sort of natural evolution of spec-driven design, which is spec-driven design coupled with this more radical kind of orchestration framework. And there is this approach that isn't just for code, it's for any of these CLIs, and it's one that goes by the name GSD. And GSD stands for something which I will bring up and you can see it visually here but I'm not going to say it.

And here it is. So GSD stands for get done as it says right there in the repo. This is where it is and it is as it says lightweight.

It's what they call meta prompting which is like a sort of something that you can prompt that then is then controlling a set of pre-built prompts, context engineering and spec-driven development, SDD for cloud code, open code, and Gemini CLI. So any of those three. And it's particularly, it's looking to solve context-rot.

That was its initial premise. It's about trying to make sure that you manage context really well, and that you don't get this kind of quality degradation that we've all felt as the context window starts to fill up. So that was a big part of the problem it's set out to solve.

And yeah, it's luckily it works on all platforms and this is the way to set it up. And when you do that, when we run this command, we will get this screen and it's where we can choose to install it. And this is where we will be able to drive this process.

If you know clearly what you want, this will build it for you. No BS says someone unnamed. I've done spec kit, open spec and taskmaster.

This has produced the best results for me. These three are the more traditional spec driven design approaches. If you want to look them up and have a shot at them too, then you should do so.

By far my most powerful addition to Cloud Code says somebody. Literally just gets done. Okay, and then you can read more about the back story behind it before we dig in.

And we'll just read a little bit more about it. I would encourage you to go to this GitHub language I will of course put in the resources. Vibe coding is a bad reputation.

You describe what you want, AI generates code, you get inconsistent garbage that falls apart at scale. I think that is predates the November inflection point. But still, you get that for big enough projects still perhaps if you don't manage things carefully with documents and so on.

But GSE is designed to fix that. It's the context engineering layer that makes Cloud Code reliable. It's for people who can describe what they want to have.

It builds correctly without pretending they're running a 50 person engineering org. All right, so we will now do this and they recommend skip permissions mode, running it cloud with this. It's how it's intended to be used, stopping to approve dates and get commit 50 times to feats the purpose.

The alternative is to add granular permissions. So, all right, there's also, it's got a set of different commands you can do, like slash GSD map code base and so on. But, and it goes through the different steps right here which we will carry out in a sec.

Okay so without further ado let's make ourselves a new branch get check out minus B-GSD. We'll call it finally GSD just to avoid any confusion finally GSD. Okay and now we will execute that command to install this.

Okay yes and there we go which runtime we like to install it for for a cloud code. One, where would you like to install it? Global,, this project.

### Deep dive

Only to done. Okay. So you can see a bunch of stuff has been created here.

It's created, it's basically added in agents commands that this folder that we'll learn more about in a second and and hooks. So it's like a sort of, in a way, this installer has done something similar to installing a plugin in that it's just put all of this stuff right here for us. And we're ready to go launch Cloud Code and run slash GSD colon help.

So exciting, huh? But first of all, let's look at the docs one more time. So I would describe GSD as being similar to the agent team's concept that we've just worked with, but more opinionated.

It's something where it's got more constructs around it designed to sort of put you into a particular way of doing it. I'm not gonna run it on the "Angry See Skip Permissions" mode. If I were to do that, I would do it on the sandbox as we had established before, but I'm happy to be approving as we go.

So the way you're meant to do it is by going through a number of different commands. GSD New Project is where you start things going and it's going to initialize but it will spawn parallel agents to analyze the stack conventions and then it knows the code base. So that's who will start.

Then GSD Discuss is where you shape the implementation as it says. Then GSD plan is where you go through and you plan a phase, then GSD execute, then GSD verify and then you do it for the next milestone. We only have one milestone and there is also a quick mode that does all of this if you don't need the planning, but we will go through doing it this way.

Then it's got a quick sort of why it works. And the main point that this stress is, is that first of all, they've really focused on the prompts, on getting good, strong prompts. And secondly, they preset the agents as well for this.

But also importantly, they have got documentation, that hang on, I'm just looking through. These are the commands again that it's explaining. You've got the new project, discuss phase, plan phase, execute, verify.

You've got an audit master and complete master, new master. And this is some of the other commands that you would get used to managing phases and sessions. The important thing to know is that it produces a bunch of different files.

And these files are all managed for us. And that is the files is where it maintains the state of everything that's going on. It's got a fixed structure of markdown files that it uses in order to track progress through these different steps.

So it is, as I say, a sort of opinionated structure around having multiple agents work on your project. And here is the file structure that it uses. It has these files project.md, research requirements, roadmap, state, plan, summary to-dos.

So it does all of this for you. And it's then got this multi-agent orchestration at each stage. These are the different agents and how they work.

So have a read through this. Learn more about how this is going to work. We will keep track of the different commands that we're going to work.

We will keep track of the different commands that we're going to run, and then we're going to go through and do this right now. And it's worth mentioning that the author of this project is something of a celebrity. It is an EDM, an electronic dance musician, Kortaszia, based in LA, who is behind this and who's obviously made it into something with a big following as it's clear from from it's a GitHub stars.

But let's get into it. Let's start Claude. Up comes Claude.

Hand Claude has lots of stuff if we do slash context. We will see. Presumably yes lots of GSD stuff in there.

Very nice. And I wonder whether we should remove context. And I think we leave it.

We leave everything else exactly as is. We'll leave the rest of the setup. Let's see what this is done to the context.

### Putting it together

Looks fine. And okay. And let's also do slash usage, just to see where I was.

Remember last time I was at zero, eight and two. And now let's write this down. After that first experiment, we're at 8% used, 9% of the current week, and 2% of the current week still for sonnet because I've been using Opus.

All right. I think that we may be ready to start our GSD process. Just in case we have to get back to this point, let me just do a quick git add dot just get that in there git commit commit, and say m start of GSD process.

So we'll have that all in now. Then let's go back to here again. And let's run the first command, which is going to be slash GSD, colon new dash project.

Here we go. And we're running that and it's doing some stuff. It's reading the workflows, questioning UI brand projects.

Okay, I could see that it's got the different models. It looks like it's using sonnet in a few places. I detected, would you like to map the code first?

Yes, one, we will say, yes, we will let it do the mapping. Use skill, yes. I should probably press two then I press one.

This is where it would tell you that we should have done dangerously skip permissions. We should have been in yellow mode, but it seems to be doing fine. We will let it do its thing.

Spawning for mapper agents in parallel. See everything that's going on. And this is using of course subagents.

It is using the subagent functionality rather than the new Cloud Teams functionality, which makes sense. We'll be doing, this is an alternative to using Cloud's agent teams. So it's now running those agent, the mapper agents in parallel, while they map out the existing code base.

There's not much to it, that's just the market data part. But hopefully it's also reading the documentation, which is super important. And I will see you back when we are ready to discuss the phase and begin.

Okay, so it's done the code-based mapping. It's built a bunch of markdown files. Hopefully it was reviewing the planning documents we already have.

I imagine it was, it's in its memory, for sure. And now it's continuing with GSD New Project, and now it's got some questions. What do you want to build?

So before we do that, I just want to make sure that we're on a level playing field. I think by default, it uses sonnet for the development and I want it to use opus. Otherwise, we'd be off to a disadvantage and I believe the way I do that is with slash GSD colon settings.

So let me just quickly run this now and just see how this works. And so that then I can set it so that it uses the right quality model. Here we go, which which model do we want?

We want to be number one. It says balance is recommended but we want to use number one quality. At least I want to use that.

You can use balance or budget. I want to be on quality because I want to use number one quality at least I want to use that you can use balance or budget I want to be on quality because I want to be fair about it one spawn plan researcher that's yes spawn plan checker yes execution verify yes excellent submit answers done okay so that's nice an interactive way of setting the settings.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

previous version. Clear the screen. Okay, now let me introduce you to the second way that we are going to try and go crazy.

## Practical tips

- That was its initial premise. It's about trying to make sure that you manage context really well, and that you don't get this kind of quality degradation that we've all felt as the context window starts to fill up. So that was a big part of the problem it's set out to solve.
- This has produced the best results for me. These three are the more traditional spec driven design approaches. If you want to look them up and have a shot at them too, then you should do so.
- You describe what you want, AI generates code, you get inconsistent garbage that falls apart at scale. I think that is predates the November inflection point. But still, you get that for big enough projects still perhaps if you don't manage things carefully with documents and so on.
- Then GSD Discuss is where you shape the implementation as it says. Then GSD plan is where you go through and you plan a phase, then GSD execute, then GSD verify and then you do it for the next milestone. We only have one milestone and there is also a quick mode that does all of this if you don't need the planning, but we will go through doing it this way.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

Yes. Okay. Excellent. Alright, I think it's time for us to actually kick off our project.
`;export{e as default};