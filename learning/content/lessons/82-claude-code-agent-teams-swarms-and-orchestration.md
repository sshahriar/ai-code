# Claude Code Agent Teams Swarms and Orchestration

> Week 3 · Day 4

## Overview

At the start of our three weeks together, I told you to expect a rollercoaster and here's the thing. We on this rollercoaster journey, we have just reached that point when the rollercoaster has got to the very, very top and you're up there at the top and you're looking down and we're about to take the plunge.

Prepare for the plunge, prepare for week three, day four, this is a big day. It's another purple day.

It's a day of course skills. It's the day when we move into the world of swarms and orchestrators.

## You will learn

- Understand the main ideas covered in **Claude Code Agent Teams Swarms and Orchestration**
- Follow the practical walkthrough from Week 3, Day 4
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

The time when we go crazy and it's all about the stages 7 and 8 of the Steve Yege chart that we went through a couple of weeks ago now. We've already got quite comfortable with the idea that you could run multiple claw distances. We've done that a bit.

We have done that in a massive way because it's all sort of leading up to this. But for sure, you've probably experimented with running clawed a few times and we have things like that experiment when we had clawed running and we had codex doing the code review. And so we've seen all of this happening.

And of course, we've worked with subagents a fair bit too. Well, this is the moment when we hit stages seven and eight. So this is the moment when we start to have tons of agents running, which is what you think of as a swarm.

When you have like a huge number of them all doing stuff, everything's going on. It seems mad. It's chaos.

And then stage 8 is when you're like, okay, maybe we can, we can reel this in. We can control the chaos by giving the different agents some structure, by having some in charge of others, by trying to coordinate the work, but having the LLMs manage the process. That's what orchestration is about, and that's what we're going to be doing today.

And as we look between stages 7 and 8, swarms versus orchestration, I don't know that there's necessarily a binary we are at this point and we're at that point. The different solutions will be looking at a somewhere on that continuum, but between being sort of wild, swarm with no structure and extremely organized, structured orchestration. And where you are on that continuum depends a bit on your choices that you make, how you set it up and how crazy you want to go.

As we will see, all right, we're going to be doing a few different approaches. And I'm going to start right away by looking at Claude's agent teams Which is the one thing from I guess the day one of this week that we said we would come back to now's the time We're coming back to it right here. So Claude agent teams first of all is an experimental feature as of right now By the time you watch this maybe it's matured.

Maybe it's no longer just an experimental feature, but for me, it is. This is brand new and I'll be going through the experimental side of it and maybe you'll look at the dots and see that some of this has become a bit more firm. But first of all, what are agent teams?

They are ways that you can have multiple Cloud code instances, multiple different Cloud codes that are being coordinated in some way. One of them is acting as the team lead. It is in charge of the whole process.

And its job is to assign out tasks and manage the collaboration between them in order to achieve a goal. And then the others, the teammates, they're able to work independently, and they're able to interact with each other so they can send each other messages. And you, as the human in the loop, you can interact with them directly as well.

You don't need to go through the lead. And this is a massive distinction from sub-agents. With sub-agents, you can't send a message to a sub-agent.

It just exists in order to serve the main-clawed code, and it doesn't really work independently. It only persists for the duration of its task and then its history. Whereas in this case these things called teammates, the teammate, they are all separate cloud codes that are running.

Okay, so under what circumstances would you make use of Cloud Agent Teams instead of, say, sub-agents? We'll have a direct comparison in a moment, but here are some examples of use cases that work well for Cloud Teams. So one of them is if, and this is a simple one that you can imagine, if you want to research a ton of different things, like you want to head off and look, you want to look at Wikipedia and you also want to look at Stack Overflow, and you also want to look at three other places, then you could just have a multiple of these team members go off, do their research independently, working on it, maybe exchanging information between them and then come back with all of the results.

### Deep dive

And that's something that you can also use subagents for, but this is a nice kind of use case. But perhaps a better one, if I may, is a case where you have independent modules of your system and you've got an objective and you can see a way that different Claude codes could work independently. And indeed you could just spawn at multiple terminals and run Claude and have them run independently.

And indeed, you could just spawn multiple terminals and run Claude and have them run independently. But you would prefer them to be able to communicate and have some shared structure. Now they can communicate anyway through.md files if you did have them as separate terminals, but it would be a little bit flaky, it would depend a lot on who's writing what to which file and whether they're reading them again.

So this way you could have different Claude Code instances working on different modules, but still we're still working in lockstep, still having a channel of communication. And then the other way is kind of similar, but is saying rather than dividing them vertically into different areas of responsibility, you could divide them horizontally by layer by coding layer that you can have a front end engineer, backend engineer, LLM engineer responsible for different areas of your system. And that does translate quite nicely to the way that you sometimes organize humans in a software engineering team.

You can do it by area, by feature, by feature area of your system, or you can do it into a front end team and a back end team and so on. And you know, I always hesitate before ascribing too much human-like responsibility to agents, but you can see how this works quite well in terms of having separate responsibilities that Claude Code instances can work on independently without too much overlap. And you're probably getting the idea that there's a lot of experimentation involved in getting agent teams to work well.

There's not necessarily one right answer. It needs some balance. You're ideally looking to be able to give separate responsibilities to Claude agents so that they can work independently and still have some benefit to communication between the agents so they can collaborate but not so much communication that they start to grind down and they're churning with lots of backwards and forwards.

So you're looking to strike that balance. And Anthropix website is really good on this. It's got some very clear instructions and they may have changed since I'm doing this.

It's probably worth a look. It's got this nice table in there that compares subagents to agent teams, these two techniques. And it's pretty clear that they are very different.

And they each have their place subagents where they have their own context, they return it to the caller, the communication is only back to their main agent. The main agent manages all the work, they have focused tasks, and they basically summarize the results back. So they're quite efficient from a token point of view.

They can cause more tokens to be spent themselves, but they're relatively efficient. but they're relatively efficient. Agent teams, they have their own full context window that is completely independent.

They don't return it to the caller. They can message the other teammates independently. They have a shared task list.

There is one task list that is managed by the overall, by the main Cloud Code, but they coordinate their items on the task list. They're best for when there is complex work that does require a level of collaboration, but not too much. And they can be expensive.

They can cause a lot of tokens to be spent. So you need to be aware of that. And look at that last bullet there.

Use subagents when you need quick focused workers that report back. Use agent teams when teammates need to share findings, challenge each other and coordinate on their own. Okay, there are five instructions that we will go through now.

### Putting it together

It's time for us to do this. Five steps to making the Cloud agent teams work. First of all, we need to change settings.json for the project.

We need to tell it that we are going to enable Cloud Code experimental agent teams. You might not need to do this because it might then be fully live without needing this fly, but we do. There's another field as well called teammate mode.

And there are two modes, and one of them in process works on all computers on Mac and PC. And it just means that all of the agents report back in the same screen, and you can flip between them, by pressing shift up and down, and that's what we'll use. There is a cooler approach called T-Mucks, but that only works on a max and Linux when you have extra stuff installed.

And so I'm not going to do it, but if you wish, you could try that. And when you do that, your screen splits into different sections, and you can see each of the different agents in different sections. And that's pretty cool.

So you might wanna do that if you wanna see that yourself. You have to change in process to T-Mucksucks and you have to have the T-Mucks installed or be using something called iTurn2 if you know what that is. So this is what we're going to put in settings.json and this should work on all platforms.

And then it's just as simple as prompting Cloud to say create an agent team to blah, blah, blah. And you can give it a lot of detail and tell it how the agent should be made up or the team should be made up or you could just give it the instruction. You can then press shift tab to turn it into delegate mode.

That's something worth doing to make sure that the main agent doesn't just start handling the tasks itself. And you can also, if necessary, prompt it, wait for your teammates to complete their tasks before proceeding to stop it diving in and doing work itself. And throw-back mentions that that's a common problem.

And then shift up and down is how you flip between the different teammates. And when you're done, you send a command, ask the BLAR teammate to shut down as a way to tell the main agent that it should shut down one of the team members, and then clean up the team is a general command to stop everything. So we need to know these commands.

This, these are the instructions for successfully running an agent team in Cloud Code. And there's three final bits of advice before we go and do this. We should invest in Cloud.md.

That gets loaded into the context for everything. And so it's our opportunity to make sure that all the agents start with the right information. We need to expect this to be pricey.

If you try and use free models for this, you can give it a shot, but I imagine it's just not going to be reliable. So if you're not comfortable with the cost, just watch me use this as a learning experience from seeing someone else doing it. If you're okay to go for this, then do expect to cost watch your costs, stop it if you ever become uncomfortable.

And also to add salt to the wound, you do need to be willing to rerun the whole thing.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

The time when we go crazy and it's all about the stages 7 and 8 of the Steve Yege chart that we went through a couple of weeks ago now. We've already got quite comfortable with the idea that you could run multiple claw distances. We've done that a bit.

## Practical tips

- And as we look between stages 7 and 8, swarms versus orchestration, I don't know that there's necessarily a binary we are at this point and we're at that point. The different solutions will be looking at a somewhere on that continuum, but between being sort of wild, swarm with no structure and extremely organized, structured orchestration. And where you are on that continuum depends a bit on your choices that you make, how you set it up and how crazy you want to go.
- You don't need to go through the lead. And this is a massive distinction from sub-agents. With sub-agents, you can't send a message to a sub-agent.
- You can do it by area, by feature, by feature area of your system, or you can do it into a front end team and a back end team and so on. And you know, I always hesitate before ascribing too much human-like responsibility to agents, but you can see how this works quite well in terms of having separate responsibilities that Claude Code instances can work on independently without too much overlap. And you're probably getting the idea that there's a lot of experimentation involved in getting agent teams to work well.
- They don't return it to the caller. They can message the other teammates independently. They have a shared task list.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

It might go off the rails, you might need to stop it, go back in, get, and then just run it another time, maybe tweaking the instructions. This is highly experimental, it's something that is incredibly powerful, it's also unpredictable and a bit chaotic and it can take several attempts. Okay, with that I hope you are excited and maybe a little tiny bit nervous. Let's go to VS Code, let's try Cloud Agent Teams for real.
