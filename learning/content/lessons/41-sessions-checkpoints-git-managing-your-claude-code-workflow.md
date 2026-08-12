# Sessions, Checkpoints & Git Managing Your Claude Code Workflow

> Week 2 · Day 2

## Overview

Okay, so the next set of commands we're going to look at are all around managing your workflow, your journey within Claude Coe. And it's very flexible.

There are a lot of different ways of doing it and it can be muddling because it's almost like there's too many different ways of doing something that's quite similar, which is just sort of taking checkpoints of how you're going or being able to get back to where you were before. There's a few different ways of doing it and I'm going to explain them and how they fit together.

And then I'm going to tell you how I do it myself. You could do it the way I do it or do it your own way.

## You will learn

- Understand the main ideas covered in **Sessions, Checkpoints & Git Managing Your Claude Code Workflow**
- Follow the practical walkthrough from Week 2, Day 2
- Apply the techniques discussed in your own projects

## Key concepts

### Foundations

That's the whole idea of it being flexible. Okay, so Claude has two levels of granularity of how you can think about the journey you're having with Claude and go back to different points in time. And the first of them, the highest level of granularity are things called sessions.

And a session represents a complete state of your conversation with Claude, of the context with the conversation's got in it, and other stuff you're doing. That is the session. And you can name your session at any point, give it a name, and then that sort of records the state of the session at that point when you named it.

And then later you can choose to resume from any named session, and it will go back to that state of the context at that point. And that is a session. In fact, you can just choose to resume Claude from wherever you were when you lost quick chord.

Claude, this is so that's just resume from where I just was, or you can name a session and resume from that session. That's the idea behind a session. That sounds like the easy one.

That makes total sense, right? Just worth noting that when you do that, you're resuming to the conversation. You're not resuming to the state of the code and the repo at that point, just the context and conversation.

All right, hopefully that's clear. So you're thinking, what's the other one then? That can't be anything more than that.

There is something else. There's something called checkpointing, and checkpointing applies to a specific session, the session that you're currently on. You're there using Cloud Code.

Every single prompt that you send to Cloud Code, every one of those is considered a step in time. Each prompt, each one is considered a checkpoint. And you can do what's called rewinding, which is going back step by step in the conversation you're having to that point in time.

And that process of having this step by step prompt and being able to rewind is called check pointing. And you can see it's a much finer granularity than sessions, which are big things. But the nice thing about these check points you can rewind is that you can choose, do I just want to rewind just the conversation to go back to where I was with Claude, or do I want to actually revert the code back to where it was back then?

If Claude made a bunch of changes, I wanted to undo those changes and get back to the state, how is that right there? Then you can do that. And that's pretty cool.

But there is a catch. When you go back, Claude knows about the changes it's just made, and those are the ones that it can revert to take you back to where you were. But if as part of this particular prompt, Claude ran a script, say, on your computer, and that script did a few things, which included changing some files.

Then Claude can't revert those. It doesn't know about those. Or if you did something that ran a script that made some changes to files, Claude isn't actually keeping like a copy of your disk at each of these points.

So all it can do is undo the changes it knows about. So you have to be quite, quite aware of what's going on and exactly how you're going backwards if you choose to go backwards in terms of the code, as well as the conversation. But that's the difference between the session and the check pointing, session resuming, checkpoint rewinding.

### Deep dive

It can be a bit confusing until you've heard it clearly like this and you've thought about it and you've got it clear in your mind, just always always come back to this if you're doing one or the other to be clear on what you're doing and we will try it out both. But there is something else as well. There is something else.

And hopefully you're already thinking about that something else. That's something else as well. There is something else.

And hopefully you're already thinking about that, something else. That's something else, a different level of granularity. Again, it's sort of just orthogonal really, is the bullet proof, the proper way to manage your code, it's Git.

You've got Git, which is taking a snapshot of your code at each point. That's not related to the context of your conversation with with with claw, but it's related to your code and Get commits are the proper way to take a full snapshot of where you are from the code point of view and And be able to revert back to any one point. So you've really got these sort of three Three toolings you've got this of the management of the session in terms of your overall framing with claw to be able to go back to How we were talking to Claude a month ago to go back to how we were talking to Claude a month ago, check pointing, which is really about stepping forwards and backwards through the current conversation, and then get, of course, which is the long term way of managing every single possible point.

And you could be doing a get commit many times, even during a conversation. So it's not like that has to be at a higher level of granularity necessarily. So you might be forgiven for thinking, with all of these possibilities.

How do I know which is the right one to do? Like which one do I do? And the shorter answer is that really it should depend on what works best for your mode of working.

I can tell you the way I like to work and you can choose to do what I do or do something completely different. These tools are designed to work around your workflow, not the other way around. My personal workflow, not the other way around.

My personal workflow, so very much I use Git a lot and so I will like to commit as I go and make sure that I know what my various commits are doing. I will occasionally use check pointing if something's gone wrong as a way to go back, but it's not like I'm super likely to do that. It can be useful and I'm less likely to go back for the code changes that's made, unless it's something really immediate that it just did wrong that we can just rewind to right away.

But more likely than not, I'm more likely to be used Git, to go back to a previous commit. And I use markdown files as my way to track progress. It's quite boring and old school of me.

It's very 2025 of me to use things like "claud.md" and then "plan.md" as you saw and various others to keep note of what's happening. And I like to go back to to Claude's sort of frame of mind using these markdown files, these memory files as my way of tracking progress in a way that I can really understand. And I honestly recommend you do the same.

Using sessions and so I can go back to the conversation with Claude as of a week ago I find that very confusing it's hard to keep track of what we were saying and what's in context. I prefer to use files for that to have a crystal clear understanding of where we are in this project together. But many people use sessions and many people use them successfully so I don't want to discount it you should get used it to whatever works for your workflow.

Okay, so here we are back in Claude again and I'm going to say for our conversation today, I'd like you to be witty and snarky with me, please. Let's put that in there. See how it responds to that.

It's thinking about that. Thought for a second. Are you on the premium, Claude experience?

### Putting it together

Which included at no extra charge? Consider it done. So what chaos are we driving into today?

(laughs) All right, that's fun. And now with this, I'm going to name this session, which you do with the rename command. Rename and we give it a name, we will call it snarky-clawed.

Session renamed to snarky-clawed. And what we will now do is exit-clawed code. Gone, all right, and now, when we resume-clawed, we can decide how we want to do that.

So I can just type "clawed" and "Upcomes Claude" like this. Please summarize the project. And we will get a summary from Claude that will not be in a snarky style, at least I hope.

Here we go. Very good. It's a very sensible business like summary from Claude.

Just what we would expect. We will now come out of this Control C twice to come out and we will now try and bring back the coast of snarky Claude. Okay, and now I'm going to run Claude with Claude - resume, start up Claude with resume and it tells me I can resume a session one of eight.

The most recent one is please summarize the project. The one before that is Snarky Claude. You can see it has a name because we named it that way.

We will go into that. We are back inside Snarky Claude. And I will now say please summarize the project.

And we will see how Snarky Claude decides to summarize the project for us. Here we go. it's thinking about that and we'll let it do its thing.

Here we go. I just, I mean, you can already see the end. Want me to dig into anything specific?

Or we here to break something today? Based on the, here's the gist. Canban, Borber, the AI sidekick that actually does stuff.

Very nice. And yeah.

## Walkthrough

This session walks through the material step by step. Use the notes below as a study guide while you rewatch or practice alongside the original lesson.

That's the whole idea of it being flexible. Okay, so Claude has two levels of granularity of how you can think about the journey you're having with Claude and go back to different points in time. And the first of them, the highest level of granularity are things called sessions.

## Practical tips

- It can be a bit confusing until you've heard it clearly like this and you've thought about it and you've got it clear in your mind, just always always come back to this if you're doing one or the other to be clear on what you're doing and we will try it out both. But there is something else as well. There is something else.
- How do I know which is the right one to do? Like which one do I do? And the shorter answer is that really it should depend on what works best for your mode of working.
- My personal workflow, so very much I use Git a lot and so I will like to commit as I go and make sure that I know what my various commits are doing. I will occasionally use check pointing if something's gone wrong as a way to go back, but it's not like I'm super likely to do that. It can be useful and I'm less likely to go back for the code changes that's made, unless it's something really immediate that it just did wrong that we can just rewind to right away.
- Using sessions and so I can go back to the conversation with Claude as of a week ago I find that very confusing it's hard to keep track of what we were saying and what's in context. I prefer to use files for that to have a crystal clear understanding of where we are in this project together. But many people use sessions and many people use them successfully so I don't want to discount it you should get used it to whatever works for your workflow.

## Common pitfalls

- Skipping setup steps called out early in the lesson
- Copying outcomes without understanding the workflow behind them
- Running ahead without verifying intermediate results

## Summary

The vibe, keep it simple, don't over engineer, prove problems before fixing them. Basically the opposite of most enterprise projects I've seen. Ah, alright, that's snarky-glored, very nice. That is sessions working for us.
