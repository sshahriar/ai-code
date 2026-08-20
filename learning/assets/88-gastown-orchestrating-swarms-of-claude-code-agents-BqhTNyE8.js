var e=`# Gastown Orchestrating Swarms of Claude Code Agents

> Week 3 · Day 5

## Overview

Well hello, I can't believe it. It's the last day, it's the finale.

Welcome to week three, day five, our last time together, at least for this journey. Well, let's make it count.

I got a great day in store for you. So yesterday was a purple day, our final purple day we covered the idea of having swarms of agents, lots of agents.

## You will learn

- Understand the main ideas covered in **Gastown Orchestrating Swarms of Claude Code Agents**
- Follow the practical walkthrough from Week 3, Day 5
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

And we had what seven or eight of them when we used Florida agent teams. And then we looked at the more robust orchestration of something like GSD when there's a step by step browser and lots of checks and double checks. And it took five hours and we got a pretty good result.

And in fact, both times we got two zero shot results. And it's true more that I think about it that the second one didn't have any major defects. Well, the first one definitely did.

Even if the first one looked, they both looked very fancy. But it was a great result, and it really gives you that feeling of the art of the possible, what can be achieved if you are bold. And we started out, of course, with Claude Agent Teams.

And I took you through this chart from Claude's website that compares sub-agents that we're pretty familiar with now with Agent Teams and how Agent Teams are just a bit more out there, and the results are more unpredictable, but it's fast and you get a lot done, and it's really exciting, a bit nerve-wracking, but exciting, and we got great results, albeit for a reasonably well-contained project. And then got great results, albeit for a reasonably well contained project. And then straight after this, of course, we then moved on to GSD, which is an example of that.

There are many others like it, these sort of spectrum and designs. When you are orchestrating across lots of agents, it felt very much more serial, even though some things happened in parallel. As I say, it took a long time.

There's a lot of double checking and triple checking, a lot of planning and then executing and then verifying, but the results do speak for themselves really impressive. And in case you forgot, this is what it looked like. This was our first result, our beautiful results coming from a Claude agent teams.

And then you see the heat map just switched. You got this beautiful heat map, you got this nice chat super fast. I just just tried it.

And you've got here the watch list and the positions you've got and the overall portfolio P&L, really, really nicely done. Very visual, very responsive. Look at these charts are terrific.

And then over here, very similar indeed, is of course the result from GSD. It seems to be, as I say, more robust to new tickers being added. And it's generally got, it does have a bit more of a polished look to it.

say more robust to new tickers being added. And it's generally got, it does have a bit more of a polished look to it. I do, maybe I'm being unfair about the purple background.

After all that is one of our brand colors in this case. They are both, you gotta say, they're both fantastic products. Remembering both of these cases are zero shots.

We didn't do any debugging ourselves. We didn't come back and say this is a bug. Both of these are just the first time we brought it up after giving it all of those instructions and they're huge amounts of code.

And so it's just it's extraordinary. It's absolutely extraordinary. Well, I thought I'd bring this up one more time.

The eight stages from Steve Yege and you remember basically stage six is what we'd already been working with for a bit. Stage seven, we've never already done it per se. We have been brought up 10 agents and manually managed them because we've allowed it to automatically manage them right away.

We sort of jumped straight to stage eight, which is the right way to do it. And we did it with agents, and then we did it by orchestrating agents. And this chart, of course, came from a blog post by Steve Yege, and the reason he did it was to introduce something that is about as radical as you can get, which is a product that he built that's called Gas Town and that takes stage eight to a completely different extreme.

If you think that the something like Claude agent teams is kind of out there, kind of radical compared to GSD that's clearly very disciplined, very structured. So if you've got GSD on one end and you've got, you've got agent teams here, well, then Gas Town is like way over there by a mile. And we're going to take a look at it right now.

Well, here I am in the repo for Gas Town, which will be linked in the resources. And I want to say one more time that this next segment is completely optional. I recommend you watch me do it and use it as a way to get a sense for what this is all about.

If you really wish to, then for sure you can replicate what I do, but be warned it's a bit chaotic, it's a bit of madness. If it doesn't work out for you, then I would just move on, take this more as a way of seeing the possible. And so let me now walk you through the documentation for Gas Town.

So what is it? Well, it describes itself as a workspace manager, but really it's just a fancy set of kind of fabrics built around Claude Code or any coding agent. It even describes itself somewhere as sort of the new IDE construct.

It's just a set of different wrappers built around coding agents. A bit like GSD, it's trying to solve the challenge of context, of manually coordinating different agents. You can have many agents.

You can have 20 or 30 agents, according to Steve, all participating in this. And it's basically organizing them into a hierarchy, into a structure with many different agents taking responsibilities, with things different agents taking responsibilities, with things like mail between them as a way to coordinate, with all sorts of structure to try and make it be reliable and repeatable, in a sort of controlled chaos, when you have 20 agents. We won't have that many on this example, we'll have maybe six to eight, but you'll get a good sense of how it works.

### Deep dive

Now one of the things to know about gas town is that it has its own lingo, a whole vocabulary of words. And you can just go with the flow and watch what I do and sort of ignore the lingo. If you really want to dive in there, then you're going to have to learn a few words.

Take a paper and pen, write them down, get your glossary ready. One word you'll see a lot is this thing called beads, which is a piece of infrastructure that was written by Steve that this is built on top of. But beads gives it a way of having things a bit like get issues, like let's attract different items with an ID.

That's all part of what it calls the beads ledger that it is built on top of. And now let me tell you about the kind of hierarchy of different agents that go to work for you. The whole of the world that you operate in with Gas Town is called your town workspace, and it sits in a directory, GT, in the top level.

So this is kind of outside the constructive, like the projects folder and things like this. This has its own folder in its own right, GT in your home directory. That is your town workspace.

And each of your projects are called Rigs. So that is the first of the big words you have to remember. A project is known as a rig in the guest town terminology.

So there are Rigs, we're gonna have a rig in the guest town terminology. So there are rigs. We're going to have a rig called Fin for the finally project.

And you'll also see at some point that I have an old rig called finally because I started with that and it broke. And so there's like an old one hanging out there. So you'll see I have two rigs, but Fin is going to be the main rig that I will work with.

That is a project. Okay, only two more words to know. Crew.

Crew is like a workspace that you will have in your project. You'll see that mine will be called Ed. So Ed will be a crew working in Finn.

And so you have a crew in your rig. Crew in the rig, crew is Ed, rig is Finn. And then the other thing is called a pole cat.

And a pole cat is a worker. So you will end up having many pole cats. Each pole cat gets assigned tasks and it works on them.

So you're going to see a bunch of these polecats. All right, so a polecat is like a worker, a worker agent, a crew is like Ed's crew, and a rig is the project. And then there's one more thing to mention, which is called the Mayor.

And the Mayor, as far as your concern, feels like a Claude Code. When you launch the Mayor, up comes Claude Code. In fact, all of these are all Claude Codes as well.

There's tons of Claude Codes running, but you don't directly interact with them. You interact with one Claude Code, and that is the mayor. That is the Claude Code that you and I will talk to.

We will first interact with that one, and there is a way for us to flip and see all the other Claude Codes running behind the scenes. So that is called the mayor. The mayor is the coordinator, the one you talk to.

And then these different things talk to each other through a mailbox. There's tons of stuff. And I'm scraping the surface of all the action that happens when you use this.

It feels like tons is going on. And my full understanding is fairly surface level, as you could tell. But you'll see that it will all hold together.

We're gonna have a mayor, we're gonna have a rig, we're gonna have a crew, we're gonna have pole cats. And together We're going to have a mayor, we're going to have a rig, we're going to have a crew, we're going to have polecats. And together, they're going to work on Finn.

But you shouldn't take my word for it. You should read all of this. You could read the definitions of the town, the rigs, the crew members, the polecats.

And then, oh, I should also say a convoy. I can't believe I forgot that. A convoy is like a bundle of tasks.

The tasks each, each are different beads, a bundle of tasks that get assigned to one of the agents, one of the polecats. And you'll see convoys being created and beads being created. And you can do all of that by just talking with the mayor.

### Putting it together

You don't need to. There are various commands to create all of these things, but you can also just put it in natural language to the mayor. And they will do it for you.

And, yeah, it explains how tasks have this ID that they are assigned. All right, and then to install it, to install it on a Mac, it's this simple command, brew, install, guest town, on a PC. It's this one when I ran this and it installed beads as well, and installed everything.

Everything got set up, I just ran it in a terminal. So you should just bring up a terminal on a PC, a PowerShell, and then run it there. If you're on a PC, it'd be better to do it in WSL and run T-Mucks if you know what that is.

It's going to make the experience better and if you don't know what any of that is remember you don't need to do this. You can just watch me. I'm going to probably say that a ton of times.

You can watch me do it and just get a sense of it. This is to show you this sort of radical semi-chaos of running a big orchestration platform together. Alright, let's go to a terminal and get the show on the road.

Okay, I've actually brought up a terminal. What you're looking at here is a terminal. If you're on a Mac, this is the terminal program.

I'm actually using something called item 2. If you're on a PC, then PowerShell. And follow the instructions that are on the repo that I'll link.

And don't feel like you have to follow, do this. You could just watch me 'cause I just wanna give you a feel for what this is like. And the commands start GT for gas town.

I'm gonna start by installing it in my home directory in a folder called GT and telling it to use git. And that is the normal way that it's set up and it's done and it has been created. And I'm now going to go into that directory, that's where I am right now and now I'm going to create a rig.

So I do GT, not get GT rig, add and I name the rig and I will call it Fin and the bit like finally but it's Fin like the very end and I've got a repo. The next thing you do is you give it a GitHub repo. It's at github.com/ed-donner and it's just called fin for the end.

There we go. Done. All setting up happened.

Okay. And it has all been set up. And now the next thing to do is to add a crew to this rig.

So rig and crew are the two big concepts. And I do that with gtcrewadd. I give it a name, I'll call it add.

I tell it the rig dash dash rig and the name of the rig is fin. So that is now set up a crew called add for fin. And now I can go into that directory.

So that is in the into that directory. So that is in, it is in the Riggs directory. So there should now be a directory called Fin.

It says just above, start working with it. Go into Fin/crew/ed, and that is where I now am. And there is, this is now where my repo has been cloned.

There is a single file called spec. And now with all of this, I can type this command gt-maya-attach. And this is going to launch Cloud Code and go into it.

Let's see that happening. It launches Cloud Code. Here it is.

Cloud Code is running, and it's looking at what's going on.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

And we had what seven or eight of them when we used Florida agent teams. And then we looked at the more robust orchestration of something like GSD when there's a step by step browser and lots of checks and double checks. And it took five hours and we got a pretty good result.

## Practical tips

- The eight stages from Steve Yege and you remember basically stage six is what we'd already been working with for a bit. Stage seven, we've never already done it per se. We have been brought up 10 agents and manually managed them because we've allowed it to automatically manage them right away.
- And each of your projects are called Rigs. So that is the first of the big words you have to remember. A project is known as a rig in the guest town terminology.
- There's tons of Claude Codes running, but you don't directly interact with them. You interact with one Claude Code, and that is the mayor. That is the Claude Code that you and I will talk to.
- You don't need to. There are various commands to create all of these things, but you can also just put it in natural language to the mayor. And they will do it for you.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

It's looking for instructions, and it says, "No hook work, no mail, inbox is empty, waiting for instructions. And now, now I can give it instructions. Now, there's many ways to do it. I'm going to try and do it the simplest way.
`;export{e as default};