# Building a Trading Platform with Claude GSD A 5-Hour Deep Dive

> Week 3 · Day 4

## Overview

Okay, so I know the next command is going to be discuss phase, but it says, "What do you want to build?" And I'm just going to respond to that question, because it says back to where we were. So please build the entire project.

Everything is described in planning/plan.md. Let's give it that command.

That's what we want and we may have to do the various GSD discussing phases and so on, but got it. You want to build a full trading workstation.

## You will learn

- Understand the main ideas covered in **Building a Trading Platform with Claude GSD A 5-Hour Deep Dive**
- Follow the practical walkthrough from Week 3, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

That's a solid foundation, it says. Okay, it's off. So we will let it do its thing.

So this market back in what remains as data is fully rest API's LMLM chat and in tie front end a few things to clarify How polish does the front end needs to be for course demo I? What do we think I think we want something really production quality? I don't think we want this to be like a demo thing I mean it is a demo, but we want it to be really great production quality.

That's what we're gonna say For having the LLM chat the plan says to rebrest is the LLM work out of the box without an API mock mode, keys required. Oh wait, works without using mock real. No, I'd say that it should need a key.

Docker, how should I build the Docker file and stop start scripts or focus on the app code, include Docker for sure, submit answers. I love this. So it's really cool the way that it's interactive and it comes back, us distinct questions like that that we answer.

I think I have a clear picture, build a complete finally platform end-to-end, ready to create project to MD. Let's do that. OK.

So it is this guided process. It's more controlled on rails, but still with this idea that there's going to be a lot happening on in parallel. So I'm fine for it to do that.

I'm going to press number two. There's going to be a few, a few I think, approves as we go. And I will probably like make sensible answers to questions if there's a really interesting one I'll stop.

But otherwise I will see you when we make some more progress. Okay, it's been about 20 minutes or something that this has been chugging for and a lot has gone on. And it's now stopped and said V1 requirements covering database APIs, front end, MLM chat, Docker and end-to-end tests.

Does it look right? And this is another, it's a good sign that this is somewhere in between the insanity of just using like teams that just go off into the wild and in process that's more on Rails. And it's encouraging us to look at a document called requirements.

And these documents are all in a folder it's created called dot planning. A bit confusing since we called our own one planning already, let's go into dot planning. Here is requirements.md and open it up.

And you'll see here are the full requirements that it's got and we can just scan through it. You can see it's got lots of bits and pieces that it wants to write and test. This is super impressive.

You can see it's got all of these different IDs for each part. It's given itself a checklist, lots of stuff going on, things that are out of scope, the stuff here that's putting in a V2, deferred to future release, enhanced visualization, social and discovery. Okay, sure, and terraform, yeah, that's all for the future.

Okay, excellent, I love it, I say approve. And it's a great opportunity for us to have come in and read it and reviewed it. Off it goes, it's now proceeding it's creating a road map as the next step so it's not like you need to run the commands that we looked at before one by one if you just interact with it this way then it will just drive and it's off so much is happening you can see that the main context window is starting to fill up this is showing how much is being used and I'll be interesting to see how it handles it when that starts to get tight.

### Deep dive

Anyways, again, I'm going to see you in a minute. I'm going to watch over it and I'll come back. If something interesting happens.

Okay, another key moment I'm being asked, does this roadmap structure work for you? Here is the roadmap it suggested, a proposed roadmap in 10 phases. Database Foundation, portfolio trade execution, watchlist, app assembly, LLM chat integration, frontend foundation, watchlist, portfolio trading, chat interface packaging and testing.

Seems very sensible to me. To me, it seems actually this is a better approach than the Claude Asians. I like the way that the UI is being deferred to a bit later.

That makes sense to me. I thought it was odd that Claude teams began with the UI. And yeah, the chat interface coming to the end makes total sense to me, starting with some nuts and bolts like this.

This all seems really good. Let's go with a one approve. Let's do this.

Okay, so now it's paused to say that next up, it's now it's got the project set up. It's ready now. I will now have, I thought maybe just launch into phase one, but it's up to me to run the command to kick off either to discuss phase one or to go ahead and plan phase one.

And you know, I think that it depends on the size and the magnitude of your project. If you wanted to discuss each of the phases, I think that we should just go right ahead and go straight into planning phase one. Plan, phase plan phase one.

Let's just go straight into it and get this show on the road. And so you'll notice that phase one has now finished planning and it's ready for the executing. And before it does that I just want to do a slash usage and just see how much of we use now.

You can see we're now at 18%, we've gone from 8% to 18%, so it's definitely, it's quite something that uses up a ton of space. It's already, it looks like about almost double the amount just to get to planning phase one that the entire claw team's used before. So it's definitely quite a hog on tokens and it's quite slow.

This has been going for a total of an hour now. So it's a very different proposition to the team's structure that we had before. Possibly, I've overboiled it by making it into 10 phases like this.

But anyway, I'm gonna press ahead, I'm gonna execute this phase, and then unless there's anything surprising that happens, I'm just gonna keep on going through and see where we get to. This is on yellow right now, so I'm gonna also watch with interest as it deals with the context. And I'll see you back when we made some significant progress.

And that has now completed. It's now completed the execution of phase one. You can see this context looks really, really full.

And we can now start planning phase two. We also, I can run the the verify work but that's for a manual step which I'm not going to do. So I'm going to go straight ahead and do it a GSD plan phase two and you can see that the the the context is really looking super full.

### Putting it together

I wonder I don't know if I'm allowed to say and three like that, if it can do them both together 'cause it says that that's also available, can run in parallel with phase two. Let me try that. Meanwhile, the context here is very full.

We'll see if this command works. We'll see what happened. It's thinking about that.

And planning phases two and three in parallel. It certainly can. All right, so I will let that go go and I will see you in a sec.

Well I have to confess I have some slightly unexpected news for you. The project has finished and as you'll see here it is 100% complete. The thing that maybe is the fact that I perhaps wasn't expecting, I don't know if you was, is that it's actually 5 hours later for me, that it is what I was just here with you a second ago.

5 hours. This thing, ground and ground, it like thrashed over stuff. It was trying to do a couple of things in parallel, a bit like the using the agent teams, but basically it was very serial and everything got checked and double checked in an agonizing way.

I have to say that my initial reaction is it felt over-storied. Perhaps I should have condensed some of the phases on the roadmap earlier. But for example, even completing it, it's taken about half an hour just to complete the project.

It marked it as complete, then it had to update its status to say that it was complete. And as doing so, it had to rerun the tests. But when it rerun the tests, it hit an issue, even though the tests had already run successfully.

And so it went back and it thrashed and it thrashed and discovered that in fact, there was some problem with the way it was running the tests. And in the end, it decided that it was finished. It says churned for one minute, but that's not true.

It churned for a lot longer than one minute. So in total, if I now do slash usage, and we have a look at this, my current session usage at 24% doesn't look too bad, but that's 'cause we've gone past a day boundary and it reset and then used 24%. This which used to be about 9% has jumped up to 17% and then it gone from 8 to 9 in the last project.

Basically, we've consumed about 10 times the number of tokens and taken about 10 times the length of time to do it using GSD than using the the clawed agent teams that we used before. And so it was it was quite a palava, but it was very thorough, very, very disciplined going through every single step and doing tons of documentation. There's a lot of documentation.

A lot of code has been written an awful lot of tests, hundreds of tool calls.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

That's a solid foundation, it says. Okay, it's off. So we will let it do its thing.

## Practical tips

- So this market back in what remains as data is fully rest API's LMLM chat and in tie front end a few things to clarify How polish does the front end needs to be for course demo I? What do we think I think we want something really production quality? I don't think we want this to be like a demo thing I mean it is a demo, but we want it to be really great production quality.
- I wonder I don't know if I'm allowed to say and three like that, if it can do them both together 'cause it says that that's also available, can run in parallel with phase two. Let me try that. Meanwhile, the context here is very full.
- Well I have to confess I have some slightly unexpected news for you. The project has finished and as you'll see here it is 100% complete. The thing that maybe is the fact that I perhaps wasn't expecting, I don't know if you was, is that it's actually 5 hours later for me, that it is what I was just here with you a second ago.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

So a big, big thing went into this and I could have left this going overnight and started working up the next morning and it would have been working for me all through the night. So well, not all through the night, but for five hours of the night. Okay, so at the end of all of that, the big question is, is it going to work first time just like it worked for the other one and is it going to look different? So I guess we will find out after the break.
